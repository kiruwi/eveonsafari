"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { UserStatus } from "@/components/UserStatus";

export default function PlanPage() {
  const searchParams = useSearchParams();
  const packageSlug = searchParams?.get("package")?.trim() || null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const getValue = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value.trim() : "";
    };

    const fullName = getValue("fullName");
    const email = getValue("email");
    const travelDates = getValue("travelDates");
    const groupSizeRaw = getValue("groupSize");
    const destinations = getValue("destinations");
    const wildlifeMoment = getValue("wildlifeMoment");
    const groupSize = groupSizeRaw ? Number.parseInt(groupSizeRaw, 10) : null;

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          travelDates,
          groupSize: Number.isNaN(groupSize) ? null : groupSize,
          destinations,
          wildlifeMoment,
          package: packageSlug,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setFeedback({
          type: "error",
          text: data?.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setFeedback({
        type: "success",
        text: "Thanks! We received your request and will respond within 24 hours.",
      });
    } catch (error) {
      console.error("Plan form submission failed:", error);
      setFeedback({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <form
          className="space-y-6 rounded-[28px] border border-[#c3c3c3] bg-white p-8 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#231f20]">
              Full Name
              <input
                type="text"
                name="fullName"
                required
                className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="Amara K."
                autoComplete="name"
              />
            </label>
            <label className="text-sm text-[#231f20]">
              Email
              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#231f20]">
              Ideal Travel Dates
              <input
                type="text"
                name="travelDates"
                className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="July 2025"
              />
            </label>
            <label className="text-sm text-[#231f20]">
              Group Size
              <input
                type="number"
                name="groupSize"
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
              name="destinations"
              className="mt-2 w-full rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
              placeholder="Mara, Samburu, Zanzibar, conservation volunteering"
            />
          </label>
          <label className="text-sm text-[#231f20]">
            Dream wildlife moment
            <textarea
              name="wildlifeMoment"
              rows={5}
              className="mt-2 w-full rounded-3xl border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
              placeholder="Witness the river crossings and spend a day with a cheetah researcher."
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
          >
            {isSubmitting ? "Submitting..." : "Submit request"}
          </button>
          {feedback && (
            <p
              className={`text-sm ${
                feedback.type === "error" ? "text-red-600" : "text-green-700"
              }`}
              role="status"
            >
              {feedback.text}
            </p>
          )}
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
