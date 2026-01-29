'use client';

import Link from "next/link";
import articlesData from "@/data/articles.json";
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

export default function BlogPage() {
    const articles: Article[] = articlesData;

    return (
        <div className="blog-wrapper">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <span className="badge">📚 Blog</span>
                    <h1 className="headline">
                        IPTV <span className="gradient-text">Guides & Tips</span>
                    </h1>
                    <p className="subheadline">
                        Learn how to get the most out of your IPTV subscription with our
                        comprehensive guides and tutorials.
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="articles-section">
                <div className="container">
                    <div className="articles-grid">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/blog/${article.slug}`}
                                className="article-card"
                            >
                                <div className="article-image">
                                    <div className="image-placeholder">
                                        <span>📄</span>
                                    </div>
                                    <span className="category-badge">{article.category}</span>
                                </div>
                                <div className="article-content">
                                    <div className="article-meta">
                                        <span>{formatDate(article.publishedAt)}</span>
                                        <span>•</span>
                                        <span>{article.readTime} read</span>
                                    </div>
                                    <h2 className="article-title">{article.title}</h2>
                                    <p className="article-excerpt">{article.excerpt}</p>
                                    <span className="read-more">Read article →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />

            <style jsx>{`
                .blog-wrapper {
                    background: #0D0D0D;
                    color: white;
                    min-height: 100vh;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* Hero Section */
                .hero-section {
                    padding: 140px 0 60px;
                    text-align: center;
                    background: radial-gradient(circle at top center, rgba(242, 7, 50, 0.1) 0%, transparent 70%);
                }

                .badge {
                    display: inline-block;
                    background: rgba(242, 7, 50, 0.1);
                    color: #F20732;
                    padding: 0.5rem 1.25rem;
                    border-radius: 50px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    border: 1px solid rgba(242, 7, 50, 0.2);
                }

                .headline {
                    font-size: clamp(2.5rem, 8vw, 4rem);
                    font-weight: 800;
                    margin-bottom: 1rem;
                    line-height: 1.1;
                }

                .gradient-text {
                    background: linear-gradient(135deg, #CB9500 0%, #F20732 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .subheadline {
                    font-size: 1.15rem;
                    color: rgba(255, 255, 255, 0.6);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Articles Grid */
                .articles-section {
                    padding: 40px 0 80px;
                }

                .articles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 2rem;
                }

                .article-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    overflow: hidden;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: block;
                }

                .article-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(242, 7, 50, 0.3);
                    box-shadow: 0 20px 40px rgba(242, 7, 50, 0.1);
                }

                .article-image {
                    height: 200px;
                    background: linear-gradient(135deg, rgba(203, 149, 0, 0.2), rgba(242, 7, 50, 0.2));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .image-placeholder {
                    font-size: 4rem;
                }

                .category-badge {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    background: #F20732;
                    color: white;
                    padding: 0.35rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .article-content {
                    padding: 1.5rem;
                }

                .article-meta {
                    display: flex;
                    gap: 0.5rem;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.85rem;
                    margin-bottom: 0.75rem;
                }

                .article-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.75rem;
                    line-height: 1.4;
                }

                .article-excerpt {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .read-more {
                    color: #F20732;
                    font-weight: 600;
                    font-size: 0.95rem;
                }

                @media (max-width: 768px) {
                    .articles-grid {
                        grid-template-columns: 1fr;
                    }
                    .hero-section {
                        padding: 120px 0 40px;
                    }
                }
            `}</style>
        </div>
    );
}
