import type { Metadata } from "next";
import Link from "next/link";

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

type Category = {
    name: string;
    icon: React.ReactNode;
    channels: string[];
};

const icon = (path: React.ReactNode) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {path}
    </svg>
);

const categories: Category[] = [
    {
        name: "Sports",
        icon: icon(
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3a9 9 0 0 0 0 18M3 12h18M5.6 6.5c2 1.6 10.8 1.6 12.8 0M5.6 17.5c2-1.6 10.8-1.6 12.8 0" />
            </>
        ),
        channels: [
            "ESPN", "ESPN2", "ESPN+", "Fox Sports 1", "Fox Sports 2", "NBC Sports",
            "CBS Sports", "NFL Network", "NBA TV", "MLB Network", "NHL Network",
            "beIN Sports", "Sky Sports", "BT Sport", "DAZN", "Eurosport"
        ],
    },
    {
        name: "Entertainment",
        icon: icon(
            <>
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M8 21h8M12 18v3M8 8l4 2.5L8 13z" />
            </>
        ),
        channels: [
            "HBO", "HBO Max", "Showtime", "Starz", "Cinemax", "AMC", "FX",
            "TNT", "TBS", "USA Network", "Syfy", "Paramount Network",
            "Comedy Central", "MTV", "VH1", "E!"
        ],
    },
    {
        name: "News",
        icon: icon(
            <>
                <path d="M4 5h13a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2z" />
                <path d="M8 9h7M8 13h7M8 17h4" />
            </>
        ),
        channels: [
            "CNN", "Fox News", "MSNBC", "CNBC", "BBC News", "Sky News",
            "Al Jazeera", "Bloomberg", "Reuters", "ABC News", "CBS News",
            "NBC News", "C-SPAN", "NewsMax", "OAN", "France 24"
        ],
    },
    {
        name: "Kids",
        icon: icon(
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M9 10h.01M15 10h.01M8.5 15a4 4 0 0 0 7 0" />
            </>
        ),
        channels: [
            "Disney Channel", "Disney XD", "Disney Junior", "Nickelodeon",
            "Nick Jr", "Cartoon Network", "PBS Kids", "Universal Kids",
            "Baby TV", "Boomerang", "Discovery Kids", "Sprout"
        ],
    },
    {
        name: "Movies",
        icon: icon(
            <>
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18M7 4v5M17 4v5M7 14h10" />
            </>
        ),
        channels: [
            "Netflix", "Amazon Prime", "Hulu", "Disney+", "HBO Max",
            "Peacock", "Paramount+", "Apple TV+", "MGM+", "TCM",
            "Hallmark", "Lifetime", "IFC", "Sundance"
        ],
    },
    {
        name: "International",
        icon: icon(
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </>
        ),
        channels: [
            "BBC", "ITV", "Channel 4", "Sky UK", "TF1", "France 2",
            "RAI", "RTL", "ZDF", "TV Globo", "Telemundo", "Univision",
            "Sony TV", "Star Plus", "Zee TV", "Colors"
        ],
    },
];

const stats = [
    { value: "20K+", label: "Live Channels" },
    { value: "120K+", label: "Movies & Series" },
    { value: "150+", label: "Countries" },
    { value: "4K", label: "Ultra HD Quality" },
];

const styles = `
.channels-page {
    padding: 3.5rem 0 6rem;
}
.channels-head {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 3rem;
}
.channels-head h1 {
    font-family: var(--font-heading);
    font-size: clamp(2.25rem, 6vw, 3.5rem);
    font-weight: 800;
    line-height: 1.08;
    margin: 0.75rem 0 1rem;
    color: var(--text);
}
.channels-head .lead {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
}

.channels-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 0 auto 3.5rem;
}
.stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem 1rem;
    text-align: center;
}
.stat-card .v {
    font-family: var(--font-heading);
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    color: var(--gold);
    line-height: 1;
}
.stat-card .l {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-dim);
}

.channels-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}
.channel-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.75rem;
    transition: border-color 0.2s ease, transform 0.2s ease;
}
.channel-card:hover {
    border-color: var(--border-strong);
    transform: translateY(-3px);
}
.channel-card-head {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1.25rem;
}
.channel-icon {
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: var(--primary-soft);
    border: 1px solid var(--primary-border);
    color: var(--primary);
}
.channel-icon svg {
    width: 22px;
    height: 22px;
}
.channel-card-head h2 {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: var(--text);
}
.channel-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.channel-tag {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-muted);
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 500;
    line-height: 1.2;
}
.channel-tag.more {
    background: transparent;
    border-style: dashed;
    color: var(--text-dim);
    font-style: italic;
}

.channels-cta {
    margin-top: 4rem;
    text-align: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 3rem 1.5rem;
}
.channels-cta h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    margin: 0 0 0.75rem;
    color: var(--text);
}
.channels-cta p {
    color: var(--text-muted);
    margin: 0 auto 1.75rem;
    max-width: 520px;
    line-height: 1.6;
}

@media (min-width: 600px) {
    .channels-stats { grid-template-columns: repeat(4, 1fr); }
}
@media (min-width: 720px) {
    .channels-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
    .channels-grid { grid-template-columns: repeat(3, 1fr); }
}
`;

export default function ChannelsPage() {
    return (
        <div className="channels-page">
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <div className="container">
                <header className="channels-head">
                    <span className="eyebrow">Channels</span>
                    <h1>20,000+ Live TV Channels</h1>
                    <p className="lead">
                        20,000+ live channels across every category and country &mdash;
                        sports, news, entertainment, movies and more, in 4K and Full HD.
                    </p>
                </header>

                <section className="channels-stats" aria-label="Channel statistics">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-card">
                            <div className="v">{stat.value}</div>
                            <div className="l">{stat.label}</div>
                        </div>
                    ))}
                </section>

                <section className="channels-grid" aria-label="Channels by category">
                    {categories.map((category) => (
                        <article key={category.name} className="channel-card">
                            <div className="channel-card-head">
                                <span className="channel-icon">{category.icon}</span>
                                <h2>{category.name}</h2>
                            </div>
                            <div className="channel-tags">
                                {category.channels.map((channel) => (
                                    <span key={channel} className="channel-tag">
                                        {channel}
                                    </span>
                                ))}
                                <span className="channel-tag more">And many more&hellip;</span>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="channels-cta">
                    <h2>Watch it all in 4K today</h2>
                    <p>
                        Start streaming 20,000+ live channels and a 120K+ on-demand library
                        across 150+ countries. No contract, cancel anytime.
                    </p>
                    <Link href="/free-trial" className="btn-primary">
                        Start your free trial
                    </Link>
                </section>
            </div>
        </div>
    );
}
