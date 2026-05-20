'use client';

import { useMemo } from 'react';
import { SignIn, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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

export default function AuthPageClient() {
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn, user } = useUser();
  const fallbackRedirectUrl = useMemo(() => {
    if (typeof window === 'undefined') return '/';
    return getSafeNextPath(searchParams?.get('next') ?? null, window.location.origin) ?? '/';
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      {isLoaded && isSignedIn ? (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-zinc-200">
          <div className="flex justify-center">
            <UserButton />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900">
            Signed in
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            {user?.primaryEmailAddress?.emailAddress ?? 'Your account is active.'}
          </p>
          <Link
            href={fallbackRedirectUrl}
            className="mt-6 inline-flex rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Continue
          </Link>
        </div>
      ) : (
        <SignIn
          fallbackRedirectUrl={fallbackRedirectUrl}
          signUpFallbackRedirectUrl={fallbackRedirectUrl}
        />
        )}
    </div>
  );
}
