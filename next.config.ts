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
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // Ghost article URL once discovered by Google but never published
      {
        source: '/blog/rabbitai-tv-premium-streaming',
        destination: '/blog',
        permanent: true,
      },
      // Club World Cup post -> World Cup 2026 guide, itself retired once the
      // tournament ended (points straight to the final target, no chain)
      {
        source: '/blog/where-to-watch-club-world-cup-2026',
        destination: '/channels',
        permanent: true,
      },
      // SEO cleanup (Oct 2026): six auto-published posts targeting the same
      // "best AI IPTV 2026" query, merged into one article
      ...[
        'best-ai-powered-iptv-firestick-2026',
        'best-ai-iptv-service-us-2026-rabbitai-tv',
        'best-iptv-service-firestick-2026',
        'best-ai-powered-iptv-service-usa-2026-rabbitai-tv',
        'best-smart-iptv-firestick-2026-rabbitai',
        'best-ai-iptv-usa-2026',
      ].map((slug) => ({
        source: `/blog/${slug}`,
        destination: '/blog/best-ai-iptv-service-us-2026',
        permanent: true,
      })),
      // SEO cleanup (Oct 2026): thin or dated posts Google crawled but refused
      // to index, sent to the closest page that is still worth ranking
      ...[
        ['best-iptv-service-2025', '/blog/best-ai-iptv-service-us-2026'],
        ['best-iptv-subscriptions-2026', '/blog/best-ai-iptv-service-us-2026'],
        ['how-to-watch-live-tv-in-usa-without-cable-2026', '/blog/best-ai-iptv-service-us-2026'],
        ['watch-sports-live-iptv', '/channels'],
        ['where-to-watch-world-cup-2026', '/channels'],
        ['video-channels-iptv-guide-2026', '/channels'],
        ['rabbittv-free-channels-review', '/'],
      ].map(([slug, destination]) => ({
        source: `/blog/${slug}`,
        destination,
        permanent: true,
      })),
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
      // Generic catch for any .php/.html if nested: strip index file, keep the path
      {
        source: '/:path*/index.php',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*/index.html',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

