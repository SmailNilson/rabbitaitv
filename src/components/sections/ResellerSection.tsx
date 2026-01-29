'use client';

import { siteConfig } from "@/config/site";
import CTASection from "@/components/sections/CTASection";

export default function ResellerSection() {
    const benefits = [
        {
            icon: "💰",
            title: "High Profit Margins",
            description:
                "Set your own prices and keep the difference. Earn up to 50% profit on each sale.",
        },
        {
            icon: "🎛️",
            title: "Reseller Panel",
            description:
                "Get your own branded panel to manage customers, create subscriptions, and track earnings.",
        },
        {
            icon: "📞",
            title: "Dedicated Support",
            description:
                "Priority support for all resellers. We're here to help you succeed.",
        },
        {
            icon: "🔄",
            title: "Flexible Credits",
            description:
                "Buy credits in bulk and use them as needed. No expiration dates.",
        },
        {
            icon: "📊",
            title: "Analytics Dashboard",
            description:
                "Track your sales, customers, and earnings with detailed reports.",
        },
        {
            icon: "🌐",
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

    return (
        <div className="reseller-section-wrapper">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <span className="badge">💼 Business Opportunity</span>
                    <h1 className="headline">
                        Become a <span className="gradient-text">Reseller</span>
                    </h1>
                    <p className="subheadline">
                        Start your own IPTV business with minimal investment. Get wholesale
                        pricing, your own panel, and dedicated support.
                    </p>
                    <a
                        href={siteConfig.contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-apply"
                    >
                        Apply Now
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '10px' }}>
                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* Why Become a Reseller - Premium Grid */}
            <section className="benefits-section">
                <div className="container">
                    <h2 className="section-title">Why Become a <span className="gradient-text">Reseller?</span></h2>
                    <div className="benefits-grid">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="benefit-card">
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-desc">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reseller Packages - White Cards Matching Pricing */}
            <section className="packages-section">
                <div className="container">
                    <h2 className="section-title">Reseller <span className="gradient-text">Packages</span></h2>
                    <div className="packages-grid">
                        {plans.map((plan) => (
                            <div key={plan.name} className={`package-card ${plan.popular ? 'popular' : ''}`}>
                                {plan.popular && <div className="popular-badge">Best Value</div>}
                                <h3 className="plan-name">{plan.name}</h3>
                                <div className="plan-price">${plan.price}</div>
                                <p className="plan-tagline">${plan.perCredit}/credit</p>

                                <ul className="features-list">
                                    {plan.features.map((feature) => (
                                        <li key={feature}>
                                            <span className="check-icon">✓</span>
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

            {/* How It Works - Timeline */}
            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
                    <div className="steps-container">
                        {[
                            {
                                step: 1,
                                title: "Choose Your Package",
                                description: "Select a reseller package that fits your business needs."
                            },
                            {
                                step: 2,
                                title: "Get Your Panel",
                                description: "Receive access to your personal reseller panel within 24 hours."
                            },
                            {
                                step: 3,
                                title: "Add Customers",
                                description: "Create subscriptions for your customers using your credits."
                            },
                            {
                                step: 4,
                                title: "Earn Profits",
                                description: "Set your own prices and keep the difference. No limits!"
                            }
                        ].map((item) => (
                            <div key={item.step} className="step-item">
                                <div className="step-number">{item.step}</div>
                                <div className="step-content">
                                    <h3 className="step-title">{item.title}</h3>
                                    <p className="step-desc">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />

            <style jsx>{`
                .reseller-section-wrapper {
                    background: #000;
                    color: white;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* Hero Section */
                .hero-section {
                    padding: 160px 0 80px;
                    text-align: center;
                    background: radial-gradient(circle at top center, rgba(242, 7, 50, 0.15) 0%, transparent 70%);
                }

                .badge {
                    display: inline-block;
                    background: rgba(203, 149, 0, 0.1);
                    color: #CB9500;
                    padding: 0.5rem 1.25rem;
                    border-radius: 50px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(203, 149, 0, 0.2);
                }

                .headline {
                    font-size: clamp(2.5rem, 8vw, 4.5rem);
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    line-height: 1.1;
                }

                .gradient-text {
                    background: linear-gradient(135deg, #CB9500 0%, #F20732 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .subheadline {
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.6);
                    max-width: 700px;
                    margin: 0 auto 3rem;
                    line-height: 1.6;
                }

                .btn-apply {
                    display: inline-flex;
                    align-items: center;
                    background: #F20732;
                    color: white;
                    padding: 1.25rem 2.5rem;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 1.125rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .btn-apply:hover {
                    background: #d10629;
                    transform: translateY(-3px);
                    box-shadow: 0 15px 30px rgba(242, 7, 50, 0.4);
                }

                /* Benefits Section */
                .benefits-section {
                    padding: 80px 0;
                }

                .section-title {
                    text-align: center;
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 4rem;
                }

                .benefits-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .benefit-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 2.5rem;
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }

                .benefit-card:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(203, 149, 0, 0.4);
                    transform: translateY(-10px);
                }

                .benefit-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, rgba(203, 149, 0, 0.2), rgba(242, 7, 50, 0.2));
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                }

                .benefit-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .benefit-desc {
                    color: rgba(255, 255, 255, 0.5);
                    line-height: 1.6;
                    font-size: 0.95rem;
                }

                /* Packages Section - White Cards */
                .packages-section {
                    padding: 100px 0;
                    background: #0D0D0D;
                }

                .packages-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .package-card {
                    background: #FFFFFF;
                    border-radius: 20px;
                    padding: 3rem 2rem;
                    text-align: center;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .package-card.popular {
                    transform: scale(1.05);
                    box-shadow: 0 30px 60px rgba(242, 7, 50, 0.2);
                    z-index: 2;
                }

                .popular-badge {
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #F20732;
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-radius: 50px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .plan-name {
                    color: #000;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                }

                .plan-price {
                    color: #000;
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                }

                .plan-tagline {
                    color: #666;
                    font-size: 1rem;
                    margin-bottom: 2rem;
                    font-weight: 600;
                }

                .features-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 2.5rem;
                    text-align: left;
                }

                .features-list li {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #1a1a1a;
                    padding: 0.5rem 0;
                    font-size: 0.95rem;
                    font-weight: 500;
                }

                .check-icon {
                    color: #000;
                    font-weight: 900;
                }

                .select-btn {
                    display: block;
                    background: #F20732;
                    color: white;
                    text-decoration: none;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    transition: all 0.3s ease;
                }

                .select-btn:hover {
                    background: #d10629;
                    transform: scale(1.02);
                }

                /* How It Works Section */
                .how-it-works {
                    padding: 100px 0;
                }

                .steps-container {
                    max-width: 800px;
                    margin: 0 auto;
                    position: relative;
                }

                .step-item {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 3rem;
                    position: relative;
                }

                .step-number {
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #CB9500 0%, #F20732 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 1.5rem;
                    flex-shrink: 0;
                    z-index: 2;
                }

                .step-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .step-desc {
                    color: rgba(255, 255, 255, 0.5);
                    line-height: 1.6;
                }

                @media (max-width: 768px) {
                    .package-card.popular {
                        transform: scale(1);
                    }
                    .step-item {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
