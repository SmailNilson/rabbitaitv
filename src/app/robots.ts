import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/blog',
                    '/setup-guide',
                    '/channels',
                    '/privacy-policy',
                    '/terms'
                ],
                disallow: [
                    '/reseller',
                    '/pricing',
                    '/checkout',
                    '/api/',
                    '/_next/',
                    '/admin'
                ],
            },
            {
                userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'BLEXBot', 'DataForSeoBot'],
                disallow: '/',
            }
        ],
        sitemap: 'https://www.rabbitaitv.com/sitemap.xml',
    }
}
