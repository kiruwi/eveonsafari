import { siteUrl } from "@/lib/seo";

function buildRobots() {
  const siteHost = new URL(siteUrl).host;

  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteHost}
`;
}

export async function GET() {
  const body = buildRobots();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
