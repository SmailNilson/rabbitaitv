'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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

const POSTS_PER_PAGE = 50;

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function ArrowIcon() {
    return (
        <svg
            className="arrow-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
        >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    );
}

export default function BlogPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const articles: Article[] = useMemo(() => {
        return [...articlesData].sort((a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }, []);

    const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);

    const paginatedArticles = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return articles.slice(start, start + POSTS_PER_PAGE);
    }, [currentPage, articles]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    // On the first page, the most recent article becomes a wide hero card.
    const featured = currentPage === 1 ? paginatedArticles[0] : undefined;
    const gridArticles = featured ? paginatedArticles.slice(1) : paginatedArticles;

    return (
        <div className="blog-wrapper">
            <main className="container">
                {/* Header */}
                <header className="blog-header">
                    <span className="eyebrow">Blog</span>
                    <h1 className="blog-title">Guides, news &amp; tips</h1>
                    <p className="blog-subtitle">
                        Get the most out of your IPTV subscription with our in-depth guides,
                        tutorials, and the latest streaming news.
                    </p>
                </header>

                {/* Featured hero card */}
                {featured && (
                    <Link
                        href={`/blog/${featured.slug}`}
                        className="card featured-card"
                    >
                        <div className="featured-media">
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                width={760}
                                height={428}
                                className="cover-image"
                                sizes="(max-width: 880px) 100vw, 60vw"
                                priority
                            />
                        </div>
                        <div className="featured-body">
                            <div className="meta-row">
                                <span className="pill">{featured.category}</span>
                                <span className="meta-date">
                                    {formatDate(featured.publishedAt)} · {featured.readTime} read
                                </span>
                            </div>
                            <h2 className="featured-headline">{featured.title}</h2>
                            <p className="excerpt featured-excerpt">{featured.excerpt}</p>
                            <span className="read-more">
                                Read more <ArrowIcon />
                            </span>
                        </div>
                    </Link>
                )}

                {/* Articles grid */}
                <div className="articles-grid">
                    {gridArticles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="card article-card"
                        >
                            <div className="card-media">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    width={400}
                                    height={225}
                                    className="cover-image"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="card-body">
                                <div className="meta-row">
                                    <span className="pill">{article.category}</span>
                                    <span className="meta-date">
                                        {formatDate(article.publishedAt)}
                                    </span>
                                </div>
                                <h2 className="card-title">{article.title}</h2>
                                <p className="excerpt">{article.excerpt}</p>
                                <span className="read-more">
                                    Read more <ArrowIcon />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="page-btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        <div className="page-numbers">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            className="page-btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>

            <CTASection />

            <style jsx>{`
                .blog-wrapper {
                    background: var(--background);
                    color: var(--text);
                    min-height: 100vh;
                }

                /* Header */
                .blog-header {
                    text-align: center;
                    max-width: 640px;
                    margin: 0 auto;
                    padding: 1rem 0 3rem;
                }

                .blog-header .eyebrow {
                    margin-bottom: 1rem;
                }

                .blog-title {
                    font-family: var(--font-heading);
                    font-size: clamp(2.25rem, 6vw, 3.5rem);
                    font-weight: 700;
                    line-height: 1.08;
                    margin: 0 0 1rem;
                }

                .blog-subtitle {
                    color: var(--text-muted);
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin: 0;
                }

                /* Shared card media + cover */
                .cover-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.5s ease;
                }

                .meta-row {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                    margin-bottom: 0.85rem;
                }

                .pill {
                    display: inline-block;
                    background: var(--primary-soft);
                    color: var(--primary);
                    padding: 0.3rem 0.7rem;
                    border-radius: 999px;
                    font-size: 0.72rem;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    text-transform: uppercase;
                }

                .meta-date {
                    color: var(--text-dim);
                    font-size: 0.82rem;
                }

                .excerpt {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 0 0 1.1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .read-more {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: var(--primary);
                    font-weight: 600;
                    font-size: 0.92rem;
                }

                .arrow-icon {
                    width: 16px;
                    height: 16px;
                    transition: transform 0.25s ease;
                }

                .card:hover .arrow-icon {
                    transform: translateX(3px);
                }

                /* Featured hero card */
                .featured-card {
                    display: grid;
                    grid-template-columns: 1.25fr 1fr;
                    overflow: hidden;
                    text-decoration: none;
                    color: inherit;
                    margin-bottom: 2rem;
                    transition: transform 0.3s ease, border-color 0.3s ease;
                    padding: 0;
                }

                .featured-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--border-strong);
                }

                .featured-media {
                    position: relative;
                    aspect-ratio: 16 / 9;
                    overflow: hidden;
                }

                .featured-card:hover .cover-image {
                    transform: scale(1.04);
                }

                .featured-body {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .featured-headline {
                    font-family: var(--font-heading);
                    font-size: clamp(1.5rem, 2.5vw, 2rem);
                    font-weight: 700;
                    line-height: 1.2;
                    margin: 0 0 0.9rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .featured-excerpt {
                    font-size: 1rem;
                }

                /* Articles grid */
                .articles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                }

                .article-card {
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    text-decoration: none;
                    color: inherit;
                    transition: transform 0.3s ease, border-color 0.3s ease;
                    padding: 0;
                }

                .article-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--border-strong);
                }

                .card-media {
                    position: relative;
                    aspect-ratio: 16 / 9;
                    overflow: hidden;
                }

                .article-card:hover .cover-image {
                    transform: scale(1.04);
                }

                .card-body {
                    padding: 1.35rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .card-title {
                    font-family: var(--font-heading);
                    font-size: 1.2rem;
                    font-weight: 600;
                    line-height: 1.32;
                    margin: 0 0 0.7rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .card-body .read-more {
                    margin-top: auto;
                }

                /* Pagination */
                .pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    margin: 3.5rem 0 1rem;
                    flex-wrap: wrap;
                }

                .page-numbers {
                    display: flex;
                    gap: 0.45rem;
                    flex-wrap: wrap;
                }

                .page-btn,
                .page-number {
                    background: var(--card);
                    border: 1px solid var(--border);
                    color: var(--text);
                    padding: 0.65rem 1.1rem;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .page-number {
                    padding: 0.65rem 0.95rem;
                    min-width: 44px;
                }

                .page-btn:hover:not(:disabled),
                .page-number:hover {
                    border-color: var(--border-strong);
                    color: var(--primary);
                }

                .page-number.active {
                    background: var(--primary);
                    border-color: var(--primary);
                    color: #fff;
                }

                .page-btn:disabled {
                    opacity: 0.35;
                    cursor: not-allowed;
                }

                @media (max-width: 880px) {
                    .featured-card {
                        grid-template-columns: 1fr;
                    }
                    .featured-body {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
