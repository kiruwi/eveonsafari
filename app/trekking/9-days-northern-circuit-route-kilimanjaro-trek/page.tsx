import { KiliRoutePage } from "@/components/KiliRoutePage";

const days = [
  {
    title: "Arrive Kilimanjaro Airport, transfer to Moshi",
    description:
      "Meet your driver after immigration, transfer to Moshi, and complete trek briefing, gear check, and rentals. Extra rest day recommended if time allows.",
    highlights: ["Trek orientation with your guide", "Gear check and rental support", "Hotel overnight"],
    image: "/Mountain%20Routes/northern/Day%201.webp",
  },
  {
    title: "Londorossi Gate to Mti Mkubwa Camp",
    description:
      "Drive to Londorossi, 4x4 to Lemosho Glades, and hike through lush rainforest to Big Tree (Mti Mkubwa) camp.",
    highlights: [
      "Elevation: 1830m / 6000ft to 2650m / 8700ft",
      "Distance: ~6km | 2-3 hours",
      "Habitat: Montane Forest",
    ],
    image: "/Mountain%20Routes/northern/Day%202.webp",
  },
  {
    title: "Mti Mkubwa to Shira 1 Camp",
    description:
      "Climb out of the forest into the heather zone, crest Shira Ridge, and descend slightly to Shira 1 on the plateau.",
    highlights: [
      "Elevation: 2650m / 8700ft to 3500m / 11,500ft",
      "Distance: ~8km | 4-5 hours",
      "Habitat: Moorland",
    ],
    image: "/Mountain%20Routes/northern/Day%203.webp",
  },
  {
    title: "Shira 1 to Shira 2 Camp",
    description: "Traverse the Shira Plateau with gentle gains to Shira 2; optional acclimatization walks in the afternoon.",
    highlights: [
      "Elevation: 3500m / 11,500ft to 3850m / 12,600ft",
      "Distance: ~8km | 4-5 hours",
      "Habitat: Moorland",
    ],
    image: "/Mountain%20Routes/northern/Day%204.webp",
  },
  {
    title: "Shira 2 to Moir Hut (via Lava Tower acclimatization)",
    description:
      "Continue east toward Lava Tower for high/low acclimatization, then swing north to the quieter Moir Hut below the northern slopes.",
    highlights: [
      "Elevation gain to ~4600m then sleep lower at ~4200m",
      "Distance: ~9km | 5-6 hours",
      "Habitat: Alpine Desert",
    ],
    image: "/Mountain%20Routes/northern/Day%205.webp",
  },
  {
    title: "Moir Hut to Buffalo Camp",
    description:
      "Climb out of Moir Valley to the Lent Hills ridge, take in northern vistas across the plains, and camp at Buffalo.",
    highlights: [
      "Elevation: ~4200m / 13,780ft to ~4020m / 13,190ft",
      "Distance: ~8-9km | 5-6 hours",
      "Habitat: Alpine Desert",
    ],
    image: "/Mountain%20Routes/northern/Day%206.webp",
  },
  {
    title: "Buffalo Camp to Third Cave",
    description:
      "Traverse the remote northern flank with rolling terrain toward Third Cave, keeping a gradual acclimatization profile.",
    highlights: [
      "Elevation: ~4020m / 13,190ft to ~3936m / 12,900ft",
      "Distance: ~7km | 4-5 hours",
      "Habitat: Alpine Desert",
    ],
    image: "/Mountain%20Routes/northern/Day%207.webp",
  },
  {
    title: "Third Cave to School Hut",
    description:
      "Head southeast to School Hut at the base of Kibo's eastern approach; early dinner and rest before summit night.",
    highlights: [
      "Elevation: ~3936m / 12,900ft to 4800m / 15,750ft",
      "Distance: ~5km | 4-5 hours",
      "Habitat: Alpine Desert",
    ],
    image: "/Mountain%20Routes/northern/Day%208.webp",
  },
  {
    title: "School Hut to Uhuru Peak, descend to Mweka Camp",
    description:
      "Summit push via Gilman's or Stella Point to Uhuru Peak for sunrise, then descend to Barafu for brunch and onward to Mweka Camp.",
    highlights: [
      "Elevation: 4800m / 15,750ft to 5895m / 19,340ft, down to ~3090m / 10,150ft",
      "Distance: ~5km up / 13km down",
      "Hiking Time: 6-8 hours up, 5-6 hours down",
    ],
    image: "/Mountain%20Routes/northern/Day%209.webp",
  },
  {
    title: "Mweka Camp to Mweka Gate, depart",
    description:
      "Final descent through forest to Mweka Gate for certificates and farewell, then drive back to town for onward plans.",
    highlights: ["Distance: ~10km | 3-4 hours", "Habitat: Forest"],
    image: "/Mountain%20Routes/northern/Day%2010.webp",
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
  "2 hotel nights on Bed and Breakfast (1 before and 1 after the climb).",
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
    values: ["USD 4325", "USD 3595", "USD 3385", "USD 3250"],
  },
];

export default function NorthernCircuitRoutePage() {
  return (
    <KiliRoutePage
      title="9 Days Northern Circuit Route Kilimanjaro Climb"
      durationLabel="9 days | 8 nights (plus arrival/departure)"
      airport="Pick up and drop off at Kilimanjaro Airport"
      heroImage="/Mountain%20Routes/northern/northern%20bg.webp"
      routeStyle="Northern Circuit via Lemosho approach"
      accommodation="Mountain tents"
      difficulty="Challenging"
      acclimatization="Longest time on the mountain with high/low days and northern traverse"
      summary={[
        "Longest and most scenic Kilimanjaro route circling the northern slopes for maximum acclimatization and panoramic views.",
        "Begins with the Lemosho approach, traverses the quiet northern flank, and summits from School Hut before descending via Mweka.",
      ]}
      whyChoose={[
        "Best acclimatization profile with low traffic.",
        "Remote northern camps and sweeping views into Kenya.",
        "High summit success rates with gradual ascent.",
      ]}
      days={days}
      pricingNote="9 Days 8 Nights Kilimanjaro Climb on the Northern Circuit (8 days / 7 nights on the mountain)."
      priceColumns={priceColumns}
      priceRows={priceRows}
      inclusions={inclusions}
      exclusions={exclusions}
      assistance={assistance}
      cancellation={cancellation}
    />
  );
}
