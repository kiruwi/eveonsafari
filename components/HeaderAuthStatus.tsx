'use client';

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';

type HeaderAuthStatusProps = {
  userBadgeClasses: string;
  userBadgeDetailClasses: string;
  signInClasses: string;
  signUpClasses: string;
};

export function HeaderAuthStatus({
  userBadgeClasses,
  userBadgeDetailClasses,
  signInClasses,
  signUpClasses,
}: HeaderAuthStatusProps) {
  const { user } = useUser();
  const signedInUser =
    user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? null;

  return (
    <>
      <Show when="signed-out">
        <div className="hidden items-center gap-2 sm:flex">
          <SignInButton mode="modal">
            <button type="button" className={signInClasses}>
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button type="button" className={signUpClasses}>
              Sign up
            </button>
          </SignUpButton>
        </div>
      </Show>
      <Show when="signed-in">
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
          <UserButton />
        </div>
      </Show>
    </>
  );
}
