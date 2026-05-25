import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";

export const metadata: Metadata = {
    title: "About Us - RabbitAI TV",
    description:
        "Learn more about RabbitAI TV, your premium IPTV provider. Discover our mission, vision, and why we are the best choice for your entertainment.",
    openGraph: {
        title: "About Us - RabbitAI TV",
        description: "Discover the best IPTV experience with RabbitAI TV.",
    },
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return <AboutSection />;
}
