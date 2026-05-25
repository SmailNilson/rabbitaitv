import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - RabbitAI TV",
    description: "Terms of Service for RabbitAI TV IPTV Service. Read our terms and conditions before using our services.",
    alternates: {
        canonical: "/terms",
    },
};

export default function TermsOfServiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
