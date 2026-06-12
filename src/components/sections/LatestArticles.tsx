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
        <h2 className="section-title">
          Latest from the <span className="gradient-text">Blog</span>
        </h2>
        <p className="section-subtitle">
          IPTV guides, reviews and tips to get the most out of your streaming
        </p>

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
                <span className="article-category">{article.category}</span>
              </div>
              <div className="article-body">
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <div className="article-meta">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="see-all">
          <Link href="/blog" className="btn-secondary">
            See All Articles →
          </Link>
        </div>
      </div>

      <style jsx>{`
        .latest-articles {
          padding: 5rem 1.5rem;
          background: #0d0d0d;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: white;
          text-align: center;
          margin-bottom: 0.75rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #cb9500 0%, #f20732 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          font-size: 1.05rem;
          margin-bottom: 3rem;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.75rem;
          margin-bottom: 2.5rem;
        }

        .latest-articles :global(.article-card) {
          background: #161616;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .latest-articles :global(.article-card:hover) {
          transform: translateY(-6px);
          border-color: rgba(242, 7, 50, 0.4);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
        }

        .article-image {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .article-category {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background: rgba(242, 7, 50, 0.9);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
        }

        .article-body {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          flex: 1;
        }

        .article-body h3 {
          color: white;
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-body p {
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.92rem;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-meta {
          margin-top: auto;
          display: flex;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.82rem;
        }

        .see-all {
          text-align: center;
        }
      `}</style>
    </section>
  );
}
