"use client";

import { useState, type FormEvent } from "react";

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const nextEmail = email.trim();
    if (!isValidEmail(nextEmail)) {
      setError("Enter a valid email address.");
      setSubmitted(false);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: nextEmail, source: "trekking" }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setError(data.error || "Unable to subscribe right now.");
        setSubmitted(false);
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Unable to subscribe right now.");
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="scroll-mt-[140px] rounded-[32px] border border-white/12 bg-black/45 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-[#f5d9b0]">Newsletter</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">Get seasonal planning updates</h2>
      <p className="mt-2 text-sm text-white/75">
        Weather windows, trail notes, and conservation updates.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex max-w-xl flex-col gap-3 text-left sm:flex-row sm:items-end"
        noValidate
      >
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="text-sm font-semibold text-white">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSubmitted(false);
              if (error) {
                setError("");
              }
            }}
            placeholder="you@example.com"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "newsletter-error" : undefined}
            className="mt-2 w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
            autoComplete="email"
            required
          />
          {error ? (
            <p id="newsletter-error" className="mt-2 text-xs text-[#f5d9b0]">
              {error}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold text-white motion-safe:transition motion-reduce:transition-none hover:bg-[#8a592e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
        >
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
      </form>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-white/80">
        {submitted ? "Thanks! You are on the list." : null}
      </p>
    </section>
  );
}
