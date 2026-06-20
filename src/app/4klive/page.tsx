import type { Metadata } from "next";
import FourkliveContent from "./FourkliveContent";

export const metadata: Metadata = {
    title: "4Klive — Premium 4K IPTV Player for Android TV, Samsung & LG",
    description:
        "4Klive is the RabbitAI TV app for the living room: a native 4K IPTV player for Android TV, Fire TV, Samsung (Tizen) and LG (webOS). Live TV, movies & series, EPG, catch-up. 7-day free trial.",
    keywords: [
        "4Klive",
        "IPTV player",
        "IPTV app for Smart TV",
        "Android TV IPTV app",
        "Fire TV IPTV",
        "Samsung Tizen IPTV",
        "LG webOS IPTV",
        "4K IPTV player",
        "RabbitAI TV app",
    ],
    openGraph: {
        title: "4Klive — Premium 4K IPTV Player for your TV",
        description:
            "Native 4K player for Android TV, Fire TV, Samsung & LG. Live TV, movies & series, EPG and catch-up. Start a 7-day free trial.",
        type: "website",
    },
    alternates: {
        canonical: "/4klive",
    },
};

// SoftwareApplication structured data for the 4Klive player.
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "4Klive",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Android TV, Amazon Fire TV, Samsung Tizen, LG webOS",
    description:
        "Native 4K IPTV player for the living room — Live TV with EPG and catch-up, movies & series with Continue Watching, hardware-decode-first playback and sub-second channel zapping.",
    offers: {
        "@type": "Offer",
        price: "24.99",
        priceCurrency: "USD",
        description: "Lifetime license (one-time). 7-day free trial. Yearly plan also available.",
    },
};

export default function FourklivePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FourkliveContent />
        </>
    );
}
