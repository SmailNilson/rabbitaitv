import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - IPTV Guides & Tips",
    description:
        "Discover comprehensive guides, tutorials, and tips to get the most out of your IPTV subscription. Installation guides, troubleshooting, and more.",
    openGraph: {
        title: "Blog - RabbitAI TV",
        description: "IPTV guides, tutorials, and tips for the best streaming experience",
    },
    alternates: {
        canonical: "/blog",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
