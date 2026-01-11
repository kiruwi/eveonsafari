'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

type HeaderAuthStatusProps = {
  userBadgeClasses: string;
  userBadgeDetailClasses: string;
  signOutClasses: string;
};

const buildLabel = (user: User | null) => {
  if (!user) return null;
  return (
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email ??
    null
  );
};

const hasSupabaseSession = () => {
  if (typeof window === 'undefined') return false;
  try {
    return Object.keys(window.localStorage).some(
      (key) => key.startsWith('sb-') && key.endsWith('-auth-token'),
    );
  } catch {
    return false;
  }
};

export function HeaderAuthStatus({
  userBadgeClasses,
  userBadgeDetailClasses,
  signOutClasses,
}: HeaderAuthStatusProps) {
  const [status, setStatus] = useState<'loading' | 'signedOut' | 'signedIn'>(
    'loading',
  );
  const [signedInUser, setSignedInUser] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const applyUser = (user: User | null) => {
      if (!active) return;
      const label = buildLabel(user);
      if (user) {
        setSignedInUser(label);
        setStatus('signedIn');
      } else {
        setSignedInUser(null);
        setStatus('signedOut');
      }
    };

    const loadUser = async () => {
      if (!hasSupabaseSession()) {
        applyUser(null);
        return;
      }
      try {
        const { supabase } = await import('@/lib/supabaseClient');
        if (!active) return;
        const { data, error: authError } = await supabase.auth.getUser();
        if (!active) return;
        if (authError) {
          applyUser(null);
          return;
        }
        applyUser(data.user);
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (!active) return;
            applyUser(session?.user ?? null);
          },
        );
        authSubscription = authListener?.subscription ?? null;
      } catch {
        applyUser(null);
      }
    };

    loadUser();

    return () => {
      active = false;
      authSubscription?.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { supabase } = await import('@/lib/supabaseClient');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out failed:', error.message);
      }
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (status !== 'signedIn') {
    return null;
  }

  return (
    <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
      <div
        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-wide sm:px-4 sm:text-[11px] ${userBadgeClasses}`}
      >
        <span className="whitespace-nowrap">Signed in</span>
        {signedInUser && (
          <span
            className={`max-w-[120px] truncate font-normal normal-case tracking-normal sm:max-w-[160px] ${userBadgeDetailClasses}`}
          >
            {signedInUser}
          </span>
        )}
      </div>
      <button type="button" onClick={handleSignOut} className={signOutClasses}>
        Sign out
      </button>
    </div>
  );
}
