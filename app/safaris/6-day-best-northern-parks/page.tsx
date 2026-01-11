import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Lake Manyara",
    bullets: [
      "Drive from Arusha with lunch en route.",
      "Afternoon game drive along the lake shore and forest.",
      "Overnight near Manyara.",
    ],
  },
  {
    title: "Day 2 · To Serengeti",
    bullets: [
      "Travel toward Serengeti with wildlife stops.",
      "Picnic lunch and afternoon game drive on arrival.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 3 · Full-day Serengeti",
    bullets: [
      "Full-day game drives across central Serengeti.",
      "Focus on predators and migration herds if in season.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 4 · Serengeti to Ngorongoro",
    bullets: [
      "Morning drive in Serengeti.",
      "Travel toward Ngorongoro with scenic stops.",
      "Overnight near the crater rim or Karatu.",
    ],
  },
  {
    title: "Day 5 · Ngorongoro Crater",
    bullets: [
      "Descend into the crater for a half-day game drive.",
      "Track Big Five species in a compact ecosystem.",
      "Overnight near Karatu or Tarangire.",
    ],
  },
  {
    title: "Day 6 · Tarangire or Manyara exit",
    bullets: [
      "Optional morning game drive depending on routing.",
      "Return to Arusha or Kilimanjaro Airport.",
      "Trip ends after arrival.",
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
  "Safari vehicles include inverter, communications radio, electric cooler, and filtered water.",
  "National Park gate fees, park commission, and government taxes (based on current rates).",
];

const exclusions = [
  "International and domestic flights.",
  "Meals not listed.",
  "Tips for guides, drivers, and hotel staff.",
  "Optional tours.",
  "Single room supplement.",
  "Personal expenses (visas, airport taxes, internet, etc.).",
];

const pricing = safariPackagePricingUSD["6-day-best-northern-parks"];

export const metadata = {
  title: "6-Day Best of the Northern Parks | Eve On Safari",
  description:
    "Lake Manyara, Tarangire, Serengeti, and Ngorongoro in six days with flexible time for migration or elephants.",
};

export default function BestNorthernParksPage() {
  const hero = {
    kicker: "Six-day northern circuit",
    title: "6-Day Tanzania Safari",
    subtitle: "Best of the Northern Parks",
    description: "Balanced northern circuit with Serengeti time and a Ngorongoro crater finale.",
    image: "/itenerary%20photos/route/Best%20of%20Northern%20Park.webp",
    imageAlt: "Northern Tanzania safari landscape",
    keyParks: ["Lake Manyara", "Serengeti", "Ngorongoro Crater", "Tarangire"],
  };

  const summary = {
    duration: "6 days / 5 nights",
    durationHref: "/safaris/duration/6-days",
    safariStyle: "Classic Wildlife",
    safariStyleHref: "/safaris/style/classic-wildlife",
    bestFor: "Travelers who want a full northern circuit",
    bestMonths: "Jun to Oct for dry season; Dec to Feb for calving",
    groupSize: "Private, 2 to 6 guests (custom groups on request)",
    accommodation: "Lodges and tented camps",
  };

  const seasonalGuidance = {
    bestTime: "June to October for dry season game drives.",
    shoulderMonths: "January to February and November for lighter crowds.",
    weatherNotes: "Long rains March to May can affect road access.",
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
      packageSlug="6-day-best-northern-parks"
      packageName="6-Day Best of the Northern Parks"
      pricing={pricing}
    />
  );
}
