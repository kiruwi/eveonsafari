import Link from "next/link";
import { kilimanjaroRoutes } from "@/lib/siteContent";

export default function TrekkingPage() {
  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      style={{
        backgroundImage: "url('/Mountain Routes/kilimanjaro.webp')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-0">
          <header className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#f5d9b0]">Kilimanjaro</p>
            <h1 className="mt-3 text-4xl font-semibold text-[#ba7e47] font-american-grunge uppercase tracking-[0.05em]">
              Kilimanjaro routes and trekking prep
            </h1>
            <p className="mt-3 text-base text-white/85">
              Subscribe for seasonal planning intel and conservation updates.
            </p>
          </header>

          <section id="tips" className="grid gap-6 md:grid-cols-2">
            {kilimanjaroRoutes.map((route) => (
              <article
                key={route.slug}
                className="rounded-[28px] bg-white/10 p-6 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-semibold text-[#ba7e47]">
                  {route.name.replace(/^Kilimanjaro Climb on /i, "")}
                </h2>
                <p className="mt-2 text-base text-white/80">{route.duration}</p>
                <p className="mt-4 text-base text-white/80">{route.summary}</p>
                <Link
                  href={`/trekking/${route.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-[#ba7e47]"
                >
                  Read route{" "}
                  <svg
                    aria-hidden="true"
                    className="inline-block h-4 w-4 -translate-y-px"
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
                </Link>
              </article>
            ))}
          </section>

          <section id="newsletter" className="rounded-[32px] bg-white/10 p-8 text-center backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#f5d9b0]">Newsletter</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Get quarterly inspiration + deals</h2>
            <form className="mx-auto mt-4 flex max-w-lg flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-full border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 backdrop-blur-sm"
              />
              <button className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold text-white hover:bg-[#8a592e]">
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
