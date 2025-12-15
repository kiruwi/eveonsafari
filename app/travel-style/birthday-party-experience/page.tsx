import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Birthday & Party Experience",
  tagline: "Celebrate life in the heart of the African wilderness",
  summary:
    "There’s no better place to mark a birthday, anniversary, or life milestone than in the wild beauty of Tanzania, crafted with private moments, surprise dining, and unforgettable experiences.",
  safariType: "Celebration safari",
  bestFor: "Kids, teens, and travelers of all ages",
  intro: [
    "There’s no better place to mark a birthday, anniversary, or life milestone than in the wild beauty of Tanzania. Whether it’s a romantic dinner beneath the stars, a surprise cake in the bush, or a private gathering at a scenic lodge, Tanzania offers the perfect setting for unforgettable celebrations.",
    "From the sweeping plains of the Serengeti to the tropical shores of Zanzibar, every moment can be crafted to make your special occasion truly one-of-a-kind.",
  ],
  reasons: [
    {
      title: "Private & personalized moments",
      detail:
        "Enjoy your special day in total privacy, surrounded by nature, with every detail tailored for a small family gathering or an intimate celebration for two.",
    },
    {
      title: "Surprise bush dining",
      detail:
        "Bush breakfasts, sundowner cocktails, or a private dinner under the stars, complete with lanterns, Maasai dance, and champagne.",
    },
    {
      title: "Luxury lodges & romantic hideaways",
      detail:
        "Handpicked camps that know how to celebrate: flower arrangements, custom cakes, massage treatments, and more.",
    },
    {
      title: "Activities designed for joy",
      detail: "From balloon flights over the Serengeti to a sunset dhow cruise in Zanzibar.",
    },
  ],
  destinations: [
    {
      title: "Serengeti National Park",
      detail:
        "Ideal for milestone birthdays or anniversaries. Add a hot air balloon flight, a luxury lodge stay, and a candlelit bush dinner with the soundtrack of the wild.",
    },
    {
      title: "Ngorongoro Crater",
      detail:
        "A dramatic, romantic setting for an intimate celebration. Pair it with a picnic on the crater floor or a surprise gift presentation on the rim.",
    },
    {
      title: "Zanzibar Island",
      detail:
        "Perfect for beach birthdays or post-safari celebrations, with white sands, Swahili hospitality, and sunset feasts with your toes in the sand.",
    },
    {
      title: "Tarangire & Lake Manyara",
      detail: "Smaller parks with peaceful lodges, great for families or couples celebrating away from the crowds.",
    },
  ],
  addOns: [
    {
      title: "Birthday or anniversary cakes & private dinners",
      detail: "Coordinate the perfect moment, whether it’s in camp, at a lodge, or under the stars.",
    },
    {
      title: "Sundowners with firepit and local music",
      detail: "Golden hour cocktails paired with warmth, stories, and Swahili rhythms.",
    },
    {
      title: "Personalized gifts and decorations",
      detail: "Flowers, notes, small surprises, and custom setup, by request.",
    },
    {
      title: "Massage and spa treatments",
      detail: "In-camp or lodge spa moments to slow down and savor the celebration.",
    },
    {
      title: "Private game drives or sunset boat rides",
      detail: "Make the day yours with privacy, flexibility, and upgraded experiences.",
    },
    {
      title: "Kids’ birthday surprises",
      detail: "Family-friendly celebrations with thoughtful touches for younger travelers.",
    },
  ],
  tips: [
    "Share the occasion details early so we can coordinate surprises and special touches.",
    "Consider a fly-in safari to reach remote luxury lodges with minimal travel time.",
    "Add a Zanzibar stay for a relaxed end to the celebration.",
    "Travel with close friends or family for a small group private safari.",
  ],
  cta:
    "Whether it’s a birthday, anniversary, honeymoon, proposal, or personal milestone, celebrating in Tanzania transforms a special day into a lifetime memory. Let us plan a celebration safari that’s as wild, warm, and unforgettable as the land itself.",
};

export default function BirthdayPartyExperiencePage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/birthday/birthday-hero.jpg')",
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
              src="/travel-style/birthday/birthday-hero.jpg"
              alt="Celebration safari in Tanzania"
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
                src="/travel-style/birthday/birthday-2.jpg"
                alt="Hot air balloon celebration moment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/birthday/birthday-3.jpg"
                alt="Champagne sundowner on safari"
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Why celebrate here</p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Celebration destinations</p>
            <h2
              className="text-3xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Places that make milestones feel legendary
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={
                      idx === 0
                        ? "/travel-style/birthday/birthday-2.jpg"
                        : idx === 1
                          ? "/travel-style/birthday/birthday-hero.jpg"
                          : idx === 2
                            ? "/itenerary photos/zanzibar.webp"
                            : "/travel-style/birthday/birthday-3.jpg"
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
                src="/travel-style/birthday/birthday-3.jpg"
                alt="Sundowner celebration in Tanzania"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">What can be arranged</p>
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
                src="/travel-style/birthday/birthday-2.jpg"
                alt="Celebration planning details"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Planning tips</p>
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready to celebrate?</p>
          <h2
            className="text-3xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your celebration safari
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
