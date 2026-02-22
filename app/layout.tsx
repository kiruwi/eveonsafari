import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

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

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const vercelPreviewUrl = process.env.VERCEL_URL;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID ?? "G-R60T92DT4E";
const fallbackSiteUrl = "https://eveonsafari.com";

const siteUrl = (envSiteUrl
  || (vercelProductionUrl ? `https://${vercelProductionUrl}` : undefined)
  || (vercelPreviewUrl ? `https://${vercelPreviewUrl}` : undefined)
  || fallbackSiteUrl
).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Eve On Safari | Bespoke Tanzania Journeys",
  description:
    "Plan immersive, conservation-led safaris across Tanzania with Eve On Safari’s expert travel designers.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "./",
  },
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
