import type { Metadata } from "next";
import ActivateV2 from "./ActivateV2";
import LegacyActivate from "./LegacyActivate";

export const metadata: Metadata = {
    title: "Activate 4Klive — Add your playlist",
    description:
        "Activate your 4Klive TV app: enter the TV code and PIN shown on your TV, add your playlists, and your TV connects automatically.",
    // A utility pairing page — keep it out of search and unlinked from the site's SEO.
    robots: { index: false, follow: false },
    alternates: { canonical: "/activate" },
};

/**
 * Current TVs (fixed code + PIN, QR `?code=`) get the v2 page; a link from an older
 * app version (`?key=<Device Key>`) still gets the v1 form. Decided on the server so
 * the legacy form scrubbing `key` from the address bar can't flip the page.
 */
export default async function ActivatePage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const params = await searchParams;
    return params.key ? <LegacyActivate /> : <ActivateV2 />;
}
