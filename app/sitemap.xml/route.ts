const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://eveonsafari.com").replace(/\/$/, "");

const staticRoutes = [
  "/",
  "/about-us",
  "/activities",
  "/activities/cultural-visits",
  "/activities/day-trips/arusha-day-trip",
  "/activities/day-trips/chemka-hot-spring",
  "/activities/day-trips/lake-manyara-day-trip",
  "/activities/day-trips/materuni-waterfalls-coffee",
  "/activities/day-trips/ngorongoro-crater-day-trip",
  "/activities/day-trips/tarangire-day-trip",
  "/activities/walking-safaris",
  "/altitude",
  "/discover-tanzania/accommodations",
  "/discover-tanzania/islands",
  "/discover-tanzania/national-parks",
  "/itineraries",
  "/packing",
  "/plan",
  "/safaris/10-day-best-of-tanzania",
  "/safaris/2-day-ngorongoro-crater-adventure",
  "/safaris/3-day-manyara-ngorongoro-tarangire",
  "/safaris/3-day-serengeti-escape",
  "/safaris/4-day-nyerere-safari",
  "/safaris/5-day-iconic-wildlife-adventure",
  "/safaris/6-day-best-northern-parks",
  "/safaris/7-day-northern-highlights",
  "/safaris/8-day-migration-cultural-wonders",
  "/safaris/9-day-grand-tanzania",
  "/safaris/duration/2-days",
  "/safaris/duration/3-days",
  "/safaris/duration/4-days",
  "/safaris/duration/5-days",
  "/safaris/duration/6-days",
  "/safaris/duration/7-days",
  "/safaris/duration/8-plus-days",
  "/safaris/style/classic-wildlife",
  "/safaris/style/cultural-safaris",
  "/safaris/style/family-safaris",
  "/safaris/style/migration-safaris",
  "/travel-style",
  "/travel-style/africa-family-safari",
  "/travel-style/beach-and-holiday-in-africa",
  "/travel-style/birthday-party-experience",
  "/travel-style/cultural-eco-tourism-safari",
  "/travel-style/fly-in-out-safari",
  "/travel-style/honeymoon-safari",
  "/travel-style/mountain-gorilla-trekking",
  "/travel-style/tanzania-big-5-safari",
  "/travel-style/tanzania-bird-watching-safari",
  "/travel-style/tanzania-photographic-safaris",
  "/travel-style/tanzania-walking-safaris",
  "/travel-style/the-great-migration-safari",
  "/trekking",
  "/trekking/6-day-umbwe-route-kilimanjaro-trek",
  "/trekking/7-day-rongai-route-kilimanjaro-trek",
  "/trekking/9-days-northern-circuit-route-kilimanjaro-trek",
  "/trekking/kilimanjaro-lemosho-route",
  "/trekking/kilimanjaro-machame-route",
  "/trekking/kilimanjaro-machame-route-9-day",
  "/trekking/kilimanjaro-marangu-route",
  "/trekking/kilimanjaro-marangu-route-8-day",
  "/zanzibar/5-days/zanzibar-5-days",
];

function buildSitemap() {
  const lastModified = new Date().toISOString();

  const urls = staticRoutes
    .map((path) => {
      const loc = `${siteUrl}${path}`;
      return `<url><loc>${loc}</loc><lastmod>${lastModified}</lastmod></url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET() {
  const body = buildSitemap();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
