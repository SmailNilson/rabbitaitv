import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";

export const metadata: Metadata = {
    title: "Pricing - IPTV Subscription Plans",
    description:
        "Choose from our affordable IPTV subscription plans. Get access to 20,000+ channels, 120,000+ movies and series with 4K quality.",
    openGraph: {
        title: "Pricing - RabbitAI TV",
        description: "Affordable IPTV subscription plans starting at $24.99",
    },
    alternates: {
        canonical: "/pricing",
    },
};

export default function PricingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="pricing-hero">
                <div className="hero-inner">
                    <span className="eyebrow">Pricing</span>
                    <h1 className="hero-title">Simple pricing. No contracts.</h1>
                    <p className="hero-subtitle">
                        Every plan unlocks the full library — 20,000+ channels and
                        120,000+ titles in up to 4K. The longer you stay, the less you
                        pay.
                    </p>
                    <span className="guarantee-pill">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="M9 12l2 2 4-4" />
                        </svg>
                        30-day money-back guarantee
                    </span>
                </div>

                <style>{`
                    .pricing-hero { background: var(--background); padding: 3rem 1.5rem 1rem; }
                    .pricing-hero .hero-inner { max-width: 720px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.1rem; }
                    .pricing-hero .hero-title { font-family: var(--font-heading); font-weight: 800; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; color: var(--text); margin: 0; }
                    .pricing-hero .hero-subtitle { color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; max-width: 620px; margin: 0; }
                    .pricing-hero .guarantee-pill { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--gold-soft); color: var(--gold); padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600; }
                    .pricing-hero .guarantee-pill svg { width: 18px; height: 18px; }
                `}</style>
            </section>

            {/* Pricing Cards */}
            <PricingSection />

            {/* FAQ Section */}
            <FAQSection />

            <CTASection />
        </>
    );
}
