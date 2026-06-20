'use client';

import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import RelatedArticles from "@/components/blog/RelatedArticles";
import TableOfContents from "@/components/blog/TableOfContents";

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
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// Convert markdown-like content to HTML with better formatting
function renderContent(content: string): string {
    let html = content;

    // Handle tables (basic markdown table support)
    const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;
    html = html.replace(tableRegex, (_match, header, body) => {
        const headers = header.split('|').filter((h: string) => h.trim()).map((h: string) => `<th>${h.trim()}</th>`).join('');
        const rows = body.trim().split('\n').map((row: string) => {
            const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        return `\n\n<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>\n\n`;
    });

    // Images (must be before links)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '\n\n<img src="$2" alt="$1" class="content-image" loading="lazy" />\n\n');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="content-link">$1</a>');

    // Headers (process in reverse order)
    html = html.replace(/^### (.*$)/gim, '\n\n<h3>$1</h3>\n\n');
    html = html.replace(/^## (.*$)/gim, '\n\n<h2>$1</h2>\n\n');
    html = html.replace(/^# (.*$)/gim, '\n\n<h1 class="content-h1">$1</h1>\n\n');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

    // Lists - wrap in ul/ol tags
    const lines = html.split('\n');
    const processedLines: string[] = [];
    let inList = false;
    let listType = '';

    lines.forEach((line) => {
        const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
        const bulletMatch = line.match(/^-\s+(.*)$/);

        if (numberedMatch) {
            if (!inList || listType !== 'ol') {
                if (inList) processedLines.push(`</${listType}>`);
                processedLines.push('<ol>');
                inList = true;
                listType = 'ol';
            }
            processedLines.push(`<li>${numberedMatch[2]}</li>`);
        } else if (bulletMatch) {
            if (!inList || listType !== 'ul') {
                if (inList) processedLines.push(`</${listType}>`);
                processedLines.push('<ul>');
                inList = true;
                listType = 'ul';
            }
            processedLines.push(`<li>${bulletMatch[1]}</li>`);
        } else {
            if (inList && line.trim() === '') {
                processedLines.push(`</${listType}>`);
                inList = false;
                listType = '';
            }
            processedLines.push(line);
        }
    });

    if (inList) {
        processedLines.push(`</${listType}>`);
    }

    html = processedLines.join('\n');

    // Paragraphs - split by double newlines and wrap non-block elements
    const blocks = html.split(/\n\n+/);
    const formattedBlocks = blocks.map(block => {
        const trimmed = block.trim();
        if (!trimmed) return '';

        // Don't wrap block elements in <p>
        if (trimmed.startsWith('<h') ||
            trimmed.startsWith('<table') ||
            trimmed.startsWith('<img') ||
            trimmed.startsWith('<ul') ||
            trimmed.startsWith('<ol')) {
            return trimmed;
        }

        // Wrap text content in <p>
        return `<p>${trimmed}</p>`;
    });

    return formattedBlocks.join('\n\n');
}

export default function BlogArticleClient({ article }: { article: Article }) {
    return (
        <div className="article-wrapper">
            {/* Article Header */}
            <header className="article-header">
                <div className="reading-column">
                    <div className="back-link-wrapper">
                        <Link href="/blog" className="back-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>

                    <div className="meta-row">
                        <span className="category-badge">{article.category}</span>
                        <span className="meta-dot" aria-hidden="true" />
                        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                        <span className="meta-dot" aria-hidden="true" />
                        <span className="meta-read">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                            {article.readTime} read
                        </span>
                    </div>

                    <h1 className="headline">{article.title}</h1>

                    {article.excerpt ? <p className="dek">{article.excerpt}</p> : null}

                    <div className="byline">
                        <span className="byline-avatar" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </span>
                        <span className="byline-name">By {article.author}</span>
                    </div>
                </div>
            </header>

            {/* Cover Image or Video */}
            {(article.video || article.image) ? (
                <div className="reading-column cover-wrapper">
                    {article.video ? (
                        <div className="video-wrapper">
                            <video
                                src={article.video}
                                poster={article.image}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="main-article-video"
                            />
                            <div className="video-overlay"></div>
                        </div>
                    ) : (
                        <div className="cover-image-frame">
                            <Image
                                src={article.image}
                                alt={article.title}
                                width={1200}
                                height={630}
                                priority
                                sizes="(max-width: 820px) 100vw, 760px"
                                className="main-article-image"
                            />
                        </div>
                    )}
                </div>
            ) : null}

            {/* Article Content */}
            <section className="content-section">
                <div className="reading-column">
                    {/* Table of Contents for long articles */}
                    <TableOfContents content={article.content} />

                    <article
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
                    />

                    {/* Author Box */}
                    <div className="author-box">
                        <span className="author-avatar-large" aria-hidden="true">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </span>
                        <div className="author-details">
                            <h4>Written by {article.author}</h4>
                            <p>Our team of IPTV experts brings you the latest guides and tips for the best streaming experience.</p>
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="share-section">
                        <p>Found this helpful? Share with others.</p>
                        <div className="share-buttons">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://rabbitaitv.com/blog/${article.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-btn twitter"
                                aria-label="Share on X (Twitter)"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                Twitter
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://rabbitaitv.com/blog/${article.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-btn facebook"
                                aria-label="Share on Facebook"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </a>
                            <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - https://rabbitaitv.com/blog/' + article.slug)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="share-btn whatsapp"
                                aria-label="Share on WhatsApp"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Related Articles */}
                    <RelatedArticles currentSlug={article.slug} currentCategory={article.category} />
                </div>
            </section>

            <CTASection />

            <style jsx>{`
                .article-wrapper {
                    background: var(--background);
                    color: var(--text);
                    min-height: 100vh;
                }

                .reading-column {
                    max-width: 760px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* Article Header */
                .article-header {
                    padding: 1rem 0 2rem;
                }

                .back-link-wrapper {
                    margin-bottom: 2rem;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-muted);
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: color 0.25s ease;
                }

                .back-link:hover {
                    color: var(--primary);
                }

                .meta-row {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                    color: var(--text-dim);
                    font-size: 0.85rem;
                    margin-bottom: 1.5rem;
                }

                .category-badge {
                    display: inline-block;
                    color: var(--primary);
                    background: var(--primary-soft);
                    border: 1px solid var(--border);
                    padding: 0.3rem 0.85rem;
                    border-radius: 999px;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                }

                .meta-dot {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background: var(--text-dim);
                }

                .meta-read {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .headline {
                    font-family: var(--font-heading);
                    font-size: clamp(2.1rem, 5vw, 3.1rem);
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    line-height: 1.12;
                    color: var(--text);
                    margin: 0 0 1.25rem;
                }

                .dek {
                    font-size: 1.2rem;
                    line-height: 1.55;
                    color: var(--text-muted);
                    margin: 0 0 1.75rem;
                    max-width: 60ch;
                }

                .byline {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border);
                }

                .byline-avatar {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--card);
                    border: 1px solid var(--border-strong);
                    color: var(--text-muted);
                    flex-shrink: 0;
                }

                .byline-name {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--text);
                }

                /* Cover Image */
                .cover-wrapper {
                    margin-bottom: 3rem;
                }

                .cover-image-frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1200 / 630;
                    border-radius: var(--radius);
                    overflow: hidden;
                    border: 1px solid var(--border);
                    background: var(--card);
                }

                .cover-image-frame :global(.main-article-image) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .video-wrapper {
                    position: relative;
                    border-radius: var(--radius);
                    overflow: hidden;
                    border: 1px solid var(--border);
                }

                .main-article-video {
                    width: 100%;
                    max-height: 500px;
                    object-fit: cover;
                    display: block;
                }

                .video-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.6) 100%);
                    pointer-events: none;
                }

                /* Content Section */
                .content-section {
                    padding: 0 0 4rem;
                }

                .article-content {
                    font-size: 1.05rem;
                    line-height: 1.8;
                    color: var(--text);
                }

                .article-content :global(.content-h1) {
                    font-family: var(--font-heading);
                    font-size: 1.9rem;
                    font-weight: 800;
                    letter-spacing: -0.01em;
                    color: var(--text);
                    margin: 2.75rem 0 1rem;
                }

                .article-content :global(h2) {
                    font-family: var(--font-heading);
                    font-size: 1.65rem;
                    font-weight: 800;
                    letter-spacing: -0.01em;
                    color: var(--text);
                    margin: 2.5rem 0 1rem;
                    padding-bottom: 0.6rem;
                    border-bottom: 1px solid var(--border);
                }

                .article-content :global(h3) {
                    font-family: var(--font-heading);
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: var(--text);
                    margin: 2rem 0 0.75rem;
                }

                .article-content :global(strong) {
                    color: var(--text);
                    font-weight: 700;
                }

                .article-content :global(ul),
                .article-content :global(ol) {
                    margin: 1.5rem 0;
                    padding-left: 1.75rem;
                }

                .article-content :global(ul) {
                    list-style-type: disc;
                }

                .article-content :global(ol) {
                    list-style-type: decimal;
                }

                .article-content :global(li) {
                    margin-bottom: 0.6rem;
                    line-height: 1.8;
                    color: var(--text);
                    padding-left: 0.35rem;
                }

                .article-content :global(li::marker) {
                    color: var(--primary);
                }

                .article-content :global(p) {
                    margin-bottom: 1.5rem;
                    line-height: 1.8;
                    color: var(--text);
                }

                .article-content :global(p:last-child) {
                    margin-bottom: 0;
                }

                .article-content :global(blockquote) {
                    margin: 2rem 0;
                    padding: 0.5rem 0 0.5rem 1.5rem;
                    border-left: 3px solid var(--primary);
                    color: var(--text-muted);
                    font-style: italic;
                    font-size: 1.1rem;
                    line-height: 1.7;
                }

                .article-content :global(table) {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    overflow: hidden;
                    font-size: 0.95rem;
                }

                .article-content :global(th) {
                    background: var(--primary-soft);
                    color: var(--text);
                    font-weight: 700;
                    padding: 0.9rem 1rem;
                    text-align: left;
                    border-bottom: 1px solid var(--border);
                }

                .article-content :global(td) {
                    padding: 0.8rem 1rem;
                    border-bottom: 1px solid var(--border);
                    color: var(--text-muted);
                }

                .article-content :global(tr:last-child td) {
                    border-bottom: none;
                }

                .article-content :global(.content-image) {
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    border-radius: var(--radius);
                    margin: 2rem 0;
                    border: 1px solid var(--border);
                    display: block;
                }

                .article-content :global(.content-link) {
                    color: var(--primary);
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    text-decoration-thickness: 1px;
                    transition: color 0.25s ease;
                }

                .article-content :global(.content-link:hover) {
                    color: var(--text);
                }

                .article-content :global(em) {
                    font-style: italic;
                    color: var(--text-muted);
                }


                /* Author Box */
                .author-box {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-top: 3rem;
                    padding: 1.5rem;
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                }

                .author-avatar-large {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 56px;
                    height: 56px;
                    background: var(--primary-soft);
                    border: 1px solid var(--border-strong);
                    border-radius: 50%;
                    color: var(--primary);
                    flex-shrink: 0;
                }

                .author-details h4 {
                    font-family: var(--font-heading);
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: var(--text);
                    margin: 0 0 0.25rem;
                }

                .author-details p {
                    font-size: 0.92rem;
                    color: var(--text-muted);
                    line-height: 1.55;
                    margin: 0;
                }

                /* Share Section */
                .share-section {
                    margin-top: 2rem;
                    padding: 2rem;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    text-align: center;
                }

                .share-section p {
                    color: var(--text-muted);
                    margin: 0 0 1.25rem;
                    font-size: 0.95rem;
                }

                .share-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                .share-btn {
                    padding: 0.6rem 1.1rem;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: all 0.25s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text);
                    background: var(--card);
                    border: 1px solid var(--border-strong);
                }

                .share-btn svg {
                    flex-shrink: 0;
                }

                .share-btn:hover {
                    transform: translateY(-2px);
                    border-color: var(--primary);
                    color: var(--primary);
                }

                @media (max-width: 768px) {
                    .article-header {
                        padding: 0.5rem 0 1.5rem;
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
