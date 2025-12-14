import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Africa Family Safaris",
  tagline: "Create unforgettable family memories on safari",
  summary:
    "Tanzania blends adventure, discovery, and connection with nature, culture, and each other. From the vast Serengeti to the wildlife-rich Ngorongoro Crater, every age group finds a highlight.",
  safariType: "Family-friendly adventure",
  bestFor: "Kids, teens, and multi-generational groups",
  intro: [
    "Tanzania offers one of the most exciting and educational family vacations in the world. From the Serengeti to the Ngorongoro Crater, a family safari blends adventure and discovery.",
    "Whether you are traveling with young children, teens, or a multi-generational group, Tanzania has something to offer every family member.",
  ],
  reasons: [
    {
      title: "Big Five wildlife encounters",
      detail: "Spot lions, elephants, giraffes, zebras, and more on guided game drives.",
    },
    {
      title: "Safe, family-friendly lodges",
      detail: "Handpicked camps with kid-ready menus, pools, and junior ranger activities.",
    },
    {
      title: "Flexible itineraries",
      detail: "Relaxed pacing with downtime and custom days tuned to your children&apos;s ages.",
    },
    {
      title: "Educational adventures",
      detail: "Learn ecosystems and animal behavior through storytelling and nature walks.",
    },
    {
      title: "Cultural experiences",
      detail: "Music, dance, and crafts with local communities to deepen understanding.",
    },
  ],
  destinations: [
    {
      title: "Serengeti National Park",
      detail: "Year-round wildlife and Great Migration drama; wide-open spaces for safe drives.",
    },
    {
      title: "Ngorongoro Crater",
      detail: "Compact, wildlife-rich caldera ideal for shorter game drives with kids.",
    },
    {
      title: "Tarangire National Park",
      detail: "Giant baobabs, elephant herds, and peaceful birding along river valleys.",
    },
    {
      title: "Lake Manyara National Park",
      detail: "Tree-climbing lions, flamingos, and treetop canopy walks for light adventure.",
    },
  ],
  addOns: [
    {
      title: "Zanzibar beach extension",
      detail: "Unwind on white sand, swim, snorkel, and explore Stone Town&apos;s history together.",
    },
    {
      title: "Canoeing and nature walks",
      detail: "Gentle outings at Lake Duluti or Lake Momella fit for young explorers.",
    },
    {
      title: "Maasai village visit",
      detail: "Meet Tanzania&apos;s iconic pastoralists to learn traditions and daily life.",
    },
  ],
  tips: [
    "Plan for shorter game drives with plenty of breaks.",
    "Choose lodges with kid-friendly facilities and flexible meals.",
    "Pack binoculars, wildlife books, and sketchpads for the kids.",
    "Bring layers for changing weather and strong sun protection.",
  ],
  cta:
    "Let us craft a personalized family safari designed for comfort, safety, and unforgettable moments. Whether it is your first safari or your fifth, Tanzania is the perfect place to bond and explore together.",
};

export default function AfricaFamilySafariPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/family/family.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[520px] max-w-5xl flex-col gap-6 px-4 py-24 text-center md:px-6 lg:px-0">
          <p className="text-xs uppercase tracking-[0.4em] text-[#f5d9b0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">Travel style</p>
          <h1
            className="text-4xl font-semibold sm:text-5xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
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
              src="/travel-style/family/family.webp"
              alt="Family on safari in Tanzania"
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
                src="/travel-style/family/family-2.webp"
                alt="Family watching elephants at a waterhole"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/family/family-3.webp"
                alt="Kids spotting wildlife from the vehicle"
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
            <div className="space-y-3 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm text-sm text-[#231f20]/85">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Why choose this safari</p>
            <div className="rounded-[24px] border border-[#c3c3c3] bg-[#f8f5f2] p-6 shadow-sm">
              <ul className="space-y-3 text-sm text-[#231f20]/85">
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Top family destinations</p>
            <h2
              className="text-3xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Tanzania routes kids and parents love
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={
                      idx === 0
                        ? "/travel-style/family/family-4.webp"
                        : idx === 1
                          ? "/travel-style/family/family-7.webp"
                          : idx === 2
                            ? "/travel-style/family/family-3.webp"
                            : "/travel-style/family/family-2.webp"
                    }
                    alt={spot.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#231f20]">{spot.title}</p>
                  <p className="mt-2 text-sm text-[#231f20]/80">{spot.detail}</p>
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
                src="/travel-style/family/family-6.webp"
                alt="Family on a Zanzibar beach extension"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Optional family add-ons</p>
              <ul className="mt-3 space-y-3 text-sm text-[#231f20]/85">
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
                src="/travel-style/family/family-7.webp"
                alt="Guided walking moment with family"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Family safari tips</p>
              <ul className="mt-3 space-y-2 text-sm text-[#231f20]/85">
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready to begin?</p>
          <h2
            className="text-3xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your family safari adventure
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
          <div className="mt-3 text-sm text-white/80">
            <p className="font-semibold text-white">WhatsApp: +255 768 611 005</p>
            <p className="font-semibold text-white">Email: info@eveonsafari.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
