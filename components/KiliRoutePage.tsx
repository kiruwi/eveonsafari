import Link from "next/link";
import Image from "next/image";

type DaySection = {
  title: string;
  description: string;
  highlights?: string[];
  image?: string;
};

type PriceRow = {
  label: string;
  values: string[];
};

type KiliRoutePageProps = {
  title: string;
  durationLabel: string;
  airport: string;
  heroImage: string;
  routeStyle: string;
  accommodation: string;
  difficulty: string;
  acclimatization: string;
  summary: string[];
  whyChoose: string[];
  days: DaySection[];
  pricingNote: string;
  priceColumns: string[];
  priceRows: PriceRow[];
  extraPricingNote?: string;
  inclusions: string[];
  exclusions: string[];
  assistance: string[];
  cancellation: string[];
};

function StatTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border border-white/30 bg-white/10 px-3 py-2 text-white">
      <p className="text-[11px] uppercase tracking-[0.2em] text-white/80">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function DayCard({ day, index }: { day: DaySection; index: number }) {
  const isEven = index % 2 === 0;
  const hasImage = day.image && !day.image.includes("unsplash.com");
  return (
    <article
      className={`grid items-center gap-6 border border-[#e0d7c4] bg-[#f7f3ea] px-6 py-5 md:grid-cols-[1fr_360px] ${
        isEven ? "" : "md:grid-flow-col-dense"
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#7c6137]">
          <span className="h-[1px] w-8 bg-[#7c6137]" aria-hidden />
          Day {index + 1}
        </div>
        <h3 className="text-xl font-semibold text-[#231f20]">{day.title}</h3>
        <p className="text-sm text-[#231f20]/80">{day.description}</p>
        {day.highlights && (
          <ul className="space-y-1 text-sm text-[#231f20]/80">
            {day.highlights.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        )}
      </div>
      <div
        className={`relative h-[220px] w-full overflow-hidden ${isEven ? "" : "md:order-first"}`}
      >
        {hasImage ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-black/15 to-black/0" />
            <Image
              src={day.image as string}
              alt={day.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 400px, 100vw"
              priority={index < 2}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-[#e5dccb] text-sm font-semibold text-[#7c6137]">
            Coming soon
          </div>
        )}
      </div>
    </article>
  );
}

export function KiliRoutePage(props: KiliRoutePageProps) {
  const {
    title,
    durationLabel,
    airport,
    heroImage,
    routeStyle,
    accommodation,
    difficulty,
    acclimatization,
    summary,
    whyChoose,
    days,
    pricingNote,
    priceColumns,
    priceRows,
    extraPricingNote,
    inclusions,
    exclusions,
    assistance,
    cancellation,
  } = props;

  return (
    <div className="bg-white">
      <section className="relative isolate -mt-[156px] pt-[156px] sm:-mt-[168px] sm:pt-[168px] overflow-hidden bg-[#0f0f0f] text-white">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-28 md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-0">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Kilimanjaro</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl font-american-grunge uppercase tracking-[0.05em]">
              {title}
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">{durationLabel}</p>
            <div className="space-y-3 text-sm text-white/85">
              {summary.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 border border-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#231f20]"
              >
                Plan this climb
              </Link>
              <a href="#itinerary" className="inline-flex items-center gap-2 bg-white/15 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/25">
                View itinerary
              </a>
            </div>
          </div>
          <div className="space-y-4 border border-white/20 bg-white/10 p-6 backdrop-blur">
            <div className="grid gap-3 md:grid-cols-2">
              <StatTag label="Route style" value={routeStyle} />
              <StatTag label="Accommodation" value={accommodation} />
              <StatTag label="Difficulty" value={difficulty} />
              <StatTag label="Acclimatization" value={acclimatization} />
            </div>
            <div className="space-y-2 text-sm text-white/90">
              <p className="font-semibold text-white">Start / End</p>
              <p>{airport}</p>
            </div>
            <div className="space-y-2 text-sm text-white/80">
              <p className="font-semibold text-white">Why this route</p>
              <ul className="space-y-1">
                {whyChoose.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-14 md:px-6 lg:px-0">
        <section id="itinerary" className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7c6137]">Day by day</p>
          <h2 className="text-3xl font-semibold text-[#231f20]">Safari outline</h2>
            <p className="text-sm text-[#231f20]/75">
              Follow the daily rhythm: early starts, steady climbs, acclimatization pauses, and summit night, all staged for altitude success.
            </p>
          </div>
          <div className="space-y-4">
            {days.map((day, idx) => (
              <DayCard key={day.title} day={day} index={idx} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#231f20]">Included</h3>
            <ul className="space-y-1 text-sm text-[#231f20]/80">
              {inclusions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#231f20]">Not included</h3>
            <ul className="space-y-1 text-sm text-[#231f20]/80">
              {exclusions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-[#231f20]">Transport & Assistance</h3>
          <ul className="space-y-1 text-sm text-[#231f20]/80">
            {assistance.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#7c6137]">Pricing</p>
              <h3 className="text-2xl font-semibold text-[#231f20]">Quotation (nett, USD)</h3>
            </div>
            <p className="text-sm text-[#231f20]/70">Ask for custom dates or private groups.</p>
          </div>
          <p className="text-sm text-[#231f20]/80">{pricingNote}</p>
          <div className="overflow-x-auto">
            <table className="min-w-[560px] border-collapse text-sm text-[#231f20]">
              <thead>
                <tr className="bg-[#f7f3ea] text-left">
                  <th className="border border-[#c3c3c3] px-3 py-2">Option</th>
                  {priceColumns.map((col) => (
                    <th key={col} className="border border-[#c3c3c3] px-3 py-2">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
                  <tr key={row.label}>
                    <td className="border border-[#c3c3c3] px-3 py-2 font-semibold">{row.label}</td>
                    {row.values.map((val, idx) => (
                      <td key={val + idx} className="border border-[#c3c3c3] px-3 py-2">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {extraPricingNote && <p className="text-sm text-[#231f20]/80">{extraPricingNote}</p>}
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-[#231f20]">Terms, cancellations, and notes</h3>
          <ul className="space-y-1 text-sm text-[#231f20]/80">
            {cancellation.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 border border-[#e0d7c4] bg-[#f7f3ea] px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#7c6137]">Ready to plan?</p>
            <p className="text-lg font-semibold text-[#231f20]">Share your dates and group size, and we&apos;ll confirm availability and final pricing.</p>
          </div>
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 border border-[#7c6137] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#7c6137] transition hover:bg-[#7c6137] hover:text-white"
          >
            Start planning
          </Link>
        </section>
      </div>
    </div>
  );
}
