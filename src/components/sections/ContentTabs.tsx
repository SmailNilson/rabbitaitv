'use client';

import { useState } from 'react';
import Image from 'next/image';

type Poster = { image: string; title: string; rating: string };

const tabs = ['Movies', 'Series', 'Live TV', 'Sports'] as const;
type Tab = (typeof tabs)[number];

const contentData: Record<Tab, Poster[]> = {
    Movies: [
        { image: '/images/devices/552-44.jpg', title: 'Dune: Part Two', rating: '8.7' },
        { image: '/images/devices/552-45.jpg', title: 'Oppenheimer', rating: '8.4' },
        { image: '/images/devices/552-46.jpg', title: 'Top Gun: Maverick', rating: '8.3' },
        { image: '/images/devices/552-47.jpg', title: 'Fast & Furious', rating: '7.2' },
        { image: '/images/devices/552-48.jpg', title: 'Furious 7', rating: '7.1' },
        { image: '/images/devices/552-49.jpg', title: "Eve's Bayou", rating: '7.6' },
    ],
    Series: [
        { image: '/images/devices/552-50.jpg', title: 'The Crown', rating: '8.6' },
        { image: '/images/devices/552-51.jpg', title: 'Wednesday', rating: '8.1' },
        { image: '/images/devices/552-52.jpg', title: 'Breaking Bad', rating: '9.5' },
        { image: '/images/devices/552-53.jpg', title: 'The Last of Us', rating: '8.7' },
        { image: '/images/devices/552-54.jpg', title: 'Stranger Things', rating: '8.7' },
        { image: '/images/devices/552-55.jpg', title: 'The Bear', rating: '8.6' },
    ],
    'Live TV': [
        { image: '/images/devices/552-56.jpg', title: 'CNN Live', rating: '8.2' },
        { image: '/images/devices/552-57.jpg', title: 'BBC World News', rating: '8.5' },
        { image: '/images/devices/552-58.jpg', title: 'Discovery', rating: '8.0' },
        { image: '/images/devices/552-59.jpg', title: 'National Geographic', rating: '8.8' },
        { image: '/images/devices/552-44.jpg', title: 'HBO Max', rating: '8.9' },
        { image: '/images/devices/552-45.jpg', title: 'Comedy Central', rating: '7.9' },
    ],
    Sports: [
        { image: '/images/devices/552-46.jpg', title: 'NFL Sunday', rating: '9.0' },
        { image: '/images/devices/552-47.jpg', title: 'NBA League Pass', rating: '8.9' },
        { image: '/images/devices/552-48.jpg', title: 'Formula 1', rating: '8.7' },
        { image: '/images/devices/552-49.jpg', title: 'Premier League', rating: '9.1' },
        { image: '/images/devices/552-50.jpg', title: 'UFC Fight Night', rating: '8.5' },
        { image: '/images/devices/552-51.jpg', title: 'MLB Center', rating: '8.3' },
    ],
};

export function ContentTabs() {
    const [activeTab, setActiveTab] = useState<Tab>('Movies');

    return (
        <section className="content-tabs-section">
            <div className="inner">
                {/* Heading */}
                <div className="header">
                    <div className="heading-text">
                        <span className="eyebrow">Library</span>
                        <h2>Fresh content, every day</h2>
                        <p className="subtitle">
                            New movies, series and live events added daily.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="tabs" role="tablist" aria-label="Content categories">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    role="tab"
                                    type="button"
                                    aria-selected={isActive}
                                    aria-controls="content-panel"
                                    onClick={() => setActiveTab(tab)}
                                    className={`tab-pill ${isActive ? 'active' : ''}`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Poster Grid */}
                <div
                    id="content-panel"
                    role="tabpanel"
                    aria-label={activeTab}
                    className="poster-grid"
                >
                    {contentData[activeTab].map((item, index) => (
                        <article key={`${activeTab}-${index}`} className="poster-card">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 600px) 33vw, 180px"
                                style={{ objectFit: 'cover' }}
                            />
                            <span className="rating-chip" aria-label={`Rated ${item.rating}`}>
                                <span className="star" aria-hidden="true">
                                    ★
                                </span>
                                {item.rating}
                            </span>
                            <div className="play-affordance" aria-hidden="true">
                                <span>▶</span>
                            </div>
                            <div className="title-strip">
                                <span className="title">{item.title}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .content-tabs-section {
                    padding: 5rem 1.5rem;
                    background: var(--background);
                }

                .inner {
                    max-width: var(--container-max, 1200px);
                    margin: 0 auto;
                }

                .header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }

                .heading-text {
                    text-align: left;
                }

                .eyebrow {
                    display: block;
                    color: var(--gold);
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    margin-bottom: 0.75rem;
                }

                h2 {
                    font-family: var(--font-heading, inherit);
                    font-size: clamp(1.6rem, 3vw, 2.25rem);
                    font-weight: 700;
                    color: var(--text);
                    margin: 0;
                    line-height: 1.15;
                }

                .subtitle {
                    margin: 0.6rem 0 0;
                    color: var(--text-muted);
                    font-size: 1rem;
                    max-width: 38ch;
                }

                .tabs {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .tab-pill {
                    padding: 0.55rem 1.1rem;
                    border-radius: 999px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    color: var(--text-muted);
                    font-family: var(--font-primary, inherit);
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s ease, color 0.2s ease,
                        border-color 0.2s ease, transform 0.2s ease;
                }

                .tab-pill:hover {
                    color: var(--text);
                    border-color: var(--border-strong);
                }

                .tab-pill.active {
                    background: var(--primary-soft);
                    color: #fff;
                    border-color: var(--primary-border);
                }

                .tab-pill:focus-visible {
                    outline: 2px solid var(--primary);
                    outline-offset: 2px;
                }

                .poster-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 1rem;
                }

                .poster-card {
                    position: relative;
                    aspect-ratio: 2 / 3;
                    border-radius: 12px;
                    overflow: hidden;
                    background: var(--card);
                    border: 1px solid var(--border);
                    cursor: pointer;
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }

                .poster-card:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45);
                }

                .rating-chip {
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    z-index: 2;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.2rem;
                    padding: 0.2rem 0.45rem;
                    border-radius: 8px;
                    background: rgba(0, 0, 0, 0.5);
                    color: var(--gold);
                    font-size: 0.72rem;
                    font-weight: 700;
                    line-height: 1;
                    backdrop-filter: blur(4px);
                }

                .star {
                    color: var(--gold);
                }

                .play-affordance {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.35);
                    opacity: 0;
                    transition: opacity 0.25s ease;
                }

                .play-affordance span {
                    width: 46px;
                    height: 46px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: var(--primary);
                    color: #fff;
                    font-size: 1rem;
                    padding-left: 3px;
                }

                .poster-card:hover .play-affordance {
                    opacity: 1;
                }

                .title-strip {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 2;
                    padding: 0.55rem 0.6rem;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(2px);
                }

                .title {
                    display: block;
                    color: var(--text);
                    font-size: 0.8125rem;
                    font-weight: 600;
                    line-height: 1.2;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                @media (max-width: 600px) {
                    .content-tabs-section {
                        padding: 3.5rem 1.25rem;
                    }

                    .header {
                        align-items: flex-start;
                    }

                    .poster-grid {
                        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
                        gap: 0.75rem;
                    }
                }
            `}</style>
        </section>
    );
}
