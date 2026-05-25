import type { Metadata } from "next";
import SetupGuideSection from "@/components/sections/SetupGuideSection";

export const metadata: Metadata = {
    title: "Setup Guide - How to Install IPTV",
    description:
        "Complete setup guide for installing IPTV on all devices. Step-by-step instructions for Smart TV, Fire TV, Android, iOS, and more.",
    openGraph: {
        title: "Setup Guide - RabbitAI TV",
        description: "Easy IPTV setup instructions for all devices",
    },
    alternates: {
        canonical: "/setup-guide",
    },
};

export default function SetupGuidePage() {
    return <SetupGuideSection />;
}
