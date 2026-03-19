'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [tocItems, setTocItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Extract headings from markdown content
        const headings: TOCItem[] = [];
        const lines = content.split('\n');

        lines.forEach((line, index) => {
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

        setTocItems(headings);
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
            <h3 className="toc-title">📑 Table of Contents</h3>
            <nav className="toc-nav">
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
                    background: linear-gradient(135deg, rgba(242, 7, 50, 0.05) 0%, rgba(203, 149, 0, 0.05) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    position: sticky;
                    top: 100px;
                }

                .toc-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 1rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .toc-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .toc-item {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.7);
                    text-align: left;
                    padding: 0.5rem 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                .toc-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                    padding-left: 1rem;
                }

                .toc-item.active {
                    background: rgba(242, 7, 50, 0.1);
                    color: #F20732;
                    font-weight: 600;
                    border-left: 3px solid #F20732;
                    padding-left: 1rem;
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
                        position: relative;
                        top: auto;
                    }
                }
            `}</style>
        </div>
    );
}
