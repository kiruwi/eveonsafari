import { KiliRoutePage } from "@/components/KiliRoutePage";

const days = [
  {
    title: "Arrive Moshi",
    description: "Arrive at Kilimanjaro airport, transfer to the hotel, and complete briefing and final gear check.",
    highlights: ["Overnight at Sal Salinero hotel (or equivalent), Bed and Breakfast"],
    image: "/Mountain%20Routes/lemosho/Day%201.webp",
  },
  {
    title: "Moshi – Mti Mkubwa camp (9,020ft | 2750m)",
    description:
      "Drive to Londorossi Gate for registration, continue to Lemosho glades, and hike through rainforest to Mti Mkubwa.",
    highlights: ["Trailhead picnic lunch", "Dinner and overnight at Mti Mkubwa campsite"],
    image: "/Mountain%20Routes/lemosho/Day%202.webp",
  },
  {
    title: "Mti Mkubwa – Shira (1) Plateau Camp (11,480ft | 3500m)",
    description:
      "Cross streams in the heather zone, crest Shira Ridge, and camp on the open Shira Plateau.",
    highlights: ["Packed lunch along the trail", "Dinner at Shira (1) Plateau Camp"],
    image: "/Mountain%20Routes/lemosho/Day%203.webp",
  },
  {
    title: "Shira Plateau - Shira hut (12,470ft | 3800m)",
    description:
      "Gentle trek across the plateau to Shira Hut; afternoon acclimatization walks on the moorland meadows.",
    highlights: ["Lunch at Shira hut", "Evening acclimatization strolls"],
    image: "/Mountain%20Routes/lemosho/Day%204.webp",
  },
  {
    title: "Shira hut – Barranco camp (12,960ft | 3950m)",
    description:
      "Climb toward Lava Tower for altitude exposure, then descend to Barranco camp to sleep lower.",
    highlights: ["Packed lunch on trail", "Dinner and overnight at Barranco camp"],
    image: "/Mountain%20Routes/lemosho/Day%205.webp",
  },
  {
    title: "Barranco camp - Barafu camp (15,090ft | 4600m)",
    description:
      "Scale the Barranco Wall, traverse Karanga Valley, then continue to Barafu for summit staging.",
    highlights: ["Picnic lunch en route", "Dinner and rest at Barafu", "Optional extra acclimatization night at Karanga"],
    image: "/Mountain%20Routes/lemosho/Day%206.webp",
  },
  {
    title: "Barafu camp - Summit - Mweka camp",
    description:
      "Midnight ascent via Stella Point to Uhuru, descend to Barafu for brunch, and continue to Mweka camp for the night.",
    highlights: ["Summit via Stella Point", "Brunch at Barafu", "Overnight at Mweka camp"],
    image: "/Mountain%20Routes/lemosho/day%207.webp",
  },
  {
    title: "Mweka camp - Moshi",
    description: "Descend to Mweka gate, farewell to the team, then return to Moshi for a hot shower and relaxation.",
    highlights: ["Overnight at Sal Salinero hotel (or equivalent), Bed and Breakfast"],
    image: "/Mountain%20Routes/lemosho/Day%208.webp",
  },
  {
    title: "Moshi - Kilimanjaro - Depart",
    description: "After breakfast, transfer to Kilimanjaro airport for departure or onward travel.",
    image: "/Mountain%20Routes/lemosho/Day%209.webp",
  },
];

const assistance = [
  "7- and 22-seater minibuses and 4x4 custom safari vehicles for airport transfers and mountain transport, equipped with VHS/BLU communication and English-speaking driver-guides.",
  "Included onboard: cooler/ice box, bottled mineral water, guidebooks, binoculars.",
  "Expert English-speaking guides familiar with local flora, fauna, culture, and geography.",
  "Mountain guides knowledgeable on altitude-related sickness; Gamow bags available on request.",
  "Kilimanjaro National Park rescue team uses VHS communication across mountain stations.",
  "Guides use mobile phones to contact offices throughout the climb.",
  "Regular porters carry climbing gear and supplies; personal daypack porters available on request at extra fee.",
  "Chemical eco-friendly toilet provided complimentary for groups of 4+.",
];

const inclusions = [
  "Arrival and departure transfers from Kilimanjaro airport, full briefing, and gear check.",
  "All meals while on the climb (Breakfast, Lunch, Dinner).",
  "Mountain tent accommodation (2-man tents).",
  "All park fees and camping fees.",
  "Guides' and porters' salaries.",
  "English-speaking professional guide.",
  "2 nights accommodation in Moshi on Bed and Breakfast (1 before and 1 after the climb).",
];

const exclusions = [
  "Sleeping bags and climbing gear (available for hire at our offices).",
  "Items of a personal nature.",
  "Traveler's insurance.",
  "Tips to guides and porters.",
];

const cancellation = [
  "Safari plan is flexible and can be modified to suit preferences.",
  "Quotation only until confirmed; prices may change with park fee or supplier adjustments.",
  "30% deposit at confirmation; balance due at least 35 days before departure.",
  "35 days prior: 30% fee; 34–15 days: 50%; 14 days to no-show: 100%.",
  "All wire transfers payable to Eve On Safari; personal bills payable in USD, EUR, or GBP.",
  "Children below 16 years old are charged 80% of the adult rate.",
];

const priceColumns = ["Each of 1 pax", "Each of 2 pax", "Each of 3-5 pax", "Each of 6-9 pax"];
const priceRows = [
  {
    label: "Sal Salinero hotel",
    values: ["USD 3662", "USD 2248", "USD 2195", "USD 2130"],
  },
];

export default function KilimanjaroLemoshoRoutePage() {
  return (
    <KiliRoutePage
      title="Kilimanjaro Climb on Lemosho Route"
      durationLabel="9 days | 8 nights"
      airport="Pick up and drop off at Kilimanjaro airport"
      heroImage="/Mountain%20Routes/lemosho/lemosho%20bg.webp"
      routeStyle="Secluded western approach"
      accommodation="Mountain tents"
      difficulty="Challenging"
      acclimatization="Long approach with high/low"
      summary={[
        "Secluded western approach with wildlife-rich rainforest, Shira Plateau crossing, and acclimatization through Lava Tower and Barranco.",
        "Ideal for trekkers wanting extra days on lower slopes and a less-traveled path with standout scenery.",
      ]}
      whyChoose={[
        "Longer approach for better acclimatization.",
        "Wild, quiet western start with Shira Plateau vistas.",
        "Classic Barranco Wall and Stella Point summit line.",
      ]}
      days={days}
      pricingNote="9 Days 8 Nights Kilimanjaro Climb on Lemosho Route (7 days / 6 nights on the mountain)."
      priceColumns={priceColumns}
      priceRows={priceRows}
      extraPricingNote="Extra day at Karanga camp: USD 309 per person."
      inclusions={inclusions}
      exclusions={exclusions}
      assistance={assistance}
      cancellation={cancellation}
    />
  );
}
