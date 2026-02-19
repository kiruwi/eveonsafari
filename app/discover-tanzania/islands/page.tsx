export const metadata = {
  title: "Islands | Eve On Safari",
  description: "Guide to Tanzania's islands and coastal escapes.",
};

const islandCards = [
  {
    name: "Zanzibar Island",
    description: "White-sand beaches, Stone Town culture, and easy safari beach extensions.",
  },
  {
    name: "Pemba Island",
    description: "Lush, quiet island known for diving, reefs, and spice farming.",
  },
  {
    name: "Mnemba Island",
    description: "Private island with world-class snorkeling and vibrant marine life.",
  },
  {
    name: "Mafia Island",
    description: "Marine park with whale sharks, diving, and laid-back coastal villages.",
  },
  {
    name: "Fanjove Private Island",
    description: "Remote private island with turquoise lagoons and total seclusion.",
  },
  {
    name: "Chumbe Island Coral Park",
    description: "Protected coral sanctuary with eco-lodges and reef conservation.",
  },
];

export default function IslandsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="mt-3 text-3xl font-semibold text-[#231f20] sm:text-4xl">
          Tanzania islands
        </h1>
        <p className="mt-4 text-base text-[#231f20]/75">
          Add a coastal escape after your safari with reef snorkeling, diving, and relaxed beach
          stays.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {islandCards.map((island) => (
          <div
            key={island.name}
            className="flex h-full flex-col rounded-2xl border border-[#e2d6c7] bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-[#231f20]">{island.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#231f20]/75">{island.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
