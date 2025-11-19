'use client';

import { useState } from 'react';

export function PesapalCheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/pesapal/checkout', { method: 'POST' });

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

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="rounded-lg bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Connecting to Pesapal…' : 'Pay with Pesapal'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
