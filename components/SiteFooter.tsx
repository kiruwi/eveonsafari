import Image from "next/image";
import Link from "next/link";
import { guides, travelStyles } from "@/lib/siteContent";

const contactInfo = {
  address: "Mateves Street; Arusha – Tanzania",
  phone: "+255 768 611 005",
  email: "info@eveonsafari.com",
};

const wildlifeGuideSlugs = [
  "safari-planning-guide",
  "best-time-to-visit",
  "tipping-guide",
  "entry-requirements",
  "safari-faq",
  "gear-checklist",
];

const travelStyleMapping = [
  { label: "Serengeti Migration Safaris", slug: "The Serengeti Great Migration Safari" },
  { label: "Tanzania Photographic Safaris", slug: "Tanzania Photographic Safaris" },
  { label: "Bird Watching Safaris", slug: "Bird Watching Safaris" },
  { label: "Tanzania Family Safaris", slug: "Tanzania Family Safaris" },
  { label: "Cultural & Eco-Tourism Safari", slug: "Cultural & Eco-Tourism Safaris" },
  { label: "Tanzania Safari & Beach Holiday", slug: "Tanzania Safari & Beach Holidays" },
];

const kilimanjaroPrepLinks = [
  { label: "How To Prepare?", href: "/guides/kilimanjaro-preparation" },
  { label: "Kilimanjaro Gear List", href: "/guides/gear-checklist" },
  { label: "Physical Training", href: "/guides/kilimanjaro-preparation#physical-training" },
  { label: "Altitude Training", href: "/guides/kilimanjaro-preparation#altitude" },
  { label: "Travel Insurance", href: "/plan" },
  { label: "Vaccines & Immunizations", href: "/guides/entry-requirements" },
];

export function SiteFooter() {
  const wildlifeLinks = wildlifeGuideSlugs
    .map((slug) => {
      const guide = guides.find((g) => g.slug === slug);
      if (!guide) return null;
      return { label: guide.name, href: `/guides/${slug}` };
    })
    .filter((item): item is { label: string; href: string } => Boolean(item));

  const travelStyleLinks = travelStyleMapping
    .map((item) => {
      const exists = travelStyles.find((style) => style.name === item.label);
      if (!exists) return null;
      return { label: item.label, href: `/travel-style/${item.label.toLowerCase().replace(/ /g, "-")}` };
    })
    .filter((item): item is { label: string; href: string } => Boolean(item));

  return (
    <footer className="border-t border-white/10 bg-[#6b3b1f] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 lg:px-0">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-white">Contact Info</p>
            <div className="mt-4 flex items-center gap-4">
              <Image
                src="/evelogowhite.png"
                alt="Eve On Safari logo"
                width={160}
                height={160}
                className="h-32 w-32 rounded-full object-contain"
              />
              <div className="text-sm text-white/80">
                <p>Mateves Street; Arusha – Tanzania</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p>WhatsApp: {contactInfo.phone}</p>
              <p>Email: {contactInfo.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Wildlife Safari Guide</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {wildlifeLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 hover:text-[#f2d3b0]">
                    <span aria-hidden>→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Travel Styles & Tour Experiences</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {travelStyleLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 hover:text-[#f2d3b0]">
                    <span aria-hidden>→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Kilimanjaro Climbing Preparation</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {kilimanjaroPrepLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex items-center gap-2 hover:text-[#f2d3b0]">
                    <span aria-hidden>→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-white/80">
          <p>© {new Date().getFullYear()} Eve On Safari. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-wide transition hover:text-[#f2d3b0]"
            >
              Instagram
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-wide transition hover:text-[#f2d3b0]"
            >
              Pinterest
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-wide transition hover:text-[#f2d3b0]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
