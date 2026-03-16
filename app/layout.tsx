import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  defaultMetaDescription,
  defaultMetaTitle,
  organizationJsonLd,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const titleFont = localFont({
  src: "../public/DK American Grunge.ttf",
  variable: "--font-title",
  weight: "400",
  style: "normal",
  display: "swap",
});

const americanGrungeFont = localFont({
  src: "../public/American_Grunge.ttf",
  variable: "--font-american-grunge",
  weight: "400",
  style: "normal",
  display: "swap",
});

const gatheniaFont = localFont({
  src: "../public/Gathenia.otf",
  variable: "--font-gathenia",
  weight: "400",
  style: "normal",
  display: "swap",
});

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID ?? "G-R60T92DT4E";

export const metadata: Metadata = {
  title: defaultMetaTitle,
  description: defaultMetaDescription,
  applicationName: siteName,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultMetaTitle,
    description: defaultMetaDescription,
    siteName,
    locale: "en_US",
    images: [
      {
        url: "/evelogo.png",
        alt: "Eve On Safari logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMetaTitle,
    description: defaultMetaDescription,
    images: ["/evelogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "Tanzania safari",
    "Kilimanjaro trekking",
    "Zanzibar holiday",
    "Serengeti safari",
    "Ngorongoro crater tour",
    "Arusha tour operator",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="jsonld-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script id="jsonld-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteJsonLd)}
        </Script>
        {gaMeasurementId ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${titleFont.variable} ${americanGrungeFont.variable} ${gatheniaFont.variable} antialiased bg-white text-[#231f20]`}
      >
        <SiteHeader />
        <main className="eos-content min-h-screen bg-white">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
