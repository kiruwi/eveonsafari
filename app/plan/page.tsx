import { Suspense } from "react";
import Link from "next/link";
import { PlanForm } from "./_components/PlanForm";

export default function PlanPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[0.45fr_0.55fr] md:px-6 lg:px-0">
        <div className="space-y-6">
          <header className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Plan Your Trip</p>
            <h1 className="text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl">
              Plan your Tanzania journey
            </h1>
            <p className="text-base text-[#231f20]/80">
              Five quick steps. Clear guidance. Response within 24 hours.
            </p>
          </header>

          <ul className="space-y-2 text-sm text-[#231f20]/80">
            <li>Local designer for safari and Kilimanjaro planning.</li>
            <li>Honest routing and lodge recommendations.</li>
            <li>No obligation. Quote before you commit.</li>
          </ul>

          <section className="space-y-3 rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">What happens next</p>
            <div className="space-y-2 text-sm text-[#231f20]/80">
              <p>1. We review your dates and interests.</p>
              <p>2. You get a tailored route with timing advice.</p>
              <p>3. We refine options with you by email or WhatsApp.</p>
            </div>
          </section>

          <section className="space-y-3 rounded-[28px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Trust markers</p>
            <div className="space-y-2 text-sm text-[#231f20]/80">
              <p>Licensed local guides and registered operator.</p>
              <p>Clear safety-first pacing on every trek.</p>
              <p>WhatsApp support for quick decisions.</p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Suspense
            fallback={
              <div className="rounded-[28px] border border-[#c3c3c3] bg-white p-8 text-sm text-[#231f20]/70 shadow-sm">
                Loading form...
              </div>
            }
          >
            <PlanForm />
          </Suspense>

          <section className="rounded-[28px] border border-[#c3c3c3] bg-white p-6 text-sm text-[#231f20]/80">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Prefer WhatsApp?</p>
            <p className="mt-3">
              Message <strong>+255 768 611 005</strong> with your travel window and we will schedule a call.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#c3c3c3] bg-white p-6 text-sm text-[#231f20]/80">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Need to reschedule?</p>
            <p className="mt-3">Sign in to update your existing request or adjust dates.</p>
            <Link
              href="/auth?next=/plan"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#231f20] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#3a3435]"
            >
              Sign in to manage my request
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
