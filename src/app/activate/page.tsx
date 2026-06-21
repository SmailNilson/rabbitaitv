import type { Metadata } from "next";
import ActivateContent from "./ActivateContent";

export const metadata: Metadata = {
    title: "Activate 4Klive — Pair your TV",
    description:
        "Pair your 4Klive TV app: enter the Device Key and PIN shown on your TV, add your playlist, and your TV connects automatically.",
    // A utility pairing page — keep it out of search and unlinked from the site's SEO.
    robots: { index: false, follow: false },
    alternates: { canonical: "/activate" },
};

export default function ActivatePage() {
    return <ActivateContent />;
}
