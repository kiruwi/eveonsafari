import Link from "next/link";

type ActivityDetail = {
  label: string;
  value: string;
};

type ActivityTemplateProps = {
  category: string;
  title: string;
  description: string;
  typeLabel: string;
  duration: string;
  location: string;
  whoItSuits: string;
  price: string;
  highlights?: string[];
};

export default function ActivityTemplate({
  category,
  title,
  description,
  typeLabel,
  duration,
  location,
  whoItSuits,
  price,
  highlights,
}: ActivityTemplateProps) {
  const details: ActivityDetail[] = [
    { label: "Type", value: typeLabel },
    { label: "Duration", value: duration },
    { label: "Location", value: location },
    { label: "Who it suits", value: whoItSuits },
    { label: "Price", value: price },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">Activities</p>
          <h1
            className="text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            {title}
          </h1>
          <p className="text-base text-[#231f20]/80">{description}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-[#231f20]/60">{category}</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Activity details</p>
            <ul className="mt-4 space-y-2 text-sm text-[#231f20]/80">
              {details.map((detail) => (
                <li key={detail.label}>
                  <strong className="text-[#231f20]">{detail.label}:</strong> {detail.value}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Highlights</p>
            <ul className="mt-4 space-y-2 text-sm text-[#231f20]/80">
              {(highlights ?? []).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#ba7e47]" />
                  <span>{item}</span>
                </li>
              ))}
              {!highlights?.length && <li>Customise this activity to your timing and interests.</li>}
            </ul>
          </article>
        </section>

        <section className="rounded-[24px] border border-[#c3c3c3] bg-[#231f20] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Plan this activity</p>
          <h2 className="mt-3 text-2xl font-semibold">Tell us your dates</h2>
          <p className="mt-3 text-sm text-white/80">
            We will confirm availability, timing, and pricing based on your itinerary.
          </p>
          <Link
            href="/plan"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#ba7e47] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#8a592e]"
          >
            Plan Your Trip
          </Link>
        </section>
      </div>
    </div>
  );
}
