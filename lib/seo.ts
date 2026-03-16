import type { Metadata } from "next";

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const vercelPreviewUrl = process.env.VERCEL_URL;
const fallbackSiteUrl = "https://eveonsafari.com";

export const siteUrl = (
  envSiteUrl
  || (vercelProductionUrl ? `https://${vercelProductionUrl}` : undefined)
  || (vercelPreviewUrl ? `https://${vercelPreviewUrl}` : undefined)
  || fallbackSiteUrl
).replace(/\/$/, "");

export const siteName = "Eve On Safari";
export const defaultMetaTitle = "Eve On Safari | Tanzania Safaris, Kilimanjaro Treks & Zanzibar Trips";
export const defaultMetaDescription =
  "Plan immersive, conservation-led Tanzania journeys with local experts. Discover tailored safaris, Kilimanjaro treks, Zanzibar extensions, and day trips.";

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${siteUrl}${path}`;
  }
  return `${siteUrl}/${path}`;
}

export function withCanonical(path: string, metadata: Metadata = {}): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: path,
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": organizationId,
  name: siteName,
  url: siteUrl,
  logo: toAbsoluteUrl("/evelogo.png"),
  email: "info@eveonsafari.com",
  telephone: "+255768611005",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mateves Street",
    addressLocality: "Arusha",
    addressCountry: "TZ",
  },
  sameAs: [
    "https://www.instagram.com/eve_on_safari/",
    "https://www.tiktok.com/@eveonsafari",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: siteName,
  description: defaultMetaDescription,
  publisher: {
    "@id": organizationId,
  },
  inLanguage: "en",
};
