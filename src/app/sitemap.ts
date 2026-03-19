import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';

// INDEXED PAGES ONLY - Safe content strategy
// Sync with robots.txt

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.rabbitaitv.com';
    const currentDate = new Date().toISOString();

    // Blog = highest priority (safe content)
    const blogPages = [
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
    ];

    // Blog articles dynamically from JSON
    const blogArticles = articlesData.map((article: { slug: string }) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Support/info pages (safe content)
    const supportPages = [
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/setup-guide`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/channels`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        },
    ];

    // Legal pages (low priority)
    const legalPages = [
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.2,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.2,
        },
    ];

    // EXCLUDED FROM SITEMAP (sensitive pages):
    // - / (homepage with pricing)
    // - /pricing (money page)
    // - /checkout
    // - /api/*

    return [...blogPages, ...blogArticles, ...supportPages, ...legalPages];
}
