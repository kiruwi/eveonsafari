import { randomUUID } from 'crypto';

import { getPesapalAllowedHosts, isProduction } from '@/lib/security/config';
import { assertSafeOutboundUrl } from '@/lib/security/ssrf';

type PesapalConfig = {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
  callbackUrl: string;
  currency: string;
  ipnUrl?: string;
  ipnNotificationType: 'GET' | 'POST';
  ipnNotificationId?: string;
  defaultAmount: number;
  billingAddress: {
    email_address: string;
    phone_number: string;
    country_code: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    line_1?: string;
    line_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    zip_code?: string;
  };
};

type PesapalTokenResponse = {
  token?: string;
  Token?: string;
  access_token?: string;
  AccessToken?: string;
  expiryDate?: string;
  expiry_date?: string;
  status?: string;
  message?: string;
  error?: {
    error_type?: string;
    code?: string;
    message?: string;
  };
};

type PesapalIpnResponse = {
  ipn_id: string;
  status: string;
  message: string;
};

type PesapalOrderResponse = {
  redirect_url?: string;
  order_tracking_id?: string;
  status: string;
  message: string;
  error?: {
    error_type?: string;
    code?: string;
    message?: string;
  };
};

type PesapalTransactionStatusResponse = {
  merchant_reference?: string;
  order_tracking_id?: string;
  status_code?: string;
  payment_method?: string;
  payment_status_description?: string;
  amount?: string;
  created_date?: string;
  confirmation_code?: string;
  description?: string;
  call_back_url?: string;
  error?: {
    error_type?: string;
    code?: string;
    message?: string;
  };
  message?: string;
  status?: string;
};

type CreateOrderOptions = {
  amount?: number | null;
  currency?: string | null;
  description?: string | null;
  billingAddressOverride?: Partial<PesapalConfig["billingAddress"]>;
};

const REQUEST_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(url: URL | string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timeout);
  }
}

function assertSafeCallbackUrl(rawUrl: string) {
  const parsed = new URL(rawUrl);
  if (isProduction() && parsed.protocol !== 'https:') {
    throw new Error('PESAPAL_CALLBACK_URL must use HTTPS in production.');
  }
  return parsed.toString();
}

function getPesapalConfig(): PesapalConfig {
  const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing PESAPAL_CONSUMER_KEY or PESAPAL_CONSUMER_SECRET.');
  }

  const defaultAmount = Number.parseFloat(process.env.PESAPAL_DEFAULT_AMOUNT ?? '5');

  const baseUrl = assertSafeOutboundUrl(
    process.env.PESAPAL_BASE_URL?.replace(/\/$/, '') ??
      'https://cybqa.pesapal.com/pesapalv3',
    getPesapalAllowedHosts(),
    'PESAPAL_BASE_URL',
  );

  const ipnNotificationTypeRaw = (
    process.env.PESAPAL_IPN_NOTIFICATION_TYPE ?? 'GET'
  ).toUpperCase();
  const ipnNotificationType =
    ipnNotificationTypeRaw === 'POST' ? 'POST' : 'GET';

  return {
    baseUrl: baseUrl.toString().replace(/\/$/, ''),
    consumerKey,
    consumerSecret,
    callbackUrl: assertSafeCallbackUrl(
      process.env.PESAPAL_CALLBACK_URL ?? 'http://localhost:3000/success',
    ),
    currency: process.env.PESAPAL_CURRENCY ?? 'KES',
    ipnUrl: process.env.PESAPAL_IPN_URL,
    ipnNotificationType,
    ipnNotificationId: process.env.PESAPAL_IPN_ID,
    defaultAmount: Number.isFinite(defaultAmount) ? defaultAmount : 5,
    billingAddress: {
      email_address: process.env.PESAPAL_BILLING_EMAIL ?? 'customer@example.com',
      phone_number: process.env.PESAPAL_BILLING_PHONE ?? '255700000000',
      country_code: process.env.PESAPAL_BILLING_COUNTRY ?? 'KE',
      first_name: process.env.PESAPAL_BILLING_FIRST_NAME ?? 'Demo',
      middle_name: process.env.PESAPAL_BILLING_MIDDLE_NAME ?? '',
      last_name: process.env.PESAPAL_BILLING_LAST_NAME ?? 'Customer',
      line_1: process.env.PESAPAL_BILLING_LINE1 ?? '',
      line_2: process.env.PESAPAL_BILLING_LINE2 ?? '',
      city: process.env.PESAPAL_BILLING_CITY ?? '',
      state: process.env.PESAPAL_BILLING_STATE ?? '',
      postal_code: process.env.PESAPAL_BILLING_POSTAL_CODE ?? '',
      zip_code: process.env.PESAPAL_BILLING_ZIP ?? '',
    },
  };
}

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    const baseMessage =
      error instanceof Error ? error.message : 'Unable to parse Pesapal response.';
    throw new Error(`${baseMessage} Raw response: ${text}`);
  }
}

