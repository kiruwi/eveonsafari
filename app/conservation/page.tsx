const impactHighlights = [
  {
    title: "Community Partnerships",
    copy: "Portions of every booking fund scholarships and ranger salaries across Samburu, Maasai Mara, and Okavango partner trusts.",
  },
  {
    title: "Carbon Considerations",
    copy: "We offset every flight and road transfer through vetted regional projects and prioritize electric safari vehicles where available.",
  },
  {
    title: "Wildlife Protection",
    copy: "Guests can join collaring operations, migration counts, or nursery visits in collaboration with Lewa, Sheldrick Trust, and Mara Elephant Project.",
  },
];

const stats = [
  { label: "Scholarships funded", value: "120+" },
  { label: "Rangers supported", value: "45" },
  { label: "Conservation partners", value: "12" },
];

export default function ConservationPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Conservation & Community</p>
          <h1 className="text-4xl font-semibold text-[#231f20]">
            Travel funds the wild spaces we showcase.
          </h1>
          <p className="text-sm text-[#231f20]/80">
            Eve On Safari is a signatory of the Global Tourism Plastics Initiative and allocates at least 5% of
            revenue to long-term conservation programs.
          </p>
        </header>

        <section id="partners" className="grid gap-6 md:grid-cols-3">
          {impactHighlights.map((highlight) => (
            <article key={highlight.title} className="rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Impact</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#231f20]">{highlight.title}</h2>
              <p className="mt-3 text-sm text-[#231f20]/80">{highlight.copy}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[32px] border border-[#c3c3c3] bg-[#c3c3c3]/20 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Impact stats</p>
          <div className="mt-6 grid gap-6 text-center md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[24px] bg-white p-6 shadow-sm">
                <p className="text-3xl font-semibold text-[#231f20]">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#231f20]/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="get-involved" className="rounded-[32px] border border-[#c3c3c3] bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Get involved</p>
          <div className="mt-4 space-y-4 text-sm text-[#231f20]/80">
            <p>
              Add a conservation fee to your booking, sponsor an anti-poaching drone, or request volunteer time
              at our partner projects. We’ll tailor options based on your travel dates and interests.
            </p>
            <p>
              Email <a href="mailto:impact@eveonsafari.com" className="text-[#ba7e47]">impact@eveonsafari.com</a>{" "}
              for a full partnership dossier.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
