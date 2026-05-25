import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - RabbitAI TV",
    description: "Privacy Policy for RabbitAI TV IPTV Service. Learn how we collect, use, and protect your personal information.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
