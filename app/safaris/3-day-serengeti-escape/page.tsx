import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Arusha to Serengeti",
    bullets: [
      "Drive through the Rift Valley or take a morning flight.",
      "Arrive for an afternoon game drive on the plains.",
      "Overnight in central Serengeti or Ndutu in season.",
    ],
  },
  {
    title: "Day 2 · Full-day Serengeti game drives",
    bullets: [
      "Track predators and plains game with your guide.",
      "Shift to Ndutu for calving season (Dec to Mar) if conditions allow.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 3 · Sunrise drive and return",
    bullets: [
      "Early game drive for big cat activity.",
      "Return to camp for breakfast and transfer out.",
      "Drive back or fly to Arusha or Kilimanjaro Airport.",
    ],
  },
];

const inclusions = [
  "All accommodations per itinerary.",
  "All meals per itinerary (B=Breakfast, L=Lunch, D=Dinner).",
  "All tours and entrance fees per itinerary (unless listed as excluded).",
  "All transportation and transfers per itinerary.",
  "Professional English-speaking naturalist driver/guide.",
  "Transportation in a custom safari 4x4 with viewing roof and guaranteed window seating.",
  "Safari vehicles have an inverter for charging batteries, communications radio, electric cooler, and filtered water.",
  "National Park gate fees, park commission, and government taxes (based on current rates).",
];

const exclusions = [
  "International and domestic flights.",
  "Meals not listed.",
  "Tips for guides, drivers, and hotel staff.",
  "Optional tours.",
  "Single room supplement.",
  "Personal expenses (visas, airport taxes, internet, etc.).",
  "Flight out of the Serengeti if not already added.",
  "Holiday supplement December 20 to January 5.",
];

const pricing = safariPackagePricingUSD["3-day-serengeti-escape"];

export const metadata = {
  title: "3-Day Quick Serengeti Escape | Eve On Safari",
  description:
    "Fast Serengeti-focused safari with central and seasonal Ndutu options, private guide, and optional night drives when available.",
};

export default function SerengetiEscapePage() {
  const hero = {
    kicker: "Serengeti in 3 days",
    title: "3-Day Tanzania Safari",
    subtitle: "Quick Serengeti Escape",
    description: "Direct route to the Serengeti with flexible drive or flight options.",
    image: "/photos/landing-page/serengeti.webp",
    imageAlt: "Serengeti landscape at sunset",
    keyParks: ["Serengeti", "Ndutu (seasonal)"],
  };

  const summary = {
    duration: "3 days / 2 nights",
    durationHref: "/safaris/duration/3-days",
    safariStyle: "Migration Safaris",
    safariStyleHref: "/safaris/style/migration-safaris",
    bestFor: "Short trips focused on Serengeti predators and migration windows",
    bestMonths: "Jun to Oct for dry season; Dec to Mar for Ndutu calving",
    groupSize: "Private, 2 to 6 guests (custom groups on request)",
    accommodation: "Tented camps or lodges in the Serengeti",
  };

  const seasonalGuidance = {
    bestTime: "June to October for clear wildlife viewing in central Serengeti.",
    shoulderMonths: "December to March for Ndutu calving season and big cat action.",
    weatherNotes: "Long rains March to May; short rains in November can affect road travel.",
  };

  const trustSignals = {
    reviewQuote: "The itinerary was well planned, and we never felt rushed.",
    reviewName: "Herbert",
    reviewSource: "SafariBookings",
    licensingNote: "Licensed local guides and registered operator. Documentation available on request.",
  };

  return (
    <SafariPackageTemplate
      hero={hero}
      summary={summary}
      itinerary={itinerary}
      inclusions={inclusions}
      exclusions={exclusions}
      seasonalGuidance={seasonalGuidance}
      trust={trustSignals}
      packageSlug="3-day-serengeti-escape"
      packageName="3-Day Quick Serengeti Escape"
      pricing={pricing}
    />
  );
}
