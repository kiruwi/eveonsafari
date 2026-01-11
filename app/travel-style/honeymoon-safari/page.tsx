import Image from "next/image";
import Link from "next/link";

const content = {
  heroTitle: "Honeymoon Safari",
  tagline: "Begin your love story in the wild heart of Africa",
  summary:
    "From golden savannah sunsets to candlelit dinners under the stars, a honeymoon safari in Tanzania blends romance, adventure, and natural beauty in one magical journey.",
  safariType: "Luxury safari",
  bestFor: "Honeymooners and couples",
  intro: [
    "Tanzania is the perfect destination for couples seeking a unique and unforgettable honeymoon. From golden savannah sunsets to candlelit dinners under the stars, a honeymoon safari in Tanzania blends romance, adventure, and natural beauty in one magical journey.",
    "Whether it’s your first time in Africa or you’re returning to celebrate love, Tanzania offers the ideal setting for intimate moments, breathtaking experiences, and lifelong memories.",
  ],
  reasons: [
    {
      title: "Private and romantic lodges",
      detail:
        "Handpicked lodges and luxury tented camps with privacy, personal service, and honeymoon touches like private dinners and bubble baths with a view.",
    },
    {
      title: "Scenic game drives for two",
      detail: "Private or small-group guided drives across the Serengeti, Ngorongoro, and beyond, with just you and the wild.",
    },
    {
      title: "Breathtaking landscapes",
      detail: "Endless plains, crater floors, baobab forests, and palm-fringed coastlines make every day picture-perfect.",
    },
    {
      title: "Tailor-made experiences",
      detail: "Relaxation, adventure, or a little of both. Each day is crafted to your shared style and pace.",
    },
  ],
  destinations: [
    {
      title: "Serengeti National Park",
      detail:
        "Sweeping plains, big cats, and the Great Migration. Add champagne picnics and sunrise balloon flights for peak romance.",
    },
    {
      title: "Ngorongoro Crater",
      detail:
        "A natural amphitheater teeming with wildlife, with dramatic scenery and unique lodges perched on the crater rim.",
    },
    {
      title: "Tarangire National Park",
      detail:
        "A quieter park known for ancient baobabs and elephants, peaceful and picturesque for honeymooners who prefer fewer crowds.",
    },
    {
      title: "Lake Manyara National Park",
      detail: "Forests, flamingos, and tree-climbing lions, an easy, scenic addition to a relaxed honeymoon circuit.",
    },
  ],
  addOns: [
    {
      title: "Zanzibar island escape",
      detail:
        "End your safari with white sands, turquoise waters, and Swahili culture, perfect for snorkeling, sunset cruises, and unwinding together.",
    },
    {
      title: "Hot air balloon safari",
      detail: "Soar above the Serengeti at sunrise, then celebrate with a champagne breakfast in the bush.",
    },
    {
      title: "Spa & wellness experiences",
      detail:
        "Many safari lodges and beach resorts offer massage treatments and wellness programs, ideal to recharge after the wedding rush.",
    },
  ],
  tips: [
    "Travel June–October or January–February for ideal weather and wildlife.",
    "Book early to secure the most romantic rooms and private experiences.",
    "Pack lightweight clothing, comfortable shoes, and something special for evenings together.",
    "Tell your planner it’s your honeymoon for surprises and possible upgrades.",
  ],
  cta:
    "A honeymoon in Tanzania is more than a holiday. It’s a journey you’ll remember for a lifetime. From the wilderness to the coast, every moment is filled with wonder, romance, and the joy of beginning a new chapter together. Let us help you plan the perfect honeymoon safari that matches your dreams and creates memories to cherish forever.",
};

export default function HoneymoonSafariPage() {
  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/travel-style/honeymoon/honeymoon-hero.webp')",
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
              src="/travel-style/honeymoon/honeymoon-hero.webp"
              alt="Couple celebrating on a honeymoon safari"
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
                src="/travel-style/honeymoon/honeymoon-2.jpg"
                alt="Luxury honeymoon lodge on safari"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className="relative h-[150px] overflow-hidden rounded-[20px] border border-[#c3c3c3] bg-white shadow-sm">
              <Image
                src="/travel-style/honeymoon/honeymoon-3.jpg"
                alt="Romantic safari moment in Tanzania"
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Romantic destinations</p>
            <h2
              className="text-4xl font-semibold text-[#231f20] sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Places that set the mood for forever
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.destinations.map((spot, idx) => (
              <article key={spot.title} className="overflow-hidden rounded-[22px] bg-white shadow-md">
                <div className="relative h-40 w-full">
                  <Image
                    src={
                      idx === 0
                        ? "/travel-style/honeymoon/honeymoon-3.jpg"
                        : idx === 1
                          ? "/travel-style/honeymoon/honeymoon-2.jpg"
                          : idx === 2
                            ? "/travel-style/honeymoon/honeymoon-hero.webp"
                            : "/travel-style/honeymoon/honeymoon-3.jpg"
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
                src="/itenerary photos/zanzibar.webp"
                alt="Zanzibar island escape"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Optional honeymoon add-ons</p>
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
                src="/travel-style/honeymoon/honeymoon-2.jpg"
                alt="Honeymoon safari planning tips"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Honeymoon tips</p>
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
            className="text-4xl font-semibold sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Plan your honeymoon safari
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
