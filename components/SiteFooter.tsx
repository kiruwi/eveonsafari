import Image from "next/image";
import Link from "next/link";
const contactInfo = {
  address: "Mateves Street; Arusha – Tanzania",
  phone: "+255 768 611 005",
  email: "info@eveonsafari.com",
};

const safariLinks = [
  { label: "2 Days Ngorongoro", href: "/safaris/2-day-ngorongoro-crater-adventure" },
  { label: "3 Days Manyara–Ngorongoro–Tarangire", href: "/safaris/3-day-manyara-ngorongoro-tarangire" },
  { label: "3 Days Serengeti Escape", href: "/safaris/3-day-serengeti-escape" },
  { label: "4 Days Nyerere", href: "/safaris/4-day-nyerere-safari" },
  { label: "5-10 Day Safaris", href: "/itineraries#safari-grid" },
];

const trekLinks = [
  { label: "Kilimanjaro Lemosho", href: "/trekking/kilimanjaro-lemosho-route" },
  { label: "Kilimanjaro Machame", href: "/trekking/kilimanjaro-machame-route" },
  { label: "Kilimanjaro Marangu", href: "/trekking/kilimanjaro-marangu-route" },
];

const planningLinks = [
  { label: "Plan a Safari", href: "/plan" },
  { label: "Safaris", href: "/itineraries" },
  { label: "Experiences", href: "/experiences" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#6b3b1f] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 lg:px-0">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-white">Contact Info</p>
            <div className="mt-4 flex flex-col items-center gap-3">
              <Image
                src="/evelogowhite.png"
                alt="Eve On Safari logo"
                width={160}
                height={160}
                className="h-32 w-32 rounded-full object-contain"
              />
              <p className="text-sm text-white/80 leading-snug">{contactInfo.address}</p>
            </div>
            <div className="mt-3 space-y-1 text-sm text-white/80">
              <p className="text-center">WhatsApp: {contactInfo.phone}</p>
              <p className="text-center">Email: {contactInfo.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Safaris</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {safariLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 hover:text-[#f2d3b0]">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M10 7h7v7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Trekking</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {trekLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 hover:text-[#f2d3b0]">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M10 7h7v7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Planning</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {planningLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 hover:text-[#f2d3b0]">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M10 7h7v7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-white/80"
          suppressHydrationWarning
        >
          <p>© {new Date().getFullYear()} Eve On Safari. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-wide transition hover:text-[#f2d3b0]"
              suppressHydrationWarning
            >
              Instagram
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-wide transition hover:text-[#f2d3b0]"
              suppressHydrationWarning
            >
              Pinterest
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-wide transition hover:text-[#f2d3b0]"
              suppressHydrationWarning
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
