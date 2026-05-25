import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import { siteConfig } from "@/config/site";
import Link from "next/link";

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
            <section className="pb-20 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A]" style={{ paddingTop: '120px' }}>
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Choose Your{" "}
                        <span className="bg-gradient-to-r from-[#CB9500] to-[#F20732] bg-clip-text text-transparent">
                            Perfect Plan
                        </span>
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        No hidden fees. No contracts. Cancel anytime. Join thousands of
                        satisfied customers today!
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <PricingSection />

            {/* FAQ Section */}
            <FAQSection />

            <CTASection />
        </>
    );
}
