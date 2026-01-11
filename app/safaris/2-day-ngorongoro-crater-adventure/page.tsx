import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Arusha to Lake Manyara or Tarangire",
    bullets: [
      "Drive from Arusha with picnic lunch; park choice based on season.",
      "Game drive focused on elephants, birdlife, and big cats.",
      "Overnight near the Ngorongoro area.",
    ],
  },
  {
    title: "Day 2 · Ngorongoro Crater game drive and return",
    bullets: [
      "Descend into the crater for a half-day game drive.",
      "Picnic lunch on the crater floor, then return to Arusha or Kilimanjaro.",
      "Optional stop in Mto wa Mbu en route.",
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
  "Holiday supplement December 20 to January.",
];

const pricing = safariPackagePricingUSD["2-day-ngorongoro-crater-adventure"];

export const metadata = {
  title: "2-Day Ngorongoro Crater Adventure | Eve On Safari",
  description:
    "Two-day safari with Ngorongoro Crater game drives plus a seasonal day in Lake Manyara or Tarangire.",
};

export default function NgorongoroCraterPackagePage() {
  const hero = {
    kicker: "Ngorongoro in 2 days",
    title: "2-Day Tanzania Safari",
    subtitle: "Ngorongoro Crater Adventure",
    description: "Focused crater safari with a seasonal day in Lake Manyara or Tarangire.",
    image: "/photos/landing-page/ngorongoro.webp",
    imageAlt: "Ngorongoro Crater rim",
    keyParks: ["Ngorongoro Crater", "Lake Manyara", "Tarangire"],
  };

  const summary = {
    duration: "2 days / 1 night",
    durationHref: "/safaris/duration/2-days",
    safariStyle: "Classic Wildlife",
    safariStyleHref: "/safaris/style/classic-wildlife",
    bestFor: "Short visits and first-time safari add-ons",
    bestMonths: "Jun to Oct for Tarangire; Dec to May for Manyara; year-round for Ngorongoro",
    groupSize: "Private, 2 to 6 guests (custom groups on request)",
    accommodation: "Lodges or tented camps near Ngorongoro",
  };

  const seasonalGuidance = {
    bestTime: "June to October for dry roads and concentrated wildlife.",
    shoulderMonths: "January to February and November for warm days and fewer crowds.",
    weatherNotes: "Long rains March to May; park choice shifts between Manyara and Tarangire.",
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
      packageSlug="2-day-ngorongoro-crater-adventure"
      packageName="2-Day Ngorongoro Crater Adventure"
      pricing={pricing}
    />
  );
}
