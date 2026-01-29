import type { Metadata } from "next";
import ResellerSection from "@/components/sections/ResellerSection";

export const metadata: Metadata = {
    title: "Become a Reseller - Earn with IPTV",
    description:
        "Join our reseller program and start earning. Get wholesale IPTV credits, dedicated support, and your own reseller panel.",
    openGraph: {
        title: "Become a Reseller - RabbitAI TV",
        description: "Start your own IPTV business with our reseller program",
    },
};

export default function ResellerPage() {
    return <ResellerSection />;
}
