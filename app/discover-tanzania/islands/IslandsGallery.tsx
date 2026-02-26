"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Island = {
  name: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
};

export default function IslandsGallery({ islands }: { islands: Island[] }) {
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);

  useEffect(() => {
    if (!selectedIsland) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIsland(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedIsland]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="max-w-2xl">
          <h1 className="mt-3 text-3xl font-semibold text-[#231f20] sm:text-4xl">Tanzania islands</h1>
          <p className="mt-4 text-base text-[#231f20]/75">
            Add a coastal escape after your safari with reef snorkeling, diving, and relaxed beach
            stays.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {islands.map((island) => (
            <button
              key={island.name}
              type="button"
              onClick={() => setSelectedIsland(island)}
              className="group relative h-[320px] overflow-hidden rounded-2xl text-left shadow-sm ring-1 ring-[#e2d6c7] transition hover:shadow-md"
            >
              <Image
                src={island.coverImage}
                alt={island.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/75" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h2 className="text-lg font-semibold text-white">{island.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{island.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                  View gallery
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedIsland ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="island-gallery-title"
          onClick={() => setSelectedIsland(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="island-gallery-title" className="text-2xl font-semibold text-[#231f20]">
                  {selectedIsland.name}
                </h3>
                <p className="mt-2 text-sm text-[#231f20]/75">{selectedIsland.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIsland(null)}
                className="rounded-full border border-[#e2d6c7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#231f20] transition hover:bg-[#f7f1ea]"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedIsland.galleryImages.map((image, index) => (
                <div key={image} className="overflow-hidden rounded-xl border border-[#e2d6c7] bg-[#f7f1ea]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image}
                      alt={`${selectedIsland.name} photo ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
