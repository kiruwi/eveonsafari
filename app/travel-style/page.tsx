import Image from "next/image";
import Link from "next/link";
import { travelStyles } from "@/lib/siteContent";

export const metadata = {
  title: "Travel Styles | Eve On Safari",
  description: "Browse safari travel styles to match your pace, interests, and comfort level.",
};

export default function TravelStylesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Travel styles</p>
          <h1
            className="text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Choose a style that fits your travel pace
          </h1>
          <p className="text-base text-[#231f20]/80">
            Compare safari styles, each designed around different parks, comfort levels, and interests.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {travelStyles.map((style) => (
            <Link
              key={style.slug}
              href={`/travel-style/${style.slug}`}
              className="group overflow-hidden rounded-[24px] border border-[#c3c3c3] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={style.imageSrc}
                  alt={style.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Travel style</p>
                <h2 className="text-xl font-semibold text-[#231f20]">{style.name}</h2>
                <p className="text-sm text-[#231f20]/75">{style.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#ba7e47]">
                  View style →
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className="rounded-[28px] border border-[#c3c3c3] bg-[#231f20] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em]">Need guidance?</p>
          <h2 className="mt-3 text-2xl font-semibold">Tell us your priorities</h2>
          <p className="mt-3 text-sm text-white/80">
            Share your travel window and interests. We will recommend the best style and routing.
          </p>
          <Link
            href="/plan"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
          >
            Plan Your Trip
          </Link>
        </section>
      </div>
    </div>
  );
}