async function requestToken(config: PesapalConfig) {
  const res = await fetchWithTimeout(`${config.baseUrl}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
    }),
  });

  const data = await readJson<PesapalTokenResponse>(res);
  const token =
    data.token ?? data.Token ?? data.access_token ?? data.AccessToken ?? null;

  if (!res.ok || !token) {
    const errorDetail =
      data.error?.message ||
      data.error?.error_type ||
      data.error?.code ||
      data.message ||
      data.status ||
      res.statusText;
    throw new Error(`Unable to get Pesapal token: ${errorDetail}`);
  }

  return token;
}

async function resolveNotificationId(config: PesapalConfig, token: string) {
  if (config.ipnNotificationId) {
    return config.ipnNotificationId;
  }

  if (!config.ipnUrl) {
    throw new Error('Set PESAPAL_IPN_URL or PESAPAL_IPN_ID to complete Pesapal setup.');
  }

  const res = await fetchWithTimeout(`${config.baseUrl}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: config.ipnUrl,
      ipn_notification_type: config.ipnNotificationType,
    }),
  });

  const data = await readJson<PesapalIpnResponse>(res);

  if (!res.ok || !data.ipn_id) {
    throw new Error(
      `Unable to register Pesapal IPN URL: ${data.message || res.statusText}`,
    );
  }

  return data.ipn_id;
}

export async function createPesapalOrder(options: CreateOrderOptions = {}) {
  const config = getPesapalConfig();
  const token = await requestToken(config);
  const notificationId = await resolveNotificationId(config, token);
  const merchantReference = randomUUID();
  const validAmount =
    typeof options.amount === 'number' && Number.isFinite(options.amount) && options.amount > 0
      ? options.amount
      : config.defaultAmount;
  const amount = Number.parseFloat(validAmount.toFixed(2));
  const currency = (options.currency || config.currency || 'USD').toUpperCase();
  const description = options.description?.trim() || 'Eve On Safari order';
  const billingAddress = {
    ...config.billingAddress,
    ...options.billingAddressOverride,
  };

  const res = await fetchWithTimeout(
    `${config.baseUrl}/api/Transactions/SubmitOrderRequest`,
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: merchantReference,
      currency,
      amount,
      description,
      callback_url: config.callbackUrl,
      notification_id: notificationId,
      billing_address: billingAddress,
    }),
  },
  );

  const data = await readJson<PesapalOrderResponse>(res);

  if (!res.ok || !data.redirect_url) {
    const detail =
      data.error?.message ||
      data.error?.code ||
      data.message ||
      data.status ||
      res.statusText;
    throw new Error(`Unable to create Pesapal checkout session: ${detail}`);
  }

  return {
    redirectUrl: data.redirect_url,
    orderTrackingId: data.order_tracking_id,
    merchantReference,
  };
}

export async function getPesapalTransactionStatus({
  orderTrackingId,
  merchantReference,
}: {
  orderTrackingId?: string | null;
  merchantReference?: string | null;
}) {
  if (!orderTrackingId && !merchantReference) {
    throw new Error('Provide orderTrackingId or merchantReference to check Pesapal status.');
  }

  const config = getPesapalConfig();
  const token = await requestToken(config);
  const url = new URL(`${config.baseUrl}/api/Transactions/GetTransactionStatus`);

  if (orderTrackingId) {
    url.searchParams.set('orderTrackingId', orderTrackingId);
  }
  if (merchantReference) {
    url.searchParams.set('merchantReference', merchantReference);
  }

  const res = await fetchWithTimeout(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await readJson<PesapalTransactionStatusResponse>(res);

  if (!res.ok) {
    const errorDetail =
      data.error?.message ||
      data.error?.error_type ||
      data.error?.code ||
      data.message ||
      data.status ||
      res.statusText;
    throw new Error(`Unable to fetch Pesapal transaction status: ${errorDetail}`);
  }

  return data;
}
