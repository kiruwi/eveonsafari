import { CheckoutButton } from "@/components/CheckoutButton";
import { PesapalCheckoutButton } from "@/components/PesapalCheckoutButton";
import { UserStatus } from "@/components/UserStatus";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-sm ring-1 ring-zinc-200">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Eve On Safari
            </p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-900">
              Starter playground
            </h1>
            <p className="mt-2 text-base text-zinc-600">
              Supabase auth plus Stripe and Pesapal checkouts are wired. Use the
              buttons below to try Google sign-in or start a test checkout
              session.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/auth"
              className="rounded-lg bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-500"
            >
              Sign in with Google
            </a>
            <CheckoutButton />
            <PesapalCheckoutButton />
            <a
              href="/api/supabase-test"
              className="rounded-lg border border-zinc-200 px-4 py-3 text-zinc-800 transition hover:bg-zinc-100"
            >
              Test Supabase Connection
            </a>
          </div>

          <UserStatus />
        </div>
      </main>
    </div>
  );
}
