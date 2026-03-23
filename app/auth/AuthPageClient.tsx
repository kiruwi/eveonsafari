'use client';

import { useState } from 'react';

import { getSupabaseClient } from '@/lib/supabaseClient';

const authNextKey = 'auth.next';

const getSafeNextPath = (raw: string | null, origin: string) => {
  if (!raw) return null;
  try {
    const url = new URL(raw, origin);
    if (url.origin !== origin) return null;
    return `${url.pathname}${url.search}${url.hash}` || '/';
  } catch {
    return null;
  }
};

const storeNextPath = (nextPath: string | null) => {
  try {
    if (nextPath) {
      window.sessionStorage.setItem(authNextKey, nextPath);
    } else {
      window.sessionStorage.removeItem(authNextKey);
    }
  } catch {
    // Ignore storage access failures.
  }
};

export default function AuthPageClient() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resolveAuthOrigin = () => {
    const rawCanonical = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
    if (typeof window === 'undefined') {
      return rawCanonical ?? null;
    }
    return window.location.origin;
  };

  const handleGoogle = async () => {
    setLoading(true);
    setMessage(null);
    const supabase = getSupabaseClient();

    const authOrigin = resolveAuthOrigin();
    if (!authOrigin) {
      setMessage('Redirecting to the correct site...');
      setLoading(false);
      return;
    }

    const nextParam = new URLSearchParams(window.location.search).get('next');
    const referrer = document.referrer || null;
    const nextPath = getSafeNextPath(nextParam ?? referrer, window.location.origin);
    storeNextPath(nextPath);

    const nextQuery = nextPath ? `?next=${encodeURIComponent(nextPath)}` : '';
    const redirectTo = `${authOrigin}/auth/callback${nextQuery}`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (!data?.url) {
      setMessage('Could not start Google sign-in. Please try again.');
      setLoading(false);
      return;
    }

    setMessage('Redirecting to Google...');
    window.location.assign(data.url);
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
