import Link from "next/link";
import { PackageCheckoutSelector } from "@/components/PackageCheckoutSelector";
import { PackagePricing, safariPackagePricingUSD } from "@/lib/pricing";
import { safariPackages } from "@/lib/siteContent";

const sampleRoutes = [
  {
    title: "Safaris",
    description: "2–7 Day Tanzania safaris across Ngorongoro, Manyara, Tarangire, and Serengeti.",
    href: "/safaris/3-days/3-day-manyara-ngorongoro-tarangire",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Safari + Zanzibar",
    description: "10 Days Best of Tanzania Safari – Wildlife, Lakes & Culture with a Zanzibar finale.",
    href: "/safaris/10-days/10-day-best-of-tanzania",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Zanzibar",
    description: "Zanzibar 2–6 Days: spice tours, dhow sundowners, and reef-friendly lodges.",
    href: "/zanzibar/5-days/zanzibar-5-days",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kilimanjaro",
    description: "Machame, Lemosho, Marangu, and Northern Circuit treks with pro crews.",
    href: "/trekking/kilimanjaro/machame-route/7-day-kilimanjaro-machame",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Honeymoon Trips",
    description: "5 Days Iconic Wildlife Adventure and 7 Days Northern Highlights with private villas.",
    href: "/travel-style/honeymoon-safaris",
    image:
      "https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Family-Friendly Tours",
    description: "3 Days Quick Serengeti Escape and Lake Manyara day trips tailored for kids.",
    href: "/travel-style/family-safaris",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Diamond Luxury",
    description: "9-Day Grand Tanzania Safari – The Ultimate Serengeti Adventure.",
    href: "/safaris/9-days/9-day-grand-tanzania",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Small Group Trip",
    description: "8 Days Migration & Cultural Wonders departures limited to 8 guests.",
    href: "/safaris/8-days/8-day-migration-cultural-wonders",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80",
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
          <h1 className="text-4xl font-semibold text-[#231f20]">
            View all sample itineraries
          </h1>
          <p className="text-sm text-[#231f20]/80">
            Pick a style below—safaris, coast, trekking, or luxury—and we’ll tailor the exact routing to your travel dates.
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
                  <div className="h-44 w-full overflow-hidden rounded-[28px_28px_0_0]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
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
              <p>+255 700 555 123 · concierge@eveonsafari.com</p>
              <p>WhatsApp & Zoom consultations available daily.</p>
            </div>
          </aside>
        </section>

        <section id="sample-table" className="overflow-hidden rounded-[28px] border border-[#c3c3c3]">
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
        </section>

        <section className="rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Pesapal checkout</p>
              <h2 className="text-2xl font-semibold text-[#231f20]">
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
