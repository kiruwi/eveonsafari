'use client';

import { useState } from 'react';

import { supabase } from '@/lib/supabaseClient';

export default function AuthPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resolveAuthOrigin = () => {
    const rawCanonical = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
    if (typeof window === 'undefined') {
      return rawCanonical ?? null;
    }
    if (!rawCanonical) {
      return window.location.origin;
    }

    try {
      const canonicalUrl = new URL(rawCanonical);
      const canonicalHost = canonicalUrl.hostname;
      const apexHost = canonicalHost.startsWith('www.')
        ? canonicalHost.slice(4)
        : canonicalHost;
      const wwwHost = `www.${apexHost}`;
      const currentHost = window.location.hostname;

      if (currentHost === apexHost || currentHost === wwwHost) {
        if (
          currentHost !== canonicalHost ||
          window.location.protocol !== canonicalUrl.protocol
        ) {
          window.location.replace(
            `${canonicalUrl.protocol}//${canonicalHost}${window.location.pathname}${window.location.search}${window.location.hash}`,
          );
          return null;
        }
        return canonicalUrl.origin;
      }

      return window.location.origin;
    } catch {
      return window.location.origin;
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setMessage(null);

    const authOrigin = resolveAuthOrigin();
    if (!authOrigin) {
      return;
    }
    const redirectTo = `${authOrigin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else {
      setMessage('Redirecting to Google...');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
        <h1 className="text-2xl font-bold text-zinc-900">Sign in / Sign up</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Continue with Google to create an account or log in.
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{loading ? 'Opening Google...' : 'Continue with Google'}</span>
        </button>

        {message && (
          <p className="mt-4 text-sm text-red-600" role="status">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
