import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Manyara or Tarangire",
    bullets: [
      "Seasonal park choice with picnic lunch and afternoon game drive.",
      "Manyara for birdlife or Tarangire for elephant herds.",
      "Overnight near Karatu or Tarangire.",
    ],
  },
  {
    title: "Day 2 · Local park focus",
    bullets: [
      "Extra game drive or guided walk near the escarpment.",
      "Adjust to wildlife movement and your pace.",
      "Overnight near Karatu or Tarangire.",
    ],
  },
  {
    title: "Day 3 · To Serengeti",
    bullets: [
      "Travel toward Serengeti with wildlife stops en route.",
      "Afternoon game drive after arrival.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 4 · Full-day Serengeti",
    bullets: [
      "Full-day game drives focused on migration herds.",
      "Track predators and plains game.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 5 · Serengeti to Ngorongoro",
    bullets: [
      "Sunrise drive, then travel toward Ngorongoro.",
      "Optional Maasai village visit if timing allows.",
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
    title: "Day 7 · Lake Eyasi or Lake Natron",
    bullets: [
      "Choose Lake Eyasi for cultural visits or Natron for desert scenery.",
      "Guided cultural or nature walk with local hosts.",
      "Overnight near Eyasi or Natron.",
    ],
  },
  {
    title: "Day 8 · Return to Arusha",
    bullets: [
      "Morning visit or walk if time allows.",
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

const pricing = safariPackagePricingUSD["8-day-migration-cultural-wonders"];

export const metadata = {
  title: "8-Day Migration and Cultural Wonders | Eve On Safari",
  description:
    "Tarangire or Manyara, Serengeti migration focus, Ngorongoro Crater, plus Lake Eyasi or Natron for culture and desert scenery.",
};

export default function MigrationCulturalWondersPage() {
  const hero = {
    kicker: "Migration and culture in 8 days",
    title: "8-Day Tanzania Safari",
    subtitle: "Migration and Cultural Wonders",
    description: "Serengeti migration focus with a cultural day at Eyasi or Natron.",
    image: "/itenerary%20photos/route/Migration%20Safari.webp",
    imageAlt: "Tanzania safari landscape",
    keyParks: ["Tarangire", "Lake Manyara", "Serengeti", "Ngorongoro Crater", "Lake Eyasi or Lake Natron"],
  };

  const summary = {
    duration: "8 days / 7 nights",
    durationHref: "/safaris/duration/8-plus-days",
    safariStyle: "Cultural Safaris",
    safariStyleHref: "/safaris/style/cultural-safaris",
    bestFor: "Wildlife travelers who want cultural visits and migration timing",
    bestMonths: "Jan to Mar for calving; Jun to Oct for migration movement",
    groupSize: "Private, 2 to 8 guests (custom groups on request)",
    accommodation: "Lodges and tented camps",
  };

  const seasonalGuidance = {
    bestTime: "June to October for migration movement and dry conditions.",
    shoulderMonths: "January to March for calving in the southern Serengeti.",
    weatherNotes: "Long rains March to May; short rains in November can affect road access.",
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
      packageSlug="8-day-migration-cultural-wonders"
      packageName="8-Day Migration and Cultural Wonders"
      pricing={pricing}
    />
  );
}
