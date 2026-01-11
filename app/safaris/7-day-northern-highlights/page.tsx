import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Manyara or Tarangire",
    bullets: [
      "Drive from Arusha with picnic lunch and an afternoon game drive.",
      "Park choice based on season and wildlife focus.",
      "Overnight near Manyara or Tarangire.",
    ],
  },
  {
    title: "Day 2 · Local park focus",
    bullets: [
      "Extra game drive or a guided walk near the escarpment.",
      "Adjust to wildlife movement and your pace.",
      "Overnight near Karatu or Tarangire.",
    ],
  },
  {
    title: "Day 3 · To Serengeti",
    bullets: [
      "Travel toward Serengeti with wildlife stops en route.",
      "Afternoon game drive on arrival.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 4 · Full-day Serengeti",
    bullets: [
      "Morning and afternoon game drives in central Serengeti.",
      "Track predators and migration herds if in season.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 5 · Serengeti to Ngorongoro",
    bullets: [
      "Dawn drive on the plains.",
      "Travel toward Ngorongoro with scenic stops.",
      "Overnight near the crater rim or Karatu.",
    ],
  },
  {
    title: "Day 6 · Ngorongoro Crater",
    bullets: [
      "Half-day crater game drive for Big Five sightings.",
      "Picnic lunch and return to the rim.",
      "Overnight near Karatu.",
    ],
  },
  {
    title: "Day 7 · Return to Arusha",
    bullets: [
      "Relaxed breakfast and optional short stop if time allows.",
      "Drive back to Arusha or Kilimanjaro Airport.",
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

const pricing = safariPackagePricingUSD["7-day-northern-highlights"];

export const metadata = {
  title: "7 Days Northern Highlights | Eve On Safari",
  description:
    "Week-long northern circuit with Tarangire or Manyara, Serengeti game drives, and a Ngorongoro crater finale.",
};

export default function NorthernHighlightsPage() {
  const hero = {
    kicker: "Seven-day northern circuit",
    title: "7-Day Tanzania Safari",
    subtitle: "Northern Highlights",
    description: "Extended northern circuit with extra Serengeti time and Ngorongoro crater views.",
    image: "/itenerary%20photos/route/Northern%20Highights.webp",
    imageAlt: "Serengeti plains at sunrise",
    keyParks: ["Tarangire", "Lake Manyara", "Serengeti", "Ngorongoro Crater"],
  };

  const summary = {
    duration: "7 days / 6 nights",
    durationHref: "/safaris/duration/7-days",
    safariStyle: "Family Safaris",
    safariStyleHref: "/safaris/style/family-safaris",
    bestFor: "Families and multi-generation groups who want a slower pace",
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
      packageSlug="7-day-northern-highlights"
      packageName="7 Days Northern Highlights"
      pricing={pricing}
    />
  );
}
