'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabaseClient';

type AuthState =
  | { status: 'loading' }
  | { status: 'signedOut' }
  | { status: 'signedIn'; email: string };

export function UserStatus() {
  const [state, setState] = useState<AuthState>({ status: 'loading' });
  const [error, setError] = useState<string | null>(null);

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

    const {
      data: authListener,
      error: listenerError,
    } = supabase.auth.onAuthStateChange((event, session) => {
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

    if (listenerError) {
      setError(listenerError.message);
    }

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
      <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
        Checking auth status...
      </div>
    );
  }

  if (state.status === 'signedOut') {
    return (
      <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">You are signed out</p>
          <p className="text-xs text-zinc-600">Use Google to sign in or create an account.</p>
        </div>
        <a
          href="/auth"
          className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-500"
        >
          Sign in
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-zinc-900">Signed in</p>
        <p className="text-xs text-zinc-600">{state.email}</p>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 transition hover:bg-zinc-100"
      >
        Sign out
      </button>
    </div>
  );
}
