'use client';

import { useEffect } from 'react';

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

export default function AuthCallbackPageClient() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextPath = getSafeNextPath(params.get('next'), window.location.origin);
    window.location.replace(nextPath || '/');
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-zinc-200">
        <p className="text-lg font-medium text-zinc-900">Redirecting...</p>
      </div>
    </div>
  );
}
