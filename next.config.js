/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
  experimental: {
    // For Next.js 13 or newer: Add force-dynamic rendering for `/search` page
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/search",
        destination: "/search",
        has: [
          {
            type: "query",
            key: "query",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
