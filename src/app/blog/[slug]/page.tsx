import { Metadata } from "next";
import { notFound } from "next/navigation";
import articlesData from "@/data/articles.json";
import BlogArticleClient from "./BlogArticleClient";
import { siteConfig } from "@/config/site";

interface Article {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    readTime: string;
    publishedAt: string;
    category: string;
}

// Generate static params for all articles
export async function generateStaticParams() {
    return articlesData.map((article) => ({
        slug: article.slug,
    }));
}

// Generate metadata for each article
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = articlesData.find((a) => a.slug === params.slug) as Article | undefined;

    if (!article) {
        return {
            title: "Article Not Found",
        };
    }

    const articleUrl = `${siteConfig.url}/blog/${article.slug}`;
    const imageUrl = `${siteConfig.url}${article.image}`;

    // Extract keywords from title, category, and content
    const keywords = [
        article.title,
        article.category,
        "IPTV",
        "streaming",
        "IPTV guide",
        "IPTV tutorial",
        "best IPTV",
        "IPTV service",
        "4K streaming",
        "live TV",
    ];

    return {
        title: article.title,
        description: article.excerpt,
        keywords: keywords,
        authors: [{ name: article.author }],
        openGraph: {
            type: "article",
            url: articleUrl,
            title: article.title,
            description: article.excerpt,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            publishedTime: article.publishedAt,
            authors: [article.author],
            siteName: siteConfig.name,
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [imageUrl],
            creator: "@rabbitaitv",
        },
        alternates: {
            canonical: articleUrl,
        },
    };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
    const article = articlesData.find((a) => a.slug === params.slug) as Article | undefined;

    if (!article) {
        notFound();
    }

    // Generate JSON-LD structured data for the article
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: `${siteConfig.url}${article.image}`,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        author: {
            "@type": "Person",
            name: article.author,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
                "@type": "ImageObject",
                url: `${siteConfig.url}/logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/blog/${article.slug}`,
        },
    };

    // Generate BreadcrumbList JSON-LD
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteConfig.url,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${siteConfig.url}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `${siteConfig.url}/blog/${article.slug}`,
            },
        ],
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <BlogArticleClient article={article} />
        </>
    );
}
