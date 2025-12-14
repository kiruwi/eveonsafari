import { KiliRoutePage } from "@/components/KiliRoutePage";

const days = [
  {
    title: "Arrive Kilimanjaro Airport, transfer to Moshi",
    description:
      "Meet your driver at Kilimanjaro Airport after immigration and transfer to your hotel in Moshi for briefing, gear check, and rest. Extra rest day recommended if time allows.",
    highlights: ["Trek orientation with your guide", "Gear check and rental support", "Hotel overnight in Moshi"],
  },
  {
    title: "Umbwe Gate to Umbwe Cave Camp",
    description:
      "Drive to Umbwe Gate and begin a steep, direct climb through thick rainforest along the Umbwe ridge to Umbwe Cave.",
    highlights: [
      "Elevation: 1660m / 5450ft to 2850m / 9350ft",
      "Distance: ~11km | 5-6 hours",
      "Habitat: Montane Forest",
    ],
  },
  {
    title: "Umbwe Cave to Barranco Camp (via Lava Tower)",
    description:
      "Continue up toward the Shira Plateau and contour southeast toward Lava Tower, then descend to sleep lower at Barranco for acclimatization.",
    highlights: [
      "Elevation: 2850m / 9350ft to 4000m / 13,000ft",
      "Distance: ~6km | 4-5 hours",
      "Habitat: Semi-desert",
    ],
  },
  {
    title: "Barranco Camp to Karanga Camp",
    description:
      "Climb the Barranco Wall, traverse ridges and valleys, and reach Karanga Camp where the Mweka Trail connects.",
    highlights: [
      "Elevation: 4000m / 13,000ft to 4050m / 13,250ft",
      "Distance: ~5km | 3-4 hours",
      "Habitat: Alpine Desert",
    ],
  },
  {
    title: "Karanga Camp to Barafu Camp",
    description:
      "Make the final pre-summit push to Barafu, completing the Southern Circuit with multiple summit viewpoints. Early dinner and rest ahead of summit night.",
    highlights: [
      "Elevation: 4050m / 13,250ft to 4700m / 15,350ft",
      "Distance: ~4km | 3-4 hours",
      "Habitat: Alpine Desert",
    ],
  },
  {
    title: "Barafu to Uhuru Peak, descend to Mweka Camp",
    description:
      "Midnight start to Stella Point and Uhuru Peak for sunrise. Descend back to Barafu for brunch, then continue down to Mweka Camp.",
    highlights: [
      "Elevation: 4700m / 15,350ft to 5895m / 19,340ft, down to 3090m / 10,150ft",
      "Distance: ~5km up / 13km down",
      "Hiking Time: 5-7 hours up, 5-6 hours down",
    ],
  },
  {
    title: "Mweka Camp to Mweka Gate, depart",
    description:
      "Descend through moorland and forest to Mweka Gate for certificates and farewell. Transfer to Moshi/Arusha for onward travel.",
    highlights: [
      "Distance: ~10km | 3-4 hours",
      "Habitat: Forest",
    ],
  },
];

const assistance = [
  "Airport transfers and mountain transport in 4x4 or minibuses with communication equipment.",
  "Cooler/ice box, bottled water, guidebooks, binoculars in vehicles.",
  "English-speaking professional mountain guides trained on altitude response; Gamow bags on request.",
  "Park rescue team coverage; guides use mobile/VHF to stay in touch.",
  "Porters carry group gear; personal daypack porters available on request.",
  "Chemical eco-friendly toilet for groups of 4+.",
];

const inclusions = [
  "Arrival/departure transfers, full briefing, and gear check.",
  "All meals on the climb (Breakfast, Lunch, Dinner).",
  "Mountain tent accommodation (2-man tents).",
  "All park and camping fees; guides' and porters' salaries.",
  "English-speaking professional guide.",
  "2 hotel nights in Moshi on Bed and Breakfast (1 before and 1 after the climb).",
];

const exclusions = [
  "Sleeping bags and climbing gear (available for hire).",
  "Items of a personal nature.",
  "Traveler's insurance.",
  "Tips to guides and porters.",
];

const cancellation = [
  "Safari plan is flexible and can be modified to suit preferences.",
  "Quotation valid until confirmed; subject to park fee or supplier changes.",
  "30% deposit on confirmation; balance due at least 35 days before start.",
  "35+ days prior: 30% fee; 34-15 days: 50%; 14 days to no-show: 100%.",
  "All wire transfers payable to Eve On Safari; personal bills payable in USD, EUR, or GBP.",
  "Children under 16 years old are charged 80% of the adult rate.",
];

const priceColumns = ["Each of 1 pax", "Each of 2 pax", "Each of 3-5 pax", "Each of 6-9 pax"];
const priceRows = [
  {
    label: "Midrange camping",
    values: ["USD 2890", "USD 2325", "USD 2150", "USD 2085"],
  },
];

export default function UmbweRoutePage() {
  return (
    <KiliRoutePage
      title="6 Days Umbwe Route Kilimanjaro Climb"
      durationLabel="6 days | 5 nights (plus arrival/departure)"
      airport="Pick up and drop off at Kilimanjaro Airport"
      heroImage="/mountain%20routes/marangu/marangu%20route%20main.webp"
      routeStyle="Steep, direct ridge ascent"
      accommodation="Mountain tents"
      difficulty="Very challenging"
      acclimatization="Short, steep profile with high/low overnights"
      summary={[
        "Shortest and steepest Kilimanjaro approach via the Umbwe ridge, linking into the Southern Circuit at Barranco.",
        "Best for experienced, fit climbers comfortable with sustained elevation gain before summit via Stella Point.",
      ]}
      whyChoose={[
        "Fast, direct ascent with minimal crowds.",
        "Southern Circuit views after joining at Barranco.",
        "Efficient summit profile for seasoned trekkers.",
      ]}
      days={days}
      pricingNote="6 Days 5 Nights Kilimanjaro Climb on Umbwe Route (5 days / 4 nights on the mountain)."
      priceColumns={priceColumns}
      priceRows={priceRows}
      inclusions={inclusions}
      exclusions={exclusions}
      assistance={assistance}
      cancellation={cancellation}
    />
  );
}
