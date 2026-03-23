'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
                    <h2 className="section-title">Related Articles</h2>
                    <p className="section-subtitle">Continue exploring our IPTV guides</p>
                </div>
                <div className="carousel-controls">
                    <button
                        onClick={prevSlide}
                        className="control-btn prev"
                        aria-label="Previous articles"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        className="control-btn next"
                        aria-label="Next articles"
                    >
                        →
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
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="article-image"
                                    />
                                    <span className="category-badge">{article.category}</span>
                                </div>
                                <div className="card-content">
                                    <h3 className="article-title">{article.title}</h3>
                                    <p className="article-excerpt">{article.excerpt}</p>
                                    <div className="article-meta">
                                        <span className="read-time">📖 {article.readTime} read</span>
                                        <span className="read-more">Read more →</span>
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
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 2.5rem;
                }

                .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.5rem;
                }

                .section-subtitle {
                    color: rgba(255, 255, 255, 0.6);
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
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    font-size: 1.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .control-btn:hover {
                    background: #F20732;
                    border-color: #F20732;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(242, 7, 50, 0.3);
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
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                }

                .article-card:hover {
                    border-color: rgba(242, 7, 50, 0.4);
                    background: rgba(242, 7, 50, 0.02);
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 180px;
                    overflow: hidden;
                }

                .article-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .article-card:hover .article-image {
                    transform: scale(1.05);
                }

                .category-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: #F20732;
                    color: white;
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
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.75rem;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .article-excerpt {
                    color: rgba(255, 255, 255, 0.6);
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
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                }

                .read-time {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.8rem;
                }

                .read-more {
                    color: #F20732;
                    font-weight: 600;
                    font-size: 0.85rem;
                }
            `}</style>
        </section>
    );
}
