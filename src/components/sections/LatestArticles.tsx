'use client';

import Link from 'next/link';
import Image from 'next/image';
import articlesData from '@/data/articles.json';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  readTime: string;
  category: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function LatestArticles() {
  const latest: Article[] = [...articlesData]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  return (
    <section className="latest-articles">
      <div className="container">
        <header className="section-header">
          <span className="eyebrow">Blog</span>
          <h2 className="section-title">From the blog</h2>
          <p className="section-subtitle">
            Guides, comparisons and tips to get the most out of your
            subscription.
          </p>
        </header>

        <div className="articles-grid">
          {latest.map((article) => (
            <Link
              href={`/blog/${article.slug}`}
              key={article.slug}
              className="article-card"
            >
              <div className="article-image">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={225}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="article-body">
                <div className="article-pill">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <h3>{article.title}</h3>
                {article.excerpt && <p>{article.excerpt}</p>}
                <span className="read-more">
                  Read more
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="see-all">
          <Link href="/blog" className="btn-view-all">
            View all articles
          </Link>
        </div>
      </div>

      <style jsx>{`
        .latest-articles {
          padding: 5rem 1.5rem;
          background: var(--background);
        }

        .container {
          max-width: var(--container-max, 1200px);
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3rem;
        }

        .eyebrow {
          display: inline-block;
          color: var(--gold);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.75rem;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .latest-articles :global(.article-card) {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .latest-articles :global(.article-card:hover) {
          transform: translateY(-4px);
          border-color: var(--border-strong);
        }

        .article-image {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .article-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex: 1;
        }

        .article-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-dim);
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .article-body h3 {
          font-family: var(--font-heading);
          color: var(--text);
          font-size: 1.05rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-body p {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more {
          margin-top: auto;
          padding-top: 0.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--primary);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .arrow {
          transition: transform 0.25s ease;
        }

        .latest-articles :global(.article-card:hover) .arrow {
          transform: translateX(4px);
        }

        .see-all {
          text-align: center;
        }

        .latest-articles :global(.btn-view-all) {
          display: inline-block;
          padding: 0.8rem 1.75rem;
          border: 1px solid var(--border-strong);
          border-radius: 50px;
          color: var(--text);
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition:
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .latest-articles :global(.btn-view-all:hover) {
          border-color: var(--primary);
          background: var(--surface);
        }

        /* :global corrections: rules whose ancestor class lives on a <Link> */
        .latest-articles :global(.article-card) .article-image {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .latest-articles :global(.article-card) .article-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex: 1;
        }

        .latest-articles :global(.article-card) .article-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-dim);
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .latest-articles :global(.article-card) .article-body h3 {
          font-family: var(--font-heading);
          color: var(--text);
          font-size: 1.05rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .latest-articles :global(.article-card) .article-body p {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .latest-articles :global(.article-card) .read-more {
          margin-top: auto;
          padding-top: 0.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--primary);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .latest-articles :global(.article-card) .arrow {
          transition: transform 0.25s ease;
        }
      `}</style>
    </section>
  );
}
