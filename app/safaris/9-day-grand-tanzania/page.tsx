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
    title: "Day 2 · Full day in park",
    bullets: [
      "Full-day game drive in your chosen park.",
      "Focus on elephants, birdlife, and big cats.",
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
    title: "Day 4 · Serengeti full day",
    bullets: [
      "Full-day game drives across central Serengeti.",
      "Track predators and resident plains game.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 5 · Serengeti seasonal shift",
    bullets: [
      "Move toward north or south depending on migration.",
      "Follow herds and predator activity with your guide.",
      "Overnight in Serengeti camp or lodge.",
    ],
  },
  {
    title: "Day 6 · Serengeti to Ngorongoro",
    bullets: [
      "Dawn drive on the plains.",
      "Travel toward Ngorongoro with scenic stops.",
      "Overnight near the crater rim or Karatu.",
    ],
  },
  {
    title: "Day 7 · Ngorongoro Crater",
    bullets: [
      "Half-day crater game drive for Big Five sightings.",
      "Picnic lunch and return to the rim.",
      "Overnight near Karatu.",
    ],
  },
  {
    title: "Day 8 · Flex day",
    bullets: [
      "Optional guided walk, biking, or village visit.",
      "Adjust the pace to your interests.",
      "Overnight near Karatu.",
    ],
  },
  {
    title: "Day 9 · Return to Arusha",
    bullets: [
      "Breakfast and depart for Arusha or Kilimanjaro Airport.",
      "Optional short stop if timing allows.",
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

const pricing = safariPackagePricingUSD["9-day-grand-tanzania"];

export const metadata = {
  title: "9 Days Grand Tanzania Safari | Eve On Safari",
  description:
    "Relaxed nine-day circuit through Tarangire or Manyara, Serengeti regions, and Ngorongoro Crater.",
};

export default function GrandTanzaniaSafariPage() {
  const hero = {
    kicker: "Nine-day northern circuit",
    title: "9-Day Tanzania Safari",
    subtitle: "Grand Tanzania Safari",
    description: "Extended northern circuit with multiple Serengeti days and a crater finale.",
    image: "/itenerary%20photos/route/i.webp",
    imageAlt: "Tanzania safari scenery",
    keyParks: ["Tarangire", "Lake Manyara", "Serengeti", "Ngorongoro Crater"],
  };

  const summary = {
    duration: "9 days / 8 nights",
    durationHref: "/safaris/duration/8-plus-days",
    safariStyle: "Classic Wildlife",
    safariStyleHref: "/safaris/style/classic-wildlife",
    bestFor: "Travelers who want a relaxed multi-park pace",
    bestMonths: "Jun to Oct for dry season; Dec to Feb for calving",
    groupSize: "Private, 2 to 6 guests (custom groups on request)",
    accommodation: "Lodges and tented camps",
  };

  const seasonalGuidance = {
    bestTime: "June to October for dry season game viewing.",
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
      packageSlug="9-day-grand-tanzania"
      packageName="9-Day Grand Tanzania Safari"
      pricing={pricing}
    />
  );
}
