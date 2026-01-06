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
            className="text-4xl font-semibold text-[#231f20] tracking-[0.04em]"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Choose by travel style or region
          </h1>
          <p className="text-base text-[#231f20]/80">
            Every option below comes directly from the Eve On Safari catalog. Pick a style, then pair it with trekking, day trips, or Zanzibar breaks.
          </p>
        </header>

        <section id="TravelStyles" className="scroll-mt-[180px] rounded-[32px] bg-white p-8 shadow-md">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Travel styles</p>
          </div>
          <div className="relative">
            <div className="space-y-10 md:space-y-12">
              {travelStyles.map((style, index) => {
                const styleHref = `/travel-style/${style.slug}`;
                const hasImage = Boolean(style.imageSrc);
                const imageSrc = style.imageSrc ?? "/itenerary photos/safaris.webp";
                const imageAlt = style.imageAlt ?? style.name;
                const imageUrl = encodeURI(imageSrc);
                const isEven = index % 2 === 0;
                const imageOrder = isEven ? "md:order-1" : "md:order-3";
                const textOrder = isEven ? "md:order-3" : "md:order-1";
                const leftAlign = "md:ml-auto md:mr-0";
                const rightAlign = "md:mr-auto md:ml-0";

                const textCard = (
                  <Link
                    href={styleHref}
                    className="block w-full max-w-xl rounded-[24px] border border-[#c3c3c3]/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:w-[min(460px,100%)]"
                  >
                    <h3
                      className="text-2xl font-semibold text-[#231f20] tracking-[0.04em]"
                      style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
                    >
                      {style.name}
                    </h3>
                    {style.description && (
                      <p className="mt-2 text-base leading-relaxed text-[#231f20]/75">{style.description}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ba7e47]">
                      Explore this style
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M10 7h7v7" />
                      </svg>
                    </span>
                  </Link>
                );

                const imageCard = (
                  <Link
                    href={styleHref}
                    className="group block w-full max-w-xl overflow-hidden rounded-[24px] border border-[#c3c3c3]/70 bg-[#f8f5f2] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:w-[min(460px,100%)]"
                    aria-label={`Open ${style.name}`}
                  >
                    <div className="aspect-[8/3] w-full md:aspect-auto md:h-[172px]">
                      {hasImage ? (
                        <img
                          src={imageUrl}
                          alt={imageAlt}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#f8f5f2]">
                          <div className="w-full max-w-[320px] rounded-[20px] border border-[#c3c3c3]/40 bg-white/80 px-5 py-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#231f20]/70">Coming soon</p>
                            <p className="mt-2 text-base font-semibold text-[#231f20]">Photos for this style are on the way.</p>
                            <p className="mt-1 text-sm text-[#231f20]/70">We&apos;ll add real imagery and sample stays shortly.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                );

                return (
                  <div
                    key={style.slug}
                    className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch md:gap-10"
                  >
                    <div className={`order-1 md:self-center ${imageOrder}`}>
                      <div className={`mx-auto w-full max-w-[520px] ${isEven ? leftAlign : rightAlign}`}>{imageCard}</div>
                    </div>
                    <div className="order-2 relative hidden md:flex w-6 justify-center">
                      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#c3c3c3]/70" aria-hidden="true" />
                      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ba7e47] ring-4 ring-white" aria-hidden="true" />
                    </div>
                    <div className={`order-3 md:self-center ${textOrder}`}>
                      <div className={`mx-auto w-full max-w-[520px] ${isEven ? rightAlign : leftAlign}`}>{textCard}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="destinations-by-circuit" className="scroll-mt-[180px] rounded-[32px] bg-[#c3c3c3]/10 p-8 shadow-md">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Destinations by circuit</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {destinationGroups.map((group) => (
              <article key={group.region} className="rounded-[24px] bg-white p-6 shadow-md">
                <h3
                  className="text-2xl font-semibold text-[#231f20] tracking-[0.04em]"
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
          <article className="rounded-[28px] bg-white p-6 shadow-md">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Day trips</p>
            <ul className="mt-3 space-y-2 text-sm text-[#231f20]/80">
              {dayTrips.map((trip) => (
                <li key={trip.slug}>
                  <span className="font-semibold text-[#231f20]">{trip.name}</span> · {trip.region}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[28px] bg-white p-6 shadow-md">
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

        <section className="rounded-[32px] bg-white p-8 shadow-md">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Trekking Routes</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {trekkingPackages.map((trek) => (
              <div key={trek.slug} className="rounded-[20px] p-4 shadow-md">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">{trek.route}</p>
                <h4
                  className="text-lg font-semibold text-[#231f20] tracking-[0.03em]"
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
