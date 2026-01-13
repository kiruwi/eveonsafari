export type PackagePricing = {
  midrange?: number | null;
  luxury?: number | null;
};

// Update these USD amounts as you set prices for each itinerary.
export const safariPackagePricingUSD: Record<string, PackagePricing> = {
  "2-day-ngorongoro-crater-adventure": { midrange: 1111.18, luxury: 1225.5 },
  "3-day-manyara-ngorongoro-tarangire": { midrange: 1437.9, luxury: 1569.9 },
  "3-day-serengeti-escape": { midrange: 0, luxury: 1957 },
  // "4-day-nyerere-safari": { midrange: 0, luxury: 0 },
  "5-day-iconic-wildlife-adventure": { midrange: 2738.48, luxury: 3152.4 },
  "6-day-best-northern-parks": { midrange: 3242.98, luxury: 3616.98 },
  "7-day-northern-highlights": { midrange: 3844.06, luxury: 4344.06 },
  "8-day-migration-cultural-wonders": { midrange: 4368.6, luxury: 4914 },
  "9-day-grand-tanzania": { midrange: 0, luxury: 0 },
  "10-day-best-of-tanzania": { midrange: 2208, luxury: 0 },
};
