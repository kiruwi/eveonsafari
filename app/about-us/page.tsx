import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Years of expertise", value: "10+", description: "Designing safaris with a decade of on-the-ground experience." },
  { label: "Trip destinations", value: "60+", description: "Covering Tanzania's celebrated circuits from Serengeti to Zanzibar." },
  { label: "Travelers hosted", value: "10,000+", description: "Guests who trusted us to craft meaningful journeys in the wild." },
];

const pillars = [
  {
    title: "Exceptional services",
    copy: "Personalized attention and high-quality hospitality from start to finish.",
  },
  {
    title: "Memorable experience",
    copy: "From wildlife encounters to cultural immersion, we create journeys that stay with you forever.",
  },
  {
    title: "Personalized itineraries",
    copy: "No two travelers are the same. We tailor each trip to your schedule, interests, and pace.",
  },
];

export const metadata: Metadata = {
  title: "About Eve On Safari | Tanzania Safari Specialists",
  description:
    "Discover the story behind Eve On Safari - 10+ years designing immersive, conservation-first journeys across Tanzania's parks, peaks, and coasts.",
};

function PhotoPlaceholder({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`relative flex min-h-[260px] items-center justify-center rounded-[28px] border border-dashed border-[#c3c3c3] bg-[#f8f5f2] text-[#231f20]/60 shadow-sm ${className}`}
    >
      <span className="text-xs uppercase tracking-[0.3em]">{label ?? "Coming soon"}</span>
      <span className="sr-only">Image placeholder</span>
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ background: "linear-gradient(135deg, rgba(229,224,200,0.35), rgba(186,126,71,0.25))" }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#0f0f0f] text-white">
        <Image
          src="/about%20photos/lion.webp"
          alt="Lion in the Tanzanian savannah"
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-24 text-center md:px-6 lg:px-0">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">About Eve On Safari</p>
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Your adventure begins with a story
          </h1>
          <p className="max-w-3xl text-base text-white/85">
            Eve On Safari was founded in 2025 by Evaline Edward, a young Tanzanian entrepreneur with a strong passion for
            showcasing her country. From a small office on Mateves Street in Arusha, she built the company to give you
            straightforward, well-planned safari experiences across Tanzania.
          </p>
          <p className="max-w-3xl text-base text-white/80">
            Evaline grew up close to the country&apos;s major parks and wanted to give travellers practical, honest access to
            the places she knows best. Today, Eve On Safari offers private, guided trips across the Serengeti, Ngorongoro,
            Tarangire, Lake Manyara, and the Zanzibar coast. You get clear planning, reliable guides, and itineraries that
            match your interests.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/plan"
              className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
            >
              Start planning
            </Link>
            <Link
              href="/itineraries"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
            >
              View itineraries
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-0">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Curating exceptional travel</p>
            <h2
              className="text-4xl font-semibold text-[#231f20] tracking-[0.05em] sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Crafted in Tanzania, shaped by you
            </h2>
            <p className="text-base text-[#231f20]/80">
              From tailor-made itineraries to expert local guides, we go beyond the ordinary to deliver a safari
              experience you&apos;ll cherish for a lifetime.
            </p>
            <p className="text-base text-[#231f20]/80">
              Whether you are planning your first African safari or returning for a deeper connection with the wild, we
              balance comfort, culture, and conservation so every detail feels intentional.
            </p>
            <div className="relative h-[240px] md:h-[260px] overflow-hidden rounded-[28px] border border-[#c3c3c3] bg-white/40 shadow-sm">
              <Image
                src="/about%20photos/lion%202.webp"
                alt="Lion resting in the grassland"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative h-[240px] md:h-[260px] overflow-hidden rounded-[28px] border border-[#c3c3c3] bg-white/40 shadow-sm">
              <Image
                src="/about%20photos/van.webp"
                alt="Safari vehicle on the plains"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
            <div className="rounded-[28px] bg-[#e5e0c8]/50 p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#231f20] uppercase tracking-[0.08em]">Why choose us</h3>
                <ul className="space-y-3 text-base text-[#231f20]/80">
                  <li>
                    <span className="font-semibold text-[#231f20]">Guided by Tanzania.</span> Our headquarters and
                    guides are based here, so every journey is informed by lived experience and local relationships.
                  </li>
                  <li>
                    <span className="font-semibold text-[#231f20]">Ethical by design.</span> We design routes that
                    support conservation partners and empower communities we visit.
                  </li>
                  <li>
                    <span className="font-semibold text-[#231f20]">Clear answers.</span> Expect direct guidance on the
                    best seasons, parks, and routes before you ever step on the plane.
                  </li>
                </ul>
                <p className="text-base text-[#231f20]/70">
                  We are also presented on SafariBookings.com, a reflection of the trust travelers place in our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="bg-[#e5e0c8]/40 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-0">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Experience travel like never before</p>
            <h2
              className="text-4xl font-semibold text-[#231f20] sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              A bespoke journey for every guest
            </h2>
            <p className="text-base text-[#231f20]/75">
              From wildlife encounters to local cultural immersion, we design trips that stay with you forever.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-[24px] bg-white p-6 shadow-md">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">{pillar.title}</p>
                <p className="mt-3 text-base text-[#231f20]/80">{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="values" className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Our values</p>
            <h2
              className="text-4xl font-semibold text-[#231f20] tracking-[0.05em] sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Experience the new adventures
            </h2>
            <p className="text-base text-[#231f20]/80">
              Whether you&apos;re planning your first African safari or returning for a deeper connection with the wild,
              our team ensures every detail is thoughtfully curated.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[20px] border border-[#c3c3c3] bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Our Vision</p>
                <p className="mt-2 text-base text-[#231f20]/80">
                  To be East Africa's most trusted name in sustainable and transformative travel, enriching lives through
                  authentic safari experiences.
                </p>
              </div>
              <div className="rounded-[20px] border border-[#c3c3c3] bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Our Mission</p>
                <p className="mt-2 text-base text-[#231f20]/80">
                  To provide ethically crafted safari journeys that support conservation, empower local communities, and
                  deliver unforgettable memories to every traveler.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative h-[260px] md:h-[320px] overflow-hidden rounded-[28px] border border-[#c3c3c3] bg-white/40 shadow-sm">
              <Image
                src="/about%20photos/maasai.webp"
                alt="Maasai community in Tanzania"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e5e0c8]/60 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-0">
          <div className="space-y-4">
            <h3
              className="text-4xl font-semibold text-center text-[#231f20] leading-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Where Grace Meets the Wild
            </h3>
            <p className="text-base text-center text-[#231f20]/80">
              We balance comfort with respect for nature and local communities. Your itinerary supports conservation-minded camps and local guides who know the land well. Every trip keeps your experience simple, thoughtful, and grounded in the places you visit.
            </p>
          </div>
        </div>
      </section>

      <section id="founder" className="bg-[#231f20] py-16 text-white">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-[1.05fr_0.95fr] md:px-6 lg:px-0">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#e5e0c8]">Meet the founder</p>
            <h2
              className="text-4xl font-semibold sm:text-5xl"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Evaline Edward, Founder &amp; Managing Director
            </h2>
            <p className="text-base text-white/85">
              Evaline is the heart of Eve On Safari. With over eight years in Tanzania’s travel industry, she plans trips with clear purpose and personal insight, giving you experiences shaped by real knowledge of the land.
            </p>
            <div className="mt-6 rounded-[28px] bg-white/5 p-6 backdrop-blur" style={{ border: "1px solid #4a4544" }}>
            <p className="text-base text-white/85">
              Welcome to Eve On Safari. I&apos;m Evaline, the founder, and I started this company in 2025 from our small office on Mateves Street in Arusha. I grew up close to Tanzania&apos;s parks and wanted to give you a practical, honest way to experience them.
            </p>
            <p className="mt-3 text-base text-white/80">
              Our philosophy, &quot;Where Grace Meets the Wild,&quot; guides how we plan each trip. You get clear communication, reliable guides, and routes shaped around what you want to see.
            </p>
            <p className="mt-3 text-base text-white/80">
              Thank you for choosing us. I look forward to helping you experience Tanzania in a simple, meaningful way.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#e5e0c8]">Warmest regards,</p>
          </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-[#4a4544] bg-white/5 shadow-sm">
              <Image
                src="/about%20photos/eve.webp"
                alt="Evaline Edward on safari"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0f0f0f]/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-0">
        <div className="flex flex-col gap-4 rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Let&apos;s get closer</p>
            <h3
              className="mt-2 text-2xl font-semibold text-[#231f20]"
              style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
            >
              Ready to plan your next journey?
            </h3>
            <p className="mt-2 text-base text-[#231f20]/80">
              Join thousands of happy travelers who trust Eve On Safari for honeymoons, family adventures, treks, and
              photographic expeditions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan"
              className="rounded-full bg-[#ba7e47] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
            >
              Plan with us
            </Link>
            <Link
              href="/experiences"
              className="rounded-full border border-[#231f20] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
            >
              Explore experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
