"use client";

import Image from "next/image";
import { useState } from "react";

type Review = {
  name: string;
  visited: string;
  rating: number;
  quote: string;
  countryName: string;
  countryCode: string;
};

type ReviewCarouselProps = {
  reviews: Review[];
};

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!reviews.length) {
    return null;
  }

  const total = reviews.length;
  const review = reviews[activeIndex];
  const flagSrc = review.countryCode
    ? `https://flagcdn.com/24x18/${review.countryCode.toLowerCase()}.png`
    : "";

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4">
      <article className="w-full rounded-[24px] bg-white p-6 text-left shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-[#231f20]/90">
          <span className="font-semibold">{review.visited}</span>
          <span className="flex items-center gap-1 text-[#ba7e47]" aria-label={`Rated ${review.rating} out of 5`}>
            {Array.from({ length: review.rating }).map((_, index) => (
              <svg
                key={`${review.name}-star-${index}`}
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.3l-6.18 3.25 1.18-6.88L1.99 8.9l6.9-1 3.1-6.25 3.1 6.25 6.9 1-5 4.77 1.18 6.88z" />
              </svg>
            ))}
          </span>
        </div>
        <div className="mt-4 flex items-start gap-3">
          <svg
            aria-hidden="true"
            className="mt-1 h-6 w-6 text-[#ba7e47]/70"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7.2 17.5H4.5V14c0-2.8 1.4-5.3 4.2-7.4l1.2 1.8C8.7 9.8 8 11.2 8 12.8V14h2.8v3.5zm9.6 0h-2.7V14c0-2.8 1.4-5.3 4.2-7.4l1.2 1.8c-1.2 1.4-1.9 2.8-1.9 4.4V14h2.8v3.5z" />
          </svg>
          <p className="text-lg leading-relaxed text-[#231f20]/80">
            &ldquo;{review.quote}&rdquo;
          </p>
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#231f20]">
          <span>{review.name}</span>
          {flagSrc ? (
            <Image
              src={flagSrc}
              alt={`Flag of ${review.countryName}`}
              width={24}
              height={18}
              className="h-[18px] w-6 rounded-sm border border-[#231f20]/10"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <span className="text-xs uppercase tracking-[0.12em] text-[#231f20]/70">
            {review.countryName}
          </span>
        </div>
      </article>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-full border border-[#231f20]/70 p-2 text-[#231f20] transition hover:border-[#231f20] hover:bg-[#231f20] hover:text-white"
          aria-label="Show previous review"
        >
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={`review-dot-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex ? "bg-[#ba7e47]" : "bg-[#231f20]/20 hover:bg-[#231f20]/40"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goNext}
          className="rounded-full border border-[#231f20]/70 p-2 text-[#231f20] transition hover:border-[#231f20] hover:bg-[#231f20] hover:text-white"
          aria-label="Show next review"
        >
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
