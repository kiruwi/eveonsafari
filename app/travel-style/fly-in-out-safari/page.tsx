import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Fly-In/Out Safari",
  tagline: "Explore Tanzania’s wild beauty with ease and style",
  summary:
    "Swap long road transfers for short scenic flights between parks. Spend more time on game drives and reach remote wilderness areas in comfort.",
  safariType: "Fly-in/out adventure",
  bestFor: "Time-conscious travelers and comfort seekers",
  intro: [
    "Tanzania’s fly-in/out safari experience offers an exceptional way to access the country’s most remote and wildlife-rich parks with comfort and efficiency. Instead of long hours on rough roads, you’ll take short flights between destinations, giving you more time in the wild and less time in transit.",
    "From the iconic Serengeti plains to the untouched southern reserves, a fly-in/out safari is perfect for travelers who want a seamless and immersive journey across Tanzania’s vast and varied landscapes.",
  ],
  reasons: [
    {
      title: "Quick access to remote parks",
      detail: "Reach Serengeti, Nyerere (Selous), Ruaha, and more in a fraction of the road travel time.",
    },
    {
      title: "Scenic aerial views",
      detail: "Enjoy panoramas of the Rift Valley, volcanic highlands, rivers, and endless savannahs from above.",
    },
    {
      title: "Comfort and convenience",
      detail: "Skip bumpy roads and long transfers, ideal when you value comfort or have limited days to explore.",
    },
    {
      title: "More time on game drives",
      detail: "Faster transfers mean more hours in the parks for wildlife encounters and photography.",
    },
    {
      title: "Flexible itinerary planning",
      detail: "Combine multiple circuits efficiently, with optional beach extensions or multi-park fly routes.",
    },
  ],
  destinations: [
    {
      title: "Serengeti National Park",
      detail:
        "Easily reached by scheduled or charter flights from Arusha or Zanzibar. Fly into different regions depending on the season and wildlife movement.",
    },
    {
      title: "Nyerere National Park (Selous)",
      detail:
        "Southern Tanzania wilderness best accessed by air, known for boat safaris, walking safaris, and remote game viewing.",
    },
    {
      title: "Ruaha National Park",
      detail: "Tanzania’s largest park with few crowds and dramatic scenery, ideal for a true sense of isolation and discovery.",
    },
    {
      title: "Katavi and Mahale Mountains",
      detail:
        "Rarely visited western parks: Katavi for raw big game, and Mahale for chimpanzee trekking along Lake Tanganyika.",
    },
  ],
  addOns: [
    {
      title: "Zanzibar beach stay",
      detail: "Fly straight to Zanzibar after safari for white-sand beaches, coral reefs, and Swahili culture.",
    },
    {
      title: "Northern Circuit add-ons",
      detail: "Add Tarangire, Lake Manyara, and Ngorongoro before flying onward to the Serengeti.",
    },
    {
      title: "Southern Circuit combinations",
      detail: "Pair Nyerere and Ruaha via air transfers for an off-the-beaten-path safari with excellent sightings.",
    },
  ],
  tips: [
    "Pack soft bags and keep to light aircraft luggage limits (often 15–20 kg).",
    "Book early in peak seasons to secure preferred flight routes and lodge availability.",
    "Consider private charters for maximum flexibility and direct park-to-park transfers.",
    "Add a rest day in Arusha or Zanzibar before starting your fly-in journey.",
  ],
  cta:
    "Experience Tanzania from above and on the ground. A fly-in/out safari is a comfortable, efficient, and breathtaking way to explore the country’s most incredible parks. Let us design a personalized itinerary that fits your schedule, style, and sense of adventure.",
};

export default function FlyInOutSafariPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/fly/fly-hero.jpg')",
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
              src="/travel-style/fly/fly-hero.jpg"
              alt="Fly-in safari airstrip transfer in Tanzania"
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
                src="/travel-style/fly/fly-2.jpg"
                alt="Safari vehicle ready after a flight transfer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/fly/fly-3.jpg"
                alt="Scenic aerial views on a fly-in safari"
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Why choose fly-in/out</p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Top fly-in destinations</p>
            <h2
              className="text-4xl font-semibold text-[#231f20] sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Remote parks made effortless
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={idx % 3 === 0 ? "/travel-style/fly/fly-hero.jpg" : idx % 3 === 1 ? "/travel-style/fly/fly-2.jpg" : "/travel-style/fly/fly-3.jpg"}
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
                src="/travel-style/fly/fly-3.jpg"
                alt="Optional safari extensions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Optional safari extensions</p>
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
                src="/travel-style/fly/fly-2.jpg"
                alt="Fly-in safari planning tips"
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready to fly?</p>
          <h2
            className="text-4xl font-semibold sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your fly-in/out safari
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
