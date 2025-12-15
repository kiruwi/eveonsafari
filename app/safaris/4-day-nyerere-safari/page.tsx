import Image from "next/image";
import Link from "next/link";
import { PesapalCheckoutButton } from "@/components/PesapalCheckoutButton";
import { safariPackagePricingUSD } from "@/lib/pricing";

const overview =
  "Nyerere National Park (formerly Selous) delivers raw wilderness with river safaris, wide open woodlands, and excellent elephant and wild dog sightings. This four-day plan pairs boat, walking, and classic game drives from riverside camps with easy access from Dar es Salaam or Zanzibar.";

const tripTags = ["Wildlife lovers", "Photographers", "Families", "Luxury trip", "Honeymooners"];

const highlights = [
  "Scenic flight or drive from Dar es Salaam or Zanzibar to Nyerere National Park.",
  "Boat safari on the Rufiji River for hippos, crocs, and birdlife.",
  "Flexible game drives to lakes and plains for elephants, lions, and wild dog chances.",
  "Guided walking safari to focus on tracks, flora, and close-up wilderness.",
  "Intimate riverside lodges or tented camps with sunset views.",
  "Experienced guides, park fees, meals, and 4x4 safari vehicle included.",
];

const itinerary = [
  {
    title: "Day 1 · Arrive Nyerere and afternoon game drive",
    description:
      "Fly from Dar es Salaam or Zanzibar into Nyerere National Park and settle at camp along the Rufiji River (flight not included). Head out for an afternoon game drive and unwind with sunset river views.",
    meals: "Dinner",
    overnight:
      "Selous Mbega Camp · Rufiji River Camp or similar",
  },
  {
    title: "Day 2 · Game drives across lakes and woodlands",
    description:
      "Join your ranger for full or half-day game drives to the lakes and plains, adjusting routes to recent wildlife movements. Look for elephants, lions, and diverse birdlife coming to drink.",
    meals: "Breakfast, Lunch, Dinner",
    overnight:
      "Selous Mbega Camp · Rufiji River Camp or similar",
  },
  {
    title: "Day 3 · Walking safari and Rufiji boat excursion",
    description:
      "Take a guided walking safari with an armed ranger for a ground-level view of tracks, plants, and smaller wildlife. In the afternoon, explore the Rufiji River by boat to spot hippos, crocs, and riverside game at sunset.",
    meals: "Breakfast, Lunch, Dinner",
    overnight:
      "Selous Mbega Camp · Rufiji River Camp or similar",
  },
  {
    title: "Day 4 · Morning drive and depart",
    description:
      "Optional morning game drive or relaxed breakfast overlooking the river, then transfer to the airstrip for your flight back to Dar es Salaam or Zanzibar.",
    meals: "Breakfast",
  },
];

const inclusions = [
  "All accommodations per itinerary.",
  "All meals per itinerary (B=Breakfast, L=Lunch, D=Dinner).",
  "All tours and entrance fees per itinerary (unless listed as excluded).",
  "All transportation and transfers per itinerary.",
  "Safari activities (game drives, walking where permitted, boat when scheduled).",
  "National Park fees.",
];

const exclusions = [
  "International flights.",
  "Meals not listed.",
  "Tips for guides, drivers, and hotel staff.",
  "Optional tours.",
  "Single room supplement.",
  "Personal expenses (visas, airport taxes, internet, etc.).",
  "Domestic flights to and from Nyerere unless added.",
];

const faqs = [
  {
    question: "Are guided experiences included?",
    answer: "Yes, most packages include professional local tour guides to enhance your experience.",
  },
  {
    question: "What if my flight is delayed?",
    answer: "Please notify us as soon as possible and we will adjust your schedule accordingly.",
  },
  {
    question: "Can you handle dietary needs?",
    answer: "Absolutely. Tell us in advance and we will customize your meals.",
  },
  {
    question: "What happens if I lose something on trip?",
    answer: "Report it to your guide immediately and we will help contact the right local services.",
  },
  {
    question: "How can I pay for the safari?",
    answer: "We accept major credit cards, bank transfers, and select online gateways; some packages allow installments.",
  },
  {
    question: "What is the refund policy?",
    answer: "Refunds depend on the cancellation window and package terms; we share the exact terms up front.",
  },
  {
    question: "Can I change my payment method later?",
    answer: "Yes, contact our support team any time to update or switch payment methods.",
  },
  {
    question: "Are there extra costs I should expect?",
    answer: "Any optional add-ons or upgrades are clearly communicated before payment.",
  },
];

const pricing = safariPackagePricingUSD["4-day-nyerere-safari"];

const formatPrice = () => {
  const values = [pricing?.midrange, pricing?.luxury].filter(
    (value): value is number => typeof value === "number" && Number.isFinite(value) && value > 0,
  );
  if (!values.length) return "Price on request";
  const lowest = Math.min(...values);
  return `From ${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(lowest)} per person`;
};

