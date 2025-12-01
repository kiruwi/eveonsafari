import { NextResponse } from 'next/server';

import { createPesapalOrder } from '@/lib/pesapal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const rawAmount = Number.parseFloat(payload?.amount);
    const amount =
      Number.isFinite(rawAmount) && rawAmount > 0 ? rawAmount : undefined;
    const currency =
      typeof payload?.currency === 'string' && payload.currency.trim().length
        ? payload.currency
        : undefined;
    const pax = Number.isFinite(Number(payload?.pax))
      ? Number(payload?.pax)
      : undefined;
    const tier =
      typeof payload?.tier === 'string' && payload.tier.trim().length
        ? payload.tier
        : undefined;
    const packageName =
      typeof payload?.packageName === 'string' && payload.packageName.trim().length
        ? payload.packageName
        : undefined;

    const descriptionBase = packageName || 'Eve On Safari checkout';
    const suffix =
      tier || pax
        ? `${tier ? ` ${tier}` : ''}${pax ? ` — ${pax} pax` : ''}`
        : '';
    const description = `${descriptionBase}${suffix}`.trim();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than zero.' }, { status: 400 });
    }

    const { redirectUrl, orderTrackingId, merchantReference } =
      await createPesapalOrder({
        amount,
        currency,
        description,
        billingAddressOverride: {
          first_name: packageName ?? undefined,
        },
      });

    return NextResponse.json({ redirectUrl, orderTrackingId, merchantReference });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start Pesapal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
