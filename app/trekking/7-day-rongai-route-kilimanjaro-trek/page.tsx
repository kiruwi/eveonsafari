import { KiliRoutePage } from "@/components/KiliRoutePage";

const days = [
  {
    title: "Arrive Kilimanjaro Airport, transfer to Arusha/Moshi",
    description:
      "Meet your driver after immigration and transfer to your hotel. Trek briefing, gear check, and time to rent missing items. Extra rest day recommended if time allows.",
    highlights: ["Trek orientation with your guide", "Gear check and rentals", "Hotel overnight"],
    image: "/Mountain%20Routes/rongai/Day%201.webp",
  },
  {
    title: "Rongai Gate (Nale Moru) to Simba Camp",
    description:
      "Drive to Nale Moru village near the Kenyan border, register at Marangu, then start the climb through farmland and forest to Simba Camp on the moorland edge.",
    highlights: [
      "Elevation: 2000m / 6560ft to 2650m / 8700ft",
      "Distance: ~6km | 3-4 hours",
      "Habitat: Montane Forest",
    ],
    image: "/Mountain%20Routes/rongai/Day%202.webp",
  },
  {
    title: "Simba Camp to Second Cave",
    description: "Steady ascent with wide views of Kibo and the Eastern Icefields, arriving at Second Cave.",
    highlights: [
      "Elevation: 2650m / 8700ft to 3450m / 11,300ft",
      "Distance: ~6km | 3-4 hours",
      "Habitat: Moorland",
    ],
    image: "/Mountain%20Routes/rongai/Day%203.webp",
  },
  {
    title: "Second Cave to Kikelewa Camp",
    description: "Traverse toward Mawenzi's jagged peaks and camp in a sheltered valley near giant Senecios.",
    highlights: [
      "Elevation: 3450m / 11,300ft to 3600m / 11,800ft",
      "Distance: ~9km | 2-3 hours",
      "Habitat: Semi-desert",
    ],
    image: "/Mountain%20Routes/rongai/Day%204.webp",
  },
  {
    title: "Kikelewa to Mawenzi Tarn (acclimatization)",
    description:
      "Short, steep climb to Mawenzi Tarn directly beneath Mawenzi spires. Afternoon free for acclimatization hikes around the tarn.",
    highlights: [
      "Elevation: 3600m / 11,800ft to 4330m / 14,200ft",
      "Distance: ~6km | 3-4 hours",
      "Habitat: Semi-desert",
    ],
    image: "/Mountain%20Routes/rongai/5.webp",
  },
  {
    title: "Mawenzi Tarn to Kibo Hut",
    description: "Cross the barren Saddle between Mawenzi and Kibo to Kibo Hut, resting ahead of summit night.",
    highlights: [
      "Elevation: 4330m / 14,200ft to 4750m / 15,600ft",
      "Distance: ~9km | 4-5 hours",
      "Habitat: Alpine Desert",
    ],
    image: "/Mountain%20Routes/rongai/6.webp",
  },
  {
    title: "Kibo Hut to Uhuru Peak, descend to Horombo",
    description:
      "Midnight ascent to Gilman's Point and Uhuru Peak for sunrise, then descend to Kibo for brunch and onward to Horombo Hut.",
    highlights: [
      "Elevation: 4750m / 15,600ft to 5895m / 19,340ft, down to 3700m / 12,200ft",
      "Distance: ~6km up / 15km down",
      "Hiking Time: 6-8 hours up, 5-6 hours down",
    ],
    image: "/Mountain%20Routes/rongai/7.webp",
  },
  {
    title: "Horombo Hut to Marangu Gate, return to town",
    description:
      "Descend through moorland and forest via Mandara to Marangu Gate for certificates, then drive back to your hotel for hot showers and celebration.",
    highlights: [
      "Elevation: 3700m / 12,200ft to 1700m / 5500ft",
      "Distance: ~20km | 4-5 hours",
      "Habitat: Forest",
    ],
    image: "/Mountain%20Routes/rongai/8.webp",
  },
];

const assistance = [
  "Airport transfers and mountain transport with communication-equipped vehicles.",
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
    values: ["USD 2985", "USD 2420", "USD 2190", "USD 2100"],
  },
];

export default function RongaiRoutePage() {
  return (
    <KiliRoutePage
      title="7 Days Rongai Route Kilimanjaro Climb"
      durationLabel="7 days | 6 nights (plus arrival/departure)"
      airport="Pick up and drop off at Kilimanjaro Airport"
      heroImage="/Mountain%20Routes/rongai/rongai%20bg.webp"
      routeStyle="Northern approach via Rongai, descent via Marangu"
      accommodation="Mountain tents; Horombo hut on descent"
      difficulty="Moderate"
      acclimatization="Mawenzi Tarn overnight plus gradual saddle crossing"
      summary={[
        "Quieter northern approach from Nale Moru with steady gradients and panoramic views of Kenya and Mawenzi.",
        "Includes an acclimatization stop at Mawenzi Tarn before summit via Gilman's Point and descent along the Marangu side.",
      ]}
      whyChoose={[
        "Less-crowded northern slopes with steady ascent.",
        "Mawenzi Tarn acclimatization boosts summit success.",
        "Different ascent/descent sides for varied scenery.",
      ]}
      days={days}
      pricingNote="7 Days 6 Nights Kilimanjaro Climb on Rongai Route (6 days / 5 nights on the mountain)."
      priceColumns={priceColumns}
      priceRows={priceRows}
      inclusions={inclusions}
      exclusions={exclusions}
      assistance={assistance}
      cancellation={cancellation}
    />
  );
}
