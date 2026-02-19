import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getParkBySlug, parkCards } from "../parksData";

export const dynamicParams = false;

export const generateStaticParams = () => parkCards.map((park) => ({ slug: park.slug }));

export default async function ParkDetailPage({
  params,
}: {
  params: Promise<{ slug?: string | string[] }> | { slug?: string | string[] };
}) {
  const resolvedParams = await params;
  const slug = typeof resolvedParams.slug === "string" ? resolvedParams.slug : "";
  const park = getParkBySlug(slug);

  if (!park) {
    notFound();
  }

  const galleryImages =
    park.galleryImages && park.galleryImages.length > 0
      ? park.galleryImages
      : park.detailImage
        ? [park.detailImage]
        : [];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden">
        <div className="relative h-[320px] sm:h-[380px]">
          {park.displayImage ? (
            <Image
              src={park.displayImage}
              alt={park.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#2f2a25] to-[#8c6f52]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/45" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:pb-12">
              <nav aria-label="Breadcrumb" className="text-xs text-white/85">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link className="hover:text-white" href="/">
                      Home
                    </Link>
                  </li>
                  <li className="text-white/55">/</li>
                  <li>
                    <Link className="hover:text-white" href="/discover-tanzania">
                      Discover Tanzania
                    </Link>
                  </li>
                  <li className="text-white/55">/</li>
                  <li>
                    <Link className="hover:text-white" href="/discover-tanzania/national-parks">
                      National Parks
                    </Link>
                  </li>
                  <li className="text-white/55">/</li>
                  <li className="text-white">{park.name}</li>
                </ol>
              </nav>

              <h1 className="mt-2 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">{park.name}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="rounded-2xl border border-[#e2d6c7] bg-[#fdfaf6] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-[#231f20]">Park overview</h2>
          <p className="mt-4 text-base leading-relaxed text-[#231f20]/80">{park.fullDescription}</p>
        </div>

        {galleryImages.length > 0 ? (
          <div className="mt-8 rounded-2xl border border-[#e2d6c7] bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-semibold text-[#231f20]">Photo gallery</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div key={image} className="overflow-hidden rounded-xl border border-[#e2d6c7] bg-[#f7f1ea]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image}
                      alt={`${park.name} photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10">
          <Link
            href="/discover-tanzania/national-parks"
            className="inline-flex items-center rounded-full border border-[#e2d6c7] px-5 py-3 text-sm font-semibold text-[#231f20] transition hover:bg-[#f7f1ea]"
          >
            Back to national parks
          </Link>
        </div>
      </section>
    </div>
  );
}
