import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Tanzania Big 5 Safari",
  tagline: "Track the legends of Africa on a classic wildlife adventure",
  summary:
    "Tanzania is one of the few destinations where you have a real chance of seeing lion, leopard, elephant, buffalo, and rhino in their natural habitats, paired with dramatic landscapes and expert guiding.",
  safariType: "Wildlife safari",
  bestFor: "First-timers and safari enthusiasts",
  intro: [
    "The term “Big Five” refers to Africa’s most iconic and sought-after wildlife: lion, leopard, elephant, buffalo, and rhino. Tanzania is one of the few destinations where you have a real chance of seeing all five in their natural habitats.",
    "A Big 5 safari in Tanzania offers thrilling game drives, dramatic landscapes, and unforgettable encounters with the continent’s most powerful creatures, making it perfect for first-time travelers and seasoned safari enthusiasts alike.",
  ],
  reasons: [
    {
      title: "High wildlife density",
      detail: "Protected parks and conservation areas support strong Big Five populations alongside thousands of other species.",
    },
    {
      title: "Diverse ecosystems",
      detail: "From crater floors and river valleys to open savannahs and acacia woodlands; each habitat brings new sightings.",
    },
    {
      title: "Year-round sightings",
      detail: "Big Five viewing is possible throughout the year, with each season offering different conditions and highlights.",
    },
    {
      title: "Expert local guides",
      detail: "Knowledgeable guides know where to look and how to create safe, exciting encounters.",
    },
  ],
  destinations: [
    {
      title: "Ngorongoro Crater",
      detail:
        "One of the best places in Africa to see the Big Five in a single day. A high concentration of lions, elephants, buffalos, and the elusive black rhino.",
    },
    {
      title: "Serengeti National Park",
      detail:
        "Famous for predators with abundant lions and leopards, plus elephants and buffalos. Rhinos are rare but may be seen in the north.",
    },
    {
      title: "Tarangire National Park",
      detail:
        "Known for large elephant herds and baobab landscapes. Lions and leopards are also commonly seen, especially in the dry season.",
    },
    {
      title: "Lake Manyara National Park",
      detail:
        "A compact park known for tree-climbing lions. Elephants, buffalos, and occasional leopards are also spotted here.",
    },
    {
      title: "Private & conservation areas",
      detail:
        "Some species are best found in lesser-visited areas or private reserves where sightings can be more exclusive and less crowded.",
    },
  ],
  addOns: [
    {
      title: "Great Migration experience",
      detail: "Combine Big Five viewing with the world’s largest land migration in the Serengeti (seasonal).",
    },
    {
      title: "Balloon safari",
      detail: "Float over the savannah at sunrise for a breathtaking perspective on wildlife and landscapes.",
    },
    {
      title: "Bush walks & night drives",
      detail: "In select areas, add walking safaris and nocturnal viewing for a different perspective and behavior.",
    },
  ],
  tips: [
    "Visit June–October for best visibility and wildlife concentration near water sources.",
    "Pack binoculars and a zoom lens for better sightings and photography.",
    "Combine multiple parks to increase your chances of seeing all five species.",
    "Stay 6–8 days to explore multiple habitats and maximize encounters.",
  ],
  cta:
    "A Big 5 safari in Tanzania is a journey into the wild heart of Africa. From close-up lion sightings to spotting a rhino on the horizon, every day brings powerful moments. Let us craft a safari that brings you face-to-face with Africa’s legendary wildlife in comfort and style.",
};

export default function TanzaniaBig5SafariPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/big5/big5-hero.jpg')",
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
              src="/travel-style/big5/big5-hero.jpg"
              alt="Lions in Tanzania on a Big Five safari"
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
                src="/travel-style/big5/big5-2.jpg"
                alt="Lions on a safari road in Tanzania"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/big5/big5-3.jpg"
                alt="Elephant sighting in Tarangire"
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Where to see the Big Five</p>
            <h2
              className="text-3xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Parks that deliver legendary sightings
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={idx % 3 === 0 ? "/travel-style/big5/big5-hero.jpg" : idx % 3 === 1 ? "/travel-style/big5/big5-2.jpg" : "/travel-style/big5/big5-3.jpg"}
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
                src="/travel-style/big5/big5-3.jpg"
                alt="Optional add-ons to enhance your Big Five safari"
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
                src="/travel-style/big5/big5-2.jpg"
                alt="Big Five safari planning tips"
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready for the Big Five?</p>
          <h2
            className="text-3xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your Tanzania Big 5 safari
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
