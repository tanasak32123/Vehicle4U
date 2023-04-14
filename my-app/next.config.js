/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV != "development",
  },
  images: {
    minimumCacheTTL: 60,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mdbcdn.b-cdn.net",
      },
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
