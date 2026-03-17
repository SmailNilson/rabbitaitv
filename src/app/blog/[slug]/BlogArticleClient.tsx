'use client';

import Link from "next/link";
import CTASection from "@/components/sections/CTASection";

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

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// Convert markdown-like content to HTML with better table support
function renderContent(content: string): string {
    let html = content;

    // Handle tables (basic markdown table support)
    const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;
    html = html.replace(tableRegex, (match, header, body) => {
        const headers = header.split('|').filter((h: string) => h.trim()).map((h: string) => `<th>${h.trim()}</th>`).join('');
        const rows = body.trim().split('\n').map((row: string) => {
            const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    });

    // Images (must be before links to avoid conflict with ![alt](src) vs [text](url))
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="content-image" loading="lazy" />');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="content-link">$1</a>');

    // Headers (# for h1, but skip if inside already-processed HTML)
    html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic (single asterisks, but not inside bold)
    html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

    // Lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="numbered">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="bullet">$1</li>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');

    return `<p>${html}</p>`;
}

export default function BlogArticleClient({ article }: { article: Article }) {
    return (
        <div className="article-wrapper">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="back-link-wrapper">
                        <Link href="/blog" className="back-link">
                            ← Back to Blog
                        </Link>
                    </div>
                    <div className="badge-wrapper">
                        <span className="category-badge">{article.category}</span>
                    </div>
                    <h1 className="headline">{article.title}</h1>
                    <div className="article-meta">
                        <div className="author-info">
                            <div className="author-avatar">🧑‍💻</div>
                            <span>By {article.author}</span>
                        </div>
                        <span className="meta-separator">•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                        <span className="meta-separator">•</span>
                        <span>📖 {article.readTime} read</span>
                    </div>
                </div>
            </section>

            {/* Article Image */}
            {article.image && (
                <div className="container image-container">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="main-article-image"
                    />
                </div>
            )}

            {/* Article Content */}
            <section className="content-section">
                <div className="container">
                    <article
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
                    />

                    {/* Author Box */}
                    <div className="author-box">
                        <div className="author-avatar-large">🧑‍💻</div>
                        <div className="author-details">
                            <h4>Written by {article.author}</h4>
                            <p>Our team of IPTV experts brings you the latest guides and tips for the best streaming experience.</p>
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="share-section">
                        <p>Found this helpful? Share with others!</p>
                        <div className="share-buttons">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://rabbitaitv.com/blog/${article.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-btn twitter"
                            >
                                <span>𝕏</span> Twitter
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://rabbitaitv.com/blog/${article.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-btn facebook"
                            >
                                <span>f</span> Facebook
                            </a>
                            <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - https://rabbitaitv.com/blog/' + article.slug)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-btn whatsapp"
                            >
                                <span>💬</span> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />

            <style jsx>{`
                .article-wrapper {
                    background: #0D0D0D;
                    color: white;
                    min-height: 100vh;
                }

                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* Hero Section */
                .hero-section {
                    padding: 140px 0 50px;
                    text-align: center;
                    background: linear-gradient(180deg, rgba(242, 7, 50, 0.08) 0%, transparent 100%);
                }

                .back-link-wrapper {
                    margin-bottom: 1rem;
                }

                .back-link {
                    display: inline-block;
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    font-size: 0.95rem;
                    transition: color 0.3s ease;
                    padding: 0.5rem 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                }

                .back-link:hover {
                    color: #F20732;
                    background: rgba(242, 7, 50, 0.1);
                }

                .badge-wrapper {
                    margin-bottom: 1.25rem;
                }

                .category-badge {
                    display: inline-block;
                    background: #F20732;
                    color: white;
                    padding: 0.4rem 1.25rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .headline {
                    font-size: clamp(2rem, 6vw, 2.75rem);
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                    max-width: 700px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .article-meta {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.75rem;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                    flex-wrap: wrap;
                }

                .author-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .author-avatar {
                    font-size: 1.25rem;
                }

                .meta-separator {
                    color: rgba(255, 255, 255, 0.3);
                }

                /* Image Section */
                .image-container {
                    margin-top: -30px;
                    margin-bottom: 40px;
                    position: relative;
                    z-index: 5;
                }

                .main-article-image {
                    width: 100%;
                    max-height: 500px;
                    object-fit: cover;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                /* Content Section */
                .content-section {
                    padding: 50px 0 60px;
                }

                .article-content {
                    font-size: 1.1rem;
                    line-height: 1.9;
                    color: rgba(255, 255, 255, 0.85);
                }

                .article-content :global(h2) {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: white;
                    margin: 2.5rem 0 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid rgba(242, 7, 50, 0.3);
                }

                .article-content :global(h3) {
                    font-size: 1.35rem;
                    font-weight: 600;
                    color: white;
                    margin: 2rem 0 0.75rem;
                }

                .article-content :global(strong) {
                    color: #F20732;
                    font-weight: 600;
                }

                .article-content :global(li) {
                    margin-left: 1.5rem;
                    margin-bottom: 0.5rem;
                    padding-left: 0.5rem;
                }

                .article-content :global(li.numbered) {
                    list-style: decimal;
                }

                .article-content :global(li.bullet) {
                    list-style: disc;
                }

                .article-content :global(p) {
                    margin-bottom: 1.25rem;
                }

                .article-content :global(table) {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 12px;
                    overflow: hidden;
                }

                .article-content :global(th) {
                    background: rgba(242, 7, 50, 0.15);
                    color: white;
                    font-weight: 600;
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .article-content :global(td) {
                    padding: 0.875rem 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    color: rgba(255, 255, 255, 0.8);
                }

                .article-content :global(tr:last-child td) {
                    border-bottom: none;
                }

                .article-content :global(.content-image) {
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    border-radius: 16px;
                    margin: 1.5rem 0;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: block;
                }

                .article-content :global(.content-link) {
                    color: #F20732;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    transition: color 0.3s ease;
                }

                .article-content :global(.content-link:hover) {
                    color: #ff4d6d;
                }

                .article-content :global(em) {
                    font-style: italic;
                    color: rgba(255, 255, 255, 0.7);
                }

                /* Author Box */
                .author-box {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-top: 3rem;
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                }

                .author-avatar-large {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, rgba(203, 149, 0, 0.3), rgba(242, 7, 50, 0.3));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.75rem;
                    flex-shrink: 0;
                }

                .author-details h4 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 0.25rem;
                }

                .author-details p {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.5);
                    line-height: 1.5;
                }

                /* Share Section */
                .share-section {
                    margin-top: 2rem;
                    padding: 2rem;
                    background: linear-gradient(135deg, rgba(242, 7, 50, 0.05) 0%, rgba(203, 149, 0, 0.05) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    text-align: center;
                }

                .share-section p {
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 1rem;
                    font-size: 0.95rem;
                }

                .share-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                .share-btn {
                    padding: 0.6rem 1.25rem;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .share-btn span {
                    font-weight: bold;
                }

                .share-btn.twitter {
                    background: #000;
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .share-btn.facebook {
                    background: #4267B2;
                    color: white;
                }

                .share-btn.whatsapp {
                    background: #25D366;
                    color: white;
                }

                .share-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                }

                @media (max-width: 768px) {
                    .hero-section {
                        padding: 120px 0 30px;
                    }
                    .headline {
                        font-size: 1.75rem;
                    }
                    .article-content {
                        font-size: 1rem;
                    }
                    .author-box {
                        flex-direction: column;
                        text-align: center;
                    }
                    .share-buttons {
                        flex-direction: column;
                    }
                    .share-btn {
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
}
