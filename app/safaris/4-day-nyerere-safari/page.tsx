import SafariPackageTemplate from "@/components/SafariPackageTemplate";
import { safariPackagePricingUSD } from "@/lib/pricing";

const itinerary = [
  {
    title: "Day 1 · Arrive Nyerere and afternoon drive",
    bullets: [
      "Fly or drive from Dar es Salaam or Zanzibar to Nyerere.",
      "Afternoon game drive across riverine woodlands.",
      "Overnight at a riverside camp.",
    ],
  },
  {
    title: "Day 2 · Game drives across lakes and plains",
    bullets: [
      "Full or half-day game drives with your guide.",
      "Focus on elephants, lions, and open plains wildlife.",
      "Overnight at a riverside camp.",
    ],
  },
  {
    title: "Day 3 · Walking safari and boat excursion",
    bullets: [
      "Guided walking safari with an armed ranger.",
      "Afternoon boat safari on the Rufiji River.",
      "Overnight at a riverside camp.",
    ],
  },
  {
    title: "Day 4 · Morning drive and depart",
    bullets: [
      "Optional morning game drive or relaxed breakfast.",
      "Transfer to the airstrip for your return flight.",
      "Arrive back in Dar es Salaam or Zanzibar.",
    ],
  },
];

const inclusions = [
  "All accommodations per itinerary.",
  "All meals per itinerary (B=Breakfast, L=Lunch, D=Dinner).",
  "All tours and entrance fees per itinerary (unless listed as excluded).",
  "All transportation and transfers per itinerary.",
  "Safari activities (game drives, walking where permitted, boat when scheduled).",
  "National Park fees.",
];

const exclusions = [
  "International flights.",
  "Meals not listed.",
  "Tips for guides, drivers, and hotel staff.",
  "Optional tours.",
  "Single room supplement.",
  "Personal expenses (visas, airport taxes, internet, etc.).",
  "Domestic flights to and from Nyerere unless added.",
];

const pricing = safariPackagePricingUSD["4-day-nyerere-safari"];

export const metadata = {
  title: "4-Day Nyerere National Park Safari | Eve On Safari",
  description:
    "Boat, walking, and game drive combination in Nyerere with riverside camps and flexible flights from Dar or Zanzibar.",
};

export default function NyerereSafariPage() {
  const hero = {
    kicker: "Southern circuit wilderness",
    title: "4-Day Nyerere National Park Safari",
    subtitle: "Rufiji River and open plains",
    description: "Boat, walking, and game drives in one of Tanzania's largest reserves.",
    image: "/photos/landing-page/nyerere.webp",
    imageAlt: "Nyerere National Park safari",
    keyParks: ["Nyerere National Park", "Rufiji River"],
  };

  const summary = {
    duration: "4 days / 3 nights",
    durationHref: "/safaris/duration/4-days",
    safariStyle: "Classic Wildlife",
    safariStyleHref: "/safaris/style/classic-wildlife",
    bestFor: "Travelers who want boats, walks, and fewer crowds",
    bestMonths: "Jun to Oct for dry season wildlife",
    groupSize: "Private, 2 to 6 guests (custom groups on request)",
    accommodation: "Riverside lodges or tented camps",
  };

  const seasonalGuidance = {
    bestTime: "June to October for dry conditions and river wildlife.",
    shoulderMonths: "November to February for green season and birdlife.",
    weatherNotes: "Long rains March to May can limit access in some areas.",
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
      packageSlug="4-day-nyerere-safari"
      packageName="4-Day Nyerere National Park Safari"
      pricing={pricing}
    />
  );
}
