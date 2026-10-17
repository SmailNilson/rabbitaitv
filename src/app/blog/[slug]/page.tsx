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
    video?: string;
    /** Search-result title/snippet when the on-page title or excerpt is too long for Google. */
    metaTitle?: string;
    metaDescription?: string;
}

// Build FAQPage schema by extracting Q/A pairs from an article's FAQ section,
// written either as HTML (<h3> + <p>) or as Markdown (### question, then the answer paragraph).
function extractFaqFromContent(content: string): { q: string; a: string }[] {
    const faqs: { q: string; a: string }[] = [];
    const lower = content.toLowerCase();
    let start = lower.indexOf("frequently asked questions");
    if (start === -1) start = lower.search(/<h2[^>]*>[^<]*\bfaq\b/);
    if (start === -1) return faqs;
    const section = content.slice(start);
    const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(section)) !== null) {
        const q = m[1].replace(/<[^>]+>/g, "").trim();
        const a = m[2].replace(/<[^>]+>/g, "").trim();
        if (q && a) faqs.push({ q, a });
    }
    if (faqs.length > 0) return faqs;
    const plain = (md: string) => md.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1").trim();
    const mdRe = /^###\s+(.+)\n+(?!#)(.+)$/gm;
    while ((m = mdRe.exec(section)) !== null) {
        const q = plain(m[1]);
        const a = plain(m[2]);
        if (q && a && !a.startsWith("[[")) faqs.push({ q, a });
    }
    return faqs;
}

// Generate static params for all articles
export async function generateStaticParams() {
    return articlesData.map((article) => ({
        slug: article.slug,
    }));
}

// Generate metadata for each article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = articlesData.find((a) => a.slug === slug) as Article | undefined;

    if (!article) {
        return {
            title: "Article Not Found",
        };
    }

    const articleUrl = `${siteConfig.url}/blog/${article.slug}`;
    // metaTitle is complete on its own (no " | RabbitAI TV" suffix) so it fits Google's ~60 characters.
    const seoTitle = article.metaTitle ?? article.title;
    const seoDescription = article.metaDescription ?? article.excerpt;
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
        title: article.metaTitle ? { absolute: article.metaTitle } : article.title,
        description: seoDescription,
        keywords: keywords,
        authors: [{ name: article.author }],
        openGraph: {
            type: "article",
            url: articleUrl,
            title: seoTitle,
            description: seoDescription,
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
            title: seoTitle,
            description: seoDescription,
            images: [imageUrl],
            creator: "@rabbitaitv",
        },
        alternates: {
            canonical: articleUrl,
        },
    };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = articlesData.find((a) => a.slug === slug) as Article | undefined;

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
                url: `${siteConfig.url}/images/logo.png`,
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

    // FAQPage schema: generated dynamically from ANY article containing an FAQ section
    const parsedFaq = extractFaqFromContent(article.content);
    const faqJsonLd: object | null = parsedFaq.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: parsedFaq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
            },
        })),
    } : null;

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
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}

            <BlogArticleClient article={article} />
        </>
    );
}
