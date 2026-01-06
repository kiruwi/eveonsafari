import Image from "next/image";
import Link from "next/link";
import { PackageCheckoutSelector } from "@/components/PackageCheckoutSelector";
import { ReviewCarousel } from "@/components/ReviewCarousel";
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
  // "4-day-nyerere-safari": "/photos/landing-page/nyerere.webp",
  "5-day-iconic-wildlife-adventure": "/itenerary%20photos/route/Iconic%20Wildlife.webp",
};

const itineraryDetailLinks: Record<string, string> = {
  "2-day-ngorongoro-crater-adventure": "/safaris/2-day-ngorongoro-crater-adventure",
  "3-day-manyara-ngorongoro-tarangire": "/safaris/3-day-manyara-ngorongoro-tarangire",
  "3-day-serengeti-escape": "/safaris/3-day-serengeti-escape",
  // "4-day-nyerere-safari": "/safaris/4-day-nyerere-safari",
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

const clientReviews = [
  {
    name: "Herbert",
    visited: "October 2025",
    rating: 5,
    countryName: "Tanzania",
    countryCode: "tz",
    quote:
      "I had an amazing experience on this tour. Our guide was friendly(Eve), knowledgeable, and made every stop enjoyable. The itinerary was well-planned, the transportation was comfortable, and we never felt rushed.",
  },
  {
    name: "JACKLINE",
    visited: "September 2025",
    rating: 5,
    countryName: "India",
    countryCode: "in",
    quote:
      "September was quite the month for me and my family mostly because we got to have a trip of a lifetime when we visited the Serengeti national park and The Ngorongoro crater. And all this would have been possible without Evaline and Kazee our tour guide.",
  },
  {
    name: "Ian",
    visited: "October 2025",
    rating: 5,
    countryName: "Kenya",
    countryCode: "ke",
    quote:
      "Our safari with Eve was an unforgettable experience. From the moment we arrived, she made us feel welcome and comfortable. Eve is knowledgeable about the wildlife and environment, and her passion for nature made every part of the trip engaging.",
  },
  {
    name: "Cedric",
    visited: "July 2025",
    rating: 5,
    countryName: "Kenya",
    countryCode: "ke",
    quote:
      "Being a tour operator and a tour leader as well, I was hoping to find the perfect company for me and my clients. Eve on Safari delivered beyond every aspect that my clients and I had expected.",
  },
  {
    name: "Bantu",
    visited: "June 2025",
    rating: 5,
    countryName: "United States",
    countryCode: "us",
    quote:
      "This tour exceeded my expectations in every aspect. The communication before and during the trip was efficient and informative, ensuring a wonderful experience. The service provided by the Eve and her team was exceptional — courteous, organized, and genuinely attentive to every my needs.",
  },
];

const heroCardWaveClip =
  "polygon(0 0, 100% 0, 100% calc(100% - 10px), 80% 100%, 60% calc(100% - 8px), 40% 100%, 20% calc(100% - 8px), 0 100%, 0 calc(100% - 10px))";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const travelStyleBadges: Record<
  string,
  { label: string; iconPath: string }
> = {
  "africa-family-safari": { label: "Family", iconPath: "M12 7a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 12 7Zm-6.5 5a2 2 0 1 0-2-2A2 2 0 0 0 5.5 12Zm13 0a2 2 0 1 0-2-2A2 2 0 0 0 18.5 12Zm-8.5 1a4 4 0 0 0-4 4v2h2v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2v-2a4 4 0 0 0-4-4Zm-7 2a3 3 0 0 0-3 3v1h2v-1a1 1 0 0 1 1-1h2v-2Zm17 0h-2v2h2a1 1 0 0 1 1 1v1h2v-1a3 3 0 0 0-3-3Z" },
  "fly-in-out-safari": { label: "Fly-in", iconPath: "M2 12l20-6-8 7 6 8-20-9 9-2z" },
  "tanzania-big-5-safari": { label: "Wildlife", iconPath: "M6 15.5c0 1.4 1.1 2.5 2.5 2.5h7c1.4 0 2.5-1.1 2.5-2.5S17.9 13 16.5 13h-7C7.1 13 6 14.1 6 15.5Zm-1.5-4a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 4.5 11.5Zm5-2.5a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 9.5 9Zm5 0a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 14.5 9Zm5 2.5a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5Z" },
  "honeymoon-safari": { label: "Honeymoon", iconPath: "M12 21s-7-4.5-9.5-8.2C.7 9.3 2.2 6 5.5 6c2 0 3.2 1.1 3.9 2.2C10.3 7.1 11.5 6 13.5 6c3.3 0 4.8 3.3 3 6.8C19 16.5 12 21 12 21z" },
  "mountain-gorilla-trekking": { label: "Trekking", iconPath: "M5 20l4-9 3 3 4-8 3 4v10H5Z" },
};

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
              We share clear, practical information to make planning feel straightforward. You'll find carefully built travel packages alongside simple guides to Tanzania's parks, islands, places to stay, and the details that shape the experience. We explain routes, activities, and daily pacing in plain terms, so you know what to expect before you arrive. If this is your first safari, we walk you through each step so you feel ready and comfortable with every choice.
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
              <Link href={route.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ba7e47]">
                Explore{" "}
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 -translate-y-px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7" />
                  <path d="M10 7h7v7" />
                </svg>
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
                    Details{" "}
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 -translate-y-px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M10 7h7v7" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 rounded-[32px] bg-white p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Kilimanjaro trek</p>
            {kilimanjaroRoutes.slice(0, 3).map((route) => (
              <Link
                key={route.slug}
                href={`/trekking/${route.slug}`}
                className="block rounded-[20px] border border-[#c3c3c3]/40 bg-[#f8f5f2]/60 p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#231f20]">{route.name}</h3>
                    <p className="mt-1 text-sm text-[#231f20]/75">{route.duration}</p>
                  </div>
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#ba7e47]/40 text-[#ba7e47]">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M10 7h7v7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
            <Link
              href="/trekking"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#8a592e]"
            >
              View all Kilimanjaro routes
            </Link>
          </div>
          <div className="rounded-[32px] bg-[#e5e0c8]/60 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Popular travel styles</p>
            <div className="mt-6 space-y-4">
              {travelStyles.slice(0, 3).map((style) => (
                <Link
                  key={style.slug}
                  href={`/travel-style/${style.slug}`}
                  className="block border-b border-[#c3c3c3]/40 pb-3 transition hover:text-[#ba7e47] last:border-none"
                >
                  <h3 className="text-xl font-semibold text-[#231f20]">{style.name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#ba7e47]">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#ba7e47]/40">
                      <svg
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d={travelStyleBadges[style.slug]?.iconPath ?? "M12 2l3 7h7l-5.5 4 2 7-6.5-4.3L5.5 20l2-7L2 9h7z"} />
                      </svg>
                    </span>
                    <span>{travelStyleBadges[style.slug]?.label ?? "Style"}</span>
                  </div>
                  {style.description && <p className="mt-2 text-[13px] text-[#231f20]/70">{style.description}</p>}
                </Link>
              ))}
            </div>
            <Link
              href="/experiences#TravelStyles"
              className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-[#ba7e47] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-[#ba7e47] transition hover:bg-[#ba7e47] hover:text-white"
            >
              View travel styles
            </Link>
          </div>
        </section>

        <section className="relative rounded-[32px] bg-[#e5e0c8]/60 p-10 shadow-md">
          <div
            className="pointer-events-none absolute inset-x-0 top-[-8px] h-8"
            style={{
              backgroundColor: "rgba(229, 224, 200, 0.6)",
              clipPath: heroCardWaveClip,
              transform: "scaleY(-1)",
              transformOrigin: "center",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">What our clients say</p>
              <h2
                className="mt-3 text-3xl font-semibold text-[#231f20] sm:text-4xl"
                style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
              >
                Guest reviews from{" "}
                <a
                  href="https://www.safaribookings.com/reviews/p7642"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center underline-offset-4 transition hover:underline"
                  aria-label="SafariBookings.com"
                >
                  <span className="rounded-full bg-[#a50a08] px-3 py-1">
                    <Image
                      src="/safaribookings-logo.png"
                      alt="SafariBookings.com logo"
                      width={173}
                      height={22}
                      className="h-5 w-auto"
                    />
                  </span>
                </a>
              </h2>
            </div>
            <div className="mt-8">
              <ReviewCarousel reviews={clientReviews} />
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-[#231f20]/80">
                Ready to dream up your route? Share your dates and bucket-list moments. We’ll reply with a proposal within 24 hours.
              </p>
              <Link
                href="/plan"
                className="mt-6 inline-flex rounded-full bg-[#8a592e] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#6b3b1f] hover:shadow-md"
              >
                Plan with Eve
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
