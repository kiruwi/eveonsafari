import Image from "next/image";
import Link from "next/link";
import { routes } from "./routes";

export const metadata = {
  title: "Kilimanjaro Trek Routes & Preparation Guide | Eve On Safari",
  description:
    "Compare Kilimanjaro routes, understand difficulty, and plan your climb with clear preparation guidance.",
};

const routeOrder = [
  { slug: "kilimanjaro-marangu-route", label: "Marangu Route" },
  { slug: "kilimanjaro-machame-route", label: "Machame Route" },
  { slug: "kilimanjaro-lemosho-route", label: "Lemosho Route" },
  { slug: "7-day-rongai-route-kilimanjaro-trek", label: "Rongai Route" },
  { slug: "9-days-northern-circuit-route-kilimanjaro-trek", label: "Northern Circuit" },
];

const comparisonRoutes = routeOrder
  .map((route) => {
    const match = routes.find((item) => item.slug === route.slug);
    if (!match) return null;
    return { ...match, displayName: route.label };
  })
  .filter((route): route is (typeof routes)[number] & { displayName: string } => Boolean(route));

export default function TrekkingPage() {
  return (
    <div className="relative z-0 min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src="/Mountain Routes/kilimanjaro.webp"
          alt="Kilimanjaro at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10">
        <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-6 lg:px-0">
          <header className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Kilimanjaro</p>
            <h1 className="mt-4 text-4xl font-semibold text-white font-american-grunge uppercase tracking-[0.05em] sm:text-5xl">
              Kilimanjaro Trek Routes &amp; Preparation Guide
            </h1>
            <p className="mt-4 text-base text-white/85">
              Compare routes, understand difficulty, plan your climb.
            </p>
          </header>

          <section
            id="route-comparison"
            className="scroll-mt-[140px] rounded-[32px] border border-white/12 bg-black/45 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Route comparison</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Compare Kilimanjaro routes</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {comparisonRoutes.map((route) => (
                <Link
                  key={route.slug}
                  href={`/trekking/${route.slug}`}
                  className="group block rounded-[24px] border border-white/10 bg-black/50 p-6 transition hover:border-white/30 hover:bg-black/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Route</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{route.displayName}</h3>
                    </div>
                    <span className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
                      {route.days} days
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    <li><strong className="text-white">Difficulty:</strong> {route.difficulty}</li>
                    <li><strong className="text-white">Crowd level:</strong> {route.crowds}</li>
                    <li><strong className="text-white">Acclimatisation:</strong> {route.acclimatisation}</li>
                    <li><strong className="text-white">Accommodation:</strong> {route.accommodation}</li>
                    <li><strong className="text-white">Typical summit success rate:</strong> {Math.round(route.successRate * 100)}%</li>
                  </ul>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ba7e47]">
                    View route details →
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-white/60">
              Success rates assume standard itineraries and proper acclimatisation.
            </p>
          </section>

          <section className="rounded-[32px] border border-white/12 bg-black/45 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Ready to plan</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Talk to a local Kilimanjaro team</h2>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/plan"
                className="inline-flex items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-[#8a592e]"
              >
                Plan My Climb
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/50"
              >
                Talk to a Guide
              </Link>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/12 bg-black/45 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Preparation</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Prepare for the mountain</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-[20px] border border-white/10 bg-black/50 p-5">
                <h3 className="text-lg font-semibold text-white">Best months to climb</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>January to early March: warm days, clearer mornings.</li>
                  <li>June to October: dry season, cold nights.</li>
                  <li>Late December: short dry window.</li>
                </ul>
              </article>
              <article className="rounded-[20px] border border-white/10 bg-black/50 p-5">
                <h3 className="text-lg font-semibold text-white">Fitness expectations</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Walk 6 to 8 hours per day on uneven terrain.</li>
                  <li>Train with hills, stairs, and loaded day packs.</li>
                  <li>Arrive rested and injury-free.</li>
                </ul>
              </article>
              <article className="rounded-[20px] border border-white/10 bg-black/50 p-5">
                <h3 className="text-lg font-semibold text-white">Altitude safety basics</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Move slowly and keep a steady pace.</li>
                  <li>Drink water consistently through the day.</li>
                  <li>Report symptoms early. Descent is the cure.</li>
                </ul>
              </article>
              <article className="rounded-[20px] border border-white/10 bg-black/50 p-5">
                <h3 className="text-lg font-semibold text-white">Common mistakes</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Choosing too few days to acclimatise.</li>
                  <li>Underpacking warmth for summit night.</li>
                  <li>Skipping acclimatisation hikes.</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/12 bg-black/45 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Packing</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Pack with purpose</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-[20px] border border-white/10 bg-black/50 p-5">
                <h3 className="text-lg font-semibold text-white">Essentials</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Layered clothing for heat and cold.</li>
                  <li>Broken-in hiking boots and socks.</li>
                  <li>Headlamp, sun protection, refillable bottles.</li>
                </ul>
              </article>
              <article className="rounded-[20px] border border-white/10 bg-black/50 p-5">
                <h3 className="text-lg font-semibold text-white">What guides provide</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Mountain tents, dining tents, and cooking gear.</li>
                  <li>Meals, filtered drinking water, and safety checks.</li>
                  <li>Support crew and daily briefings.</li>
                </ul>
              </article>
              <article className="rounded-[20px] border border-white/10 bg-black/50 p-5">
                <h3 className="text-lg font-semibold text-white">What climbers must bring</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Sleeping bag rated for summit night.</li>
                  <li>Personal medication and first-aid basics.</li>
                  <li>Warm gloves, hat, and waterproof shell.</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/12 bg-black/45 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Trust &amp; safety</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">We focus on safe, responsible climbs</h2>
            <div className="mt-6 grid gap-4 text-sm text-white/80 sm:grid-cols-3">
              {[
                "Licensed local guides on every climb.",
                "Crew welfare practices you can verify.",
                "Safety-first pacing and daily health checks.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-white/10 bg-black/50 px-4 py-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
