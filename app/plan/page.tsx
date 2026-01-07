import { Suspense } from "react";
import { UserStatus } from "@/components/UserStatus";

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

        <form className="space-y-6 rounded-[28px] border border-[#c3c3c3] bg-white p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#231f20]">
              Full Name
              <input
                type="text"
                required
                className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="Amara K."
              />
            </label>
            <label className="text-sm text-[#231f20]">
              Email
              <input
                type="email"
                required
                className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#231f20]">
              Ideal Travel Dates
              <input
                type="text"
                className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="July 2025"
              />
            </label>
            <label className="text-sm text-[#231f20]">
              Group Size
              <input
                type="number"
                className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="4 travelers"
                min={1}
              />
            </label>
          </div>
          <label className="text-sm text-[#231f20]">
            Destinations & Interests
            <input
              type="text"
              className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
              placeholder="Mara, Samburu, Zanzibar, conservation volunteering"
            />
          </label>
          <label className="text-sm text-[#231f20]">
            Dream wildlife moment
            <textarea
              rows={5}
              className="mt-2 w-full rounded-3xl border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
              placeholder="Witness the river crossings and spend a day with a cheetah researcher."
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
          >
            Submit request
          </button>
        </form>

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
