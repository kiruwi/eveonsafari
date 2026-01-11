import { KiliRoutePage } from "@/components/KiliRoutePage";

const days = [
  {
    title: "Arrive Moshi",
    description:
      "Arrive at Kilimanjaro airport, meet your representative, transfer to the hotel, and complete the briefing plus final gear check.",
    highlights: ["Overnight at Sal Salinero Hotel (or equivalent), Bed and Breakfast"],
    image: "/Mountain%20Routes/marangu/arrival.webp",
  },
  {
    title: "Moshi - Mandara hut (9,020ft | 2750m)",
    description:
      "Begin the forest ascent from Marangu gate to Mandara hut through thick rainforest, with lunch on the trail.",
    highlights: ["Packed trail lunch", "Dinner and overnight at Mandara hut"],
    image: "/Mountain%20Routes/marangu/mandara-hut.webp",
  },
  {
    title: "Mandara hut - Horombo hut (12,200ft | 3720m)",
    description:
      "Climb through moorland toward Horombo hut, gaining views toward Mawenzi and the saddle.",
    highlights: ["Packed lunch en route", "Dinner and overnight at Horombo hut"],
    image: "/Mountain%20Routes/marangu/horombo.webp",
  },
  {
    title: "Horombo hut - Kibo hut (15,420ft | 4700m)",
    description:
      "Cross the alpine saddle toward Kibo hut, settling in for an early night ahead of summit push.",
    highlights: ["Packed lunch at a picnic site", "Early dinner and rest at Kibo hut"],
    image: "/Mountain%20Routes/marangu/kibo.webp",
  },
  {
    title: "Kibo hut - Summit - Horombo hut",
    description:
      "Midnight ascent via Gilman's Point to Uhuru Peak for sunrise, then descend to Kibo for brunch before continuing to Horombo hut.",
    highlights: ["Summit via Gilman's Point", "Breakfast/brunch at Kibo", "Overnight at Horombo hut"],
    image: "/Mountain%20Routes/marangu/hut%202.webp",
  },
  {
    title: "Horombo hut - Moshi",
    description:
      "Descend to the park gate, then drive back to Moshi for a hot shower and celebratory rest.",
    highlights: ["Overnight at Sal Salinero Hotel (or equivalent), Bed and Breakfast"],
    image: "/Mountain%20Routes/marangu/moshi-mandara.webp",
  },
  {
    title: "Moshi | Kilimanjaro | Depart",
    description:
      "Breakfast at the hotel, then transfer to Kilimanjaro airport for departure or onward travel.",
    image: "/Mountain%20Routes/marangu/arrival.webp",
  },
];

const assistance = [
  "7- and 22-seater minibuses plus 4x4 custom safari vehicles for airport transfers and mountain transport, all with VHS/BLU communication and English-speaking driver-guides.",
  "Included onboard: cooler/ice box, bottled mineral water, guidebooks, binoculars.",
  "Expert English-speaking mountain guides familiar with the route, culture, and geography.",
  "Guides trained on altitude-related sickness and response; Gamow bags available on request.",
  "Kilimanjaro National Park rescue team uses VHS communication across mountain stations.",
  "Guides use mobile phones to stay in contact with offices throughout the climb.",
  "Porters carry climbing gear and supplies; personal daypack porters available on request at extra fee.",
  "Chemical eco-friendly toilet provided complimentary for groups of 4+.",
];

const inclusions = [
  "Arrival & departure transfers from Kilimanjaro airport, full briefing, and gear check.",
  "All meals while on climb (Breakfast, Lunch, Dinner).",
  "Mountain hut accommodation throughout the trek.",
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
  "Children below 16 years charged 80% of the adult rate.",
];

const priceColumns = ["Each of 1 pax", "Each of 2 pax", "Each of 3-5 pax", "Each of 6-9 pax"];
const priceRows = [
  {
    label: "Sal Salinero",
    values: ["USD 2449", "USD 2024", "USD 1810", "USD 1735"],
  },
];

export default function KilimanjaroMaranguRoutePage() {
  return (
    <KiliRoutePage
      title="Kilimanjaro Climb on Marangu Route"
      durationLabel="7 days | 6 nights"
      airport="Pick up and drop off at Kilimanjaro Airport"
      heroImage="/Mountain%20Routes/marangu/marangu%20route%20main.webp"
      routeStyle="Hut-based 'Coca-Cola' route"
      accommodation="Mountain huts"
      difficulty="Moderate"
      acclimatization="Built-in hut stages"
      summary={[
        "Marangu is the classic hut-based route with steady gradients, sweeping views of Mawenzi, and a direct summit push via Gilman's Point.",
        "Ideal for climbers who prefer structured overnights and gentler footing, with forests, moorland, and alpine desert leading to Uhuru Peak.",
      ]}
      whyChoose={[
        "Only hut-based route on Kilimanjaro for extra comfort.",
        "Direct summit push via Gilman's Point to Uhuru.",
        "Balanced acclimatization with staged altitude gains.",
      ]}
      days={days}
      pricingNote="7 Days 6 Nights Kilimanjaro Climb on Marangu Route (5 days / 4 nights on the mountain)."
      priceColumns={priceColumns}
      priceRows={priceRows}
      extraPricingNote="Extra day at Horombo hut: USD 309 per person."
      inclusions={inclusions}
      exclusions={exclusions}
      assistance={assistance}
      cancellation={cancellation}
    />
  );
}
