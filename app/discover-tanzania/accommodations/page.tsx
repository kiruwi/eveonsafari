export const metadata = {
  title: "Accommodations | Eve On Safari",
  description: "Lodges, camps, and places to stay in Tanzania.",
};

const accommodations = [
  "Salinero Serengeti Tented Lodge",
  "Tukaone Weavers Serengeti Camp",
  "The Canopy Migration Camp",
  "One Nature Nyaruswiga Serengeti",
  "Ngorongoro Lion’s Paw Camp",
  "Baobab Mara Luxury Camp",
  "Serengeti Mara River Camp by Karibu",
  "Kiriche Luxury Camp",
  "Singita Sasakwa Lodge",
  "The Manor at Ngorongoro by Elewana",
  "Ngorongoro Coffee Lodge",
  "Mara View Lodge",
];

export default function AccommodationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ba7e47]">
          Tented Camps, Lodges &amp; Accommodation
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#231f20] sm:text-4xl">
          Tanzania accommodations
        </h1>
        <p className="mt-4 text-base text-[#231f20]/75">Serengeti / Ndutu / Ngorongoro</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((name) => (
          <div
            key={name}
            className="flex h-full flex-col rounded-2xl border border-[#e2d6c7] bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-[#231f20]">{name}</h2>
            <p className="mt-3 text-sm text-[#231f20]/60">Serengeti / Ndutu / Ngorongoro</p>
          </div>
        ))}
      </div>
    </div>
  );
}
