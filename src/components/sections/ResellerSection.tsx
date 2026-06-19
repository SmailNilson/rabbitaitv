'use client';

import { siteConfig } from "@/config/site";
import CTASection from "@/components/sections/CTASection";

type IconName =
    | "tag"
    | "panel"
    | "headset"
    | "credits"
    | "chart"
    | "globe";

function BenefitIcon({ name }: { name: IconName }) {
    const common = {
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
    };
    switch (name) {
        case "tag":
            return (
                <svg {...common}>
                    <path d="M3 11.5V4a1 1 0 0 1 1-1h7.5a2 2 0 0 1 1.41.59l7 7a2 2 0 0 1 0 2.82l-6.5 6.5a2 2 0 0 1-2.82 0l-7-7A2 2 0 0 1 3 11.5z" />
                    <circle cx="7.5" cy="7.5" r="1.2" />
                </svg>
            );
        case "panel":
            return (
                <svg {...common}>
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 4v5" />
                </svg>
            );
        case "headset":
            return (
                <svg {...common}>
                    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
                    <path d="M4 13a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zM20 13a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2 1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" />
                    <path d="M19 18v1a3 3 0 0 1-3 3h-3" />
                </svg>
            );
        case "credits":
            return (
                <svg {...common}>
                    <ellipse cx="12" cy="6" rx="8" ry="3" />
                    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
                    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                </svg>
            );
        case "chart":
            return (
                <svg {...common}>
                    <path d="M4 19V5M4 19h16" />
                    <path d="M7 15l4-4 3 3 5-6" />
                    <path d="M19 11V8h-3" />
                </svg>
            );
        case "globe":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
                </svg>
            );
        default:
            return null;
    }
}

