"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { buildAuthenticatedApiHeaders } from "@/lib/security/clientHeaders";

type FeedbackState = { type: "success" | "error"; text: string } | null;
type AuthStatus = "loading" | "signedOut" | "signedIn";

type StepKey = "travelDates" | "groupSize" | "interests" | "budgetRange" | "contact";

type StepConfig = {
  key: StepKey;
  label: string;
  title: string;
  helper: string;
};

const steps: StepConfig[] = [
  {
    key: "travelDates",
    label: "Travel dates",
    title: "When do you want to travel?",
    helper: "Pick a start and end date for your trip.",
  },
  {
    key: "groupSize",
    label: "Travellers",
    title: "How many travellers are in your group?",
    helper: "Total number including children.",
  },
  {
    key: "interests",
    label: "Interests",
    title: "What are you planning?",
    helper: "Pick one so we route you to the right team.",
  },
  {
    key: "budgetRange",
    label: "Budget",
    title: "Budget range (optional)",
    helper: "Share a range if you have one. You can skip this step.",
  },
  {
    key: "contact",
    label: "Contact",
    title: "Where should we reach you?",
    helper: "We reply within 24 hours with a clear plan.",
  },
];

const interestOptions = ["Safari", "Trekking", "Both"] as const;

const budgetOptions = [
  "Under $2,000 per person",
  "$2,000-$3,500 per person",
  "$3,500-$5,000 per person",
  "$5,000+ per person",
  "Not sure yet",
] as const;

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isBefore = (a: Date, b: Date) => startOfDay(a).getTime() < startOfDay(b).getTime();

const isAfter = (a: Date, b: Date) => startOfDay(a).getTime() > startOfDay(b).getTime();

const addMonths = (date: Date, amount: number) => new Date(date.getFullYear(), date.getMonth() + amount, 1);

const formatSingleDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);

const formatRange = (start: Date, end: Date) => `${formatSingleDate(start)} - ${formatSingleDate(end)}`;

const getMonthLabel = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);

