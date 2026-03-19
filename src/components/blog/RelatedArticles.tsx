'use client';

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
    // Get articles from the same category, excluding the current article
    const relatedArticles = articlesData
        .filter((article) => article.slug !== currentSlug && article.category === currentCategory)
        .slice(0, 3) as Article[];

    // If not enough articles in the same category, add some from other categories
    if (relatedArticles.length < 3) {
        const moreArticles = articlesData
            .filter((article) => article.slug !== currentSlug && article.category !== currentCategory)
            .slice(0, 3 - relatedArticles.length) as Article[];
        relatedArticles.push(...moreArticles);
    }

    if (relatedArticles.length === 0) {
        return null;
    }

    return (
        <section className="related-articles">
            <h2 className="section-title">Related Articles</h2>
            <p className="section-subtitle">Continue exploring our IPTV guides and tutorials</p>

            <div className="articles-grid">
                {relatedArticles.map((article) => (
                    <Link
                        key={article.id}
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
                ))}
            </div>

            <style jsx>{`
                .related-articles {
                    margin-top: 4rem;
                    padding: 3rem 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.5rem;
                    text-align: center;
                }

                .section-subtitle {
                    color: rgba(255, 255, 255, 0.6);
                    text-align: center;
                    margin-bottom: 2.5rem;
                    font-size: 1rem;
                }

                .articles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .article-card {
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
                    transform: translateY(-4px);
                    border-color: rgba(242, 7, 50, 0.5);
                    box-shadow: 0 10px 30px rgba(242, 7, 50, 0.2);
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                }

                .article-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
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
                    padding: 0.35rem 1rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .card-content {
                    padding: 1.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .article-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 0.75rem;
                    line-height: 1.4;
                }

                .article-excerpt {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                    flex: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
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
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.85rem;
                }

                .read-more {
                    color: #F20732;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: gap 0.3s ease;
                }

                .article-card:hover .read-more {
                    gap: 0.5rem;
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: 1.5rem;
                    }

                    .articles-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
}
