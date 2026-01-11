import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Arusha to Lake Manyara",
    bullets: [
      "Drive 2.5 to 3 hours from Arusha with lunch en route.",
      "Afternoon game drive for escarpment views and birdlife.",
      "Overnight near Lake Manyara.",
    ],
  },
  {
    title: "Day 2 · Ngorongoro Crater",
    bullets: [
      "Descend into the crater for a half-day game drive.",
      "Picnic lunch and wildlife viewing on the crater floor.",
      "Overnight near the Ngorongoro rim or Karatu.",
    ],
  },
  {
    title: "Day 3 · Tarangire and return",
    bullets: [
      "Morning game drive among baobabs and elephant herds.",
      "Return to Arusha or Kilimanjaro Airport in the afternoon.",
      "Optional cultural stop if timing allows.",
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
  "Flight out of the Serengeti.",
  "Holiday supplement December 20 to January 5.",
];

const pricing = safariPackagePricingUSD["3-day-manyara-ngorongoro-tarangire"];

export const metadata = {
  title: "3-Day Manyara, Ngorongoro and Tarangire Safari | Eve On Safari",
  description:
    "Three-day northern circuit loop with Lake Manyara, Ngorongoro Crater, and Tarangire game drives.",
};

export default function ManyaraNgorongoroTarangirePage() {
  const hero = {
    kicker: "Northern circuit in 3 days",
    title: "3-Day Tanzania Safari",
    subtitle: "Manyara · Ngorongoro · Tarangire",
    description: "Three-park loop with crater wildlife and Tarangire elephants.",
    image: "/photos/landing-page/ngorongoro.webp",
    imageAlt: "Lake Manyara and Ngorongoro landscape",
    keyParks: ["Lake Manyara", "Ngorongoro Crater", "Tarangire"],
  };

  const summary = {
    duration: "3 days / 2 nights",
    durationHref: "/safaris/duration/3-days",
    safariStyle: "Classic Wildlife",
    safariStyleHref: "/safaris/style/classic-wildlife",
    bestFor: "First-time safari travelers and short trips",
    bestMonths: "Jun to Oct for Tarangire; Dec to May for Manyara; year-round for Ngorongoro",
    groupSize: "Private, 2 to 6 guests (custom groups on request)",
    accommodation: "Lodges or tented camps near Manyara and Ngorongoro",
  };

  const seasonalGuidance = {
    bestTime: "June to October for dry conditions and easy wildlife viewing.",
    shoulderMonths: "January to February and November for warm days and fewer crowds.",
    weatherNotes: "Long rains March to May; some tracks may be slower after heavy rain.",
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
      packageSlug="3-day-manyara-ngorongoro-tarangire"
      packageName="3-Day Manyara, Ngorongoro and Tarangire"
      pricing={pricing}
    />
  );
}
