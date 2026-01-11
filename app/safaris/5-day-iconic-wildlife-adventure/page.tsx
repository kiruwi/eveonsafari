import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Manyara or Tarangire",
    bullets: [
      "Drive from Arusha with picnic lunch and an afternoon game drive.",
      "Choose Lake Manyara for birdlife or Tarangire for elephants.",
      "Overnight near Manyara or Tarangire.",
    ],
  },
  {
    title: "Day 2 · Travel to Serengeti",
    bullets: [
      "Drive toward Serengeti with wildlife stops en route.",
      "Afternoon game drive after arrival.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 3 · Full-day Serengeti",
    bullets: [
      "Full-day game drives across central Serengeti.",
      "Track big cats and migration herds when in season.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 4 · Ngorongoro Crater",
    bullets: [
      "Drive to Ngorongoro and descend into the crater.",
      "Game drive for Big Five sightings and dense wildlife.",
      "Overnight near the crater rim or Karatu.",
    ],
  },
  {
    title: "Day 5 · Return to Arusha",
    bullets: [
      "Optional short walk or village stop if timing allows.",
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

const pricing = safariPackagePricingUSD["5-day-iconic-wildlife-adventure"];

export const metadata = {
  title: "5-Day Iconic Wildlife Adventure | Eve On Safari",
  description:
    "Tarangire or Manyara start, Serengeti big cat days, and Ngorongoro finale with private guide and flexible lodges.",
};

export default function IconicWildlifeAdventurePage() {
  const hero = {
    kicker: "Five days of northern icons",
    title: "5-Day Tanzania Safari",
    subtitle: "Iconic Wildlife Adventure",
    description: "Tarangire or Manyara, Serengeti, and a Ngorongoro crater finale.",
    image: "/itenerary%20photos/route/Iconic%20Wildlife.webp",
    imageAlt: "Elephants and acacia in Tanzania",
    keyParks: ["Tarangire", "Lake Manyara", "Serengeti", "Ngorongoro Crater"],
  };

  const summary = {
    duration: "5 days / 4 nights",
    durationHref: "/safaris/duration/5-days",
    safariStyle: "Classic Wildlife",
    safariStyleHref: "/safaris/style/classic-wildlife",
    bestFor: "First-time safari with Serengeti and Ngorongoro",
    bestMonths: "Jun to Oct for dry season; Dec to Feb for calving",
    groupSize: "Private, 2 to 6 guests (custom groups on request)",
    accommodation: "Lodges and tented camps",
  };

  const seasonalGuidance = {
    bestTime: "June to October for dry season game viewing.",
    shoulderMonths: "January to February and November for lighter crowds.",
    weatherNotes: "Long rains March to May can slow some road travel.",
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
      packageSlug="5-day-iconic-wildlife-adventure"
      packageName="5-Day Iconic Wildlife Adventure"
      pricing={pricing}
    />
  );
}
