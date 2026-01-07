import { Suspense } from "react";
import { UserStatus } from "@/components/UserStatus";
import { PlanForm } from "./_components/PlanForm";

export default function PlanPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-0">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Plan a Safari</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl">
            Tell us about your dream journey
          </h1>
          <p className="mt-3 text-base text-[#231f20]/80">
            Complete the form and a designer will respond within 24 hours. Already working with us?
            Sign in below to access your proposal.
          </p>
        </header>

        <div className="rounded-[28px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-6">
          <Suspense
            fallback={
              <div className="rounded-2xl bg-white px-4 py-3 text-sm text-[#231f20]/70 shadow-md">
                Checking auth status...
              </div>
            }
          >
            <UserStatus />
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div className="rounded-[28px] border border-[#c3c3c3] bg-white p-8 text-sm text-[#231f20]/70 shadow-sm">
              Loading form...
            </div>
          }
        >
          <PlanForm />
        </Suspense>

        <section className="rounded-[28px] border border-[#c3c3c3] bg-white p-8 text-sm text-[#231f20]/80">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Prefer WhatsApp?</p>
          <p className="mt-3">
            Message <strong>+255 700 555 123</strong> with your travel window and we’ll schedule a video call.
          </p>
        </section>
      </div>
    </div>
  );
}
