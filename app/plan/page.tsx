import type { Metadata } from "next";
import { Suspense } from "react";
import { PlanForm } from "./_components/PlanForm";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/plan", {
  title: "Plan Your Tanzania Trip | Eve On Safari",
  description:
    "Share your dates and travel goals to get a tailored Tanzania safari or Kilimanjaro itinerary from our local team.",
  alternates: {
    canonical: "/plan",
  },
});

export default function PlanPage() {
  return (
    <div className="bg-[#F2F0E4] text-[#2B2B2B]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <section className="space-y-8">
            <h1 className="text-4xl font-bold leading-[1.25] tracking-[0.04em] md:text-5xl">
              PLAN YOUR TANZANIA <br />
              JOURNEY
            </h1>

            <div className="max-w-[520px] space-y-4 text-sm leading-[1.6] text-[#3A3A3A]">
              <p>Five quick steps. Clear guidance. Response within 24 hours.</p>
              <p>Local designer for safari and Kilimanjaro planning.</p>
              <p>Honest routing and lodge recommendations.</p>
              <p>No obligation. Quote before you commit.</p>
            </div>

            <div className="space-y-6">
              <section className="rounded-xl border border-[#E6D8C6] bg-white p-8">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#B28A5A]">What happens next</p>
                <ol className="space-y-3 text-sm leading-[1.6] text-[#3A3A3A]">
                  <li>1. We review your dates and interests.</li>
                  <li>2. You get a tailored route with timing advice.</li>
                  <li>3. We refine options with you by email or WhatsApp.</li>
                </ol>
              </section>

              <section className="rounded-xl border border-[#E6D8C6] bg-white p-8">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#B28A5A]">Trust markers</p>
                <ul className="space-y-3 text-sm leading-[1.6] text-[#3A3A3A]">
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#E6D8C6] text-[10px]">
                      ✓
                    </span>
                    Licensed local guides and registered operator.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#E6D8C6] text-[10px]">
                      ✓
                    </span>
                    Clear safety-first pacing on every trek.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#E6D8C6] text-[10px]">
                      ✓
                    </span>
                    WhatsApp support for quick decisions.
                  </li>
                </ul>
              </section>
            </div>
          </section>

          <section className="lg:sticky lg:top-8">
            <Suspense
              fallback={
                <div className="rounded-xl border border-[#E6D8C6] bg-white p-8 text-sm text-[#3A3A3A]">
                  Loading form...
                </div>
              }
            >
              <PlanForm />
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  );
}
