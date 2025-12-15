import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "The Great Migration Safari",
  tagline: "Witness the greatest wildlife show on Earth",
  summary:
    "Over two million wildebeest, zebras, and gazelles surge across the Serengeti in search of fresh grazing, bringing thunderous hooves, epic river crossings, and big-cat drama to every season.",
  safariType: "Luxury safari",
  bestFor: "Wildlife enthusiasts and photographers",
  intro: [
    "The Great Migration is one of nature’s most awe-inspiring spectacles, a continuous movement of over two million wildebeest, zebras, and gazelles across the vast plains of the Serengeti in search of fresh grazing and water.",
    "This natural cycle of life, birth, survival, and peril unfolds every year in Tanzania. From calving season in the south to heart-stopping river crossings in the north, the migration is a must-see for any safari traveler.",
  ],
  reasons: [
    {
      title: "Year-round wildlife action",
      detail: "The herds move with the rains, but the migration is always happening somewhere in Tanzania, and each season brings different highlights.",
    },
    {
      title: "Iconic river crossings",
      detail: "Watch wildebeest and zebras brave crocodile-infested waters at the Grumeti and Mara Rivers.",
    },
    {
      title: "Predator encounters",
      detail: "High concentrations of lions, cheetahs, hyenas, and leopards shadow the herds for thrilling interactions.",
    },
    {
      title: "Scenic safari backdrop",
      detail: "Rolling Serengeti savannahs deliver sweeping views, glowing sunsets, and a true sense of wilderness.",
    },
  ],
  destinations: [
    {
      title: "January – March: Calving season (Southern Serengeti / Ndutu)",
      detail:
        "Thousands of calves are born daily on lush grasslands, attracting predators and delivering nonstop action and exceptional game viewing.",
    },
    {
      title: "April – May: Green season (Central Serengeti)",
      detail: "The herds drift north through central plains. Expect rain, fewer crowds, and beautiful light for photography.",
    },
    {
      title: "June – July: Grumeti crossings (Western Corridor)",
      detail: "Crossings begin at the Grumeti as dry season starts, with excellent weather and classic Serengeti scenery.",
    },
    {
      title: "August – October: Mara crossings (Northern Serengeti)",
      detail:
        "The most dramatic phase as herds risk the Mara River, with intense action, big predators, and unforgettable moments.",
    },
    {
      title: "November – December: Return south (Eastern & Southern Serengeti)",
      detail: "As rains return, the herds stream back south, with golden plains, long lines of animals, and the cycle beginning again.",
    },
  ],
  addOns: [
    {
      title: "Hot air balloon safari",
      detail: "Float over the herds at sunrise for a once-in-a-lifetime view of the Serengeti waking up.",
    },
    {
      title: "Fly-in safari",
      detail: "Save time with direct access to migration hotspots and stay closer to the action.",
    },
    {
      title: "Zanzibar beach extension",
      detail: "Unwind after the adventure with white-sand beaches and Swahili culture on the coast.",
    },
    {
      title: "Cultural visit with Maasai communities",
      detail: "Add a meaningful cultural layer with visits along migration routes (where available).",
    },
  ],
  tips: [
    "Book well in advance; migration season camps fill quickly.",
    "Combine two areas (e.g., Central + North) to follow the herds.",
    "Choose a knowledgeable guide who tracks herd movement and behavior.",
    "Bring binoculars and a zoom lens for unforgettable photography.",
  ],
  cta:
    "The Great Migration is more than a safari. It’s a once-in-a-lifetime journey through one of the world’s last great wildernesses. Let us help you plan the perfect migration safari in Tanzania, timed and tailored to put you in the heart of the action.",
};

export default function GreatMigrationSafariPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/migration/migration-hero.jpg')",
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
              src="/travel-style/migration/migration-hero.jpg"
              alt="The Great Migration in the Serengeti"
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
                src="/photos/landing-page/serengeti.webp"
                alt="Serengeti plains at sunset"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/migration/migration-3.jpg"
                alt="Zebras near a river crossing"
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
            <div className="space-y-3 rounded-[24px] border border-[#c3c3c3] bg-white p-6 text-sm text-[#231f20]/85 shadow-sm">
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Migration by season</p>
            <h2
              className="text-3xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Follow the herds across the Serengeti
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={
                      idx % 3 === 0
                        ? "/travel-style/migration/migration-hero.jpg"
                        : idx % 3 === 1
                          ? "/travel-style/migration/migration-2.jpg"
                          : "/travel-style/migration/migration-3.jpg"
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
                src="/travel-style/migration/migration-2.jpg"
                alt="Suggested add-ons for a Great Migration safari"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Suggested add-ons</p>
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
                src="/itenerary photos/route/Migration Safari.webp"
                alt="Migration safari route planning"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Migration tips</p>
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready to follow the herds?</p>
          <h2
            className="text-3xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your Great Migration safari
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
