import Link from "next/link";

type PrepSectionProps = {
  id?: string;
};

export default function PrepSection({ id = "prep" }: PrepSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-[140px] rounded-[32px] border border-white/12 bg-black/45 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-[#f5d9b0]">Trekking prep</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">Trekking prep</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="rounded-[24px] border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold text-white">Best time to climb</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>Jan-Feb: Warm, clear mornings with fewer afternoon storms.</li>
            <li>Jun-Oct: Peak season with the driest trails and colder nights.</li>
            <li>Nov-Dec: Short rains, greener slopes, and lighter crowds.</li>
          </ul>
        </article>

        <article className="rounded-[24px] border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold text-white">Fitness baseline</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>Comfortable hiking 6-8 hours on consecutive days.</li>
            <li>3-4 cardio sessions per week plus light strength work.</li>
            <li>Train with a daypack and boots you will climb in.</li>
          </ul>
        </article>

        <article className="rounded-[24px] border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold text-white">Altitude tips</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>Do: Drink water regularly and keep a steady, slow pace.</li>
            <li>Do: Sleep early and eat even when your appetite dips.</li>
            <li>Don&apos;t: Skip acclimatisation hikes or rush the summit day.</li>
            <li>Don&apos;t: Ignore headaches, nausea, or dizziness.</li>
          </ul>
          <Link
            href="/altitude"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#f5d9b0] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
          >
            Altitude guide
          </Link>
        </article>

        <article className="rounded-[24px] border border-white/10 bg-black/30 p-6">
          <h3 className="text-lg font-semibold text-white">Packing essentials</h3>
          <ul className="mt-3 grid gap-2 text-sm text-white/75 sm:grid-cols-2">
            <li>Layered base + mid layers</li>
            <li>Waterproof shell</li>
            <li>Insulated jacket</li>
            <li>Broken-in boots</li>
            <li>Warm hat + gloves</li>
            <li>Headlamp + batteries</li>
            <li>Water bottles</li>
            <li>Trekking poles</li>
            <li>Sunscreen + lip balm</li>
            <li>Basic first-aid</li>
          </ul>
          <Link
            href="/packing"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#f5d9b0] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
          >
            Packing list
          </Link>
        </article>
      </div>

      <article className="mt-6 rounded-[24px] border border-white/10 bg-black/30 p-6">
        <h3 className="text-lg font-semibold text-white">Common mistakes</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/75">
          <li>Choosing the shortest route without enough acclimatisation.</li>
          <li>Overpacking or skipping warm summit layers.</li>
          <li>Underestimating sun exposure and dehydration.</li>
          <li>Not breaking in boots before the trek.</li>
          <li>Trying to match another hiker&apos;s pace.</li>
        </ul>
      </article>
    </section>
  );
}
