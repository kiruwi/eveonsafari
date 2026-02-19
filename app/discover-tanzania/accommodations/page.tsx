import Image from "next/image";

export const metadata = {
  title: "Accommodations | Eve On Safari",
  description: "Lodges, camps, and places to stay in Tanzania.",
};

const accommodations = [
  {
    name: "Salinero Serengeti Tented Lodge",
    image: "/accomodation photos/salinero.webp",
    layout: "lg:col-span-7 lg:row-span-2",
  },
  {
    name: "Tukaone Weavers Serengeti Camp",
    image: "/accomodation photos/tukaone.webp",
    layout: "lg:col-span-5 lg:row-span-1",
  },
  {
    name: "The Canopy Migration Camp",
    image: "/accomodation photos/canopy.webp",
    layout: "lg:col-span-5 lg:row-span-1",
  },
  {
    name: "One Nature Nyaruswiga Serengeti",
    image: "/accomodation photos/one with nature.webp",
    layout: "lg:col-span-4 lg:row-span-1",
  },
  {
    name: "Ngorongoro Lion’s Paw Camp",
    image: "/accomodation photos/ngorongoro.webp",
    layout: "lg:col-span-4 lg:row-span-1",
  },
  {
    name: "Baobab Mara Luxury Camp",
    image: "/accomodation photos/Baobab Mara Luxury Camp.webp",
    layout: "lg:col-span-4 lg:row-span-1",
  },
  {
    name: "Serengeti Mara River Camp by Karibu",
    image: "/accomodation photos/Serengeti Mara River Camp by Karibu.webp",
    layout: "lg:col-span-6 lg:row-span-1",
  },
  {
    name: "Kiriche Luxury Camp",
    image: "/accomodation photos/Kiriche Luxury Camp.webp",
    layout: "lg:col-span-3 lg:row-span-1",
  },
  {
    name: "Singita Sasakwa Lodge",
    image: "/accomodation photos/Singita Sasakwa Lodge.webp",
    layout: "lg:col-span-3 lg:row-span-1",
  },
  {
    name: "The Manor at Ngorongoro by Elewana",
    image: "/accomodation photos/The Manor at Ngorongoro by Elewana.webp",
    layout: "lg:col-span-3 lg:row-span-1",
  },
  {
    name: "Ngorongoro Coffee Lodge",
    image: "/accomodation photos/Ngorongoro Coffee Lodge.webp",
    layout: "lg:col-span-4 lg:row-span-1",
  },
  {
    name: "Mara View Lodge",
    image: "/accomodation photos/Mara View Lodge.webp",
    layout: "lg:col-span-5 lg:row-span-1",
  },
];

export default function AccommodationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="mt-3 text-3xl font-semibold text-[#231f20] sm:text-4xl">
          Tanzania accommodations
        </h1>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:auto-rows-[170px] lg:grid-flow-dense lg:grid-cols-12">
        {accommodations.map((accommodation) => (
          <article
            key={accommodation.name}
            className={`group relative min-h-[240px] overflow-hidden rounded-2xl border border-[#e2d6c7] shadow-sm sm:min-h-[280px] lg:min-h-0 ${accommodation.layout}`}
          >
            <Image
              src={accommodation.image}
              alt={accommodation.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">{accommodation.name}</h2>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
