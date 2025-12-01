import Link from "next/link";
import { kilimanjaroRoutes } from "@/lib/siteContent";

export default function TrekkingPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-0">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Kilimanjaro</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#231f20] font-american-grunge uppercase tracking-[0.05em]">
            Kilimanjaro routes and trekking prep
          </h1>
          <p className="mt-3 text-sm text-[#231f20]/80">
            Subscribe for seasonal planning intel and conservation updates.
          </p>
        </header>

        <section id="tips" className="grid gap-6 md:grid-cols-2">
          {kilimanjaroRoutes.map((route) => (
            <article key={route.slug} className="rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#231f20]">{route.name.replace(/^Kilimanjaro Climb on /i, "")}</h2>
              <p className="mt-2 text-sm text-[#231f20]/70">{route.duration}</p>
              <p className="mt-4 text-sm text-[#231f20]/80">{route.summary}</p>
              <Link href={`/trekking/${route.slug}`} className="mt-4 inline-block text-sm font-semibold text-[#ba7e47]">
                Read route →
              </Link>
            </article>
          ))}
        </section>

        <section id="newsletter" className="rounded-[32px] border border-[#c3c3c3] bg-[#c3c3c3]/20 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Newsletter</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#231f20]">Get quarterly inspiration + deals</h2>
          <form className="mx-auto mt-4 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 rounded-full border border-[#c3c3c3] px-4 py-3 text-sm text-[#231f20]"
            />
            <button className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold text-white">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
