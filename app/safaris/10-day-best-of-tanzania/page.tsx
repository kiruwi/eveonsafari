import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Arrival in Arusha",
    bullets: [
      "Meet your representative on arrival.",
      "Transfer to your Arusha accommodation.",
      "Rest and prep for safari days.",
    ],
  },
  {
    title: "Day 2 · Tarangire National Park",
    bullets: [
      "Drive across Maasai plains to Tarangire.",
      "Full game drive for elephants and baobabs.",
      "Overnight at Eileen's Trees Inn.",
    ],
  },
  {
    title: "Day 3 · Ngorongoro Crater",
    bullets: [
      "Early departure to the Ngorongoro Conservation Area.",
      "Descend into the crater for game viewing and picnic lunch.",
      "Overnight at Eileen's Trees Inn.",
    ],
  },
  {
    title: "Day 4 · Lake Manyara to Zanzibar",
    bullets: [
      "Morning game drive in Lake Manyara.",
      "Return to Arusha for your flight to Zanzibar.",
      "Overnight in Stone Town.",
    ],
  },
  {
    title: "Day 5 · Zanzibar North Coast",
    bullets: [
      "Transfer to Nungwi on the north coast.",
      "Beach time and optional snorkeling or diving.",
      "Overnight at Nungwi Dreams by Mantis.",
    ],
  },
  {
    title: "Day 6 · Zanzibar North Coast",
    bullets: [
      "Free day for swimming, dhow sunsets, or village tours.",
      "Optional excursions to Mnemba or Tumbatu.",
      "Overnight at Nungwi Dreams by Mantis.",
    ],
  },
  {
    title: "Day 7 · Zanzibar North Coast",
    bullets: [
      "Relaxed beach day with optional water sports.",
      "Enjoy a slow pace and sunset views.",
      "Overnight at Nungwi Dreams by Mantis.",
    ],
  },
  {
    title: "Day 8 · Free morning and departure",
    bullets: [
      "Breakfast and a relaxed morning.",
      "Transfer to the airport or seaport.",
      "Trip ends after departure.",
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

const pricing = safariPackagePricingUSD["10-day-best-of-tanzania"];

export const metadata = {
  title: "8-Days Tanzania Safari & Beach Holiday | Eve On Safari",
  description:
    "Eight-day itinerary from Arusha through Tarangire, Ngorongoro, and Lake Manyara, ending with a Zanzibar north coast beach stay.",
};

export default function TanzaniaSafariBeachHolidayPage() {
  const hero = {
    kicker: "Eight days, safari + beach",
    title: "8-Days Tanzania Safari & Beach Holiday",
    subtitle: "Tarangire · Ngorongoro · Manyara · Zanzibar",
    description: "Elephant herds, crater wildlife, and Lake Manyara before a Nungwi beach finale.",
    image: "/itenerary%20photos/route/best%20of%20tanzania.webp",
    imageAlt: "Tanzania safari scenery",
    keyParks: ["Tarangire", "Ngorongoro Crater", "Lake Manyara", "Zanzibar"],
  };

  const summary = {
    duration: "8 days / 7 nights",
    durationHref: "/safaris/duration/8-plus-days",
    safariStyle: "Classic Wildlife",
    safariStyleHref: "/safaris/style/classic-wildlife",
    bestFor: "Wildlife plus Zanzibar beach time",
    bestMonths: "Jun to Oct for dry safari season; Jan to Feb for warm beach weather",
    groupSize: "Private, 2 to 6 guests (custom groups on request)",
    accommodation: "Safari lodges plus a Zanzibar beach resort",
  };

  const seasonalGuidance = {
    bestTime: "June to October for dry safari conditions and clear beach days.",
    shoulderMonths: "January to February and November for warm weather and fewer crowds.",
    weatherNotes: "Long rains March to May; short rains in November may bring brief showers.",
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
      packageSlug="10-day-best-of-tanzania"
      packageName="8-Days Tanzania Safari & Beach Holiday"
      pricing={pricing}
    />
  );
}
