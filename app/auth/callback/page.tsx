'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabaseClient';

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

const readStoredNext = () => {
  try {
    return window.sessionStorage.getItem(authNextKey);
  } catch {
    return null;
  }
};

const clearStoredNext = () => {
  try {
    window.sessionStorage.removeItem(authNextKey);
  } catch {
    // Ignore storage access failures.
  }
};

export default function AuthCallbackPage() {
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    const exchangeCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get('error');
      const errorDescription = params.get('error_description');
      const code = params.get('code');
      const nextParam = params.get('next');
      const storedNext = readStoredNext();
      const nextPath = getSafeNextPath(
        nextParam ?? storedNext,
        window.location.origin,
      );

      if (errorParam) {
        clearStoredNext();
        const description = errorDescription
          ? errorDescription.replace(/\+/g, ' ')
          : null;
        setMessage(description ?? `Auth error: ${errorParam}`);
        return;
      }

      if (!code) {
        setMessage('No auth code found in URL.');
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        setMessage(`Auth error: ${error.message}`);
        return;
      }

      clearStoredNext();
      setMessage('Signed in! Redirecting...');
      window.location.replace(nextPath || '/');
    };

    exchangeCode();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-zinc-200">
        <p className="text-lg font-medium text-zinc-900">{message}</p>
      </div>
    </div>
  );
}