export function PlanForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const packageSlug = searchParams?.get("package")?.trim() || null;
  const nextPath = useMemo(() => {
    const query = searchParams?.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    travelDates: "",
    groupSize: "",
    interests: "",
    budgetRange: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const [calendarMonth, setCalendarMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [today] = useState(() => startOfDay(new Date()));

  const totalSteps = steps.length;
  const isFinalStep = step === totalSteps - 1;
  const currentStep = steps[step];
  const isSignedIn = authStatus === "signedIn";
  const showSignInGate = authStatus === "signedOut";

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;

      if (error) {
        setAuthStatus("signedOut");
        setAuthEmail(null);
        return;
      }

      if (data.user) {
        setAuthStatus("signedIn");
        setAuthEmail(data.user.email ?? null);
        if (data.user.email) {
          setFormData((prev) => ({ ...prev, email: prev.email || data.user.email || "" }));
        }
      } else {
        setAuthStatus("signedOut");
        setAuthEmail(null);
      }
    };

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (session?.user) {
        setAuthStatus("signedIn");
        setAuthEmail(session.user.email ?? null);
        if (session.user.email) {
          setFormData((prev) => ({ ...prev, email: prev.email || session.user.email || "" }));
        }
      } else {
        setAuthStatus("signedOut");
        setAuthEmail(null);
      }
    });

    return () => {
      active = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (rangeStart && rangeEnd) {
      updateField("travelDates", formatRange(rangeStart, rangeEnd));
      return;
    }
    updateField("travelDates", "");
  }, [rangeStart, rangeEnd]);

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};

    if (currentStep.key === "travelDates" && (!rangeStart || !rangeEnd)) {
      nextErrors.travelDates = "Please select a start and end date.";
    }

    if (currentStep.key === "groupSize") {
      const groupValue = Number.parseInt(formData.groupSize, 10);
      if (!formData.groupSize.trim()) {
        nextErrors.groupSize = "Please enter a group size.";
      } else if (Number.isNaN(groupValue) || groupValue < 1) {
        nextErrors.groupSize = "Group size must be at least 1.";
      }
    }

    if (currentStep.key === "interests" && !formData.interests) {
      nextErrors.interests = "Select Safari, Trekking, or Both.";
    }

    if (currentStep.key === "contact") {
      if (!formData.fullName.trim()) {
        nextErrors.fullName = "Please enter your full name.";
      }
      const effectiveEmail = (isSignedIn && authEmail ? authEmail : formData.email).trim();
      if (!isValidEmail(effectiveEmail)) {
        nextErrors.email = "Enter a valid email address.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setFeedback(null);
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setFeedback(null);
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const clearDates = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoverDate(null);
  };

  const handleDayClick = (date: Date) => {
    if (isBefore(date, today)) return;

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
      return;
    }

    if (isBefore(date, rangeStart)) {
      setRangeStart(date);
      setRangeEnd(null);
      return;
    }

    setRangeEnd(date);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFinalStep) {
      handleNext();
      return;
    }

    if (!isSignedIn) {
      setFeedback({
        type: "error",
        text: "Please sign in before submitting your request.",
      });
      return;
    }

    if (!validateStep()) return;

    setIsSubmitting(true);
    setFeedback(null);

    const groupSizeParsed = Number.parseInt(formData.groupSize, 10);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: await buildAuthenticatedApiHeaders(),
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: (isSignedIn && authEmail ? authEmail : formData.email).trim(),
          phone: formData.phone.trim(),
          travelDates: formData.travelDates.trim(),
          groupSize: Number.isNaN(groupSizeParsed) ? null : groupSizeParsed,
          interests: formData.interests,
          budgetRange: formData.budgetRange,
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

      setFormData({
        travelDates: "",
        groupSize: "",
        interests: "",
        budgetRange: "",
        fullName: "",
        email: "",
        phone: "",
      });
      clearDates();
      setFeedback({
        type: "success",
        text: "Thanks! We received your request and will respond within 24 hours.",
      });
      setStep(0);
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

  const selectedRangeLabel = useMemo(() => {
    if (rangeStart && rangeEnd) return formatRange(rangeStart, rangeEnd);
    if (rangeStart) return `${formatSingleDate(rangeStart)} - Select end date`;
    return "Select start and end dates";
  }, [rangeStart, rangeEnd]);

  const renderMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const monthLabel = getMonthLabel(monthDate);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const dayButtons = Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1);
      const disabled = isBefore(date, today);
      const isStart = rangeStart ? isSameDay(date, rangeStart) : false;
      const isEnd = rangeEnd ? isSameDay(date, rangeEnd) : false;
      const inRange = Boolean(
        rangeStart && rangeEnd && isAfter(date, rangeStart) && isBefore(date, rangeEnd),
      );
      const inPreview = Boolean(
        rangeStart &&
          !rangeEnd &&
          hoverDate &&
          ((isAfter(date, rangeStart) && isBefore(date, hoverDate)) || isSameDay(date, hoverDate)),
      );

      const baseClasses = "flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition";
      const stateClasses = disabled
        ? "text-[#231f20]/30"
        : isStart || isEnd
          ? "bg-[#ba7e47] text-white"
          : inRange
            ? "bg-[#ba7e47]/15 text-[#231f20]"
            : inPreview
              ? "bg-[#ba7e47]/10 text-[#231f20]"
              : "text-[#231f20] hover:bg-[#ba7e47]/10";

      return (
        <button
          key={`${year}-${month}-${index + 1}`}
          type="button"
          onClick={() => handleDayClick(date)}
          onMouseEnter={() => setHoverDate(date)}
          disabled={disabled}
          aria-pressed={isStart || isEnd || inRange}
          className={`${baseClasses} ${stateClasses}`}
        >
          {index + 1}
        </button>
      );
    });

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#231f20]">{monthLabel}</p>
        </div>
        <div className="grid grid-cols-7 gap-1 text-[10px] uppercase tracking-[0.2em] text-[#231f20]/60">
          {weekDays.map((day) => (
            <span key={day} className="text-center">{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1" onMouseLeave={() => setHoverDate(null)}>
          {Array.from({ length: firstDayIndex }).map((_, index) => (
            <span key={`blank-${index}`} className="h-9 w-9" />
          ))}
          {dayButtons}
        </div>
      </div>
    );
  };

  return (
    <form
      className="space-y-6 rounded-[28px] border border-[#c3c3c3] bg-white p-8 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#231f20]/70">
          <span>Step {step + 1} of {totalSteps}</span>
          <span>{currentStep.label}</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#e7dfd4]">
          <div
            className="h-full rounded-full bg-[#ba7e47] transition-[width] duration-300"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h2
          className="text-2xl font-semibold text-[#231f20]"
          style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
        >
          {currentStep.title}
        </h2>
        <p className="text-sm text-[#231f20]/70">{currentStep.helper}</p>
        {packageSlug && (
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
            Package request: {packageSlug.replace(/-/g, " ")}
          </p>
        )}
      </div>

      {currentStep.key === "travelDates" && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px] border border-[#c3c3c3] bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#231f20]/60">Start date</p>
              <p className="mt-2 text-sm font-semibold text-[#231f20]">
                {rangeStart ? formatSingleDate(rangeStart) : "Select date"}
              </p>
            </div>
            <div className="rounded-[20px] border border-[#c3c3c3] bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#231f20]/60">End date</p>
              <p className="mt-2 text-sm font-semibold text-[#231f20]">
                {rangeEnd ? formatSingleDate(rangeEnd) : "Select date"}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#c3c3c3] bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#231f20]/60">Selected</p>
                <p className="text-sm font-semibold text-[#231f20]">{selectedRangeLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCalendarMonth((prev) => addMonths(prev, -1))}
                  aria-label="Previous month"
                  className="rounded-full border border-[#c3c3c3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#231f20] transition hover:border-[#231f20]"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarMonth((prev) => addMonths(prev, 1))}
                  aria-label="Next month"
                  className="rounded-full border border-[#c3c3c3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#231f20] transition hover:border-[#231f20]"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {renderMonth(calendarMonth)}
              {renderMonth(addMonths(calendarMonth, 1))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#231f20]/60">
              <span>Tap start date, then end date</span>
              <button
                type="button"
                onClick={clearDates}
                className="text-[#ba7e47] hover:text-[#8a592e]"
              >
                Clear dates
              </button>
            </div>
          </div>
          {errors.travelDates && (
            <p className="text-sm text-red-600">{errors.travelDates}</p>
          )}
        </div>
      )}

      {currentStep.key === "groupSize" && (
        <div className="space-y-2">
          <label className="text-sm text-[#231f20]">
            Number of travellers
            <input
              type="number"
              name="groupSize"
              value={formData.groupSize}
              onChange={(event) => updateField("groupSize", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
              placeholder="4"
              min={1}
            />
          </label>
          {errors.groupSize && (
            <p className="text-sm text-red-600">{errors.groupSize}</p>
          )}
        </div>
      )}

      {currentStep.key === "interests" && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {interestOptions.map((option) => {
              const isSelected = formData.interests === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("interests", option)}
                  aria-pressed={isSelected}
                  className={`rounded-full border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                    isSelected
                      ? "border-[#ba7e47] bg-[#ba7e47] text-white"
                      : "border-[#c3c3c3] text-[#231f20] hover:border-[#ba7e47]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {errors.interests && (
            <p className="text-sm text-red-600">{errors.interests}</p>
          )}
        </div>
      )}

      {currentStep.key === "budgetRange" && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {budgetOptions.map((option) => {
              const isSelected = formData.budgetRange === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField("budgetRange", option)}
                  aria-pressed={isSelected}
                  className={`rounded-[18px] border px-4 py-3 text-sm font-semibold transition ${
                    isSelected
                      ? "border-[#ba7e47] bg-[#ba7e47]/10 text-[#231f20]"
                      : "border-[#c3c3c3] text-[#231f20] hover:border-[#ba7e47]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => updateField("budgetRange", "")}
            className="text-xs uppercase tracking-[0.3em] text-[#231f20]/60"
          >
            Skip for now
          </button>
        </div>
      )}

      {currentStep.key === "contact" && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#231f20]">
              Full name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="Amara K."
                autoComplete="name"
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
              )}
            </label>
            <label className="text-sm text-[#231f20]">
              Email
              <input
                type="email"
                name="email"
                value={isSignedIn && authEmail ? authEmail : formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
                placeholder="you@example.com"
                autoComplete="email"
                readOnly={Boolean(isSignedIn && authEmail)}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </label>
          </div>
          <label className="text-sm text-[#231f20]">
            Phone / WhatsApp (optional)
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
              placeholder="+255 768 611 005"
              autoComplete="tel"
            />
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="rounded-full border border-[#c3c3c3] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#231f20] transition hover:border-[#231f20] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <div className="flex flex-wrap items-center gap-3">
          {showSignInGate && (
            <Link
              href={`/auth?next=${encodeURIComponent(nextPath)}`}
              className="rounded-full border border-[#231f20] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
            >
              Sign in to submit
            </Link>
          )}
          <button
            type="submit"
            disabled={isSubmitting || (isFinalStep && !isSignedIn)}
            className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#8a592e] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : isFinalStep ? "Send request" : "Continue"}
          </button>
        </div>
      </div>

      {feedback && (
        feedback.type === "error" ? (
          <p className="text-sm text-red-600" role="status">
            {feedback.text}
          </p>
        ) : null
      )}

      {feedback?.type === "success" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="plan-success-title"
        >
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 text-center shadow-xl">
            <p
              id="plan-success-title"
              className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]"
            >
              Request received
            </p>
            <h3
              className="mt-3 text-2xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Thanks! We received your request and will respond within 24 hours.
            </h3>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#8a592e]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
