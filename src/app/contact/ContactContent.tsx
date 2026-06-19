'use client';

import { siteConfig } from '@/config/site';

export default function ContactContent() {
    return (
        <div className="contact-page">
            <div className="container">
                <header className="page-header">
                    <span className="eyebrow">Contact</span>
                    <h1>Get in touch</h1>
                    <p>
                        Have questions? We&apos;re here to help &mdash; reach us on WhatsApp or email.
                    </p>
                </header>

                <div className="contact-grid">
                    {/* WhatsApp Card */}
                    <a
                        href={`https://api.whatsapp.com/send?phone=${siteConfig.contact.whatsapp.replace(/\+/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                    >
                        <span className="icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                            </svg>
                        </span>
                        <h3>WhatsApp</h3>
                        <p className="contact-detail">{siteConfig.contact.whatsapp}</p>
                        <p className="contact-sub">Immediate responses, 24/7</p>
                        <span className="btn-text">Chat with us</span>
                    </a>

                    {/* Email Card */}
                    <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="contact-card"
                    >
                        <span className="icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </span>
                        <h3>Email</h3>
                        <p className="contact-detail">{siteConfig.contact.email}</p>
                        <p className="contact-sub">Get a response within 2&ndash;4 hours</p>
                        <span className="btn-text">Send an email</span>
                    </a>

                    {/* Address Card */}
                    {siteConfig.contact.address && (
                        <div className="contact-card contact-card--static">
                            <span className="icon-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </span>
                            <h3>Address</h3>
                            <p className="contact-detail">{siteConfig.contact.address}</p>
                            <p className="contact-sub">Support team available daily</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .contact-page {
                    padding: 4rem 0 6rem;
                    background: var(--background);
                }

                .container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .page-header {
                    text-align: center;
                    max-width: 640px;
                    margin: 0 auto 3.5rem;
                }

                .page-header h1 {
                    font-size: clamp(2.25rem, 5vw, 3.25rem);
                    font-family: var(--font-heading);
                    font-weight: 700;
                    line-height: 1.1;
                    margin: 1rem 0 1rem;
                    color: var(--text);
                }

                .page-header p {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    line-height: 1.6;
                    margin: 0 auto;
                }

                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.25rem;
                }

                .contact-card {
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 2.5rem 1.75rem;
                    text-align: center;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }

                .contact-card:not(.contact-card--static):hover,
                .contact-card:not(.contact-card--static):focus-visible {
                    transform: translateY(-6px);
                    border-color: var(--border-strong);
                    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
                    outline: none;
                }

                .contact-card:focus-visible {
                    border-color: var(--primary);
                }

                .icon-wrapper {
                    width: 56px;
                    height: 56px;
                    border-radius: var(--radius);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    background: var(--primary-soft);
                    color: var(--primary);
                    transition: transform 0.25s ease;
                }

                .icon-wrapper :global(svg) {
                    width: 26px;
                    height: 26px;
                }

                .contact-card:hover .icon-wrapper {
                    transform: scale(1.06);
                }

                .contact-card h3 {
                    color: var(--text);
                    font-size: 1.35rem;
                    font-family: var(--font-heading);
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .contact-detail {
                    color: var(--text);
                    font-size: 1rem;
                    font-weight: 500;
                    word-break: break-word;
                    margin-bottom: 0.35rem;
                }

                .contact-sub {
                    color: var(--text-dim);
                    font-size: 0.875rem;
                    margin-bottom: 1.75rem;
                }

                .contact-card--static .contact-sub {
                    margin-bottom: 0;
                }

                .btn-text {
                    margin-top: auto;
                    color: var(--text);
                    font-weight: 600;
                    font-size: 0.95rem;
                    padding: 0.75rem 1.75rem;
                    border-radius: 10px;
                    border: 1px solid var(--border-strong);
                    background: var(--surface);
                    transition: background 0.25s ease, border-color 0.25s ease;
                }

                .contact-card:hover .btn-text {
                    background: var(--primary);
                    border-color: var(--primary);
                }

                @media (max-width: 768px) {
                    .contact-page {
                        padding: 2rem 0 4rem;
                    }
                }
            `}</style>
        </div>
    );
}
