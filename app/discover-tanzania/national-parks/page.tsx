export const metadata = {
  title: "National Parks | Eve On Safari",
  description: "Overview of Tanzania's national parks.",
};

const parkCards = [
  {
    name: "Serengeti National Park",
    description: "Endless plains and the Great Migration with year-round big-cat sightings.",
  },
  {
    name: "Ngorongoro Conservation Area",
    description: "World-famous crater, dense wildlife, and pastoral Maasai landscapes.",
  },
  {
    name: "Mount Kilimanjaro",
    description: "Africa's highest peak with rainforest-to-alpine trekking and summit views.",
  },
  {
    name: "Mikumi National Park",
    description: "Easy access from Dar es Salaam with open plains and abundant wildlife.",
  },
  {
    name: "Tarangire National Park",
    description: "Elephant herds, baobabs, and riverfront game drives in the dry season.",
  },
  {
    name: "Lake Manyara National Park",
    description: "Rift Valley lake, groundwater forest, and famous tree-climbing lions.",
  },
  {
    name: "Makuyuni Wildlife Park",
    description: "A quieter northern stopover with open landscapes and wildlife viewing.",
  },
  {
    name: "Lake Natron",
    description: "Flamingo breeding lake, volcanic scenery, and waterfall hikes.",
  },
  {
    name: "Arusha National Park",
    description: "Lush forests, Momella Lakes, and a convenient day trip from Arusha.",
  },
  {
    name: "Ndutu Region",
    description: "Seasonal migration calving area on the southern Serengeti plains.",
  },
  {
    name: "Nyerere National Park",
    description: "Vast southern wilderness shaped by Rufiji River channels and boat safaris.",
  },
];

export default function NationalParksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ba7e47]">Discover Tanzania</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#231f20] sm:text-4xl">
          Tanzania national parks
        </h1>
        <p className="mt-4 text-base text-[#231f20]/75">
          From iconic savannahs to volcanic highlands, these parks and regions showcase the
          best of Tanzania&apos;s wildlife and landscapes.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {parkCards.map((park) => (
          <div
            key={park.name}
            className="flex h-full flex-col rounded-2xl border border-[#e2d6c7] bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-[#231f20]">{park.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#231f20]/75">{park.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