export default function ResellerSection() {
    const benefits: { icon: IconName; title: string; description: string }[] = [
        {
            icon: "tag",
            title: "High Profit Margins",
            description:
                "Set your own prices and keep the difference. Earn up to 50% profit on each sale.",
        },
        {
            icon: "panel",
            title: "Reseller Panel",
            description:
                "Get your own branded panel to manage customers, create subscriptions, and track earnings.",
        },
        {
            icon: "headset",
            title: "Dedicated Support",
            description:
                "Priority support for all resellers. We're here to help you succeed.",
        },
        {
            icon: "credits",
            title: "Flexible Credits",
            description:
                "Buy credits in bulk and use them as needed. No expiration dates.",
        },
        {
            icon: "chart",
            title: "Analytics Dashboard",
            description:
                "Track your sales, customers, and earnings with detailed reports.",
        },
        {
            icon: "globe",
            title: "White Label Option",
            description:
                "Brand the service as your own. Your customers see your brand, not ours.",
        },
    ];

    const plans = [
        {
            name: "60 CREDIT",
            credits: 60,
            price: 150,
            perCredit: 2.50,
            features: [
                "Your Own Reseller Panel",
                "Panel Will Never Expire",
                "Add, Edit, and Delete Users",
                "Create Sub Resellers",
                "Add Credits to Your Resellers",
                "Unlimited Trials With 0.1$",
                "24/7 Live Chat Support"
            ],
        },
        {
            name: "120 CREDIT",
            credits: 120,
            price: 280,
            perCredit: 2.33,
            popular: true,
            features: [
                "Your Own Reseller Panel",
                "Panel Will Never Expire",
                "Add, Edit, and Delete Users",
                "Create Sub Resellers",
                "Add Credits to Your Resellers",
                "Unlimited Trials With 0.1$",
                "24/7 Live Chat Support"
            ],
        },
        {
            name: "180 CREDIT",
            credits: 180,
            price: 380,
            perCredit: 2.11,
            features: [
                "Your Own Reseller Panel",
                "Panel Will Never Expire",
                "Add, Edit, and Delete Users",
                "Create Sub Resellers",
                "Add Credits to Your Resellers",
                "Unlimited Trials With 0.1$",
                "24/7 Live Chat Support"
            ],
        },
    ];

    const steps = [
        {
            step: 1,
            title: "Choose Your Package",
            description: "Select a reseller package that fits your business needs.",
        },
        {
            step: 2,
            title: "Get Your Panel",
            description: "Receive access to your personal reseller panel within 24 hours.",
        },
        {
            step: 3,
            title: "Add Customers",
            description: "Create subscriptions for your customers using your credits.",
        },
        {
            step: 4,
            title: "Earn Profits",
            description: "Set your own prices and keep the difference. No limits!",
        },
    ];

    return (
        <div className="reseller-wrapper">
            {/* Header */}
            <section className="reseller-hero">
                <div className="container">
                    <span className="eyebrow">Reseller program</span>
                    <h1 className="reseller-h1">Become a Reseller</h1>
                    <p className="reseller-subtitle">
                        Start your own IPTV business with minimal investment. Get wholesale
                        pricing, your own panel, and dedicated support.
                    </p>
                    <a
                        href={siteConfig.contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary hero-cta"
                    >
                        Apply Now
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* Benefits */}
            <section className="benefits-section">
                <div className="container">
                    <h2 className="section-title">Why Become a Reseller?</h2>
                    <div className="benefits-grid">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="benefit-card">
                                <div className="benefit-icon" aria-hidden="true">
                                    <BenefitIcon name={benefit.icon} />
                                </div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-desc">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="packages-section">
                <div className="container">
                    <h2 className="section-title">Reseller Packages</h2>
                    <div className="packages-grid">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`package-card ${plan.popular ? "popular" : ""}`}
                            >
                                {plan.popular && <span className="popular-badge">Best Value</span>}
                                <h3 className="plan-name">{plan.name}</h3>
                                <div className="plan-price">${plan.price}</div>
                                <p className="plan-tagline">${plan.perCredit}/credit</p>

                                <ul className="features-list">
                                    {plan.features.map((feature) => (
                                        <li key={feature}>
                                            <svg
                                                className="check-icon"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <path d="M5 12l5 5L20 6" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={siteConfig.contact.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="select-btn"
                                >
                                    Get Started
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps-container">
                        {steps.map((item) => (
                            <div key={item.step} className="step-item">
                                <div className="step-number" aria-hidden="true">{item.step}</div>
                                <div className="step-content">
                                    <h3 className="step-title">{item.title}</h3>
                                    <p className="step-desc">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="reseller-final-cta">
                <div className="container">
                    <div className="final-cta-panel">
                        <h2 className="final-cta-heading">Ready to grow your business?</h2>
                        <p className="final-cta-subtitle">
                            Get wholesale pricing, your own panel, and dedicated support. Talk to
                            our team and start earning today.
                        </p>
                        <a
                            href={siteConfig.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="final-cta-btn"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
                            </svg>
                            Become a reseller
                        </a>
                    </div>
                </div>
            </section>

            <CTASection />

            <style jsx>{`
                .reseller-wrapper {
                    background: var(--background);
                    color: var(--text);
                }

                .container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* Header */
                .reseller-hero {
                    padding: 4rem 0 3.5rem;
                    text-align: center;
                    background: radial-gradient(
                        circle at top center,
                        var(--primary-soft) 0%,
                        transparent 65%
                    );
                }

                .reseller-hero .eyebrow {
                    margin-bottom: 1.25rem;
                }

                .reseller-h1 {
                    font-family: var(--font-heading);
                    font-size: clamp(2.4rem, 7vw, 4rem);
                    font-weight: 800;
                    line-height: 1.08;
                    margin: 0 0 1.25rem;
                    color: var(--text);
                }

                .reseller-subtitle {
                    font-size: 1.15rem;
                    color: var(--text-muted);
                    max-width: 640px;
                    margin: 0 auto 2.25rem;
                    line-height: 1.6;
                }

                .hero-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.55rem;
                }

                /* Sections */
                .benefits-section,
                .how-it-works {
                    padding: 4.5rem 0;
                }

                .packages-section {
                    padding: 4.5rem 0;
                    background: var(--surface);
                    border-top: 1px solid var(--border);
                    border-bottom: 1px solid var(--border);
                }

                .section-title {
                    font-family: var(--font-heading);
                    text-align: center;
                    font-size: clamp(1.8rem, 4vw, 2.5rem);
                    font-weight: 700;
                    margin: 0 0 3rem;
                    color: var(--text);
                }

                /* Benefits */
                .benefits-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .benefit-card {
                    background: var(--card);
                    border: 1px solid var(--border);
                    padding: 2rem;
                    border-radius: var(--radius);
                    transition: border-color 0.25s ease, transform 0.25s ease,
                        background 0.25s ease;
                }

                .benefit-card:hover {
                    background: var(--surface);
                    border-color: var(--border-strong);
                    transform: translateY(-4px);
                }

                .benefit-icon {
                    width: 52px;
                    height: 52px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    background: var(--primary-soft);
                    color: var(--primary);
                    border: 1px solid var(--border-strong);
                    margin-bottom: 1.25rem;
                }

                .benefit-title {
                    font-family: var(--font-heading);
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin: 0 0 0.6rem;
                    color: var(--text);
                }

                .benefit-desc {
                    color: var(--text-muted);
                    line-height: 1.6;
                    font-size: 0.95rem;
                    margin: 0;
                }

                /* Packages */
                .packages-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .package-card {
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 2.5rem 2rem;
                    text-align: center;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    transition: border-color 0.25s ease, transform 0.25s ease;
                }

                .package-card:hover {
                    border-color: var(--border-strong);
                    transform: translateY(-4px);
                }

                .package-card.popular {
                    border-color: var(--primary);
                    box-shadow: 0 24px 60px -28px var(--primary-soft);
                }

                .popular-badge {
                    position: absolute;
                    top: -13px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--primary);
                    color: var(--text);
                    padding: 0.4rem 1.25rem;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .plan-name {
                    font-family: var(--font-heading);
                    color: var(--text);
                    font-size: 1.35rem;
                    font-weight: 700;
                    margin: 0 0 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }

                .plan-price {
                    font-family: var(--font-heading);
                    color: var(--text);
                    font-size: 2.75rem;
                    font-weight: 800;
                    margin-bottom: 0.35rem;
                }

                .plan-tagline {
                    color: var(--gold);
                    font-size: 0.95rem;
                    margin: 0 0 1.75rem;
                    font-weight: 600;
                }

                .features-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 2rem;
                    text-align: left;
                }

                .features-list li {
                    display: flex;
                    align-items: center;
                    gap: 0.65rem;
                    color: var(--text-muted);
                    padding: 0.45rem 0;
                    font-size: 0.92rem;
                }

                .check-icon {
                    flex-shrink: 0;
                    color: var(--primary);
                }

                .select-btn {
                    display: block;
                    margin-top: auto;
                    background: var(--primary);
                    color: var(--text);
                    text-decoration: none;
                    padding: 0.9rem;
                    border-radius: 12px;
                    font-weight: 700;
                    transition: background 0.25s ease, transform 0.25s ease;
                }

                .select-btn:hover {
                    background: var(--primary-hover);
                    transform: translateY(-2px);
                }

                /* How It Works */
                .steps-container {
                    max-width: 760px;
                    margin: 0 auto;
                }

                .step-item {
                    display: flex;
                    gap: 1.5rem;
                    align-items: flex-start;
                    padding: 1.25rem 0;
                    border-bottom: 1px solid var(--border);
                }

                .step-item:last-child {
                    border-bottom: none;
                }

                .step-number {
                    width: 46px;
                    height: 46px;
                    background: var(--primary-soft);
                    border: 1px solid var(--border-strong);
                    color: var(--primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 1.25rem;
                    flex-shrink: 0;
                }

                .step-title {
                    font-family: var(--font-heading);
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin: 0 0 0.35rem;
                    color: var(--text);
                }

                .step-desc {
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin: 0;
                }

                /* Closing CTA */
                .reseller-final-cta {
                    padding: 4.5rem 0 1rem;
                }

                .final-cta-panel {
                    background: var(--primary-soft);
                    border: 1px solid var(--primary);
                    border-radius: 18px;
                    padding: 3rem 2rem;
                    text-align: center;
                    max-width: 760px;
                    margin: 0 auto;
                }

                .final-cta-heading {
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: clamp(1.7rem, 4vw, 2.5rem);
                    line-height: 1.12;
                    color: var(--text);
                    margin: 0 0 0.85rem;
                }

                .final-cta-subtitle {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    line-height: 1.55;
                    max-width: 520px;
                    margin: 0 auto 2rem;
                }

                .final-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    background: var(--primary);
                    color: var(--text);
                    text-decoration: none;
                    padding: 1rem 2.25rem;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 1.05rem;
                    transition: background 0.25s ease, transform 0.25s ease;
                }

                .final-cta-btn:hover {
                    background: var(--primary-hover);
                    transform: translateY(-2px);
                }

                .hero-cta:focus-visible,
                .select-btn:focus-visible,
                .final-cta-btn:focus-visible {
                    outline: 2px solid var(--text);
                    outline-offset: 3px;
                }

                @media (max-width: 600px) {
                    .step-item {
                        gap: 1rem;
                    }

                    .final-cta-panel {
                        padding: 2.25rem 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
