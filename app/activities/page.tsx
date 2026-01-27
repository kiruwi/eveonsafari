import Link from "next/link";
import { dayTrips } from "@/lib/siteContent";

export const metadata = {
  title: "Activities | Eve On Safari",
  description: "Day trips, walking safaris, and daily activities in Tanzania.",
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

const experienceSections = [
  {
    title: "Safari & Wildlife",
    items: [
      {
        name: "Night game drive in Tarangire National Park",
        slug: "night-game-drive-tarangire",
        label: "Tarangire",
        typeLabel: "Safari add-on",
        duration: "Evening (2-3 hours)",
        location: "Tarangire National Park",
        whoItSuits: "Wildlife enthusiasts and photographers",
        price: "Price on request",
      },
      {
        name: "Walking safari in Nyerere National Park",
        slug: "walking-safari-nyerere",
        label: "Nyerere",
        typeLabel: "Guided walking safari",
        duration: "Half day",
        location: "Nyerere National Park",
        whoItSuits: "Active travelers and nature lovers",
        price: "Price on request",
      },
      {
        name: "Night game drive in Mikumi National Park",
        slug: "night-game-drive-mikumi",
        label: "Mikumi",
        typeLabel: "Safari add-on",
        duration: "Evening (2-3 hours)",
        location: "Mikumi National Park",
        whoItSuits: "Wildlife enthusiasts and photographers",
        price: "Price on request",
      },
      {
        name: "Bush dinner in the Serengeti",
        slug: "bush-dinner-serengeti",
        label: "Serengeti",
        typeLabel: "Special experience",
        duration: "Evening",
        location: "Serengeti National Park",
        whoItSuits: "Couples, families, and celebrations",
        price: "Price on request",
      },
    ],
  },
  {
    title: "Walking, Hiking & Nature",
    items: [
      {
        name: "Walking safari in Arusha National Park (full day)",
        slug: "walking-safari-arusha-full-day",
        label: "Arusha",
        typeLabel: "Guided walking safari",
        duration: "Full day",
        location: "Arusha National Park",
        whoItSuits: "Active travelers and wildlife fans",
        price: "Price on request",
      },
      {
        name: "Day hike on Mount Meru",
        slug: "day-hike-mount-meru",
        label: "Mount Meru",
        typeLabel: "Hiking excursion",
        duration: "Full day",
        location: "Mount Meru, Arusha",
        whoItSuits: "Fit hikers and adventure seekers",
        price: "Price on request",
      },
      {
        name: "Mountain bike ride at Mto wa Mbu",
        slug: "mountain-bike-mto-wa-mbu",
        label: "Mto wa Mbu",
        typeLabel: "Active excursion",
        duration: "Half day",
        location: "Mto wa Mbu",
        whoItSuits: "Active travelers and cultural explorers",
        price: "Price on request",
      },
      {
        name: "Gibbs Farm walk & lunch (Gibbs Farm)",
        slug: "gibbs-farm-walk-lunch",
        label: "Karatu",
        typeLabel: "Farm experience",
        duration: "Half day",
        location: "Gibbs Farm, Karatu",
        whoItSuits: "Food lovers and slow travelers",
        price: "Price on request",
      },
    ],
  },
  {
    title: "Lakes, Air & Water",
    items: [
      {
        name: "Hot air balloon flight in Tarangire National Park",
        slug: "hot-air-balloon-tarangire",
        label: "Tarangire",
        typeLabel: "Airborne safari",
        duration: "Morning (3-4 hours total)",
        location: "Tarangire National Park",
        whoItSuits: "Photographers and special-occasion travelers",
        price: "Price on request",
      },
      {
        name: "Canoeing on Lake Duluti",
        slug: "canoeing-lake-duluti",
        label: "Lake Duluti",
        typeLabel: "Water activity",
        duration: "1-2 hours",
        location: "Lake Duluti, Arusha",
        whoItSuits: "Families and relaxed travelers",
        price: "Price on request",
      },
      {
        name: "Sunset cruise on a yacht charter at Zanzibar",
        slug: "sunset-yacht-cruise-zanzibar",
        label: "Zanzibar",
        typeLabel: "Coastal experience",
        duration: "Evening (2-3 hours)",
        location: "Zanzibar Island",
        whoItSuits: "Couples and small groups",
        price: "Price on request",
      },
    ],
  },
  {
    title: "Cultural & Special Experiences",
    items: [
      {
        name: "Maasai wedding experience",
        slug: "maasai-wedding-experience",
        label: "Maasai",
        typeLabel: "Cultural visit",
        duration: "Half day",
        location: "Maasai community visit",
        whoItSuits: "Culture seekers and photographers",
        price: "Price on request",
      },
      {
        name: "Taste of culture at Mto wa Mbu",
        slug: "taste-of-culture-mto-wa-mbu",
        label: "Mto wa Mbu",
        typeLabel: "Cultural tour",
        duration: "Half day",
        location: "Mto wa Mbu",
        whoItSuits: "Culture lovers and families",
        price: "Price on request",
      },
    ],
  },
];

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
            Daily Activities
          </h1>
        </header>

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

        <section id="activities-experiences" className="scroll-mt-[180px] space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Experiences</p>
              <h2
                className="text-2xl font-semibold text-[#231f20]"
                style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
              >
                Activities &amp; Experiences
              </h2>
            </div>
            <Link
              href="/plan"
              className="hidden text-xs font-semibold uppercase tracking-wide text-[#231f20]/80 underline-offset-4 hover:text-[#231f20] sm:inline-flex"
            >
              Plan Your Trip
            </Link>
          </div>

          {experienceSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-[#231f20]">{section.title}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/plan?activity=${item.slug}`}
                    className="rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
                      {item.label}
                    </p>
                    <h4 className="mt-2 text-xl font-semibold text-[#231f20]">{item.name}</h4>
                    <div className="mt-3 space-y-1 text-sm text-[#231f20]/75">
                      <p><strong className="text-[#231f20]">Type:</strong> {item.typeLabel}</p>
                      <p><strong className="text-[#231f20]">Duration:</strong> {item.duration}</p>
                      <p><strong className="text-[#231f20]">Location:</strong> {item.location}</p>
                      <p><strong className="text-[#231f20]">Who it suits:</strong> {item.whoItSuits}</p>
                      <p><strong className="text-[#231f20]">Price:</strong> {item.price}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ba7e47]">
                      View details →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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
