import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const durationContent: Record<
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
  "2-days": {
    label: "2 Days",
    summary: "Short safari focused on one headline park. Best for quick add-ons or stopovers.",
    image: "/photos/landing-page/ngorongoro.webp",
    imageAlt: "Ngorongoro Crater landscape",
    imageCaption: "Ngorongoro Crater",
    expectations: [
      "Best for: tight schedules and first-time previews",
      "Pace: early starts and longer drive days",
      "Typical parks: Ngorongoro Crater or Tarangire",
    ],
    planning: [
      "Arrive the day before for a smooth start",
      "Private guide recommended for faster pacing",
      "Add a night if you want more time on game drives",
    ],
  },
  "3-days": {
    label: "3 Days",
    summary: "A compact loop that fits two to three parks with solid wildlife time.",
    image: "/photos/landing-page/serengeti.webp",
    imageAlt: "Serengeti plains at sunrise",
    imageCaption: "Serengeti plains",
    expectations: [
      "Best for: classic northern circuit highlights",
      "Pace: full days with limited downtime",
      "Typical parks: Manyara, Ngorongoro, Tarangire",
    ],
    planning: [
      "Choose parks based on season and wildlife focus",
      "Stay near the parks to reduce driving",
      "Ideal for pairing with Zanzibar afterward",
    ],
  },
  "4-days": {
    label: "4 Days",
    summary: "Balanced pace with room to add a second or third park without rushing.",
    image: "/photos/landing-page/elephants.webp",
    imageAlt: "Elephants crossing the savanna",
    imageCaption: "Elephant country",
    expectations: [
      "Best for: travelers who want variety with breathing room",
      "Pace: mix of travel and longer game drives",
      "Typical parks: Tarangire, Manyara, Ngorongoro",
    ],
    planning: [
      "Add a cultural visit if timing allows",
      "Split time between two regions for contrast",
      "Best value for short northern circuit safaris",
    ],
  },
  "5-days": {
    label: "5 Days",
    summary: "Classic safari length with enough time for deeper wildlife tracking.",
    image: "/itenerary photos/route/Iconic Wildlife.webp",
    imageAlt: "Iconic wildlife safari route map",
    imageCaption: "Iconic wildlife route",
    expectations: [
      "Best for: first-time safari travelers who want more depth",
      "Pace: relaxed mornings with longer park time",
      "Typical parks: Serengeti plus northern circuit",
    ],
    planning: [
      "Pick lodge locations that match your wildlife goals",
      "Ask for a mix of plains and crater landscapes",
      "Add a flight if you want to reduce driving",
    ],
  },
  "6-days": {
    label: "6 Days",
    summary: "Deeper safari with multiple game drive days and flexible routing.",
    image: "/itenerary photos/route/Best of Northern Park.webp",
    imageAlt: "Best of Northern Parks safari route map",
    imageCaption: "Best of Northern Parks",
    expectations: [
      "Best for: travelers who want more Serengeti time",
      "Pace: steady with room for slow wildlife tracking",
      "Typical parks: Serengeti, Ngorongoro, Tarangire",
    ],
    planning: [
      "Plan for at least two full Serengeti days",
      "Consider fly-in options to save road time",
      "Great length for photographers and families",
    ],
  },
  "7-days": {
    label: "7 Days",
    summary: "Full northern circuit with the flexibility to slow down or add culture.",
    image: "/itenerary photos/route/Northern Highights.webp",
    imageAlt: "Northern highlights safari route map",
    imageCaption: "Northern circuit highlights",
    expectations: [
      "Best for: travelers who want a complete safari story",
      "Pace: relaxed with room for optional activities",
      "Typical parks: Tarangire, Manyara, Serengeti, Ngorongoro",
    ],
    planning: [
      "Add a rest night mid-trip if needed",
      "Mix lodge styles for variety",
      "Ideal for couples and multi-generation groups",
    ],
  },
  "8-plus-days": {
    label: "8+ Days",
    summary: "Extended safari or safari plus beach with time for special interests.",
    image: "/itenerary photos/zanzibar.webp",
    imageAlt: "Zanzibar beach at sunset",
    imageCaption: "Safari + Zanzibar",
    expectations: [
      "Best for: slow travel and multi-park exploration",
      "Pace: flexible with longer stays per park",
      "Typical options: northern circuit plus Zanzibar",
    ],
    planning: [
      "Add conservation or cultural visits",
      "Split time between wildlife and coast",
      "Best for honeymooners and long-haul travelers",
    ],
  },
};

export const durationKeys = Object.keys(durationContent);

export default function SafariDurationContent({ durationKey }: { durationKey: string }) {
  const content = durationContent[durationKey];

  if (!content) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">By duration</p>
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
            Tell us your dates, group size, and interests. We will recommend the best routing and lodge plan.
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
