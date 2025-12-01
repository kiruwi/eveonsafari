import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-zinc-200">
        <h1 className="text-2xl font-bold text-amber-700">Payment canceled</h1>
        <p className="mt-3 text-zinc-600">
          Your payment was canceled. You can try again whenever you&apos;re ready.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex justify-center rounded-lg bg-black px-4 py-2 text-white transition hover:bg-zinc-800"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
