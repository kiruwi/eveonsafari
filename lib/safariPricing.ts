export const ONLINE_PAX_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;
export const MAX_ONLINE_PAX = ONLINE_PAX_OPTIONS[ONLINE_PAX_OPTIONS.length - 1];

export type OnlinePax = (typeof ONLINE_PAX_OPTIONS)[number];
export type PackagePricing = Partial<Record<OnlinePax, number>>;

export function getPerPersonRate(pricing: PackagePricing | undefined, pax: number) {
  if (!pricing || !ONLINE_PAX_OPTIONS.includes(pax as OnlinePax)) {
    return null;
  }

  const rate = pricing[pax as OnlinePax];
  return typeof rate === "number" && Number.isFinite(rate) && rate > 0 ? rate : null;
}

export function getLowestSafariRate(pricing?: PackagePricing) {
  if (!pricing) return null;

  const rates = ONLINE_PAX_OPTIONS
    .map((pax) => pricing[pax])
    .filter((rate): rate is number => typeof rate === "number" && Number.isFinite(rate) && rate > 0);

  if (!rates.length) {
    return null;
  }

  return Math.min(...rates);
}

export function calculateSafariTotal(pricing: PackagePricing | undefined, pax: number) {
  const perPersonRate = getPerPersonRate(pricing, pax);
  if (!perPersonRate) {
    return null;
  }

  return Number.parseFloat((perPersonRate * pax).toFixed(2));
}
