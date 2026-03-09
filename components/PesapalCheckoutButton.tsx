'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  calculateSafariTotal,
  getPerPersonRate,
  MAX_ONLINE_PAX,
  type PackagePricing,
} from '@/lib/safariPricing';
import { buildAuthenticatedApiHeaders } from '@/lib/security/clientHeaders';

type PesapalCheckoutButtonProps = {
  packageName?: string;
  packageSlug?: string;
  pricing?: PackagePricing;
  currency?: string;
  defaultPax?: number;
};

const formatCurrency = (amount?: number | null, currency = 'USD') => {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function PesapalCheckoutButton({
  packageName = 'Custom Safari',
  packageSlug,
  pricing,
  currency = 'USD',
  defaultPax = 1,
}: PesapalCheckoutButtonProps) {
  const initialPax = Number.isInteger(defaultPax) && defaultPax > 0 ? defaultPax : 1;
  const [paxInput, setPaxInput] = useState<string>(() => String(initialPax));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsedPax = Number.parseInt(paxInput, 10);
  const pax = Number.isFinite(parsedPax) && parsedPax > 0 ? parsedPax : 0;
  const validPerPerson = getPerPersonRate(pricing, pax);
  const totalAmount = calculateSafariTotal(pricing, pax);

  const formattedTotal = formatCurrency(totalAmount, currency);
  const formattedPerPerson = formatCurrency(validPerPerson, currency);

  const handleCheckout = async () => {
    const nextUrl = typeof window !== 'undefined' ? window.location.href : '/';
    if (!packageSlug || !totalAmount || !validPerPerson) {
      setError('Add a price to continue.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient');
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        setError('Please log in to continue. Redirecting to sign in…');
        window.location.href = `/auth?next=${encodeURIComponent(nextUrl)}`;
        return;
      }

      const res = await fetch('/api/pesapal/checkout', {
        method: 'POST',
        headers: await buildAuthenticatedApiHeaders(),
        body: JSON.stringify({
          currency,
          pax,
          packageName,
          packageSlug,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to start Pesapal checkout.');
      }

      const checkoutData = await res.json();
      if (checkoutData?.redirectUrl) {
        window.location.href = checkoutData.redirectUrl as string;
        return;
      }

      throw new Error('Missing Pesapal redirect URL.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error occurred.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const disablePesapal = loading || !totalAmount || totalAmount <= 0 || pax > MAX_ONLINE_PAX;
  const showPlanLink = pax > MAX_ONLINE_PAX || !validPerPerson || !packageSlug;
  const planHref = packageSlug ? `/plan?package=${encodeURIComponent(packageSlug)}` : '/plan';
  const showPricing = pax > 0 && pax <= MAX_ONLINE_PAX && !!validPerPerson;

  return (
    <div className="space-y-3 rounded-[20px] bg-white/80 p-4 text-[#231f20] shadow-md backdrop-blur">
      <div className={`grid gap-3 ${showPricing ? 'md:grid-cols-[minmax(0,1fr)_minmax(220px,0.85fr)] md:items-end' : ''}`}>
        <label className="text-sm font-semibold text-[#231f20]">
          Number of people
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={paxInput}
            onChange={(e) => {
              setPaxInput(e.target.value);
              setError(null);
            }}
            onBlur={() => {
              if (!Number.isFinite(parsedPax) || parsedPax <= 0) {
                setPaxInput('1');
                return;
              }
              setPaxInput(String(parsedPax));
            }}
            className="mt-1 w-full rounded-full border border-[#c3c3c3] px-3 py-2 text-sm text-[#231f20] focus:border-[#ba7e47] focus:outline-none"
          />
        </label>

        {showPricing && (
          <div className="rounded-[16px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-3 text-sm md:min-h-[78px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#231f20]/70">Total Price ({currency})</span>
              <span className="font-semibold text-[#231f20]">
                {formattedTotal ?? 'Add pricing'}
              </span>
            </div>
            {formattedPerPerson && (
              <p className="mt-1 text-xs text-[#231f20]/65">
                {formattedPerPerson} per person
              </p>
            )}
          </div>
        )}
      </div>

      {showPlanLink ? (
        <Link
          href={planHref}
          className="inline-flex w-full justify-center rounded-full bg-[#231f20] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#3a3435]"
        >
          Plan a safari
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleCheckout}
          disabled={disablePesapal}
          className="w-full rounded-full bg-[#ba7e47] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Connecting to Pesapal…' : formattedTotal ? `Checkout ${formattedTotal}` : 'Checkout'}
        </button>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
