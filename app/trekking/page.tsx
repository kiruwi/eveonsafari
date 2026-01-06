import Image from "next/image";
import Link from "next/link";
import CompareTable from "./_components/CompareTable";
import Newsletter from "./_components/Newsletter";
import PrepSection from "./_components/PrepSection";
import RouteCard from "./_components/RouteCard";
import { routes } from "./routes";

export const metadata = {
  title: "Kilimanjaro Routes & Trekking Prep | Eve On Safari",
  description:
    "Compare Kilimanjaro routes by difficulty, acclimatisation, crowds, and accommodation to choose the right trek.",
};

const faqItems = [
  {
    question: "Which route is best for first-timers?",
    answer:
      "Routes with strong acclimatisation and moderate difficulty, like Lemosho or Machame 8-day, are best for first-time climbers.",
  },
  {
    question: "How many days should I choose?",
    answer:
      "Seven to nine days gives most climbers enough acclimatisation time; shorter routes are tougher on the body.",
  },
  {
    question: "How do I reduce altitude sickness risk?",
    answer:
      "Choose a longer itinerary, climb slowly, hydrate consistently, and take acclimatisation hikes seriously.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

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
            <p className="text-xs uppercase tracking-[0.4em] text-[#f5d9b0]">Kilimanjaro</p>
            <h1 className="mt-4 text-4xl font-semibold text-white font-american-grunge uppercase tracking-[0.05em] sm:text-5xl">
              Kilimanjaro routes and trekking prep
            </h1>
            <p className="mt-4 text-base text-white/85">
              Compare Kilimanjaro routes by difficulty, acclimatisation, crowd level,
              and accommodation.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="#compare"
                className="inline-flex items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-sm motion-safe:transition motion-reduce:transition-none hover:bg-[#8a592e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/70"
              >
                Compare routes
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white motion-safe:transition motion-reduce:transition-none hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/70"
              >
                Talk to a guide
              </Link>
            </div>
          </header>

          <section
            id="routes"
            className="scroll-mt-[140px] rounded-[32px] border border-white/12 bg-black/45 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5d9b0]">Route list</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white">Choose your route</h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  Compare all seven itineraries by duration, difficulty, and success
                  rate before you commit.
                </p>
              </div>
              <Link
                href="#compare"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white motion-safe:transition motion-reduce:transition-none hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
              >
                Compare all routes
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {routes.map((route) => (
                <RouteCard key={route.slug} route={route} />
              ))}
            </div>
          </section>

          <section id="compare" className="scroll-mt-[140px]">
            <CompareTable routes={routes} />
          </section>

          <PrepSection />

          <section className="rounded-[32px] border border-white/12 bg-black/45 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5d9b0]">Travel with confidence</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Why climbers choose us</h2>
            <div className="mt-6 grid gap-4 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Licensed local guides",
                "Fair crew treatment",
                "Safety-first itineraries",
                "Transparent pricing",
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

          <Newsletter />

          <section
            id="faq"
            className="scroll-mt-[140px] rounded-[32px] border border-white/12 bg-black/45 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5d9b0]">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Trekking FAQs</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[24px] border border-white/10 bg-black/50 p-6"
                >
                  <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                  <p className="mt-3 text-sm text-white/75">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
