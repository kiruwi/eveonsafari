import Image from "next/image";
import Link from "next/link";
import { PackageCheckoutSelector } from "@/components/PackageCheckoutSelector";
import { PackagePricing, safariPackagePricingUSD } from "@/lib/pricing";
import {
  destinationGroups,
  safariPackages,
  travelStyles,
  guides,
  kilimanjaroRoutes,
} from "@/lib/siteContent";

const customItineraryImages: Record<string, string> = {
  "2-day-ngorongoro-crater-adventure": "/photos/landing-page/elephants.webp",
  "3-day-manyara-ngorongoro-tarangire": "/photos/landing-page/ngorongoro.webp",
  "3-day-serengeti-escape": "/photos/landing-page/serengeti.webp",
  "4-day-nyerere-safari": "/photos/landing-page/nyerere.webp",
};

const itineraryDetailLinks: Record<string, string> = {
  "2-day-ngorongoro-crater-adventure": "/safaris/2-day-ngorongoro-crater-adventure",
  "3-day-manyara-ngorongoro-tarangire": "/safaris/3-day-manyara-ngorongoro-tarangire",
  "3-day-serengeti-escape": "/safaris/3-day-serengeti-escape",
  "4-day-nyerere-safari": "/safaris/4-day-nyerere-safari",
  "5-day-iconic-wildlife-adventure": "/safaris/5-day-iconic-wildlife-adventure",
  "6-day-best-northern-parks": "/safaris/6-day-best-northern-parks",
  "7-day-northern-highlights": "/safaris/7-day-northern-highlights",
  "8-day-migration-cultural-wonders": "/safaris/8-day-migration-cultural-wonders",
  "9-day-grand-tanzania": "/safaris/9-day-grand-tanzania",
  "10-day-best-of-tanzania": "/safaris/10-day-best-of-tanzania",
};

const featuredItineraries = safariPackages.slice(0, 4).map((trip) => ({
  ...trip,
  image: customItineraryImages[trip.slug],
  pricing: safariPackagePricingUSD[trip.slug],
}));

const checkoutPackages = safariPackages.map((pkg) => ({
  name: pkg.name,
  slug: pkg.slug,
}));

const stats = [
  { label: "Itineraries", value: safariPackages.length },
  { label: "Regions covered", value: destinationGroups.length },
  { label: "Planning guides", value: guides.length },
];

