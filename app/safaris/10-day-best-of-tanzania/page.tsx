import Image from "next/image";
import Link from "next/link";
import { PesapalCheckoutButton } from "@/components/PesapalCheckoutButton";
import { safariPackagePricingUSD } from "@/lib/pricing";

const overview =
  "Ten days to explore Tanzania’s headline parks with extra time to slow down. Start with Tarangire or Manyara, expand through the Serengeti with multiple game days, and wrap with Ngorongoro. Room for cultural stops and scenic pauses along the way.";

const tripTags = ["Wildlife lovers", "Photographers", "Families", "Luxury trip", "Honeymooners"];

const highlights = [
  "Comprehensive ten-day circuit across Tarangire, Lake Manyara, Serengeti, and Ngorongoro.",
  "Extra Serengeti time to chase migration herds and predator action.",
  "Elephants and baobabs in Tarangire; birdlife and escarpment forests in Manyara.",
  "Ngorongoro Crater descent for Big Five in a compact caldera.",
  "Private 4x4, expert guide, and flexible pace for cultural stops.",
];

const itinerary = [
  {
    title: "Day 1 · Manyara or Tarangire",
    description:
      "Drive from Arusha with picnic lunch and an afternoon game drive. Choose Lake Manyara (best Dec to May) or Tarangire (best Jun to Nov) based on season.",
    meals: "Lunch, Dinner",
    overnight: "Endoro Lodge · Escarpment Luxury Lodge · Tarangire River Camp · Lemala Manyara",
  },
  {
    title: "Day 2 · Park day two",
    description:
      "Continue exploring your chosen park with morning and afternoon drives. Look for elephants, baobabs, flamingos, and big cats.",
    meals: "Breakfast, Lunch, Dinner",
    overnight: "Karatu or Tarangire area lodge",
  },
  {
    title: "Day 3 · Travel to Serengeti",
    description:
      "Drive toward Serengeti with wildlife stops and picnic lunch. Afternoon game drive on arrival.",
    meals: "Breakfast, Lunch, Dinner",
    overnight: "Serengeti tented camps or lodges per selection",
  },
  {
    title: "Day 4 · Serengeti game drives",
    description:
      "Full-day Serengeti exploration focused on central plains predators and resident game.",
    meals: "Breakfast, Lunch, Dinner",
    overnight: "Serengeti tented camps or lodges per selection",
  },
  {
    title: "Day 5 · Serengeti migration tracking",
    description:
      "Shift toward areas with migration herds if accessible. Follow predators and plains game with your guide.",
    meals: "Breakfast, Lunch, Dinner",
    overnight: "Serengeti tented camps or lodges per selection",
  },
  {
    title: "Day 6 · Serengeti to rim country",
    description:
      "Dawn drive, then begin the journey toward Ngorongoro with scenic stops and optional cultural visit.",
    meals: "Breakfast, Lunch, Dinner",
    overnight: "Lodges near Ngorongoro rim or Karatu",
  },
  {
    title: "Day 7 · Ngorongoro Crater",
    description:
      "Half-day crater game drive for rhino, elephants, lions, and large herds on the crater floor. Afternoon at leisure.",
    meals: "Breakfast, Lunch, Dinner",
    overnight: "Karatu area lodge",
  },
  {
    title: "Day 8 · Cultural or walking day",
    description:
      "Optional guided walk, biking, or village visit around the escarpment; adjust to your interests and pace.",
    meals: "Breakfast, Lunch, Dinner",
    overnight: "Karatu area lodge",
  },
  {
    title: "Day 9 · Scenic pause or extra drive",
    description:
      "Choose an easy morning with coffee farm visit or add a short nearby game drive if timing allows.",
    meals: "Breakfast, Lunch, Dinner",
    overnight: "Karatu area lodge",
  },
  {
    title: "Day 10 · Return to Arusha",
    description:
      "Breakfast and drive back to Arusha or Kilimanjaro Airport for departure.",
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
  "Safari vehicles include inverter, communications radio, electric cooler, and filtered water.",
  "National Park gate fees, park commission, and government taxes (based on current rates).",
];

const exclusions = [
  "International and domestic flights.",
  "Meals not listed.",
  "Tips for guides, drivers, and hotel staff.",
  "Optional tours.",
  "Single room supplement.",
  "Personal expenses (visas, airport taxes, internet, etc.).",
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

const pricing = safariPackagePricingUSD["10-day-best-of-tanzania"];

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
  title: "10-Day Best of Tanzania Safari | Eve On Safari",
  description:
    "Ten-day private safari through Tarangire, Lake Manyara, Serengeti, and Ngorongoro with flexible pacing and cultural options.",
};

export default function BestOfTanzaniaTenDayPage() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#0f0f0f] text-white">
        <Image
          src="/itenerary%20photos/route/best%20of%20tanzania.webp"
          alt="Tanzania safari scenery"
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-[28vh] md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-0">
          <div className="space-y-6 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Ten days, full immersion</p>
            <h1
              className="text-4xl font-semibold leading-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              10-Day Best of Tanzania Safari
              <span className="mt-1 block font-normal">Wildlife, lakes, and culture</span>
            </h1>
            <p className="text-sm text-white/85">
              Extra time for Serengeti big cats, crater wildlife, elephants, and culture with a private guide and flexible pace.
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
              <li><strong className="text-white">Duration:</strong> 10 days / 9 nights</li>
              <li><strong className="text-white">Start and end:</strong> Arusha or Kilimanjaro Airport</li>
              <li><strong className="text-white">Best for:</strong> Slow-paced northern circuit with cultural options</li>
              <li><strong className="text-white">Pricing:</strong> {formatPrice()}</li>
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/plan?package=10-day-best-of-tanzania"
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
              <p><strong className="text-[#231f20]">Duration:</strong> 10 days / 9 nights</p>
              <p><strong className="text-[#231f20]">Route:</strong> Tarangire and Manyara, multi-day Serengeti, Ngorongoro</p>
              <p><strong className="text-[#231f20]">Contact:</strong> +255 768 611 005 · info@eveonsafari.com</p>
            </div>
            <Link
              href="/plan?package=10-day-best-of-tanzania"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#231f20] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#3a3435]"
            >
              Plan with Eve
            </Link>
          </div>

          <PesapalCheckoutButton
            packageName="10 Days Best of Tanzania"
            packageSlug="10-day-best-of-tanzania"
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
              <Link href="/plan?package=10-day-best-of-tanzania" className="text-sm font-semibold text-[#ba7e47]">
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
