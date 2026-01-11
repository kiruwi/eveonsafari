const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://eveonsafari.com").replace(/\/$/, "");

const staticRoutes = [
  "/",
  "/itineraries",
  "/activities",
  "/plan",
  "/auth",
  "/trekking",
  "/trekking/kilimanjaro-lemosho-route",
  "/trekking/kilimanjaro-machame-route",
  "/trekking/kilimanjaro-machame-route-9-day",
  "/trekking/kilimanjaro-marangu-route",
  "/trekking/kilimanjaro-marangu-route-8-day",
  "/cancel",
  "/success",
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
