import { NextResponse } from 'next/server';

import { createPesapalOrder } from '@/lib/pesapal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const { redirectUrl, orderTrackingId, merchantReference } =
      await createPesapalOrder();

    return NextResponse.json({ redirectUrl, orderTrackingId, merchantReference });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start Pesapal.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
