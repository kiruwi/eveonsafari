import { KiliRoutePage } from "@/components/KiliRoutePage";

const days = [
  {
    title: "Arrive Moshi",
    description:
      "Arrive at Kilimanjaro airport, meet your representative, and transfer to the hotel. Complete briefing and final gear check.",
    highlights: ["Overnight at Sal Salinero Hotel (or equivalent), Bed and Breakfast"],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Moshi - Mandara hut (9,020ft | 2750m)",
    description:
      "Forest approach from Marangu gate to Mandara hut with thick canopy, picnic lunch, and evening hut stay.",
    highlights: ["Packed lunch", "Dinner and overnight at Mandara hut"],
    image: "https://images.unsplash.com/photo-1516386204654-85c52d4d6970?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mandara hut - Horombo hut (12,200ft | 3720m)",
    description:
      "Climb into moorland with expanding views and settle at Horombo hut for the night.",
    highlights: ["Packed lunch en route", "Dinner and overnight at Horombo hut"],
    image: "https://images.unsplash.com/photo-1520357456838-1e06818653f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Horombo acclimatization (Mawenzi hut hike)",
    description:
      "Spend the day hiking up to Mawenzi hut for acclimatization, then return to Horombo for dinner and overnight.",
    highlights: ["Acclimatization hike toward Mawenzi", "Second night at Horombo hut"],
    image: "https://images.unsplash.com/photo-1476611338391-6f395a0ebc71?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Horombo hut - Kibo hut (15,420ft | 4700m)",
    description:
      "Traverse the alpine saddle toward Kibo Hut; early dinner and rest for summit night.",
    highlights: ["Packed lunch at a picnic site", "Overnight at Kibo Hut"],
    image: "https://images.unsplash.com/photo-1518831959410-6f5c2b6fa9d5?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kibo hut - Summit - Horombo hut",
    description:
      "Midnight summit bid via Gilman's Point to Uhuru Peak, then descend to Kibo for brunch and onward to Horombo.",
    highlights: ["Summit via Gilman's Point", "Brunch at Kibo", "Overnight at Horombo hut"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Horombo hut - Moshi",
    description:
      "Descend to the park gate and transfer to Moshi for a celebratory rest.",
    highlights: ["Overnight at Sal Salinero Hotel (or equivalent), Bed and Breakfast"],
    image: "https://images.unsplash.com/photo-1496567903454-4ccac194beff?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Moshi | Kilimanjaro | Depart",
    description:
      "Breakfast at the hotel, then transfer to Kilimanjaro airport for departure or onward travel.",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  },
];

const assistance = [
  "7- and 22-seater minibuses plus 4x4 custom safari vehicles for airport transfers and mountain transport, with VHS/BLU communication and English-speaking driver-guides.",
  "Included onboard: cooler/ice box, bottled mineral water, guidebooks, binoculars.",
  "Expert English-speaking mountain guides familiar with route, flora, and culture.",
  "Guides trained on altitude-related sickness; Gamow bags available on request.",
  "Kilimanjaro National Park rescue team uses VHS communication across stations.",
  "Guides use mobile phones to stay in contact throughout the climb.",
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
    values: ["USD 2695", "USD 2294", "USD 1880", "USD 1835"],
  },
];

export default function KilimanjaroMaranguRoute8DayPage() {
  return (
    <KiliRoutePage
      title="Kilimanjaro Climb on Marangu Route (8 Days)"
      durationLabel="8 days | 7 nights"
      airport="Pick up and drop off Kilimanjaro airport"
      heroImage="/mountain%20routes/marangu/marangu%20route%20main.webp"
      routeStyle="Hut-based 'Coca-Cola' route"
      accommodation="Mountain huts"
      difficulty="Moderate"
      acclimatization="Built-in Mawenzi acclimatization"
      summary={[
        "Extended Marangu itinerary with an extra acclimatization day to boost summit success while keeping hut comfort.",
        "Rainforest to moorland to alpine desert, with a steady summit push via Gilman's Point and a hut descent to Horombo.",
      ]}
      whyChoose={[
        "Comfortable hut overnights without camping.",
        "Extra acclimatization day at Mawenzi for better summit odds.",
        "Direct, no-nonsense line to Uhuru with classic crater views.",
      ]}
      days={days}
      pricingNote="8 Days 7 Nights Kilimanjaro Climb on Marangu Route (6 days / 5 nights on the mountain)."
      priceColumns={priceColumns}
      priceRows={priceRows}
      inclusions={inclusions}
      exclusions={exclusions}
      assistance={assistance}
      cancellation={cancellation}
    />
  );
}
