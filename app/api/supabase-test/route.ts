import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const table = searchParams.get('table') || 'example_table';

  const { data, error } = await supabase.from(table).select('*').limit(1);

  if (error?.code === '42P01') {
    return NextResponse.json({
      ok: true,
      message: `Connected to Supabase, but table "${table}" does not exist. Pass ?table=your_table to check another target.`,
    });
  }

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: { message: error.message, code: error.code },
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    table,
    rows: data?.length ?? 0,
    note: 'Connection succeeded.',
  });
}
