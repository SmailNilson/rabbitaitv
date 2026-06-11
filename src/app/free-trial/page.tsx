import { Metadata } from "next";
import FreeTrialForm from "./FreeTrialForm";

export const metadata: Metadata = {
    title: "Free IPTV Trial - Test 20K+ Channels in 4K",
    description:
        "Request your free RabbitAI TV trial. Test 20,000+ live channels, 120,000+ movies & series in 4K on any device. No credit card required - instant activation.",
    alternates: {
        canonical: "/free-trial",
    },
    openGraph: {
        title: "Free IPTV Trial - RabbitAI TV",
        description:
            "Test 20,000+ live channels and 120,000+ movies & series in 4K. No credit card required.",
        url: "/free-trial",
    },
};

export default function FreeTrialPage() {
    return <FreeTrialForm />;
}
