import Image from "next/image";
import Link from "next/link";
import { PesapalCheckoutButton } from "@/components/PesapalCheckoutButton";
import { PackagePricing } from "@/lib/pricing";

type ItineraryDay = {
  title: string;
  bullets: string[];
};

type SeasonalGuidance = {
  bestTime: string;
  shoulderMonths: string;
  weatherNotes: string;
};

type TrustSignals = {
  reviewQuote: string;
  reviewName: string;
  reviewSource: string;
  licensingNote: string;
};

type SafariPackageTemplateProps = {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    imageAlt: string;
    keyParks: string[];
  };
  summary: {
    duration: string;
    durationHref?: string;
    safariStyle: string;
    safariStyleHref?: string;
    bestFor: string;
    bestMonths: string;
    groupSize: string;
    accommodation: string;
  };
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  seasonalGuidance: SeasonalGuidance;
  trust: TrustSignals;
  packageSlug: string;
  packageName: string;
  pricing?: PackagePricing;
};

const formatPrice = (pricing?: PackagePricing) => {
  const values = [pricing?.midrange, pricing?.luxury].filter(
    (value): value is number => typeof value === "number" && Number.isFinite(value) && value > 0,
  );
  if (!values.length) return "Price on request";
  const lowest = Math.min(...values);
  return `From ${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(lowest)} per person`;
};

const renderSummaryValue = (
  value: string,
  href?: string,
  variant: "light" | "dark" = "light",
) => {
  if (!href) return value;
  const linkClasses =
    variant === "light"
      ? "text-white underline underline-offset-4 decoration-white/50 hover:decoration-white"
      : "text-[#231f20] underline underline-offset-4 decoration-[#231f20]/40 hover:decoration-[#231f20]";
  return (
    <Link href={href} className={linkClasses}>
      {value}
    </Link>
  );
};

export default function SafariPackageTemplate({
  hero,
  summary,
  itinerary,
  inclusions,
  exclusions,
  seasonalGuidance,
  trust,
  packageSlug,
  packageName,
  pricing,
}: SafariPackageTemplateProps) {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#0f0f0f] text-white">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-[28vh] md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-0">
          <div className="space-y-6 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">{hero.kicker}</p>
            <h1
              className="text-4xl font-semibold leading-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              {hero.title}
              <span className="mt-1 block font-normal">{hero.subtitle}</span>
            </h1>
            <p className="text-base text-white/85">{hero.description}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Key parks: {hero.keyParks.join(" · ")}
            </p>
          </div>
          <div className="rounded-[28px] bg-white/10 p-6 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Quick summary</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              <li><strong className="text-white">Duration:</strong> {renderSummaryValue(summary.duration, summary.durationHref)}</li>
              <li><strong className="text-white">Safari style:</strong> {renderSummaryValue(summary.safariStyle, summary.safariStyleHref)}</li>
              <li><strong className="text-white">Best for:</strong> {summary.bestFor}</li>
              <li><strong className="text-white">Best months:</strong> {summary.bestMonths}</li>
              <li><strong className="text-white">Group size:</strong> {summary.groupSize}</li>
              <li><strong className="text-white">Accommodation:</strong> {summary.accommodation}</li>
              <li><strong className="text-white">Pricing:</strong> {formatPrice(pricing)}</li>
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/plan?package=${packageSlug}`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
              >
                Request a Quote
              </Link>
              <Link
                href="#itinerary"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                View itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div
        className="h-8"
        style={{
          backgroundColor: "rgba(229, 224, 200, 0.6)",
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 18px), 78% 100%, 60% calc(100% - 12px), 42% 100%, 22% calc(100% - 14px), 0 calc(100% - 10px))",
          transform: "scaleX(-1)",
          transformOrigin: "center",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[0.38fr_0.62fr] lg:px-0">
        <aside className="space-y-5 lg:sticky lg:top-20 xl:top-[156px]">
          <div className="space-y-4 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Plan your trip</p>
            <h2
              className="text-2xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Lock in this itinerary
            </h2>
            <p className="text-base text-[#231f20]/80">
              {formatPrice(pricing)} · small party checkout below, larger groups via our planning form.
            </p>
            <div className="space-y-2 text-sm text-[#231f20]/80">
              <p>
                <strong className="text-[#231f20]">Duration:</strong>{" "}
                {renderSummaryValue(summary.duration, summary.durationHref, "dark")}
              </p>
              <p>
                <strong className="text-[#231f20]">Style:</strong>{" "}
                {renderSummaryValue(summary.safariStyle, summary.safariStyleHref, "dark")}
              </p>
              <p><strong className="text-[#231f20]">Contact:</strong> +255 768 611 005 · info@eveonsafari.com</p>
            </div>
            <Link
              href={`/plan?package=${packageSlug}`}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#231f20] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#3a3435]"
            >
              Request a Quote
            </Link>
          </div>

          <PesapalCheckoutButton
            packageName={packageName}
            packageSlug={packageSlug}
            pricing={pricing}
            currency="USD"
            defaultTier="midrange"
            defaultPax={1}
          />
        </aside>

        <main className="space-y-12">
          <section id="itinerary" className="space-y-6 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Itinerary</p>
            <h3
              className="text-2xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Day by day
            </h3>
            <div className="space-y-4">
              {itinerary.map((day) => (
                <article
                  key={day.title}
                  className="space-y-3 rounded-[18px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4 text-sm text-[#231f20]/85"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#ba7e47]">Safari day</p>
                    <h4 className="text-lg font-semibold text-[#231f20]">{day.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {day.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#ba7e47]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Includes</p>
              <ul className="space-y-2 text-sm text-[#231f20]/85">
                {inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#ba7e47]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Excludes</p>
              <ul className="space-y-2 text-sm text-[#231f20]/85">
                {exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#231f20]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-4 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Seasonal guidance</p>
            <div className="grid gap-3 text-sm text-[#231f20]/85 md:grid-cols-3">
              <div className="rounded-[16px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#ba7e47]">Best time</p>
                <p className="mt-2">{seasonalGuidance.bestTime}</p>
              </div>
              <div className="rounded-[16px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#ba7e47]">Shoulder months</p>
                <p className="mt-2">{seasonalGuidance.shoulderMonths}</p>
              </div>
              <div className="rounded-[16px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#ba7e47]">Weather notes</p>
                <p className="mt-2">{seasonalGuidance.weatherNotes}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Trust signals</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[18px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4 text-sm text-[#231f20]/85">
                <p className="text-xs uppercase tracking-[0.25em] text-[#ba7e47]">Review snippet</p>
                <p className="mt-2">&ldquo;{trust.reviewQuote}&rdquo;</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#231f20]/70">
                  {trust.reviewName} · {trust.reviewSource}
                </p>
              </div>
              <div className="rounded-[18px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4 text-sm text-[#231f20]/85">
                <p className="text-xs uppercase tracking-[0.25em] text-[#ba7e47]">Licensing</p>
                <p className="mt-2">{trust.licensingNote}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[#c3c3c3] bg-[#231f20] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Ready to move forward</p>
            <h3 className="mt-3 text-2xl font-semibold">Get a custom plan</h3>
            <p className="mt-3 text-sm text-white/80">
              Tell us your dates and priorities. We will tailor lodges, pacing, and logistics around your group.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/plan?package=${packageSlug}`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
              >
                Request a Quote
              </Link>
              <Link
                href={`/plan?package=${packageSlug}`}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                Customise This Safari
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
