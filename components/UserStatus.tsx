'use client';

import { useMemo } from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { usePathname, useSearchParams } from 'next/navigation';

export function UserStatus() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn, user } = useUser();

  const nextPath = useMemo(() => {
    const query = searchParams?.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  if (!isLoaded) {
    return (
      <div className="rounded-2xl bg-white px-4 py-3 text-sm text-[#231f20]/70 shadow-md">
        Checking auth status...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-md">
        <div>
          <p className="text-sm font-semibold text-[#231f20]">You are signed out</p>
          <p className="text-xs text-[#231f20]/70">Sign in or create an account to continue.</p>
        </div>
        <div className="flex items-center gap-2">
          <SignInButton mode="modal" fallbackRedirectUrl={nextPath}>
            <button
              type="button"
              className="rounded-full border border-[#231f20] px-4 py-2 text-xs font-semibold text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal" fallbackRedirectUrl={nextPath}>
            <button
              type="button"
              className="rounded-full bg-[#ba7e47] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#8a592e]"
            >
              Sign up
            </button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress ?? 'Signed in';

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-md">
      <div>
        <p className="text-sm font-semibold text-[#231f20]">Signed in</p>
        <p className="text-xs text-[#231f20]/70">{email}</p>
      </div>
      <UserButton />
    </div>
  );
}
