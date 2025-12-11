import Image from "next/image";
import Link from "next/link";
import { PesapalCheckoutButton } from "@/components/PesapalCheckoutButton";
import { safariPackagePricingUSD } from "@/lib/pricing";

const overview =
  "Experience three of Tanzania’s top safari destinations in just three days. Start with Lake Manyara’s birdlife and tree-climbing lions, descend into the Ngorongoro Crater for concentrated wildlife, and finish among Tarangire’s baobabs and elephant herds. A fast-paced circuit that still feels immersive.";

const tripTags = ["Wildlife lovers", "Photographers", "Families", "Luxury trip", "Honeymooners"];

const highlights = [
  "Game drive in Lake Manyara National Park with Rift escarpment views and rich birdlife.",
  "Visit a traditional Maasai village enroute for cultural context.",
  "Half-day wildlife viewing inside Ngorongoro Crater.",
  "Morning game drive in Tarangire National Park, known for elephants and baobabs.",
  "Private 4x4 with professional guide throughout.",
  "All park fees and permits included.",
];

const itinerary = [
  {
    title: "Day 1 · Arusha to Lake Manyara",
    description:
      "Drive 2.5-3 hours from Arusha to Lake Manyara with lunch enroute, then enjoy an afternoon game drive across lakeshore, woodland, and Rift escarpment scenery. Watch for tree-climbing lions, giraffes, and prolific birdlife.",
    meals: "Lunch, Dinner",
    overnight:
      "Africa Safari Lake Manyara · Tloma Mountain Lodge · Ngorongoro Farm House",
  },
  {
    title: "Day 2 · Ngorongoro Crater",
    description:
      "Short drive to the crater for a half-day game drive on the floor. Track black rhino, big cats, elephants, and vast herds in a compact ecosystem before returning to the rim area.",
    meals: "Breakfast, Lunch, Dinner",
    overnight:
      "Africa Safari Lake Manyara · Tloma Mountain Lodge · Ngorongoro Farm House",
  },
  {
    title: "Day 3 · Tarangire and return",
    description:
      "Head to Tarangire for a morning game drive among baobabs and large elephant families, with chances for lions and rare antelope. Continue to Arusha or Kilimanjaro Airport in the afternoon.",
    meals: "Breakfast, Lunch",
  },
];

const inclusions = [
  "All accommodations per itinerary.",
  "All meals per itinerary (B=Breakfast, L=Lunch, D=Dinner).",
  "All tours and entrance fees per itinerary (unless listed as excluded).",
  "All transportation and transfers per itinerary.",
  "Professional English-speaking naturalist driver/guide.",
  "Transportation in a custom safari 4x4 with viewing roof and guaranteed window seating.",
  "Safari vehicles have an inverter for charging batteries, communications radio, electric cooler, and filtered water.",
  "National Park gate fees, park commission, and government taxes (based on current rates).",
];

const exclusions = [
  "International and domestic flights.",
  "Meals not listed.",
  "Tips for guides, drivers, and hotel staff.",
  "Optional tours.",
  "Single room supplement.",
  "Personal expenses (visas, airport taxes, internet, etc.).",
  "Flight out of the Serengeti.",
  "Holiday supplement December 20 to January 5.",
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
    answer: "Absolutely—tell us in advance and we will customize your meals.",
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

const pricing = safariPackagePricingUSD["3-day-manyara-ngorongoro-tarangire"];

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
  title: "3-Day Manyara, Ngorongoro and Tarangire Safari | Eve On Safari",
  description:
    "Three-day loop through Lake Manyara, Ngorongoro Crater, and Tarangire with private guide, park fees, and flexible lodging tiers.",
};

export default function ManyaraNgorongoroTarangirePage() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#0f0f0f] text-white">
        <Image
          src="/photos/landing-page/ngorongoro.webp"
          alt="Lake Manyara and Ngorongoro landscape"
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-[28vh] md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-0">
          <div className="space-y-6 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Three parks in three days</p>
            <h1
              className="text-4xl font-semibold leading-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              3-Day Tanzania Safari:
              <span className="mt-1 block font-normal">Lake Manyara · Ngorongoro · Tarangire</span>
            </h1>
            <p className="text-sm text-white/85">
              Rift escarpment views, crater wildlife, and Tarangire elephants in one focused loop from Arusha.
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
              <li><strong className="text-white">Duration:</strong> 3 days / 2 nights</li>
              <li><strong className="text-white">Start and end:</strong> Arusha or Kilimanjaro Airport</li>
              <li><strong className="text-white">Best for:</strong> Quick northern circuit hit list</li>
              <li><strong className="text-white">Pricing:</strong> {formatPrice()}</li>
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/plan?package=3-day-manyara-ngorongoro-tarangire"
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
              <p><strong className="text-[#231f20]">Duration:</strong> 3 days / 2 nights</p>
              <p><strong className="text-[#231f20]">Route:</strong> Manyara · Ngorongoro · Tarangire loop</p>
              <p><strong className="text-[#231f20]">Contact:</strong> +255 768 611 005 · info@eveonsafari.com</p>
            </div>
            <Link
              href="/plan?package=3-day-manyara-ngorongoro-tarangire"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#231f20] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#3a3435]"
            >
              Plan with Eve
            </Link>
          </div>

          <PesapalCheckoutButton
            packageName="3 Days Manyara-Ngorongoro-Tarangire"
            packageSlug="3-day-manyara-ngorongoro-tarangire"
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
              <Link href="/plan?package=3-day-manyara-ngorongoro-tarangire" className="text-sm font-semibold text-[#ba7e47]">
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
