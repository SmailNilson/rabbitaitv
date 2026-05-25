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
                        {paginatedArticles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/blog/${article.slug}`}
                                className="article-card"
                            >
                                <div className="article-image">
                                    {article.image ? (
                                        <div className="card-image-container">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="card-main-image"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={articles.indexOf(article) < 2}
                                            />
                                        </div>
                                    ) : (
                                        <div className="image-placeholder">
                                            <span>📄</span>
                                        </div>
                                    )}
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

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn prev"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ← Prev
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
                                className="page-btn next"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    )}
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

                .card-main-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .article-card:hover .card-main-image {
                    transform: scale(1.05);
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

                /* Pagination */
                .pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1.5rem;
                    margin-top: 4rem;
                }

                .page-numbers {
                    display: flex;
                    gap: 0.5rem;
                }

                .page-btn, .page-number {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    padding: 0.75rem 1.25rem;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .page-number {
                    padding: 0.75rem 1rem;
                    min-width: 45px;
                }

                .page-btn:hover:not(:disabled), .page-number:hover {
                    background: rgba(242, 7, 50, 0.1);
                    border-color: #F20732;
                    color: #F20732;
                }

                .page-number.active {
                    background: #F20732;
                    border-color: #F20732;
                    color: white;
                    box-shadow: 0 10px 20px rgba(242, 7, 50, 0.3);
                }

                .page-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .articles-grid {
                        grid-template-columns: 1fr;
                    }
                    .hero-section {
                        padding: 120px 0 40px;
                    }
                    .pagination {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .page-numbers {
                        order: -1;
                    }
                }
            `}</style>
        </div>
    );
}
