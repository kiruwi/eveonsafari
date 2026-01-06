import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

const rockybillyFont = localFont({
  src: "../public/Rockybilly.ttf",
  variable: "--font-rockybilly",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${titleFont.variable} ${americanGrungeFont.variable} ${rockybillyFont.variable} ${gatheniaFont.variable} antialiased bg-white text-[#231f20]`}
      >
        <SiteHeader />
        <main className="eos-content min-h-screen bg-white">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
