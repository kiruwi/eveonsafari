'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabaseClient';

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
      const { data, error: authError } = await supabase.auth.getUser();
      if (!active) return;
      if (authError) {
        setSignedInUser(null);
        setStatus('signedOut');
        return;
      }
      applyUser(data.user);
    };

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;
        applyUser(session?.user ?? null);
      },
    );

    return () => {
      active = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out failed:', error.message);
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
