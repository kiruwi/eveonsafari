import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Beach and Holiday in Africa",
  tagline: "Relax by the ocean after your safari adventure",
  summary:
    "After the excitement of a safari, Africa’s warm coastal waters offer the perfect place to unwind. Tanzania’s coast and islands combine white sandy beaches, rich marine life, and vibrant Swahili culture.",
  safariType: "Leisure safari",
  bestFor: "Kids, teens, and travelers of all ages",
  intro: [
    "After the excitement of a safari, Africa’s warm coastal waters offer the perfect place to unwind. Tanzania’s coast and islands are among East Africa’s best-kept secrets, combining white sandy beaches, rich marine life, and vibrant Swahili culture.",
    "From the spice-scented streets of Zanzibar to the coral reefs of Mafia Island and the quiet shores of Pangani, each destination offers its own charm, rhythm, and beauty.",
  ],
  reasons: [
    {
      title: "Tropical beaches with character",
      detail:
        "Powdery sands, swaying palms, and turquoise waters create an authentic, peaceful beach experience without the crowds.",
    },
    {
      title: "Easy safari combination",
      detail: "Seamless connections make it simple to go from savannah to sea in a single day.",
    },
    {
      title: "Variety of experiences",
      detail:
        "Snorkel, sail, swim with whale sharks, or slow down at a boutique beach lodge. There is something for every pace.",
    },
    {
      title: "Rich culture and history",
      detail: "Explore Swahili ports, spice farms, and stone-built towns shaped by centuries of trade.",
    },
  ],
  destinations: [
    {
      title: "Zanzibar Island",
      detail:
        "Beaches, coral reefs, and cultural charm. Pair Stone Town with the north and east coast. Highlights: Prison Island, Jozani Forest, dhow sailing, snorkeling at Mnemba Atoll.",
    },
    {
      title: "Mafia Island",
      detail:
        "Quiet, less-developed island with world-class snorkeling and diving in the Mafia Marine Park. Highlights: whale sharks (Oct–Feb), coral gardens, eco-lodges.",
    },
    {
      title: "Pangani & Tanga Coast",
      detail:
        "Remote and tranquil northern coastline for seclusion and Swahili coastal life. Highlights: mangrove walks, dhow fishing, historic Swahili settlements.",
    },
  ],
  addOns: [
    {
      title: "Snorkeling & scuba diving",
      detail: "Discover colorful coral reefs and marine life in protected waters.",
    },
    {
      title: "Spice tours & cultural visits",
      detail: "Explore local villages and spice farms for a deeper coastal story.",
    },
    {
      title: "Sunset dhow cruises",
      detail: "Sail the coastline at golden hour with ocean breezes and calm seas.",
    },
    {
      title: "Swahili cooking & beach picnics",
      detail: "Taste the coast through hands-on cooking and relaxed seaside meals.",
    },
    {
      title: "Kitesurfing & paddle boarding",
      detail: "Add a little adrenaline with wind and water on your side.",
    },
  ],
  tips: [
    "The best beach season is June to March, with dry weather and warm seas.",
    "Pack light, casual clothing and reef-safe sunscreen.",
    "Choose beach lodges that match your style, from luxury resorts to eco-retreats.",
    "Split time between Zanzibar’s culture and Mafia’s marine life for a richer experience.",
  ],
  cta:
    "Let the rhythm of the ocean, the charm of coastal culture, and the warmth of the sun complete your African holiday. Whether as a post-safari extension or a dedicated beach getaway, Tanzania’s coast and islands offer the ideal setting for rest, romance, and exploration.",
};

export default function BeachAndHolidayInAfricaPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/itenerary%20photos/zanzibar.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[520px] max-w-5xl flex-col gap-6 px-4 py-24 text-center md:px-6 lg:px-0">
          <p className="text-xs uppercase tracking-[0.4em] text-[#f5d9b0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            Travel style
          </p>
          <h1
            className="text-4xl font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            {content.tagline}
          </h1>
          <p className="mx-auto max-w-3xl text-base text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">{content.summary}</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            <span className="rounded-full border border-white/40 bg-black/20 px-4 py-2">Safari type: {content.safariType}</span>
            <span className="rounded-full border border-white/40 bg-black/20 px-4 py-2">Best for: {content.bestFor}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/plan"
              className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
            >
              Plan this trip
            </Link>
            <Link
              href="/experiences"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/15"
            >
              Explore experiences
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-6 md:px-6 lg:px-0">
        <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
          <div className="relative h-[320px] overflow-hidden rounded-[26px] border border-[#c3c3c3] bg-[#f8f5f2] shadow-sm">
            <Image
              src="/itenerary photos/zanzibar.webp"
              alt="Zanzibar beach in Tanzania"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 640px"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div className="grid gap-4">
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/beach/beach-2.jpg"
                alt="Coastal relaxation after safari"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/beach/beach-3.jpg"
                alt="Turquoise waters and white sand"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 lg:px-0">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Overview</p>
            <div className="space-y-3 rounded-[24px] border border-[#c3c3c3] bg-white p-6 text-base text-[#231f20]/85 shadow-sm">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Why choose this holiday</p>
            <div className="rounded-[24px] border border-[#c3c3c3] bg-[#f8f5f2] p-6 shadow-sm">
              <ul className="space-y-3 text-base text-[#231f20]/85">
                {content.reasons.map((reason) => (
                  <li key={reason.title} className="flex gap-3">
                    <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ba7e47]" />
                    <span>
                      <span className="font-semibold text-[#231f20]">{reason.title}.</span> {reason.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e5e0c8]/35 py-14">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-0">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Top beach destinations</p>
            <h2
              className="text-4xl font-semibold text-[#231f20] sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Tanzania coasts and islands to unwind
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={
                      idx === 0
                        ? "/itenerary photos/zanzibar.webp"
                        : idx === 1
                          ? "/travel-style/beach/beach-hero.jpg"
                          : "/travel-style/beach/beach-2.jpg"
                    }
                    alt={spot.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
                </div>
                <div className="p-5">
                  <p className="text-base font-semibold uppercase tracking-[0.08em] text-[#231f20]">{spot.title}</p>
                  <p className="mt-2 text-base text-[#231f20]/80">{spot.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 lg:px-0">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden rounded-[24px] border border-[#c3c3c3] bg-white shadow-sm">
            <div className="relative h-48 w-full">
              <Image
                src="/travel-style/beach/beach-hero.jpg"
                alt="Beach holiday in Tanzania"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Activities you can enjoy</p>
              <ul className="mt-3 space-y-3 text-base text-[#231f20]/85">
                {content.addOns.map((addon) => (
                  <li key={addon.title}>
                    <span className="font-semibold text-[#231f20]">{addon.title}.</span> {addon.detail}
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <article className="overflow-hidden rounded-[24px] border border-[#c3c3c3]/80 bg-[#f8f5f2] shadow-sm">
            <div className="relative h-48 w-full">
              <Image
                src="/itenerary photos/zanzibar.webp"
                alt="Ocean views on Zanzibar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Beach holiday tips</p>
              <ul className="mt-3 space-y-2 text-base text-[#231f20]/85">
                {content.tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span aria-hidden className="mt-1 inline-block h-1 w-1 rounded-full bg-[#ba7e47]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#0f0f0f] text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-14 text-center md:px-6 lg:px-0">
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready to unwind?</p>
          <h2
            className="text-4xl font-semibold sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your beach escape
          </h2>
          <p className="mx-auto max-w-3xl text-base text-white/85">{content.cta}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/plan"
              className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
            >
              Start planning
            </Link>
            <Link
              href="/experiences"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/15"
            >
              Explore experiences
            </Link>
          </div>
          <div className="mt-3 text-base text-white/80">
            <p className="font-semibold text-white">WhatsApp: +255 768 611 005</p>
            <p className="font-semibold text-white">Email: info@eveonsafari.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
