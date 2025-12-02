import Image from "next/image";
import Link from "next/link";
import { PackageCheckoutSelector } from "@/components/PackageCheckoutSelector";
import { PackagePricing, safariPackagePricingUSD } from "@/lib/pricing";
import { safariPackages } from "@/lib/siteContent";

const sampleRoutes = [
  {
    title: "Safaris",
    description: "2–7 Day Tanzania safaris across Ngorongoro, Manyara, Tarangire, and Serengeti.",
    href: "/safaris/3-days/3-day-manyara-ngorongoro-tarangire",
    image: "/itenerary%20photos/safaris.webp",
  },
  {
    title: "Safari + Zanzibar",
    description: "10 Days Best of Tanzania Safari – Wildlife, Lakes & Culture with a Zanzibar finale.",
    href: "/safaris/10-days/10-day-best-of-tanzania",
    image: "/itenerary%20photos/safari.webp",
  },
  {
    title: "Zanzibar",
    description: "Zanzibar 2–6 Days: spice tours, dhow sundowners, and reef-friendly lodges.",
    href: "/zanzibar/5-days/zanzibar-5-days",
    image: "/itenerary%20photos/zanzibar.webp",
  },
  {
    title: "Kilimanjaro",
    description: "Machame, Lemosho, Marangu, and Northern Circuit treks with pro crews.",
    href: "/trekking",
    image: "/itenerary%20photos/kilimanjaro.webp",
  },
  {
    title: "Honeymoon Trips",
    description: "5 Days Iconic Wildlife Adventure and 7 Days Northern Highlights with private villas.",
    href: "/travel-style/honeymoon-safaris",
    image: "/itenerary%20photos/honeymoon.webp",
  },
  {
    title: "Family-Friendly Tours",
    description: "3 Days Quick Serengeti Escape and Lake Manyara day trips tailored for kids.",
    href: "/travel-style/family-safaris",
    image: "/itenerary%20photos/family%20trips.webp",
  },
  {
    title: "Diamond Luxury",
    description: "9-Day Grand Tanzania Safari – The Ultimate Serengeti Adventure.",
    href: "/safaris/9-days/9-day-grand-tanzania",
    image: "/itenerary%20photos/luxury%20trip%20tanzania.webp",
  },
  {
    title: "Small Group Trip",
    description: "8 Days Migration & Cultural Wonders departures limited to 8 guests.",
    href: "/safaris/8-days/8-day-migration-cultural-wonders",
    image: "/itenerary%20photos/small%20group%20trip.webp",
  },
];

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatPriceRange = (pricing?: PackagePricing) => {
  if (!pricing) return "Price on request";
  const parts: string[] = [];
  if (pricing.midrange) {
    parts.push(`Midrange ${usdFormatter.format(pricing.midrange)} pp`);
  }
  if (pricing.luxury) {
    parts.push(`Luxury ${usdFormatter.format(pricing.luxury)} pp`);
  }
  return parts.length ? parts.join(" | ") : "Price on request";
};

const itineraries = safariPackages.map((pkg) => ({
  id: pkg.slug,
  name: pkg.name.replace("Days ", "Days Tanzania Safari — "),
  duration: pkg.subcategory ?? "",
  countries: "Tanzania",
  highlights: pkg.highlights,
  price: formatPriceRange(safariPackagePricingUSD[pkg.slug]),
}));

const checkoutPackages = safariPackages.map((pkg) => ({
  name: pkg.name,
  slug: pkg.slug,
}));

export default function ItinerariesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Itineraries</p>
          <h1
            className="text-4xl font-semibold text-[#231f20]"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            View all our itineraries
          </h1>
          <p className="text-sm text-[#231f20]/80">
            Pick a style below which include, safaris, coast, trekking, or luxury trips and we’ll tailor the exact routing to your travel dates.
          </p>
          <Link
            href="#sample-table"
            className="inline-flex items-center gap-2 rounded-full border border-[#231f20] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
          >
            View detailed packages
            <span aria-hidden>→</span>
          </Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.8fr_0.8fr]">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {sampleRoutes.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group rounded-[28px] border border-[#c3c3c3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 w-full overflow-hidden rounded-[28px_28px_0_0]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="space-y-2 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
                      {card.title}
                    </p>
                    <p className="text-sm text-[#231f20]/80">{card.description}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-[#ba7e47]">
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <aside className="rounded-[28px] border border-[#c3c3c3] bg-[#231f20] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.3em]">Start the adventure</p>
            <p className="mt-3 text-2xl font-semibold">Tell us your dream trip.</p>
            <p className="mt-4 text-sm text-white/80">
              Every sample is 100% customisable. Once you pick a style, your designer schedules a call to refine lodges, flights, and conservation add-ons.
            </p>
            <Link
              href="/plan"
              className="mt-6 inline-flex rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
            >
              Plan My Safari
            </Link>
            <div className="mt-8 space-y-2 text-xs text-white/70">
              <p>WhatsApp: +255 768 611 005</p>
              <p>Email: info@eveonsafari.com</p>
              <p>Consultations via WhatsApp & Zoom daily.</p>
            </div>
          </aside>
        </section>

        <section id="sample-table" className="overflow-hidden rounded-[28px] border border-[#c3c3c3]">
          <div className="grid gap-4 p-4 sm:hidden">
            {itineraries.map((trip) => (
              <article
                key={trip.name}
                id={trip.id}
                className="rounded-[20px] border border-[#c3c3c3] bg-white p-4 shadow-sm"
              >
                <p
                  className="text-base font-semibold text-[#231f20]"
                  style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
                >
                  {trip.name}
                </p>
                <div className="mt-3 space-y-1 text-sm text-[#231f20]/80">
                  <p>
                    <span className="font-semibold text-[#231f20]">Duration:</span> {trip.duration}
                  </p>
                  <p>
                    <span className="font-semibold text-[#231f20]">Countries:</span> {trip.countries}
                  </p>
                  <p>
                    <span className="font-semibold text-[#231f20]">Highlights:</span> {trip.highlights}
                  </p>
                  <p>
                    <span className="font-semibold text-[#231f20]">Price Range:</span> {trip.price}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden sm:block">
            <table className="w-full text-left text-sm text-[#231f20]">
              <thead className="bg-[#c3c3c3]/40 text-xs uppercase tracking-[0.2em] text-[#231f20]">
                <tr>
                  <th className="px-4 py-3">Trip</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Countries</th>
                  <th className="px-4 py-3">Highlights</th>
                  <th className="px-4 py-3">Price Range</th>
                </tr>
              </thead>
              <tbody>
                {itineraries.map((trip, index) => (
                  <tr
                    key={trip.name}
                    id={trip.id}
                    className={index % 2 ? "bg-[#c3c3c3]/10" : "bg-white"}
                  >
                    <td className="px-4 py-4 font-semibold">{trip.name}</td>
                    <td className="px-4 py-4">{trip.duration}</td>
                    <td className="px-4 py-4">{trip.countries}</td>
                    <td className="px-4 py-4">{trip.highlights}</td>
                    <td className="px-4 py-4">{trip.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Pesapal checkout</p>
              <h2
                className="text-2xl font-semibold text-[#231f20]"
                style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
              >
                Secure your itinerary with live pricing.
              </h2>
              <p className="text-sm text-[#231f20]/80">
                Pick a package, choose midrange or luxury (USD), set your guest count, or enter a custom group price. We&apos;ll forward the
                selection into the Pesapal payment link.
              </p>
            </div>
            <PackageCheckoutSelector
              packages={checkoutPackages}
              pricing={safariPackagePricingUSD}
              currency="USD"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
