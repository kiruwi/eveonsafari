'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    const exchangeCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        setMessage('No auth code found in URL.');
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        setMessage(`Auth error: ${error.message}`);
        return;
      }

      setMessage('Signed in! Redirecting...');
      window.location.replace('/');
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
