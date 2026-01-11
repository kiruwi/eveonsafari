import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Tanzania Walking Safaris",
  tagline: "Discover the wilderness on foot, step by step",
  summary:
    "Walking safaris place you on the ground with the sights, sounds, and smells of nature all around you, tracking animals, reading the bush, and connecting to the land in a way game drives can’t match.",
  safariType: "Wilderness experience",
  bestFor: "Adventure seekers and nature lovers",
  intro: [
    "A walking safari in Tanzania offers a truly intimate way to experience the African bush. Unlike a traditional game drive, walking safaris place you on the ground with the sights, sounds, and smells of nature all around you.",
    "Led by expert guides and armed rangers, you’ll explore wild landscapes at a gentle pace, observing wildlife, tracking animals, and learning about the ecosystem from the ground up. It’s not just about the big animals. It’s about the small wonders and hidden stories too.",
  ],
  reasons: [
    {
      title: "A deeper connection with nature",
      detail: "Slow everything down: notice footprints in dust, listen to bird calls, and learn to read the bush like a storybook.",
    },
    {
      title: "See wildlife from a new perspective",
      detail:
        "Many animals can be approached on foot in a quiet, respectful way (predators and elephants are viewed from a safe distance), making encounters feel more personal.",
    },
    {
      title: "Expert-led, safety first",
      detail: "Walks are led by highly trained guides and armed rangers who ensure safety and share insights along the way.",
    },
    {
      title: "Perfect for active, curious travelers",
      detail: "Ideal for light-to-moderate activity and anyone who wants to go beyond the typical safari routine.",
    },
  ],
  destinations: [
    {
      title: "Nyerere National Park (formerly Selous)",
      detail:
        "One of East Africa’s top walking safari destinations, with open terrain and diverse habitats ideal for tracking giraffes, zebras, and elephants on foot.",
    },
    {
      title: "Ruaha National Park",
      detail:
        "Wild and less visited, with authentic walking experiences among ancient baobabs and along dry riverbeds where predators roam.",
    },
    {
      title: "Ngorongoro Highlands",
      detail:
        "Guided walks near Empakaai Crater and surrounding highlands bring dramatic views, birdlife, and Maasai cultural insights.",
    },
    {
      title: "Serengeti & private concessions",
      detail:
        "Select areas offer walking options focused on smaller wildlife, plants, and tracking techniques, often in private reserves.",
    },
  ],
  addOns: [
    {
      title: "Short guided walks (1–3 hours)",
      detail: "Perfect from a lodge or camp, typically early morning or late afternoon when wildlife is active and temperatures are cooler.",
    },
    {
      title: "Multi-day walking safaris",
      detail: "Move between mobile camps for deeper immersion into remote areas and the thrill of camping in the bush.",
    },
    {
      title: "Tracking & bushcraft learning",
      detail: "Read tracks, dung, and signs; learn about trees, insects, birds, and traditional medicinal plants.",
    },
    {
      title: "Quiet, respectful wildlife encounters",
      detail: "Observe giraffes and antelope on their terms and experience Africa’s timeless rhythm on foot.",
    },
  ],
  tips: [
    "Wear comfortable walking shoes or boots and pack light layers for early mornings.",
    "Choose short walks if you prefer gentle activity; opt for multi-day treks for deeper wilderness immersion.",
    "Bring a small daypack with water, sun protection, and a camera (no large gear needed).",
    "Follow your guide’s instructions closely for safety and the best wildlife viewing.",
  ],
  cta:
    "A walking safari is one of the most authentic ways to experience the African wilderness: silent, respectful, and unforgettable. Whether you choose a short guided walk or a multi-day adventure, each step brings you closer to nature and the stories hidden in the land.",
};

export default function TanzaniaWalkingSafarisPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/walking/walking-hero.jpg')",
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
              src="/travel-style/walking/walking-hero.jpg"
              alt="Walking safari in Tanzania"
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
                src="/travel-style/walking/walking-2.jpg"
                alt="Walking with Maasai guides"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/walking/walking-3.jpg"
                alt="Discovering wildlife on foot"
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Why choose a walking safari</p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Best places to walk</p>
            <h2
              className="text-4xl font-semibold text-[#231f20] sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Tanzania destinations for walking safaris
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={idx % 3 === 0 ? "/travel-style/walking/walking-hero.jpg" : idx % 3 === 1 ? "/travel-style/walking/walking-2.jpg" : "/travel-style/walking/walking-3.jpg"}
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
                src="/travel-style/walking/walking-3.jpg"
                alt="Types of walking safaris"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Types & highlights</p>
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
                src="/travel-style/walking/walking-2.jpg"
                alt="Walking safari tips"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Walking tips</p>
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready to explore?</p>
          <h2
            className="text-4xl font-semibold sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your walking safari
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