export const metadata = {
  title: "4-Day Nyerere National Park Safari | Eve On Safari",
  description:
    "Boat, walking, and game drive combination in Nyerere (Selous) with riverside camps and flexible flights from Dar or Zanzibar.",
};

export default function NyerereSafariPage() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#0f0f0f] text-white">
        <Image
          src="/photos/landing-page/nyerere.webp"
          alt="Nyerere National Park safari"
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-[28vh] md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-0">
          <div className="space-y-6 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Southern circuit wilderness</p>
            <h1
              className="text-4xl font-semibold leading-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              4-Day Nyerere National Park Safari
              <span className="mt-1 block font-normal">The African wilderness</span>
            </h1>
            <p className="text-sm text-white/85">
              Boat the Rufiji, walk with rangers, and track big game on drives in one of Africa’s largest reserves.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              {tripTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/60 px-3 py-1 text-xs uppercase tracking-wide text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-white/10 p-6 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Trip snapshot</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              <li><strong className="text-white">Duration:</strong> 4 days / 3 nights</li>
              <li><strong className="text-white">Start and end:</strong> Dar es Salaam or Zanzibar</li>
              <li><strong className="text-white">Best for:</strong> Southern circuit wilderness and river safaris</li>
              <li><strong className="text-white">Pricing:</strong> {formatPrice()}</li>
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/plan?package=4-day-nyerere-safari"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
              >
                Plan a safari
              </Link>
              <Link
                href="#itinerary"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div
        className="h-8"
        style={{
          backgroundColor: "rgba(229, 224, 200, 0.6)",
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 18px), 78% 100%, 60% calc(100% - 12px), 42% 100%, 22% calc(100% - 14px), 0 calc(100% - 10px))",
          transform: "scaleX(-1)",
          transformOrigin: "center",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[0.38fr_0.62fr] lg:px-0">
        <aside className="space-y-5 lg:sticky lg:top-20 xl:top-[156px]">
          <div className="space-y-4 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Plan a safari</p>
            <h2
              className="text-2xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Lock in this itinerary
            </h2>
            <p className="text-sm text-[#231f20]/80">
              {formatPrice()} · small party checkout below, larger groups via our planning form.
            </p>
            <div className="space-y-2 text-sm text-[#231f20]/80">
              <p><strong className="text-[#231f20]">Duration:</strong> 4 days / 3 nights</p>
              <p><strong className="text-[#231f20]">Route:</strong> Rufiji River base with drives, walks, and boat safaris</p>
              <p><strong className="text-[#231f20]">Contact:</strong> +255 768 611 005 · info@eveonsafari.com</p>
            </div>
            <Link
              href="/plan?package=4-day-nyerere-safari"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#231f20] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#3a3435]"
            >
              Plan with Eve
            </Link>
          </div>

          <PesapalCheckoutButton
            packageName="4 Days Nyerere Safari"
            packageSlug="4-day-nyerere-safari"
            pricing={pricing}
            currency="USD"
            defaultTier="midrange"
            defaultPax={1}
          />
        </aside>

        <main className="space-y-12">
          <section className="space-y-4 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Overview</p>
            <p className="text-sm text-[#231f20]/80">{overview}</p>
          </section>

          <section className="space-y-4 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Safari highlights</p>
                <h3
                  className="text-2xl font-semibold text-[#231f20]"
                  style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
                >
                  What you will experience
                </h3>
              </div>
              <Link href="/plan?package=4-day-nyerere-safari" className="text-sm font-semibold text-[#ba7e47]">
                Plan a safari →
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[16px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4 text-sm text-[#231f20]/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section id="itinerary" className="space-y-6 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Detailed itinerary</p>
            <h3
              className="text-2xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Day by day
            </h3>
            <div className="space-y-4">
              {itinerary.map((day) => (
                <article
                  key={day.title}
                  className="space-y-3 rounded-[18px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4 text-sm text-[#231f20]/85"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#ba7e47]">Safari day</p>
                    <h4 className="text-lg font-semibold text-[#231f20]">{day.title}</h4>
                  </div>
                  <p>{day.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#231f20]">
                    {day.meals && <span className="rounded-full bg-white px-3 py-1">Meals: {day.meals}</span>}
                    {"overnight" in day && day.overnight && (
                      <span className="rounded-full bg-white px-3 py-1">
                        Overnight: {day.overnight}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Includes</p>
              <ul className="space-y-2 text-sm text-[#231f20]/85">
                {inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#ba7e47]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Excludes</p>
              <ul className="space-y-2 text-sm text-[#231f20]/85">
                {exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#231f20]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-4 rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Travel answers</p>
            <h3
              className="text-2xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Everything you need to know before you travel
            </h3>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-[16px] border border-[#c3c3c3] bg-[#c3c3c3]/10 p-4"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-[#231f20]">
                    {faq.question}
                    <span className="text-[#ba7e47] transition group-open:rotate-90">→</span>
                  </summary>
                  <p className="mt-2 text-sm text-[#231f20]/80">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
