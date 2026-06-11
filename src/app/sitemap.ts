import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';

// All public, indexable pages. Sync with robots.ts
// (only /checkout, /api and /admin are excluded from indexing).

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.rabbitaitv.com';

    // Most recent article date = last meaningful content change for listing pages
    const latestArticleDate = articlesData
        .map((a: { publishedAt: string }) => a.publishedAt)
        .sort()
        .reverse()[0];

    const mainPages = [
        {
            url: `${baseUrl}`,
            lastModified: latestArticleDate,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/pricing`,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: latestArticleDate,
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
    ];

    // Blog articles dynamically from JSON, with their real publication date
    const blogArticles = articlesData.map((article: { slug: string; publishedAt: string }) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: article.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Support/info pages
    const supportPages = [
        {
            url: `${baseUrl}/setup-guide`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/channels`,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/reseller`,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ];

    // Legal pages (low priority)
    const legalPages = [
        {
            url: `${baseUrl}/privacy-policy`,
            changeFrequency: 'yearly' as const,
            priority: 0.2,
        },
        {
            url: `${baseUrl}/terms`,
            changeFrequency: 'yearly' as const,
            priority: 0.2,
        },
    ];

    // EXCLUDED FROM SITEMAP (non-indexable pages):
    // - /checkout
    // - /api/*
    // - /admin

    return [...mainPages, ...blogArticles, ...supportPages, ...legalPages];
}
