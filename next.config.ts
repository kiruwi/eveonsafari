import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      {
        source: "/experiences",
        destination: "/activities",
        permanent: true,
      },
      {
        source: "/safaris/3-days/3-day-manyara-ngorongoro-tarangire",
        destination: "/safaris/3-day-manyara-ngorongoro-tarangire",
        permanent: true,
      },
      {
        source: "/safaris/8-days/8-day-migration-cultural-wonders",
        destination: "/safaris/8-day-migration-cultural-wonders",
        permanent: true,
      },
      {
        source: "/safaris/9-days/9-day-grand-tanzania",
        destination: "/safaris/9-day-grand-tanzania",
        permanent: true,
      },
      {
        source: "/safaris/10-days/10-day-best-of-tanzania",
        destination: "/safaris/10-day-best-of-tanzania",
        permanent: true,
      },
      {
        source: "/tarangire-national-park-day-trip",
        destination: "/activities/day-trips/tarangire-day-trip",
        permanent: true,
      },
      {
        source: "/zanzibar_tours/3-days-zanzibar-beach-escape",
        destination: "/zanzibar/5-days/zanzibar-5-days",
        permanent: true,
      },
      {
        source: "/trekking/3-days-mount-meru-trek-a-scenic-challenge",
        destination: "/trekking",
        permanent: true,
      },
      {
        source: "/trekking/4-days-mount-meru-the-scenic-climb-before-kilimanjaro",
        destination: "/trekking",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default nextConfig;
