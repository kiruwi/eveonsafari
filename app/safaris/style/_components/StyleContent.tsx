import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const styleContent: Record<
  string,
  {
    label: string;
    summary: string;
    image: string;
    imageAlt: string;
    imageCaption: string;
    expectations: string[];
    planning: string[];
  }
> = {
  "classic-wildlife": {
    label: "Classic Wildlife",
    summary: "Traditional game-drive safaris across Tanzania's top parks with balanced pacing.",
    image: "/travel-style/big5/big5-hero.jpg",
    imageAlt: "Big Five safari wildlife",
    imageCaption: "Classic game drives",
    expectations: [
      "Best for: first-time safari travelers and wildlife lovers",
      "Focus: Big Five sightings and diverse landscapes",
      "Pace: steady drives with full or half-day game viewing",
    ],
    planning: [
      "Choose parks based on season and interests",
      "Private guide helps maximize sightings",
      "Ideal for 3 to 7 day trips",
    ],
  },
  "migration-safaris": {
    label: "Migration Safaris",
    summary: "Trips timed to follow the Great Migration across the Serengeti ecosystem.",
    image: "/travel-style/migration/migration-hero.jpg",
    imageAlt: "Great Migration herds in the Serengeti",
    imageCaption: "Great Migration season",
    expectations: [
      "Best for: travelers focused on herd movement and predator action",
      "Focus: river crossings, calving season, or corridor movement",
      "Pace: flexible routing based on wildlife location",
    ],
    planning: [
      "Travel timing is critical for best sightings",
      "Camp location changes through the year",
      "Ask for updates before confirming dates",
    ],
  },
  "cultural-safaris": {
    label: "Cultural Safaris",
    summary: "Blend wildlife viewing with community visits and conservation-focused experiences.",
    image: "/itenerary photos/safaris.webp",
    imageAlt: "Tanzania safari and cultural landscapes",
    imageCaption: "Culture and conservation",
    expectations: [
      "Best for: travelers who want culture alongside wildlife",
      "Focus: local communities, markets, and heritage sites",
      "Pace: more time in villages and less time driving",
    ],
    planning: [
      "Plan respectful, guided community visits",
      "Mix cultural days with classic park drives",
      "Ideal for travelers seeking context and connection",
    ],
  },
  "family-safaris": {
    label: "Family Safaris",
    summary: "Kid-friendly safaris with shorter drives and flexible daily schedules.",
    image: "/travel-style/family/family.webp",
    imageAlt: "Family-friendly safari moments",
    imageCaption: "Family-ready pacing",
    expectations: [
      "Best for: families with children or multi-generation groups",
      "Focus: easy game drives, comfort, and safety",
      "Pace: shorter drives with more breaks",
    ],
    planning: [
      "Choose lodges with family rooms and pools",
      "Schedule rest time between park days",
      "Private guides make pacing easier for kids",
    ],
  },
};

export const styleKeys = Object.keys(styleContent);

export default function SafariStyleContent({ styleKey }: { styleKey: string }) {
  const content = styleContent[styleKey];

  if (!content) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">By style</p>
          <h1
            className="text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Tanzania Safaris: {content.label}
          </h1>
          <p className="text-base text-[#231f20]/80">{content.summary}</p>
        </header>

        <figure className="overflow-hidden rounded-[28px] border border-[#c3c3c3] bg-white shadow-sm">
          <div className="relative h-56 w-full md:h-72">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 768px, (min-width: 640px) 100vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="px-5 py-3 text-xs uppercase tracking-[0.3em] text-[#231f20]/70">
            {content.imageCaption}
          </figcaption>
        </figure>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">What to expect</p>
            <ul className="mt-4 space-y-2 text-sm text-[#231f20]/80">
              {content.expectations.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#ba7e47]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Planning notes</p>
            <ul className="mt-4 space-y-2 text-sm text-[#231f20]/80">
              {content.planning.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#231f20]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-[24px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Next step</p>
          <p className="mt-3 text-base text-[#231f20]/80">
            Share your dates and priorities. We will recommend the best parks and timing.
          </p>
          <Link
            href="/plan"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#231f20] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#3a3435]"
          >
            Plan Your Trip
          </Link>
        </section>
      </div>
    </div>
  );
}
