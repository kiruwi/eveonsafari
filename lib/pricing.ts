import type { PackagePricing } from "@/lib/safariPricing";

export const safariPackagePricingUSD: Record<string, PackagePricing> = {
  "2-day-ngorongoro-crater-adventure": {
    1: 1231,
    2: 1001,
    3: 925,
    4: 887,
    5: 864,
    6: 738,
    7: 728,
  },
  "3-day-manyara-ngorongoro-tarangire": {
    1: 1763,
    2: 1418,
    3: 1302,
    4: 1245,
    5: 1210,
    6: 1188,
    7: 1171,
  },
  "3-day-serengeti-escape": {
    1: 1873,
    2: 1518,
    3: 1402,
    4: 1212,
    5: 1198,
    6: 1187,
    7: 1170,
  },
  "5-day-iconic-wildlife-adventure": {
    1: 3706,
    2: 3130,
    3: 2938,
    4: 2842,
    5: 2785,
    6: 2746,
    7: 2729,
  },
  "6-day-best-northern-parks": {
    1: 3749,
    2: 2869,
    3: 2829,
    4: 2714,
    5: 2645,
    6: 2699,
    7: 2566,
  },
  "7-day-northern-highlights": {
    1: 4388,
    2: 3582,
    3: 3313,
    4: 3179,
    5: 3099,
    6: 3045,
    7: 2615,
  },
  "8-day-migration-cultural-wonders": {
    1: 5010,
    2: 4090,
    3: 3783,
    4: 3630,
    5: 3539,
    6: 3477,
    7: 3433,
  },
  "9-day-grand-tanzania": {
    1: 5398,
    2: 4248,
    3: 3971,
    4: 3788,
    5: 3696,
    6: 3673,
    7: 3640,
  },
  "10-day-best-of-tanzania": {
    1: 6041,
    2: 4890,
    3: 4506,
    4: 4315,
    5: 4200,
    6: 4180,
    7: 4147,
  },
};

export function getSafariPricing(packageSlug?: string | null) {
  if (!packageSlug) return undefined;
  return safariPackagePricingUSD[packageSlug];
}
