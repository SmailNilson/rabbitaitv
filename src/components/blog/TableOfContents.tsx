'use client';

import { useEffect, useMemo, useState } from 'react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');

    const tocItems = useMemo<TOCItem[]>(() => {
        // Extract headings from markdown content
        const headings: TOCItem[] = [];
        const lines = content.split('\n');

        lines.forEach((line) => {
            const h1Match = line.match(/^#\s+(.+)$/);
            const h2Match = line.match(/^##\s+(.+)$/);
            const h3Match = line.match(/^###\s+(.+)$/);

            if (h1Match || h2Match || h3Match) {
                const text = (h1Match?.[1] || h2Match?.[1] || h3Match?.[1] || '').trim();
                const level = h1Match ? 1 : h2Match ? 2 : 3;
                const id = `toc-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

                headings.push({ id, text, level });
            }
        });

        return headings;
    }, [content]);

    useEffect(() => {
        const handleScroll = () => {
            const headingElements = tocItems.map(item => {
                // Find by text content since IDs are in the rendered HTML
                const elements = Array.from(document.querySelectorAll('h1, h2, h3'));
                return elements.find(el => el.textContent === item.text);
            }).filter(Boolean) as HTMLElement[];

            const scrollPosition = window.scrollY + 100;

            for (let i = headingElements.length - 1; i >= 0; i--) {
                const element = headingElements[i];
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveId(tocItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tocItems]);

    if (tocItems.length < 3) {
        return null; // Don't show TOC for short articles
    }

    const scrollToHeading = (text: string) => {
        const elements = Array.from(document.querySelectorAll('h1, h2, h3'));
        const element = elements.find(el => el.textContent === text);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="table-of-contents">
            <h3 className="toc-title">
                <svg
                    className="toc-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <line x1="8" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="20" y2="12" />
                    <line x1="8" y1="18" x2="20" y2="18" />
                    <line x1="3.5" y1="6" x2="3.51" y2="6" />
                    <line x1="3.5" y1="12" x2="3.51" y2="12" />
                    <line x1="3.5" y1="18" x2="3.51" y2="18" />
                </svg>
                <span>On this page</span>
            </h3>
            <nav className="toc-nav" aria-label="Table of contents">
                {tocItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToHeading(item.text)}
                        className={`toc-item level-${item.level} ${activeId === item.id ? 'active' : ''}`}
                    >
                        {item.text}
                    </button>
                ))}
            </nav>

            <style jsx>{`
                .table-of-contents {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                }

                .toc-title {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    font-family: var(--font-heading);
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: var(--text);
                    margin-bottom: 1rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid var(--border);
                }

                .toc-icon {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                    color: var(--primary);
                }

                .toc-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                }

                .toc-item {
                    position: relative;
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    text-align: left;
                    padding: 0.5rem 0.75rem;
                    cursor: pointer;
                    transition: color 0.2s ease, background 0.2s ease, padding-left 0.2s ease;
                    border-radius: var(--radius);
                    font-size: 0.9rem;
                    line-height: 1.4;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    white-space: normal;
                    width: 100%;
                }

                .toc-item:hover {
                    background: var(--card);
                    color: var(--text);
                    padding-left: 1rem;
                }

                .toc-item.active {
                    background: var(--primary-soft);
                    color: var(--primary);
                    font-weight: 600;
                    padding-left: 1rem;
                }

                .toc-item.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0.35rem;
                    bottom: 0.35rem;
                    width: 3px;
                    border-radius: 0;
                    background: var(--primary);
                }

                .toc-item.level-1 {
                    font-weight: 600;
                    font-size: 1rem;
                }

                .toc-item.level-2 {
                    padding-left: 1.25rem;
                }

                .toc-item.level-3 {
                    padding-left: 2rem;
                    font-size: 0.85rem;
                }

                .toc-item.level-2:hover {
                    padding-left: 1.5rem;
                }

                .toc-item.level-3:hover {
                    padding-left: 2.25rem;
                }

                .toc-item.level-2.active {
                    padding-left: 1.5rem;
                }

                .toc-item.level-3.active {
                    padding-left: 2.25rem;
                }

                @media (max-width: 768px) {
                    .table-of-contents {
                        padding: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
}
