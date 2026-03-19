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
      // Generic catch for any .php if nested
      {
        source: '/:path*/index.php',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