const heroCardWaveClip =
  "polygon(0 0, 100% 0, 100% calc(100% - 3px), 96% 100%, 90% calc(100% - 4px), 84% 100%, 78% calc(100% - 3px), 72% 100%, 66% calc(100% - 4px), 60% 100%, 54% calc(100% - 3px), 48% 100%, 42% calc(100% - 4px), 36% 100%, 30% calc(100% - 3px), 24% 100%, 18% calc(100% - 4px), 12% 100%, 6% calc(100% - 3px), 0 100%, 0 calc(100% - 3px))";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const getFromPrice = (pricing?: PackagePricing) => {
  if (!pricing) return "Price on request";
  const prices = [pricing.midrange, pricing.luxury].filter((p): p is number => typeof p === "number" && Number.isFinite(p) && p > 0);
  if (!prices.length) return "Price on request";
  const lowest = Math.min(...prices);
  return `From ${usdFormatter.format(lowest)} per person`;
};

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="relative isolate -mt-[156px] overflow-hidden bg-[#0f0f0f] text-white sm:-mt-[168px]">
        <Image
          src="/photos/landing-page/ngoro.webp"
          alt="Sunrise over the savannah with acacia trees"
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-[28vh] pb-24 md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-0">
          <div className="relative z-10 text-white text-center sm:text-left pt-6 sm:pt-8">
            {/* <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Tanzania Specialist</p> */}
            <h1 className="relative mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              <span
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[60%] text-5xl sm:text-6xl whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-gathenia, var(--font-title, inherit))",
                  color: "#ba7e47",
                  textTransform: "none",
                  letterSpacing: "0.01em",
                  fontWeight: 300,
                  zIndex: 0,
                }}
              >
                Your starting point
              </span>
              <span
                className="relative z-10 mt-6 block uppercase sm:mt-8"
                style={{ fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif" }}
              >
                FOR TANZANIA TRAVEL.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/85">
            Get clear, practical info to plan your trip. We offer travel packages plus simple guides on major parks, islands, places to stay, and tips that matter. You get direct answers on routes, activities, and what to expect. If it’s your first safari, you’ll find straightforward guidance to help you feel ready.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
              <Link
                href="/plan"
                className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
              >
                Start planning
              </Link>
              <Link
                href="/itineraries"
                className="rounded-full border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
              >
                View itineraries
              </Link>
            </div>
          </div>
          <div className="relative z-10 overflow-hidden p-8 text-[#231f20] shadow-xl">
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{
                  clipPath: heroCardWaveClip,
                  backgroundColor: "rgba(229, 224, 200, 0.25)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  clipPath: heroCardWaveClip,
                  backgroundColor: "rgba(229, 224, 200, 0.6)",
                }}
              />
            </div>
            {/* <p className="text-sm uppercase tracking-[0.3em] text-[#ba7e47]">Secure travel deposits</p> */}
            <h3 className="mt-0 text-2xl font-semibold uppercase text-white text-center">
              Let&apos;s get you started.
            </h3>
            {/* <p className="mt-3 text-sm text-[#231f20]/80">
              Select a safari itinerary, pick midrange or luxury, and set your guest count. 1–2 guests can pay directly; larger groups click “Plan a safari” for a custom link.
            </p> */}
            <div className="mt-6">
              <PackageCheckoutSelector packages={checkoutPackages} pricing={safariPackagePricingUSD} currency="USD" />
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

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 md:px-6 lg:px-0">
        {/* <section className="grid gap-6 md:grid-cols-2">
          {featuredSampleRoutes.map((route) => (
            <article
              key={route.title}
              className="rounded-[32px] border border-[#c3c3c3] bg-white p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">{route.title}</p>
              <p className="mt-2 text-sm text-[#231f20]/80">{route.description}</p>
              <Link href={route.href} className="mt-4 inline-flex text-sm font-semibold text-[#ba7e47]">
                Explore →
              </Link>
            </article>
          ))}
        </section> */}

        <section className="relative rounded-[0px] bg-[#e5e0c8]/50 p-8 shadow-sm lg:p-12">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-[-8px] h-8"
            style={{
              backgroundColor: "rgba(229, 224, 200, 0.6)",
              clipPath: heroCardWaveClip,
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-6 text-center text-[#231f20] sm:text-left sm:items-start items-center">
              <div className="space-y-4">
                {/* <p className="text-xs uppercase tracking-[0.4em] text-[#7A93A8]">Featured itineraries</p> */}
                <h2
                  className="text-4xl font-semibold uppercase tracking-[0.08em] text-[#231f20] sm:text-5xl"
                  style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
                >
                  Safari packages from our catalog
                </h2>
                <p className="text-base text-[#231f20]/80">
                  Explore most beautiful places in Tanzania for travel headquartered in passion to do things differently.
                </p>
              </div>
              <Link
                href="/itineraries"
                className="inline-flex w-fit items-center justify-center rounded-full bg-[#ba7e47] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#8a592e] sm:mx-0 mx-auto"
              >
                Explore more
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredItineraries.map((trip) => (
                <article
                  key={trip.slug}
                  className="relative flex h-[360px] flex-col justify-end overflow-hidden rounded-[32px] bg-cover bg-center p-6 text-white shadow-lg transition-transform hover:-translate-y-1"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%), url(${trip.image})`,
                  }}
                >
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">{trip.subcategory}</p>
                    <h3
                      className="text-2xl font-semibold uppercase tracking-[0.08em] text-white font-american-grunge"
                    >
                      {trip.name}
                    </h3>
                    <p className="text-sm text-white/80">{trip.highlights}</p>
                    <p className="text-sm font-semibold text-white">
                      {getFromPrice(trip.pricing)}
                    </p>
                  </div>
                  <Link
                    href={itineraryDetailLinks[trip.slug] ?? `/plan?package=${trip.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
                  >
                    Details →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 rounded-[32px] border border-[#c3c3c3] bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Kilimanjaro trek</p>
            {kilimanjaroRoutes.slice(0, 3).map((route) => (
              <article key={route.slug}>
                <h3 className="text-xl font-semibold text-[#231f20]">{route.name}</h3>
                <p className="mt-2 text-sm text-[#231f20]/80">{route.duration}</p>
                <Link href={`/trekking/${route.slug}`} className="mt-3 inline-block text-sm font-semibold text-[#ba7e47]">
                  Continue reading →
                </Link>
              </article>
            ))}
          </div>
          <div className="rounded-[32px] border border-[#c3c3c3] bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Popular travel styles</p>
            <div className="mt-6 space-y-4">
              {travelStyles.slice(0, 5).map((style) => (
                <article key={style.slug} className="border-b border-[#c3c3c3] pb-3 last:border-none">
                  <h3 className="text-xl font-semibold text-[#231f20]">{style.name}</h3>
                  <p className="mt-1 text-sm text-[#231f20]/70">{style.slug}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#c3c3c3] bg-white p-10 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">By the numbers</p>
          <div className="mt-6 grid gap-6 text-[#231f20] md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[24px] bg-[#c3c3c3]/30 p-6">
                <p className="text-4xl font-semibold">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#231f20]/80">
            Ready to dream up your route? Share your dates and bucket-list moments—we’ll reply with a
            proposal within 24 hours.
          </p>
          <Link
            href="/plan"
            className="mt-6 inline-flex rounded-full bg-[#ba7e47] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
          >
            Plan with Eve
          </Link>
        </section>
      </div>
    </div>
  );
}
