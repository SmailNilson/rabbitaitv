'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import articlesData from "@/data/articles.json";

interface Article {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    readTime: string;
}

interface RelatedArticlesProps {
    currentSlug: string;
    currentCategory: string;
}

export default function RelatedArticles({ currentSlug, currentCategory }: RelatedArticlesProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Get up to 8 articles for the carousel
    const relatedArticles = articlesData
        .filter((article) => article.slug !== currentSlug && article.category === currentCategory)
        .slice(0, 8) as Article[];

    // If not enough articles in the same category, add some from other categories
    if (relatedArticles.length < 5) {
        const moreArticles = articlesData
            .filter((article) => article.slug !== currentSlug && article.category !== currentCategory)
            .slice(0, 8 - relatedArticles.length) as Article[];
        relatedArticles.push(...moreArticles);
    }

    if (relatedArticles.length === 0) {
        return null;
    }

    const nextSlide = () => {
        if (currentIndex < relatedArticles.length - getVisibleSlides()) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Loop back to start
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(relatedArticles.length - getVisibleSlides()); // Loop to end
        }
    };

    const getVisibleSlides = () => {
        if (typeof window === 'undefined') return 3;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    };

    return (
        <section className="related-articles">
            <div className="section-header">
                <div className="title-area">
                    <h2 className="section-title">Related articles</h2>
                    <p className="section-subtitle">Continue exploring our IPTV guides</p>
                </div>
                <div className="carousel-controls">
                    <button
                        onClick={prevSlide}
                        className="control-btn prev"
                        aria-label="Previous articles"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="control-btn next"
                        aria-label="Next articles"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="carousel-container" ref={carouselRef}>
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / getVisibleSlides())}%)`
                    }}
                >
                    {relatedArticles.map((article) => (
                        <div key={article.id} className="carousel-item">
                            <Link
                                href={`/blog/${article.slug}`}
                                className="article-card"
                            >
                                <div className="image-wrapper">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        width={400}
                                        height={225}
                                        className="article-image"
                                    />
                                    <span className="category-badge">{article.category}</span>
                                </div>
                                <div className="card-content">
                                    <h3 className="article-title">{article.title}</h3>
                                    <p className="article-excerpt">{article.excerpt}</p>
                                    <div className="article-meta">
                                        <span className="read-time">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                            </svg>
                                            {article.readTime} read
                                        </span>
                                        <span className="read-more">
                                            Read more
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                                <polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .related-articles {
                    margin-top: 4rem;
                    padding: 3rem 0;
                    border-top: 1px solid var(--border);
                    position: relative;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 2.5rem;
                }

                .section-title {
                    font-family: var(--font-heading);
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--text);
                    margin-bottom: 0.5rem;
                }

                .section-subtitle {
                    color: var(--text-muted);
                    font-size: 1rem;
                }

                .carousel-controls {
                    display: flex;
                    gap: 0.75rem;
                }

                .control-btn {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    color: var(--text);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .control-btn :global(svg) {
                    width: 20px;
                    height: 20px;
                }

                .control-btn:hover {
                    background: var(--primary);
                    border-color: var(--primary);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px var(--primary-soft);
                }

                .carousel-container {
                    overflow: hidden;
                    width: 100%;
                }

                .carousel-track {
                    display: flex;
                    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform;
                }

                .carousel-item {
                    min-width: 33.333%;
                    padding: 0 1rem;
                    box-sizing: border-box;
                }

                @media (max-width: 1024px) {
                    .carousel-item {
                        min-width: 50%;
                    }
                }

                @media (max-width: 640px) {
                    .carousel-item {
                        min-width: 100%;
                    }
                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1.5rem;
                    }
                }

                .article-card {
                    height: 100%;
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                }

                .article-card:hover {
                    border-color: var(--border-strong);
                    transform: translateY(-3px);
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    overflow: hidden;
                }

                .image-wrapper :global(.article-image) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .article-card:hover :global(.article-image) {
                    transform: scale(1.05);
                }

                .category-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--primary);
                    color: var(--text);
                    padding: 0.35rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .card-content {
                    padding: 1.25rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .article-title {
                    font-family: var(--font-heading);
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: var(--text);
                    margin-bottom: 0.75rem;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .article-excerpt {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    line-height: 1.5;
                    margin-bottom: 1.25rem;
                    flex: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .article-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid var(--border);
                }

                .read-time {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: var(--text-dim);
                    font-size: 0.8rem;
                }

                .read-time :global(svg) {
                    width: 15px;
                    height: 15px;
                }

                .read-more {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    color: var(--primary);
                    font-weight: 600;
                    font-size: 0.85rem;
                    transition: gap 0.2s ease;
                }

                .read-more :global(svg) {
                    width: 15px;
                    height: 15px;
                }

                .article-card:hover .read-more {
                    gap: 0.55rem;
                }
            `}</style>
        </section>
    );
}
