const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, "");

const staticRoutes = [
  "/",
  "/itineraries",
  "/experiences",
  "/plan",
  "/conservation",
  "/auth",
  "/auth/callback",
  "/trekking",
  "/trekking/kilimanjaro-lemosho-route",
  "/trekking/kilimanjaro-machame-route",
  "/trekking/kilimanjaro-machame-route-9-day",
  "/trekking/kilimanjaro-marangu-route",
  "/trekking/kilimanjaro-marangu-route-8-day",
  "/cancel",
  "/success",
];

export default function sitemap() {
  const lastModified = new Date().toISOString();

  return staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));
}
