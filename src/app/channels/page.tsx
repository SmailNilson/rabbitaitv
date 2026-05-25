import type { Metadata } from "next";
import ChannelsSection from "@/components/sections/ChannelsSection";

export const metadata: Metadata = {
    title: "Channels List - 20,000+ Live TV Channels",
    description:
        "Browse our complete list of 20,000+ live TV channels from around the world. Sports, news, entertainment, movies, and more.",
    openGraph: {
        title: "Channels List - RabbitAI TV",
        description: "20,000+ live TV channels from around the world",
    },
    alternates: {
        canonical: "/channels",
    },
};

export default function ChannelsPage() {
    return <ChannelsSection />;
}
