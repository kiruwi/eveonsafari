import Link from "next/link";
import {
  travelStyles,
  destinationGroups,
  dayTrips,
  zanzibarTours,
  trekkingPackages,
} from "@/lib/siteContent";

export default function ExperiencesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Experiences</p>
          <h1
            className="text-4xl font-semibold text-[#231f20]"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Choose by travel style or region
          </h1>
          <p className="text-sm text-[#231f20]/80">
            Every option below comes directly from the Eve On Safari catalog—pick a style, then pair it with trekking, day trips, or Zanzibar breaks.
          </p>
        </header>

        <section className="rounded-[32px] border border-[#c3c3c3] bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Travel styles</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {travelStyles.map((style) => (
              <Link
                key={style.slug}
                href={`/travel-style/${style.slug}`}
                className="rounded-[24px] border border-[#c3c3c3] p-5 transition hover:-translate-y-1 hover:shadow"
              >
                <h3
                  className="text-xl font-semibold text-[#231f20]"
                  style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
                >
                  {style.name}
                </h3>
                <p className="mt-2 text-sm text-[#231f20]/70">{style.slug}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Destinations by circuit</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {destinationGroups.map((group) => (
              <article key={group.region} className="rounded-[24px] border border-[#c3c3c3] bg-white p-6">
                <h3
                  className="text-2xl font-semibold text-[#231f20]"
                  style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
                >
                  {group.region}
                </h3>
                <ul className="mt-3 grid gap-1 text-sm text-[#231f20]/80">
                  {group.items.map((item) => (
                    <li key={item.slug}>• {item.name}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Day trips</p>
            <ul className="mt-3 space-y-2 text-sm text-[#231f20]/80">
              {dayTrips.map((trip) => (
                <li key={trip.slug}>
                  <span className="font-semibold text-[#231f20]">{trip.name}</span> · {trip.region}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Zanzibar Tours</p>
            <ul className="mt-3 space-y-2 text-sm text-[#231f20]/80">
              {zanzibarTours.map((tour) => (
                <li key={tour.slug}>
                  <span className="font-semibold text-[#231f20]">{tour.name}</span> · {tour.duration}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-[32px] border border-[#c3c3c3] bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Trekking Routes</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {trekkingPackages.map((trek) => (
              <div key={trek.slug} className="rounded-[20px] border border-[#c3c3c3] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">{trek.route}</p>
                <h4
                  className="text-lg font-semibold text-[#231f20]"
                  style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
                >
                  {trek.name}
                </h4>
                <p className="text-sm text-[#231f20]/70">{trek.slug}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
