import Link from "next/link";

const name = "Tanzania Photographic Safaris";

export default function Page() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Travel style</p>
        <h1
          className="mt-2 text-3xl font-semibold text-[#231f20]"
          style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
        >
          {name}
        </h1>
        <p className="mt-4 text-[#231f20]/75">
          Custom content coming soon. Share your dates and interests and we will craft this style for you.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/plan"
            className="rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
          >
            Start planning
          </Link>
          <Link
            href="/experiences"
            className="rounded-full border border-[#231f20] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#231f20] transition hover:bg-[#231f20]/5"
          >
            Back to experiences
          </Link>
        </div>
      </div>
    </div>
  );
}
