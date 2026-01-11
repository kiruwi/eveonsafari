import Image from "next/image";
import Link from "next/link";
import { dayTrips, travelStyles } from "@/lib/siteContent";

export const metadata = {
  title: "Activities | Eve On Safari",
  description: "Day trips, walking safaris, and cultural visits in Tanzania.",
};

const dayTripDetails: Record<
  string,
  {
    duration: string;
    location: string;
    whoItSuits: string;
    typeLabel: string;
    price: string;
  }
> = {
  "chemka-hot-spring": {
    duration: "Half day to full day",
    location: "Chemka (Kikuletwa), Arusha region",
    whoItSuits: "Families and relaxed travelers",
    typeLabel: "Standalone or add-on",
    price: "Price on request",
  },
  "materuni-waterfalls-coffee": {
    duration: "Full day",
    location: "Materuni village, near Moshi",
    whoItSuits: "Active travelers and coffee lovers",
    typeLabel: "Standalone or add-on",
    price: "Price on request",
  },
  "arusha-day-trip": {
    duration: "Full day",
    location: "Arusha National Park",
    whoItSuits: "First-time safari visitors",
    typeLabel: "Standalone or add-on",
    price: "Price on request",
  },
  "lake-manyara-day-trip": {
    duration: "Full day",
    location: "Lake Manyara National Park",
    whoItSuits: "Birders and families",
    typeLabel: "Standalone or add-on",
    price: "Price on request",
  },
  "ngorongoro-crater-day-trip": {
    duration: "Long full day",
    location: "Ngorongoro Crater",
    whoItSuits: "Wildlife enthusiasts and photographers",
    typeLabel: "Standalone or add-on",
    price: "Price on request",
  },
  "tarangire-day-trip": {
    duration: "Full day",
    location: "Tarangire National Park",
    whoItSuits: "Elephant lovers",
    typeLabel: "Standalone or add-on",
    price: "Price on request",
  },
};

export default function ActivitiesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Activities</p>
          <h1
            className="text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Travel Styles &amp; Day Activities
          </h1>
        </header>

        <section id="TravelStyles" className="scroll-mt-[180px] space-y-8">
          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#d7d1c5] md:block" />
            <div className="space-y-10">
              {travelStyles.map((style, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={style.slug}
                    className="relative grid gap-6 md:grid-cols-2 md:items-center"
                  >
                    <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[#ba7e47] md:block" />
                    <div className={isEven ? "md:order-1" : "md:order-2"}>
                      <div className="relative h-44 w-full overflow-hidden rounded-[6px] shadow-sm sm:h-52">
                        <Image
                          src={style.imageSrc}
                          alt={style.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className={isEven ? "md:order-2" : "md:order-1"}>
                      <div className="rounded-[6px] border border-[#d7d1c5] bg-white p-6 shadow-sm">
                        <h3 className="text-2xl font-semibold text-[#231f20]">{style.name}</h3>
                        <p className="mt-3 text-sm text-[#231f20]/75">{style.description}</p>
                        <Link
                          href={`/travel-style/${style.slug}`}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ba7e47]"
                        >
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
                            <path d="M7 17L17 7M10 7h7v7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="day-trips" className="scroll-mt-[180px]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Day trips</p>
              <h2
                className="text-2xl font-semibold text-[#231f20]"
                style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
              >
                One-day activities
              </h2>
            </div>
            <Link
              href="/plan"
              className="hidden text-xs font-semibold uppercase tracking-wide text-[#231f20]/80 underline-offset-4 hover:text-[#231f20] sm:inline-flex"
            >
              Plan Your Trip
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {dayTrips.map((trip) => {
              const details = dayTripDetails[trip.slug];
              return (
                <Link
                  key={trip.slug}
                  href={`/activities/day-trips/${trip.slug}`}
                  className="rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">{trip.region}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#231f20]">{trip.name}</h3>
                  {details && (
                    <div className="mt-3 space-y-1 text-sm text-[#231f20]/75">
                      <p><strong className="text-[#231f20]">Type:</strong> {details.typeLabel}</p>
                      <p><strong className="text-[#231f20]">Duration:</strong> {details.duration}</p>
                      <p><strong className="text-[#231f20]">Location:</strong> {details.location}</p>
                      <p><strong className="text-[#231f20]">Who it suits:</strong> {details.whoItSuits}</p>
                      <p><strong className="text-[#231f20]">Price:</strong> {details.price}</p>
                    </div>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ba7e47]">
                    View details →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Link
            href="/activities/walking-safaris"
            className="rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Walking safaris</p>
            <h3 className="mt-2 text-xl font-semibold text-[#231f20]">Guided bush walks</h3>
            <p className="mt-3 text-sm text-[#231f20]/75">
              Safari add-on · Half day · Select areas in northern Tanzania · Price on request.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ba7e47]">
              View details →
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
