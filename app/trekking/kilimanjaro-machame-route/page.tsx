import { KiliRoutePage } from "@/components/KiliRoutePage";

const days = [
  {
    title: "Arrive Moshi",
    description: "Arrive at Kilimanjaro airport, transfer to the hotel, and complete briefing and final gear check.",
    highlights: ["Overnight at Sal Salinero Hotel (or equivalent), Bed and Breakfast"],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Moshi - Machame hut (9,840ft | 3000m)",
    description: "Enter the rainforest at Machame gate and climb toward Machame hut with a picnic lunch on the trail.",
    highlights: ["Packed trail lunch", "Dinner and overnight at Machame hut"],
    image: "https://images.unsplash.com/photo-1516386204654-85c52d4d6970?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Machame hut – Shira hut (12,470ft | 3800m)",
    description: "Ascend past Shira ridges into open moorland, camping on the Shira Plateau under vast skies.",
    highlights: ["Packed lunch en route", "Dinner and overnight at Shira hut"],
    image: "https://images.unsplash.com/photo-1520357456838-1e06818653f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Shira hut – Barranco camp (12,960ft | 3950m)",
    description: "Climb toward Lava Tower for high-altitude exposure, then descend to Barranco camp to aid acclimatization.",
    highlights: ["Packed lunch on trail", "Dinner and overnight at Barranco camp"],
    image: "https://images.unsplash.com/photo-1518831959410-6f5c2b6fa9d5?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Barranco camp – Barafu camp (15,090ft | 4600m)",
    description: "Tackle the Barranco Wall, cross Karanga Valley, then push on to Barafu for summit staging.",
    highlights: ["Hot lunch at Karanga", "Dinner and rest at Barafu", "Extra acclimatization day at Karanga available"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Barafu camp - Summit - Mweka hut",
    description: "Midnight summit via Stella Point to Uhuru Peak, descend to Barafu for brunch, then continue to Mweka hut.",
    highlights: ["Summit via Stella Point", "Brunch at Barafu", "Overnight at Mweka hut"],
    image: "https://images.unsplash.com/photo-1527772831180-79e8cdf2de5d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mweka camp - Moshi",
    description: "Final descent to the park gate, farewell to crew, and return to Moshi for a hot shower and rest.",
    highlights: ["Packed lunch en route", "Overnight at Sal Salinero Hotel (or equivalent), Bed and Breakfast"],
    image: "https://images.unsplash.com/photo-1496567903454-4ccac194beff?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Depart Moshi | Kilimanjaro airport",
    description: "Breakfast at the hotel, then transfer to Kilimanjaro airport for departure or onward travel.",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  },
];

const assistance = [
  "7- and 22-seater minibuses plus 4x4 custom safari vehicles for airport transfers and mountain transport, with VHS/BLU communication and English-speaking driver-guides.",
  "Included onboard: cooler/ice box, bottled mineral water, guidebooks, binoculars.",
  "Expert English-speaking mountain guides familiar with flora, fauna, and culture.",
  "Guides trained on altitude sickness; Gamow bags available on request.",
  "Kilimanjaro National Park rescue team uses VHS communication across stations.",
  "Guides use mobile phones to stay in contact throughout the climb.",
  "Porters carry climbing gear and supplies; personal daypack porters available on request at extra fee.",
  "Chemical eco-friendly toilet provided complimentary for groups of 4+.",
];

const inclusions = [
  "Arrival & departure transfers from Kilimanjaro airport, full briefing, and gear check.",
  "All meals while on climb (Breakfast, Lunch, Dinner).",
  "2-man tents while on the mountain.",
  "All park fees and camping fees.",
  "Guides' and porters' salaries.",
  "English-speaking professional guide.",
  "2 nights accommodation in Moshi on Bed and Breakfast (1 before and 1 after the climb).",
];

const exclusions = [
  "Sleeping bag and climbing gear (available for hire at our offices).",
  "Items of a personal nature.",
  "Traveler's insurance.",
  "Tips to guides and porters.",
];

const cancellation = [
  "Itinerary is flexible and can be modified to suit preferences.",
  "Quotation only until confirmed; prices may change with park fee or supplier adjustments.",
  "30% deposit at confirmation; balance due at least 35 days before departure.",
  "35 days prior: 30% fee; 34–15 days: 50%; 14 days to no-show: 100%.",
  "All wire transfers payable to Eve On Safari; personal bills payable in USD, EUR, or GBP.",
  "Children below 16 years charged 80% of the adult rate.",
];

const priceColumns = ["Each of 1 pax", "Each of 2 pax", "Each of 3-5 pax", "Each of 6-9 pax"];
const priceRows = [
  {
    label: "Sal Salinero",
    values: ["USD 2880", "USD 2478", "USD 2160", "USD 2098"],
  },
];

export default function KilimanjaroMachameRoutePage() {
  return (
    <KiliRoutePage
      title="Kilimanjaro Climb on Machame Route"
      durationLabel="8 days | 7 nights"
      airport="Pick up and drop off Kilimanjaro Airport"
      heroImage="/mountain%20routes/marangu/marangu%20route%20main.webp"
      routeStyle="Whiskey Route (camping)"
      accommodation="Mountain tents"
      difficulty="Challenging"
      acclimatization="High/low via Lava Tower"
      summary={[
        "Classic Machame 'Whiskey' route with camping, dramatic scenery, and strong acclimatization via Lava Tower and Barranco.",
        "Starts southwest at Machame Gate, traverses Shira Plateau, then descends via Mweka for a varied circuit.",
      ]}
      whyChoose={[
        "Iconic Barranco Wall and Lava Tower acclimatization.",
        "Wide scenery mix: rainforest, moorland, alpine desert.",
        "Camping flexibility and a proven summit profile.",
      ]}
      days={days}
      pricingNote="8 Days 7 Nights Kilimanjaro climb on Machame (6 days / 5 nights on the mountain)."
      priceColumns={priceColumns}
      priceRows={priceRows}
      extraPricingNote="Extra day at Karanga Camp: USD 309 per person."
      inclusions={inclusions}
      exclusions={exclusions}
      assistance={assistance}
      cancellation={cancellation}
    />
  );
}
