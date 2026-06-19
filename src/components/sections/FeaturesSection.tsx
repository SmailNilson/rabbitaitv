'use client';

import type { ReactNode } from 'react';

type Feature = {
    icon: ReactNode;
    title: string;
    description: string;
};

const features: Feature[] = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
                <rect x="2" y="4" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 18v3" />
            </svg>
        ),
        title: '4K Ultra HD',
        description: 'Crystal-clear picture on every channel and title, from SD to 4K.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
                <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
            </svg>
        ),
        title: 'Zero buffering',
        description: 'Anti-freeze servers and instant channel zapping.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
                <rect x="3" y="7" width="18" height="14" rx="2" />
                <path d="m3 7 3-4h12l3 4M9 3l2 4M15 3l2 4" />
            </svg>
        ),
        title: '120K+ on demand',
        description: 'Movies and series, refreshed every single day.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
            </svg>
        ),
        title: 'Live sports',
        description: 'NFL, NBA, MLB and Premier League in real time.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
                <rect x="2" y="4" width="14" height="10" rx="2" />
                <rect x="16" y="9" width="6" height="11" rx="1.5" />
                <path d="M6 18h6M9 14v4" />
            </svg>
        ),
        title: 'Every device',
        description: 'Firestick, Smart TV, mobile and web — instantly.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
                <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
                <rect x="2" y="13" width="4" height="7" rx="1.5" />
                <rect x="18" y="13" width="4" height="7" rx="1.5" />
                <path d="M20 20a4 4 0 0 1-4 4h-3" />
            </svg>
        ),
        title: '24/7 support',
        description: 'Real people on WhatsApp, any hour of the day.',
    },
];

export function FeaturesSection() {
    return (
        <section className="features-section">
            <div className="container">
                <header className="features-header">
                    <h2 className="section-title">Built for binge-watching</h2>
                    <p className="section-subtitle">
                        Everything that makes streaming effortless — and nothing that gets in the way.
                    </p>
                </header>

                <div className="features-grid">
                    {features.map((feature) => (
                        <article key={feature.title} className="feature-card">
                            <span className="feature-icon">{feature.icon}</span>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .features-section {
                    padding: 5rem 1.5rem;
                    background: var(--background);
                }

                .container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                }

                .features-header {
                    max-width: 620px;
                    margin: 0 auto 3rem;
                    text-align: center;
                }

                .section-title {
                    font-family: var(--font-heading);
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    color: var(--text);
                    font-size: clamp(1.75rem, 4vw, 2.5rem);
                    line-height: 1.1;
                    margin: 0 0 0.85rem;
                }

                .section-subtitle {
                    color: var(--text-muted);
                    font-size: clamp(1rem, 2vw, 1.125rem);
                    line-height: 1.6;
                    margin: 0;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.25rem;
                }

                .feature-card {
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    padding: 1.75rem;
                    transition: transform 0.25s ease, border-color 0.25s ease;
                }

                .feature-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--border-strong);
                }

                .feature-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: var(--primary-soft);
                    border: 1px solid var(--primary-border);
                    color: var(--primary);
                    margin-bottom: 1.25rem;
                }

                .feature-title {
                    font-family: var(--font-heading);
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    color: var(--text);
                    font-size: 1.15rem;
                    margin: 0 0 0.5rem;
                }

                .feature-desc {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 0;
                }

                @media (max-width: 600px) {
                    .features-section {
                        padding: 4rem 1.25rem;
                    }

                    .features-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
