import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Tanzania Bird Watching Safari",
  tagline: "Discover East Africa’s feathered wonders",
  summary:
    "With over 1,100 recorded bird species across savannahs, forests, and Rift Valley lakes, Tanzania is a paradise for birders, whether you’re chasing lifers or simply enjoying the songs of the bush.",
  safariType: "Special interest safari",
  bestFor: "Beginners, photographers, and experienced birders",
  intro: [
    "Tanzania is a paradise for bird watchers. With over 1,100 recorded bird species, including both residents and migratory visitors, the country offers endless opportunities to observe and photograph birds in some of Africa’s most scenic habitats.",
    "From open savannahs to forested mountains and Rift Valley lakes, every region holds its own avian treasures. Your birding safari can be customized to your pace, interests, and preferred regions.",
  ],
  reasons: [
    {
      title: "Exceptional species diversity",
      detail:
        "A wide range of habitats supports unique birdlife, from bee-eaters and barbets to flamingos and fish eagles.",
    },
    {
      title: "Year-round birding",
      detail:
        "Excellent all year, with peak birdwatching during the green season (Nov–Apr) when migratory species arrive and many resident birds show breeding plumage.",
    },
    {
      title: "Expert local guides",
      detail:
        "Guides trained to identify birds by sight and sound help you get the best sightings, behavior notes, and photo opportunities.",
    },
    {
      title: "Combine with big game",
      detail: "Enjoy world-class birds alongside iconic mammals in one seamless itinerary.",
    },
  ],
  destinations: [
    {
      title: "Lake Manyara National Park",
      detail:
        "A true birding hotspot with 400+ species. Look for flamingos, pelicans, spoonbills, hornbills, and the silvery-cheeked hornbill in the forest zone.",
    },
    {
      title: "Tarangire National Park",
      detail:
        "Dry savannah birds and wetland species in one park, often with yellow-collared lovebirds, red-and-yellow barbets, and big flocks of queleas.",
    },
    {
      title: "Serengeti National Park",
      detail:
        "Open grassland species like kori bustards, secretary birds, and ostriches, plus abundant raptors across the plains.",
    },
    {
      title: "Ngorongoro Crater",
      detail:
        "A mix of waterbirds and highland species. Watch for crowned cranes, augur buzzards, and Hildebrandt’s spurfowl.",
    },
    {
      title: "Usambara Mountains",
      detail:
        "Montane forests with endemics such as the Usambara weaver and Usambara akalat, ideal for a focused forest birding extension.",
    },
    {
      title: "Lake Natron",
      detail:
        "Famous for huge flocks of lesser flamingos, with plenty of shorebirds and other water-associated species.",
    },
  ],
  addOns: [
    {
      title: "Private or small-group birding vehicle",
      detail: "Quiet, flexible safari time designed around light, behavior, and bird activity.",
    },
    {
      title: "Knowledgeable birding guide",
      detail: "Identification by sight and sound, plus habitat strategy for target species.",
    },
    {
      title: "Flexible timing for bird walks",
      detail: "Early mornings and late afternoons for peak movement and better photography.",
    },
    {
      title: "Bird checklist and field guides",
      detail: "Checklists and references available on request for the regions you visit.",
    },
    {
      title: "Binoculars and spotting scopes",
      detail: "Available in select vehicles or lodges; bring your own for best comfort.",
    },
  ],
  tips: [
    "Bring your own binoculars and field guide for best results.",
    "Wear earth-toned, lightweight clothing and a hat for sun protection.",
    "Keep a birding journal or checklist to track sightings.",
    "Travel Nov–Apr for migratory species and breeding behavior.",
  ],
  cta:
    "Whether you’re targeting specific lifers, photographing colorful species, or simply enjoying the songs of the bush, a Tanzania bird watching safari is an enriching way to connect with nature. Let us craft a personalized itinerary with the right habitats, guides, and pace for your birding goals.",
};

export default function TanzaniaBirdWatchingSafariPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/bird/bird-hero.jpg')",
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
              src="/travel-style/bird/bird-hero.jpg"
              alt="Bird watching safari in Tanzania"
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
                src="/travel-style/bird/bird-2.webp"
                alt="Birding guide spotting birds"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/bird/bird-3.webp"
                alt="Birdwatching in Tanzania"
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Top birding destinations</p>
            <h2
              className="text-3xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Habitats that deliver incredible sightings
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={idx % 3 === 0 ? "/travel-style/bird/bird-hero.jpg" : idx % 3 === 1 ? "/travel-style/bird/bird-2.webp" : "/travel-style/bird/bird-3.webp"}
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
                src="/travel-style/bird/bird-2.webp"
                alt="Birding safari inclusions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">What’s included</p>
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
                src="/travel-style/bird/bird-3.webp"
                alt="Bird watching tips"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Birding tips</p>
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#f5d9b0]">Ready to go birding?</p>
          <h2
            className="text-3xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your bird watching safari
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
