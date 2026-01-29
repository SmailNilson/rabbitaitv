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
                    <span className="badge">FAQ❓</span>
                    <h2 className="title">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="subtitle">
                        Everything you need to know about our premium IPTV service
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="faq-grid">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-card ${openIndex === index ? 'active' : ''}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            {/* Card Header */}
                            <div className="faq-header">
                                <div className="icon-wrapper">
                                    <span className="faq-icon">{faq.icon}</span>
                                </div>
                                <h3 className="question">{faq.q}</h3>
                                <div className="toggle-icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>

                            {/* Card Answer */}
                            <div className="faq-answer">
                                <p>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Support CTA */}
                <div className="support-cta">
                    <p>Still have questions?</p>
                    <a href="https://wa.me/17575357760" target="_blank" rel="noopener noreferrer" className="contact-btn">
                        💬 Chat with Support
                    </a>
                </div>
            </div>

            <style jsx>{`
                .faq-section {
                    padding: 60px 0;
                    background: linear-gradient(180deg, #0D0D0D 0%, #000 100%);
                    position: relative;
                }

                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    position: relative;
                    z-index: 1;
                }

                .header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .badge {
                    display: inline-block;
                    background: rgba(242, 7, 50, 0.1);
                    color: #F20732;
                    padding: 0.4rem 1rem;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(242, 7, 50, 0.2);
                    letter-spacing: 1px;
                }

                .title {
                    font-size: clamp(1.5rem, 4vw, 2.25rem);
                    font-weight: 800;
                    color: white;
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                }

                .gradient-text {
                    background: linear-gradient(135deg, #CB9500 0%, #F20732 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .subtitle {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.95rem;
                    max-width: 400px;
                    margin: 0 auto;
                }

                .faq-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .faq-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 14px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .faq-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(255, 255, 255, 0.15);
                }

                .faq-card.active {
                    background: rgba(242, 7, 50, 0.05);
                    border-color: rgba(242, 7, 50, 0.3);
                }

                .faq-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem 1.25rem;
                }

                .icon-wrapper {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, rgba(203, 149, 0, 0.2), rgba(242, 7, 50, 0.2));
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .faq-icon {
                    font-size: 1.1rem;
                }

                .question {
                    flex: 1;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: white;
                    margin: 0;
                    line-height: 1.4;
                }

                .toggle-icon {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    color: rgba(255, 255, 255, 0.5);
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                .toggle-icon svg {
                    width: 18px;
                    height: 18px;
                }

                .faq-card.active .toggle-icon {
                    background: #F20732;
                    color: white;
                    transform: rotate(180deg);
                }

                .faq-answer {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                    padding: 0 1.25rem 0 4rem;
                }

                .faq-card.active .faq-answer {
                    max-height: 150px;
                    padding: 0 1.25rem 1rem 4rem;
                }

                .faq-answer p {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.875rem;
                    line-height: 1.6;
                    margin: 0;
                }

                .support-cta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 2rem;
                    padding: 1.25rem;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 14px;
                }

                .support-cta p {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.95rem;
                    margin: 0;
                }

                .contact-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #25D366;
                    color: white;
                    padding: 0.6rem 1.25rem;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 0.875rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .contact-btn:hover {
                    background: #20BD5A;
                    transform: translateY(-2px);
                }

                @media (max-width: 640px) {
                    .faq-header {
                        padding: 0.875rem 1rem;
                    }
                    
                    .icon-wrapper {
                        width: 32px;
                        height: 32px;
                    }

                    .faq-icon {
                        font-size: 1rem;
                    }

                    .question {
                        font-size: 0.875rem;
                    }

                    .faq-answer {
                        padding-left: 1rem;
                    }

                    .faq-card.active .faq-answer {
                        padding-left: 1rem;
                    }

                    .support-cta {
                        flex-direction: column;
                        gap: 0.75rem;
                        text-align: center;
                    }
                }
            `}</style>
        </section>
    );
}
