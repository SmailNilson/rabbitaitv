import type { Metadata } from "next";
import AdminContent from "./AdminContent";

export const metadata: Metadata = {
    title: "4Klive admin",
    description: "4Klive TV administration.",
    // Private tool: never indexed (robots.txt also disallows /admin).
    robots: { index: false, follow: false },
};

export default function AdminPage() {
    return <AdminContent />;
}
