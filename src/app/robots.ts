import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/_next/'
                ],
                disallow: [
                    '/checkout',
                    '/api/',
                    '/admin'
                ],
            },
            {
                userAgent: 'Mediapartners-Google',
                allow: '/',
            },
            {
                userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'BLEXBot', 'DataForSeoBot'],
                disallow: '/',
            }
        ],
        sitemap: 'https://www.rabbitaitv.com/sitemap.xml',
    }
}
