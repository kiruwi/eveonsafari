import Image from "next/image";
import Link from "next/link";
import { parkCards } from "./parksData";

export const metadata = {
  title: "National Parks | Eve On Safari",
  description: "Overview of Tanzania's national parks.",
};

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-white/80">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="hover:text-white" href="/">
            Home
          </Link>
        </li>
        <li className="text-white/50">/</li>
        <li>
          <Link className="hover:text-white" href="/discover-tanzania">
            Discover Tanzania
          </Link>
        </li>
        <li className="text-white/50">/</li>
        <li className="text-white">National Parks</li>
      </ol>
    </nav>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#ba7e47] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#ba7e47]/40 focus:ring-offset-2 focus:ring-offset-transparent"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent"
    >
      {children}
    </Link>
  );
}

function ParkCard({
  name,
  shortDescription,
  slug,
  displayImage,
  tag,
}: {
  name: string;
  shortDescription: string;
  slug: string;
  displayImage?: string;
  tag?: string;
}) {
  return (
    <Link
      href={`/discover-tanzania/national-parks/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e2d6c7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#ba7e47]/35"
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[#f5efe7]">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-[#231f20]/25 to-transparent" />

        {!displayImage ? (
          <span className="relative z-10 rounded-full border border-[#e2d6c7] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#231f20] backdrop-blur">
            Coming soon
          </span>
        ) : null}

        {tag ? (
          <div className="absolute left-4 top-4 rounded-full bg-[#231f20]/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {tag}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-lg font-semibold text-[#231f20]">{name}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#231f20]/75">
          {shortDescription}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#ba7e47]">
          <span>View park</span>
          <span className="transition group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </Link>
  );
}

export default function NationalParksPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[360px] sm:h-[420px]">
          <Image
            src="/images/discover/parks/hero.webp"
            alt="Tanzania landscape"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-white/0" />
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:pb-12">
              <Breadcrumbs />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#ffd7b0]">
                Discover Tanzania
              </p>
              <h1 className="mt-3 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
                Tanzania national parks
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/85">
                From iconic savannahs to volcanic highlands, these parks and regions showcase the
                best of Tanzania&apos;s wildlife and landscapes.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="/travel-styles">Explore Safari Ideas</PrimaryButton>
                <SecondaryButton href="/contact">Talk to a Safari Planner</SecondaryButton>
              </div>

              <p className="mt-6 text-sm text-white/70">
                {parkCards.length} parks & regions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-[#231f20] sm:text-3xl">
              Pick your starting point
            </h2>
            <p className="mt-3 text-sm text-[#231f20]/75">
              Browse parks and regions, then we’ll map the right route for your dates, budget, and pace.
            </p>
          </div>
          <Link
            href="/contact"
            className="hidden rounded-full border border-[#e2d6c7] px-5 py-3 text-sm font-semibold text-[#231f20] transition hover:bg-[#f7f1ea] sm:inline-flex"
          >
            Get itinerary help
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parkCards.map((park) => (
            <ParkCard key={park.slug} {...park} />
          ))}
        </div>

        {/* CTA STRIP */}
        <div className="mt-14 rounded-3xl border border-[#e2d6c7] bg-[#f7f1ea] p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold text-[#231f20]">
                Not sure which park fits your trip?
              </h3>
              <p className="mt-2 text-sm text-[#231f20]/75">
                Tell us your dates and what you want to see. We’ll suggest the best route and lodge mix.
              </p>
            </div>
            <PrimaryButton href="/contact">Get a Custom Itinerary</PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
}
