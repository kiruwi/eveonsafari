'use client';

import { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabaseClient';

type HeaderAuthStatusProps = {
  userBadgeClasses: string;
  signOutClasses: string;
  isLightNav: boolean;
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

const buildAvatarUrl = (user: User | null) => {
  if (!user) return null;
  return (
    user.user_metadata?.avatar_url ??
    user.user_metadata?.picture ??
    user.user_metadata?.avatarUrl ??
    null
  );
};

export function HeaderAuthStatus({
  userBadgeClasses,
  signOutClasses,
  isLightNav,
}: HeaderAuthStatusProps) {
  const [status, setStatus] = useState<'loading' | 'signedOut' | 'signedIn'>(
    'loading',
  );
  const [signedInUser, setSignedInUser] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;

    const applyUser = (user: User | null) => {
      if (!active) return;
      const label = buildLabel(user);
      const avatar = buildAvatarUrl(user);
      if (user) {
        setSignedInUser(label);
        setAvatarUrl(avatar);
        setStatus('signedIn');
      } else {
        setSignedInUser(null);
        setAvatarUrl(null);
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out failed:', error.message);
    }
    setIsOpen(false);
  };

  if (status !== 'signedIn') {
    return null;
  }

  const initial =
    signedInUser?.trim().charAt(0).toUpperCase() ??
    'U';
  const dropdownClasses = isLightNav
    ? 'border-[#231f20]/10 bg-white text-[#231f20]'
    : 'border-white/15 bg-[#231f20] text-white';

  return (
    <div ref={containerRef} className="relative flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${userBadgeClasses}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open account menu"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={signedInUser ?? 'Signed in user'}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold">{initial}</span>
        )}
      </button>
      {isOpen && (
        <div
          role="menu"
          className={`absolute right-0 top-full z-30 mt-2 w-40 rounded-xl border p-2 shadow-lg ${dropdownClasses}`}
        >
          <button
            type="button"
            onClick={handleSignOut}
            className={`w-full ${signOutClasses}`}
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
