'use client';

import Image from 'next/image';
import Link from 'next/link';

const STATS = [
    { value: '20K+', label: 'Live Channels' },
    { value: '120K+', label: 'VOD Content' },
    { value: '4K', label: 'Quality Ready' },
    { value: '24/7', label: 'Customer Support' },
];

export default function AboutSection() {
    return (
        <section className="about-section">
            <div className="container">
                <header className="about-header">
                    <span className="eyebrow">About us</span>
                    <h1>Your Premium IPTV Provider</h1>
                    <p className="about-subtitle">
                        Welcome to <strong>Rabbit AI TV</strong>, the leading provider of high-quality IPTV
                        streaming services. Our mission is to bring you the best entertainment experience
                        directly to your home or on the go, at prices that are accessible to everyone.
                    </p>
                </header>

                <div className="about-content">
                    <div className="about-text">
                        <p>
                            With over 10 years of experience in the streaming industry, we have built a robust
                            infrastructure that ensures 99.9% uptime and crystal-clear 4K quality. Whether you&apos;re
                            a sports fan, a movie buff, or just looking for international news, we have
                            something for everyone.
                        </p>

                        <ul className="about-list">
                            <li>
                                <span className="check" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </span>
                                Robust infrastructure with 99.9% uptime
                            </li>
                            <li>
                                <span className="check" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </span>
                                Crystal-clear 4K streaming quality
                            </li>
                            <li>
                                <span className="check" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </span>
                                Content for sports, movies and news
                            </li>
                        </ul>
                    </div>

                    <div className="about-image">
                        <div className="image-wrapper">
                            <Image
                                src="/images/about-us.png"
                                alt="Rabbit AI TV Entertainment"
                                width={600}
                                height={400}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                            <div className="image-overlay" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>

                <div className="stats-grid">
                    {STATS.map((stat) => (
                        <div className="stat-item" key={stat.label}>
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>

                <div className="vision-mission">
                    <div className="vision-card">
                        <span className="vision-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </span>
                        <h2>Our Vision</h2>
                        <p>To redefine home entertainment by providing global access to high-quality streaming content without borders or limitations.</p>
                    </div>
                    <div className="vision-card">
                        <span className="vision-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="12" cy="12" r="4.5" />
                                <circle cx="12" cy="12" r="1" />
                            </svg>
                        </span>
                        <h2>Our Mission</h2>
                        <p>Providing our customers with the most reliable, affordable, and comprehensive IPTV service in the market today.</p>
                    </div>
                </div>

                <div className="about-cta">
                    <h2>Ready to start streaming?</h2>
                    <p>Join thousands of viewers enjoying premium entertainment, anywhere, on any device.</p>
                    <Link href="/pricing" className="btn-primary">
                        View Plans
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 5 7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .about-section {
                    padding: 4rem 0 6rem;
                    background: var(--background);
                }

                .container {
                    width: 100%;
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .about-header {
                    max-width: 70ch;
                    margin-bottom: 4rem;
                }

                .about-header h1 {
                    font-family: var(--font-heading);
                    color: var(--text);
                    font-size: clamp(2.25rem, 5vw, 3.5rem);
                    line-height: 1.1;
                    margin: 1rem 0 1.5rem;
                }

                .about-subtitle {
                    color: var(--text-muted);
                    font-size: 1.15rem;
                    line-height: 1.7;
                }

                .about-subtitle strong {
                    color: var(--text);
                }

                .about-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    margin-bottom: 4rem;
                }

                .about-text p {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    line-height: 1.8;
                    max-width: 70ch;
                    margin-bottom: 1.75rem;
                }

                .about-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .about-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    color: var(--text);
                    font-size: 1rem;
                    line-height: 1.5;
                }

                .check {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    background: var(--primary-soft);
                    color: var(--primary);
                }

                .check svg {
                    width: 0.95rem;
                    height: 0.95rem;
                }

                .about-image {
                    position: relative;
                }

                .image-wrapper {
                    position: relative;
                    border-radius: var(--radius);
                    overflow: hidden;
                    border: 1px solid var(--border);
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                    aspect-ratio: 1.5 / 1;
                }

                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(45deg, var(--primary-soft), transparent);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 5rem;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                    padding: 1.75rem;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    transition: border-color 0.25s ease, transform 0.25s ease;
                }

                .stat-item:hover {
                    border-color: var(--border-strong);
                    transform: translateY(-4px);
                }

                .stat-value {
                    font-family: var(--font-heading);
                    color: var(--text);
                    font-size: clamp(1.85rem, 4vw, 2.5rem);
                    font-weight: 800;
                    line-height: 1;
                }

                .stat-label {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }

                .vision-mission {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 5rem;
                }

                .vision-card {
                    background: var(--surface);
                    padding: 2.5rem;
                    border-radius: var(--radius);
                    border: 1px solid var(--border);
                    transition: border-color 0.25s ease, transform 0.25s ease;
                }

                .vision-card:hover {
                    border-color: var(--border-strong);
                    transform: translateY(-6px);
                }

                .vision-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 3rem;
                    height: 3rem;
                    border-radius: 12px;
                    background: var(--primary-soft);
                    color: var(--primary);
                    margin-bottom: 1.5rem;
                }

                .vision-icon svg {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                .vision-card h2 {
                    font-family: var(--font-heading);
                    color: var(--text);
                    font-size: 1.4rem;
                    margin-bottom: 0.85rem;
                }

                .vision-card p {
                    color: var(--text-muted);
                    line-height: 1.7;
                }

                .about-cta {
                    text-align: center;
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 3.5rem 2rem;
                }

                .about-cta h2 {
                    font-family: var(--font-heading);
                    color: var(--text);
                    font-size: clamp(1.6rem, 3.5vw, 2.25rem);
                    margin-bottom: 0.75rem;
                }

                .about-cta p {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    max-width: 55ch;
                    margin: 0 auto 2rem;
                    line-height: 1.6;
                }

                .about-cta :global(.btn-primary) {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .about-cta :global(.btn-primary) svg {
                    width: 1.1rem;
                    height: 1.1rem;
                }

                @media (max-width: 900px) {
                    .about-content {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }

                    .about-image {
                        order: -1;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
