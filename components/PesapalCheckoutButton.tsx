'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import type { PackagePricing } from '@/lib/pricing';
import { supabase } from '@/lib/supabaseClient';

type TierOption = 'midrange' | 'luxury';

type PesapalCheckoutButtonProps = {
  packageName?: string;
  packageSlug?: string;
  pricing?: PackagePricing;
  currency?: string;
  defaultTier?: TierOption;
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
  defaultTier = 'midrange',
  defaultPax = 1,
}: PesapalCheckoutButtonProps) {
  const availablePrices: Record<Exclude<TierOption, 'custom'>, number | null | undefined> =
    useMemo(
      () => ({
        midrange: pricing?.midrange ?? null,
        luxury: pricing?.luxury ?? null,
      }),
      [pricing],
    );

  const firstAvailableTier: TierOption | null =
    (availablePrices.midrange ? 'midrange' : null) ||
    (availablePrices.luxury ? 'luxury' : null);

  const initialTier: TierOption =
    defaultTier === 'midrange' && availablePrices.midrange
      ? 'midrange'
      : defaultTier === 'luxury' && availablePrices.luxury
        ? 'luxury'
        : (firstAvailableTier as TierOption | null) || 'midrange';

  const [tier, setTier] = useState<TierOption>(initialTier);
  const [pax, setPax] = useState<number>(defaultPax);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;
    const syncAuth = async () => {
      const { data, error: authError } = await supabase.auth.getUser();
      if (!active) return;
      if (authError) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(Boolean(data.user));
      }
      setAuthChecked(true);
    };
    syncAuth();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsAuthenticated(true);
      }
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
    });
    return () => {
      active = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Reset tier when pricing changes so we don't leave an unavailable option selected.
    if (tier === 'midrange' && !availablePrices.midrange && availablePrices.luxury) {
      setTier('luxury');
    }
    if (tier === 'luxury' && !availablePrices.luxury && availablePrices.midrange) {
      setTier('midrange');
    }
  }, [availablePrices.midrange, availablePrices.luxury, tier]);

  const perPerson =
    tier === 'midrange'
      ? availablePrices.midrange
      : availablePrices.luxury;

  const validPerPerson =
    typeof perPerson === 'number' && Number.isFinite(perPerson) && perPerson > 0
      ? perPerson
      : null;

  const totalAmount =
    validPerPerson && pax && Number.isFinite(pax) && pax > 0
      ? Number.parseFloat((validPerPerson * pax).toFixed(2))
      : null;

  const formattedTotal = formatCurrency(totalAmount, currency);

  const handleCheckout = async () => {
    const nextUrl = typeof window !== 'undefined' ? window.location.href : '/';
    if (!authChecked) {
      setError('Checking sign-in status... please try again.');
      return;
    }

    if (!isAuthenticated) {
      setError('Please log in to continue. Redirecting to sign in…');
      window.location.href = `/auth?next=${encodeURIComponent(nextUrl)}`;
      return;
    }

    if (!totalAmount || !validPerPerson) {
      setError('Add a price to continue.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/pesapal/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency,
          tier,
          pax,
          perPerson: validPerPerson,
          packageName,
          packageSlug,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to start Pesapal checkout.');
      }

      const data = await res.json();
      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl as string;
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

  const options: { value: TierOption; label: string }[] = [];
  if (availablePrices.midrange) {
    options.push({
      value: 'midrange',
      label: `Midrange: ${formatCurrency(availablePrices.midrange, currency)} pp`,
    });
  }
  if (availablePrices.luxury) {
    options.push({
      value: 'luxury',
      label: `Luxury: ${formatCurrency(availablePrices.luxury, currency)} pp`,
    });
  }

  const disablePesapal = loading || !totalAmount || totalAmount <= 0 || pax > 2;
  const showPlanLink = pax > 2 || !validPerPerson;
  const planHref = packageSlug ? `/plan?package=${encodeURIComponent(packageSlug)}` : '/plan';
  const selectValue = options.length ? tier : '';

  return (
    <div className="space-y-3 rounded-[20px] border border-[#c3c3c3] bg-white/80 p-4 text-[#231f20] shadow-sm backdrop-blur">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold text-[#231f20]">
          Price option
          <select
            className="mt-1 w-full rounded-full border border-[#c3c3c3] px-3 py-2 text-sm text-[#231f20] focus:border-[#ba7e47] focus:outline-none"
            value={selectValue}
            onChange={(e) => {
              const newTier = e.target.value as TierOption;
              setTier(newTier);
              setError(null);
            }}
            disabled={!options.length}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {!options.length && <option value="">Price on request</option>}
          </select>
        </label>
        <label className="text-sm font-semibold text-[#231f20]">
          Pax
          <input
            type="number"
            min={1}
            value={pax}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value, 10);
              const safeValue = Number.isFinite(value) && value > 0 ? value : 1;
              setPax(safeValue);
            }}
            className="mt-1 w-full rounded-full border border-[#c3c3c3] px-3 py-2 text-sm text-[#231f20] focus:border-[#ba7e47] focus:outline-none"
          />
        </label>
      </div>

      {pax <= 2 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#231f20]/70">Total ({currency}):</span>
          <span className="font-semibold text-[#231f20]">
            {formattedTotal ?? 'Add pricing'}
          </span>
        </div>
      )}

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
