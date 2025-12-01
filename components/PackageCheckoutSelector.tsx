"use client";

import { useMemo, useState } from "react";
import { PesapalCheckoutButton } from "./PesapalCheckoutButton";
import type { PackagePricing } from "@/lib/pricing";

type PackageOption = {
  name: string;
  slug: string;
};

type PackageCheckoutSelectorProps = {
  packages: PackageOption[];
  pricing: Record<string, PackagePricing | undefined>;
  currency?: string;
};

export function PackageCheckoutSelector({ packages, pricing, currency = "USD" }: PackageCheckoutSelectorProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(packages[0]?.slug ?? "");

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.slug === selectedSlug),
    [packages, selectedSlug],
  );

  const selectedPricing = useMemo(() => pricing[selectedSlug], [pricing, selectedSlug]);

  if (!packages.length) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-[28px] border border-[#c3c3c3] bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-[#231f20]" htmlFor="package-select">
          Choose an itinerary
        </label>
        <select
          id="package-select"
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-full rounded-full border border-[#c3c3c3] px-3 py-2 text-sm text-[#231f20] focus:border-[#ba7e47] focus:outline-none"
        >
          {packages.map((pkg) => (
            <option key={pkg.slug} value={pkg.slug}>
              {pkg.name}
            </option>
          ))}
        </select>
      </div>

      <PesapalCheckoutButton
        packageName={selectedPackage?.name}
        packageSlug={selectedPackage?.slug}
        pricing={selectedPricing}
        currency={currency}
        defaultTier="midrange"
        defaultPax={1}
      />
    </div>
  );
}
