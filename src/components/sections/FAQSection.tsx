'use client';

import { useState } from 'react';

const faqs = [
    {
        q: "How long does activation take?",
        a: "Your subscription is activated instantly after payment confirmation. You'll receive your login credentials via WhatsApp or email within minutes.",
        icon: "⚡"
    },
    {
        q: "What devices are supported?",
        a: "We support all major devices including Smart TVs (Samsung, LG), Android devices, iOS, Fire TV, Roku, Windows, Mac, and more.",
        icon: "📱"
    },
    {
        q: "Can I use on multiple devices?",
        a: "Yes! Depending on your plan, you can stream on 1-5 devices simultaneously.",
        icon: "🔗"
    },
    {
        q: "Do you offer a money-back guarantee?",
        a: "Yes, we offer a satisfaction guarantee. If you're not happy with our service, contact our support team for assistance.",
        icon: "✅"
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, PayPal, and cryptocurrency for your convenience.",
        icon: "💳"
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="faq-section">
            <div className="container">
                {/* Header */}
                <div className="header">
                    <span className="eyebrow">FAQ</span>
                    <h2 className="title">Frequently asked questions</h2>
                </div>

                {/* FAQ List */}
                <div className="faq-list">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`faq-card ${isOpen ? 'active' : ''}`}
                            >
                                <button
                                    type="button"
                                    className="faq-header"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    <span className="question">{faq.q}</span>
                                    <span className="toggle-icon" aria-hidden="true">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </span>
                                </button>

                                {/* Answer */}
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .faq-section {
                    padding: 4rem 0;
                    background: var(--background);
                    position: relative;
                }

                .container {
                    max-width: 720px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    position: relative;
                    z-index: 1;
                }

                .header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.85rem;
                }

                .title {
                    font-family: var(--font-heading);
                    font-size: clamp(1.6rem, 4vw, 2.25rem);
                    font-weight: 800;
                    color: var(--text);
                    margin: 0;
                    line-height: 1.2;
                }

                .faq-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .faq-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    overflow: hidden;
                    transition: border-color 0.25s ease, background 0.25s ease;
                }

                .faq-card:hover {
                    border-color: var(--border-strong);
                }

                .faq-card.active {
                    border-color: var(--primary-border);
                }

                .faq-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.75rem;
                    width: 100%;
                    padding: 1.1rem 1.25rem;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    font-family: inherit;
                }

                .question {
                    flex: 1;
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text);
                    line-height: 1.4;
                }

                .toggle-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                    transition: transform 0.3s ease, color 0.3s ease;
                    flex-shrink: 0;
                }

                .toggle-icon svg {
                    width: 20px;
                    height: 20px;
                }

                .faq-card.active .toggle-icon {
                    transform: rotate(180deg);
                    color: var(--primary);
                }

                .faq-answer {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                    padding: 0 1.25rem;
                }

                .faq-card.active .faq-answer {
                    max-height: 220px;
                    padding: 0 1.25rem 1.1rem;
                }

                .faq-answer p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.65;
                    margin: 0;
                }

                @media (max-width: 640px) {
                    .faq-header {
                        padding: 1rem;
                    }

                    .question {
                        font-size: 0.95rem;
                    }

                    .faq-answer {
                        padding: 0 1rem;
                    }

                    .faq-card.active .faq-answer {
                        padding: 0 1rem 1rem;
                    }
                }
            `}</style>
        </section>
    );
}
