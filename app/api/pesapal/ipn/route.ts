import { NextResponse, type NextRequest } from 'next/server';

import { getPesapalTransactionStatus } from '@/lib/pesapal';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const trackingKeys = [
  'orderTrackingId',
  'OrderTrackingId',
  'order_tracking_id',
  'ordertrackingid',
];

const merchantKeys = [
  'merchantReference',
  'MerchantReference',
  'merchant_reference',
  'merchantreference',
];

function readFromSearchParams(params: URLSearchParams, keys: string[]) {
  for (const key of keys) {
    const value = params.get(key);
    if (value) {
      return value;
    }
  }
  return null;
}

function readFromObject(
  payload: Record<string, unknown> | null | undefined,
  keys: string[],
) {
  if (!payload) {
    return null;
  }

  const entries = Object.entries(payload).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ]);

  for (const key of keys) {
    const match = entries.find(([payloadKey]) => payloadKey === key.toLowerCase());
    if (match) {
      const value = match[1];
      if (typeof value === 'string' && value.trim()) {
        return value;
      }
    }
  }

  return null;
}

async function parseBody(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    try {
      const data = await request.json();
      return (data as Record<string, unknown>) ?? null;
    } catch {
      return null;
    }
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await request.text();
    return Object.fromEntries(new URLSearchParams(text));
  }

  try {
    const data = await request.json();
    return (data as Record<string, unknown>) ?? null;
  } catch {
    return null;
  }
}

function parseAmount(rawAmount?: string | null) {
  if (!rawAmount) {
    return null;
  }

  const amount = Number.parseFloat(rawAmount);
  return Number.isFinite(amount) ? amount : null;
}

type TransactionStatus = Awaited<ReturnType<typeof getPesapalTransactionStatus>>;

type PersistTransactionArgs = {
  transaction: TransactionStatus;
  orderTrackingId: string | null;
  merchantReference: string | null;
  body?: Record<string, unknown> | null;
  requestMethod: string;
};

async function persistTransaction({
  transaction,
  orderTrackingId,
  merchantReference,
  body,
  requestMethod,
}: PersistTransactionArgs) {
  const resolvedOrderTrackingId =
    transaction.order_tracking_id ?? orderTrackingId ?? null;
  const resolvedMerchantReference =
    transaction.merchant_reference ?? merchantReference ?? null;
  const paymentStatus =
    transaction.payment_status_description ?? transaction.status ?? null;
  const amountValue = parseAmount(transaction.amount ?? null);
  const now = new Date().toISOString();

  const record = {
    order_tracking_id: resolvedOrderTrackingId,
    merchant_reference: resolvedMerchantReference,
    payment_status: paymentStatus,
    status_code: transaction.status_code ?? null,
    payment_method: transaction.payment_method ?? null,
    amount: amountValue,
    confirmation_code: transaction.confirmation_code ?? null,
    description: transaction.description ?? null,
    call_back_url: transaction.call_back_url ?? null,
    created_date: transaction.created_date ?? null,
    received_at: now,
    last_notification_method: requestMethod,
    raw_payload: JSON.stringify(transaction),
    ipn_body: body ? JSON.stringify(body) : null,
    updated_at: now,
  };

  if (!record.order_tracking_id && !record.merchant_reference) {
    throw new Error('Unable to store Pesapal transaction: missing identifiers.');
  }

  const onConflict = record.order_tracking_id ? 'order_tracking_id' : 'merchant_reference';

  const { error } = await supabaseAdmin
    .from('pesapal_transactions')
    .upsert(record, { onConflict });

  if (error) {
    throw new Error(`Unable to store Pesapal transaction: ${error.message}`);
  }

  return record;
}

async function handleIpn(request: NextRequest, body?: Record<string, unknown> | null) {
  const url = new URL(request.url);
  const orderTrackingId =
    readFromSearchParams(url.searchParams, trackingKeys) ||
    readFromObject(body, trackingKeys);
  const merchantReference =
    readFromSearchParams(url.searchParams, merchantKeys) ||
    readFromObject(body, merchantKeys);

  if (!orderTrackingId && !merchantReference) {
    return NextResponse.json(
      {
        error: 'Missing orderTrackingId or merchantReference.',
      },
      { status: 400 },
    );
  }

  try {
    const transaction = await getPesapalTransactionStatus({
      orderTrackingId,
      merchantReference,
    });

    await persistTransaction({
      transaction,
      orderTrackingId,
      merchantReference,
      body,
      requestMethod: request.method,
    });

    return NextResponse.json({
      received: true,
      receivedAt: new Date().toISOString(),
      orderTrackingId: transaction.order_tracking_id ?? orderTrackingId ?? null,
      merchantReference:
        transaction.merchant_reference ?? merchantReference ?? null,
      paymentStatus:
        transaction.payment_status_description ?? transaction.status ?? null,
      transaction,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to check Pesapal status.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handleIpn(request);
}

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  return handleIpn(request, body);
}
