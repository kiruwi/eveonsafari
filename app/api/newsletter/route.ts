import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function parseBody(request: Request) {
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

export async function POST(request: Request) {
  const body = await parseBody(request);
  const rawEmail = typeof body?.email === 'string' ? body.email : '';
  const email = rawEmail.trim();

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Enter a valid email address.' },
      { status: 400 },
    );
  }

  const source =
    typeof body?.source === 'string' && body.source.trim()
      ? body.source.trim()
      : null;

  const { error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .insert({ email, source });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
