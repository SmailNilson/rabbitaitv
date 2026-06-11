import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rabbitaitv.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  async redirects() {
    return [
      // Canonical host: redirect non-www to www (Vercel serves both otherwise,
      // creating duplicate pages for every URL)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'rabbitaitv.com' }],
        destination: 'https://www.rabbitaitv.com/:path*',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/channels-list/:path*',
        destination: '/channels',
        permanent: true,
      },
      {
        source: '/setup-guide/index.php',
        destination: '/setup-guide',
        permanent: true,
      },
      {
        source: '/reseller/index.php',
        destination: '/reseller',
        permanent: true,
      },
      {
        source: '/feed/channels-list/:path*',
        destination: '/channels',
        permanent: true,
      },
      {
        source: '/feed/reseller/setup-guide/:path*',
        destination: '/setup-guide',
        permanent: true,
      },
      {
        source: '/feed/reseller/:path*',
        destination: '/reseller',
        permanent: true,
      },
      {
        source: '/feed/:path*',
        destination: '/blog',
        permanent: true,
      },
      // Generic catch for any .php if nested: strip index.php, keep the path
      {
        source: '/:path*/index.php',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

