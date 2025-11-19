'use client';

import { useState } from 'react';

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to create checkout session.');
      }

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url as string;
        return;
      }

      throw new Error('Missing checkout URL.');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unexpected error occurred.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="rounded-lg bg-black px-5 py-3 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Redirecting...' : 'Start Checkout ($5)'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
