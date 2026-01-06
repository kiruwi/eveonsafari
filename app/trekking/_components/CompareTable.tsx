"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { RouteData } from "../routes";

type CompareTableProps = {
  routes: RouteData[];
};

type Mode = "first-timers" | "highest-success" | "quietest" | "shortest" | null;

const crowdRank: Record<RouteData["crowds"], number> = {
  Low: 0,
  Medium: 1,
  High: 2,
};

const formatSuccess = (rate: number) => `~${Math.round(rate * 100)}%`;

export default function CompareTable({ routes }: CompareTableProps) {
  const [mode, setMode] = useState<Mode>(null);

  const visibleRoutes = useMemo(() => {
    let next = [...routes];
    switch (mode) {
      case "first-timers":
        next = next.filter(
          (route) => route.acclimatisation === "Strong" && route.difficulty !== "Hard"
        );
        break;
      case "highest-success":
        next.sort((a, b) => b.successRate - a.successRate);
        break;
      case "quietest":
        next.sort((a, b) => crowdRank[a.crowds] - crowdRank[b.crowds]);
        break;
      case "shortest":
        next.sort((a, b) => a.days - b.days);
        break;
      default:
        break;
    }
    return next;
  }, [mode, routes]);

  const buttonClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] motion-safe:transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80 ${
      active
        ? "border-[#f5d9b0] bg-[#f5d9b0]/10 text-[#f5d9b0]"
        : "border-white/15 bg-white/5 text-white/80 hover:border-white/30"
    }`;

  return (
    <div className="rounded-[32px] border border-white/12 bg-black/45 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#f5d9b0]">Compare routes</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Compare routes</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            If it&apos;s your first climb, pick stronger acclimatisation.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white motion-safe:transition motion-reduce:transition-none hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
        >
          Ask a guide
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className={buttonClass(mode === "first-timers")}
          aria-pressed={mode === "first-timers"}
          onClick={() => setMode("first-timers")}
        >
          Best for first-timers
        </button>
        <button
          type="button"
          className={buttonClass(mode === "highest-success")}
          aria-pressed={mode === "highest-success"}
          onClick={() => setMode("highest-success")}
        >
          Highest success
        </button>
        <button
          type="button"
          className={buttonClass(mode === "quietest")}
          aria-pressed={mode === "quietest"}
          onClick={() => setMode("quietest")}
        >
          Quietest
        </button>
        <button
          type="button"
          className={buttonClass(mode === "shortest")}
          aria-pressed={mode === "shortest"}
          onClick={() => setMode("shortest")}
        >
          Shortest
        </button>
        <button
          type="button"
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 motion-safe:transition motion-reduce:transition-none hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
          onClick={() => setMode(null)}
        >
          Reset
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[24px] border border-white/10">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <thead className="bg-black/40 text-[11px] uppercase tracking-[0.25em] text-white/70">
            <tr>
              <th className="sticky left-0 z-20 bg-black/45 px-4 py-3">Route</th>
              <th className="px-4 py-3">Days</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Acclimatisation</th>
              <th className="px-4 py-3">Crowds</th>
              <th className="px-4 py-3">Accommodation</th>
              <th className="px-4 py-3">Success rate</th>
            </tr>
          </thead>
          <tbody>
            {visibleRoutes.map((route) => (
              <tr key={route.slug} className="border-t border-white/10">
                <td className="sticky left-0 z-10 bg-black/45 px-4 py-4 font-semibold text-white">
                  <Link
                    href={`/trekking/${route.slug}`}
                    className="underline-offset-4 motion-safe:transition motion-reduce:transition-none hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d9b0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
                  >
                    {route.label}
                  </Link>
                </td>
                <td className="px-4 py-4 text-white/80">{route.days}</td>
                <td className="px-4 py-4 text-white/80">{route.difficulty}</td>
                <td className="px-4 py-4 text-white/80">{route.acclimatisation}</td>
                <td className="px-4 py-4 text-white/80">{route.crowds}</td>
                <td className="px-4 py-4 text-white/80">{route.accommodation}</td>
                <td className="px-4 py-4 text-white/80">{formatSuccess(route.successRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
