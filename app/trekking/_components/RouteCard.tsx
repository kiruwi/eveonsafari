import Link from "next/link";
import type { RouteData } from "../routes";

const badgeClassName =
  "rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80";

const formatSuccess = (rate: number) => `~${Math.round(rate * 100)}%`;

type RouteCardProps = {
  route: RouteData;
};

export default function RouteCard({ route }: RouteCardProps) {
  return (
    <Link
      href={`/trekking/${route.slug}`}
      className="group relative flex h-full flex-col rounded-[24px] border border-white/12 bg-white/5 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.25)] motion-safe:transition motion-safe:hover:-translate-y-1 motion-safe:hover:border-white/25 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
      aria-label={`View ${route.label} itinerary`}
    >
      <div className="flex flex-wrap gap-2">
        <span className={badgeClassName}>Difficulty: {route.difficulty}</span>
        <span className={badgeClassName}>Crowds: {route.crowds}</span>
        <span className={badgeClassName}>Acclimatisation: {route.acclimatisation}</span>
        <span className={badgeClassName}>Accommodation: {route.accommodation}</span>
        <span className={badgeClassName}>Success: {formatSuccess(route.successRate)}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">{route.label}</h3>
        <p className="mt-1 text-sm text-white/70">
          {route.days} days · {route.nights} nights
        </p>
      </div>
      <p className="mt-3 text-sm text-white/80 line-clamp-3 md:line-clamp-2">
        {route.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f5d9b0] group-hover:text-white motion-safe:transition motion-reduce:transition-none">
        View itinerary →
      </span>
    </Link>
  );
}
