'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { supabase } from '@/lib/supabaseClient';

type AuthState =
  | { status: 'loading' }
  | { status: 'signedOut' }
  | { status: 'signedIn'; email: string };

export function UserStatus() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState<AuthState>({ status: 'loading' });
  const [error, setError] = useState<string | null>(null);
  const nextPath = useMemo(() => {
    const query = searchParams?.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      const { data, error: authError } = await supabase.auth.getUser();
      if (!active) return;

      if (authError) {
        setError(authError.message);
        setState({ status: 'signedOut' });
        return;
      }

      if (data.user) {
        setState({ status: 'signedIn', email: data.user.email ?? 'Signed in' });
      } else {
        setState({ status: 'signedOut' });
      }
    };

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setState({
          status: 'signedIn',
          email: session?.user.email ?? 'Signed in',
        });
      } else if (event === 'SIGNED_OUT') {
        setState({ status: 'signedOut' });
      }
    });

    return () => {
      active = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError.message);
  };

  if (state.status === 'loading') {
    return (
      <div className="rounded-2xl bg-white px-4 py-3 text-sm text-[#231f20]/70 shadow-md">
        Checking auth status...
      </div>
    );
  }

  if (state.status === 'signedOut') {
    return (
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-md">
        <div>
          <p className="text-sm font-semibold text-[#231f20]">You are signed out</p>
          <p className="text-xs text-[#231f20]/70">Use Google to sign in or create an account.</p>
        </div>
        <a
          href={`/auth?next=${encodeURIComponent(nextPath)}`}
          className="rounded-full bg-[#ba7e47] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#8a592e]"
        >
          Sign in
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-md">
      <div>
        <p className="text-sm font-semibold text-[#231f20]">Signed in</p>
        <p className="text-xs text-[#231f20]/70">{state.email}</p>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-[#231f20] px-4 py-2 text-xs font-semibold text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
      >
        Sign out
      </button>
    </div>
  );
}
