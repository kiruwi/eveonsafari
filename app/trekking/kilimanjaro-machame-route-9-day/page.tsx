import { KiliRoutePage } from "@/components/KiliRoutePage";

const days = [
  {
    title: "Arrive Moshi",
    description: "Arrive at Kilimanjaro airport, transfer to your hotel, and complete briefing plus final gear check.",
    highlights: ["Overnight at Sal Salinero Hotel (or equivalent), Bed and Breakfast"],
    image: "/Mountain Routes/machame/Day 1.webp",
  },
  {
    title: "Moshi - Machame hut (9,840ft | 3000m)",
    description: "Start from Machame gate through lush rainforest to Machame hut with a picnic lunch on the trail.",
    highlights: ["Packed lunch", "Dinner and overnight at Machame hut"],
    image: "/Mountain Routes/machame/machame 3.webp",
  },
  {
    title: "Machame hut - Shira hut (12,470ft | 3800m)",
    description: "Ascend ridges into open moorland and camp on the Shira Plateau beneath big skies.",
    highlights: ["Packed lunch en route", "Dinner and overnight at Shira hut"],
    image: "/Mountain Routes/machame/machame 4.webp",
  },
  {
    title: "Shira hut - Barranco camp (12,960ft | 3950m)",
    description: "Gain altitude toward Lava Tower (14,760ft | 4500m) then drop to Barranco to sleep lower for acclimatization.",
    highlights: ["Packed lunch on trail", "Dinner and overnight at Barranco camp"],
    image: "/Mountain Routes/machame/Day 4.webp",
  },
  {
    title: "Barranco camp - Karanga camp (13,450ft | 4100m)",
    description: "Climb the Barranco Wall, traverse Karanga Valley, and camp at Karanga for a shorter acclimatization day.",
    highlights: ["Hot lunch at Karanga", "Dinner and overnight at Karanga camp"],
    image: "/Mountain Routes/machame/Day 5.webp",
  },
  {
    title: "Karanga camp - Barafu camp (15,090ft | 4600m)",
    description: "Continue from Karanga to Barafu, arriving early to rest and prep for the summit push.",
    highlights: ["Hot lunch en route or on arrival", "Early dinner and rest at Barafu"],
    image: "/Mountain Routes/machame/machame 8.webp",
  },
  {
    title: "Barafu camp - Summit - Mweka",
    description: "Midnight summit via Stella Point to Uhuru Peak, descend to Barafu for brunch, then continue down to Mweka hut.",
    highlights: ["Summit via Stella Point", "Brunch at Barafu", "Overnight at Mweka hut"],
    image: "/Mountain Routes/machame/Day 7.webp",
  },
  {
    title: "Mweka camp | Moshi",
    description: "Final descent to the gate, farewell to the crew, and return to Moshi for a hot shower and poolside rest.",
    highlights: ["Overnight at Sal Salinero Hotel (or equivalent), Bed and Breakfast"],
    image: "/Mountain Routes/machame/Day 8.webp",
  },
  {
    title: "Moshi | Kilimanjaro airport | Departure",
    description: "Breakfast at the hotel, then transfer to Kilimanjaro airport for departure or onward travel.",
    image: "/Mountain Routes/machame/machame 7.webp",
  },
];

const assistance = [
  "7- and 22-seater minibuses as well as 4x4 custom safari vehicles for airport transfers and mountain transport, all with VHS/BLU communication and English-speaking driver-guides.",
  "Included in vehicles: cooler/ice box, bottled mineral water, guidebooks, binoculars.",
  "Expert English-speaking guides familiar with local flora, fauna, culture, and geography.",
  "Mountain guides knowledgeable on altitude-related sickness; Gamow bags available on request.",
  "Kilimanjaro National Park rescue team uses VHS communication across mountain stations.",
  "Guides use mobile phones to contact offices throughout the climb.",
  "Regular porters carry climbing gear and supplies; personal porters for daypacks available on request at extra fee.",
  "Chemical eco-friendly toilet provided complimentary for groups of 4+.",
];

const inclusions = [
  "Arrival and departure transfers to and from Kilimanjaro, full briefing, and gear check.",
  "All meals while on climb (Breakfast, Lunch, Dinner).",
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
  "30% deposit at confirmation; balance due at least 35 days before the tour begins.",
  "35 days prior: 30% fee; 34-15 days: 50%; 14 days to no-show: 100%.",
  "All wire transfers payable to Eve On Safari; personal bills payable in USD, EUR, or GBP.",
  "Children below 16 years old are charged 80% of the adult rate.",
];

const priceColumns = ["Each of 1 pax", "Each of 2 pax", "Each of 3-5 pax", "Each of 6-9 pax"];
const priceRows = [
  {
    label: "Sal Salinero",
    values: ["USD 3225", "USD 2695", "USD 2335", "USD 2254"],
  },
];

export default function KilimanjaroMachameRoute9DayPage() {
  return (
    <KiliRoutePage
      title="Kilimanjaro Climb on Machame Route (9 Days)"
      durationLabel="9 days | 8 nights"
      airport="Pick up and drop off Kilimanjaro airport."
      heroImage="/Mountain Routes/machame/machame.webp"
      routeStyle="Whiskey Route (camping)"
      accommodation="Mountain tents"
      difficulty="Challenging"
      acclimatization="Karanga + Lava Tower high/low"
      summary={[
        "Extended Machame itinerary with a dedicated Karanga acclimatization night before Barafu for stronger summit readiness.",
        "Covers rainforest, Shira Plateau, Barranco Wall, Karanga, and a Stella Point summit before descending via Mweka.",
      ]}
      whyChoose={[
        "Added Karanga overnight to boost acclimatization.",
        "Iconic scenery across Shira, Barranco, and Lava Tower.",
        "Balanced pacing with camping flexibility and proven summit profile.",
      ]}
      days={days}
      pricingNote="9 Days 8 Nights Kilimanjaro Climb on Machame Route (7 days / 6 nights on the mountain)."
      priceColumns={priceColumns}
      priceRows={priceRows}
      inclusions={inclusions}
      exclusions={exclusions}
      assistance={assistance}
      cancellation={cancellation}
    />
  );
}
