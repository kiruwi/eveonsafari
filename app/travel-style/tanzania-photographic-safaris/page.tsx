import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Tanzania Photographic Safaris",
  tagline: "Capture the wild like never before",
  summary:
    "From predators on the hunt to soft golden light over endless savannahs, Tanzania is one of the world’s most photogenic safari destinations, perfect for wildlife, landscape, and storytelling photography.",
  safariType: "Private safari",
  bestFor: "Wildlife photographers and creatives",
  intro: [
    "Tanzania is one of the most photogenic safari destinations in the world. From powerful predators on the hunt to soft golden light over endless savannahs, a photographic safari here offers unmatched opportunities to create truly extraordinary images.",
    "Whether you’re a seasoned wildlife photographer or simply traveling with a passion for photography, our tailored photographic safaris are designed to get you in the right place at the right time, with the right guidance and support.",
  ],
  reasons: [
    {
      title: "Iconic wildlife subjects",
      detail:
        "Photograph lions, elephants, leopards, cheetahs, giraffes, rhinos, and more. Serengeti, Ngorongoro, and Tarangire deliver variety and close encounters.",
    },
    {
      title: "Magical lighting and landscapes",
      detail:
        "Early-morning mist, golden hour, dramatic storms, and sweeping plains, ideal for both wide landscapes and tight portraits.",
    },
    {
      title: "Customized game drives",
      detail: "Flexible schedules, extended time at sightings, and vehicle positioning that prioritizes the best light and angles.",
    },
    {
      title: "Expert wildlife guides",
      detail:
        "Guides understand animal behavior and photography needs, anticipating action, approaching responsibly, and helping you maximize moments.",
    },
  ],
  destinations: [
    {
      title: "Serengeti National Park",
      detail:
        "Predator photography, the Great Migration, dramatic river crossings, and sweeping vistas. Different regions shine across the year.",
    },
    {
      title: "Ngorongoro Crater",
      detail:
        "Dense wildlife in a compact area, perfect for capturing multiple species in a single day against dramatic crater walls.",
    },
    {
      title: "Tarangire National Park",
      detail:
        "Elephant herds, ancient baobabs, and beautiful dry-season dust and light. Excellent for bird photography too.",
    },
    {
      title: "Lake Natron & the Rift Valley",
      detail: "Surreal landscapes and huge flamingo flocks, ideal for artistic, minimalist, and abstract compositions.",
    },
  ],
  addOns: [
    {
      title: "Hot air balloon safari",
      detail: "Aerial shots over the Serengeti at sunrise for dramatic light and patterns.",
    },
    {
      title: "Walking safaris",
      detail: "Close-up macro details, textures, tracks, and landscapes from ground level (select areas).",
    },
    {
      title: "Zanzibar extension",
      detail: "Cultural and coastal photography, including Stone Town streets, beaches, and Swahili life.",
    },
    {
      title: "Night drives",
      detail: "Nocturnal wildlife and unique behavior in select locations (where permitted).",
    },
  ],
  tips: [
    "Bring a DSLR/mirrorless body, a long zoom (200–600mm), and a wide-angle for landscapes.",
    "Pack extra batteries, memory cards, and a dust cover for your gear.",
    "Wear neutral clothing to blend into the surroundings.",
    "Back up photos daily and keep notes to document sightings and settings.",
  ],
  cta:
    "A photographic safari in Tanzania is more than a trip. It’s a creative journey through some of Africa’s most dramatic landscapes. Let us design a custom safari that matches your goals, experience level, and preferred subjects.",
};

export default function TanzaniaPhotographicSafarisPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/photo/photo-hero.jpg')",
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
              href="/activities"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/15"
            >
              Explore activities
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-6 md:px-6 lg:px-0">
        <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
          <div className="relative h-[320px] overflow-hidden rounded-[26px] border border-[#c3c3c3] bg-[#f8f5f2] shadow-sm">
            <Image
              src="/travel-style/photo/photo-hero.jpg"
              alt="Photographic safari in Tanzania"
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
                src="/travel-style/photo/photo-2.jpg"
                alt="Camera-ready safari moments"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/photo/photo-3.jpg"
                alt="Wildlife photography on safari"
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Best locations</p>
            <h2
              className="text-4xl font-semibold text-[#231f20] sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Tanzania hotspots for wildlife photography
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={
                      idx === 0
                        ? "/photos/landing-page/serengeti.webp"
                        : idx === 1
                          ? "/travel-style/big5/big5-hero.jpg"
                          : idx === 2
                            ? "/travel-style/big5/big5-3.jpg"
                            : "/travel-style/bird/bird-2.webp"
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
                src="/travel-style/photo/photo-2.jpg"
                alt="Optional add-ons for a photographic safari"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Optional add-ons</p>
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
                src="/travel-style/photo/photo-3.jpg"
                alt="Photography safari tips"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Photography tips</p>
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready to shoot?</p>
          <h2
            className="text-4xl font-semibold sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your photographic safari
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
              href="/activities"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/15"
            >
              Explore activities
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
