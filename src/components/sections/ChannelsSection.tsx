'use client';

import CTASection from "@/components/sections/CTASection";

export default function ChannelsSection() {
    const categories = [
        {
            name: "Sports",
            icon: "⚽",
            channels: [
                "ESPN", "ESPN2", "ESPN+", "Fox Sports 1", "Fox Sports 2", "NBC Sports",
                "CBS Sports", "NFL Network", "NBA TV", "MLB Network", "NHL Network",
                "beIN Sports", "Sky Sports", "BT Sport", "DAZN", "Eurosport"
            ],
        },
        {
            name: "Entertainment",
            icon: "🎬",
            channels: [
                "HBO", "HBO Max", "Showtime", "Starz", "Cinemax", "AMC", "FX",
                "TNT", "TBS", "USA Network", "Syfy", "Paramount Network",
                "Comedy Central", "MTV", "VH1", "E!"
            ],
        },
        {
            name: "News",
            icon: "📰",
            channels: [
                "CNN", "Fox News", "MSNBC", "CNBC", "BBC News", "Sky News",
                "Al Jazeera", "Bloomberg", "Reuters", "ABC News", "CBS News",
                "NBC News", "C-SPAN", "NewsMax", "OAN", "France 24"
            ],
        },
        {
            name: "Kids",
            icon: "🧸",
            channels: [
                "Disney Channel", "Disney XD", "Disney Junior", "Nickelodeon",
                "Nick Jr", "Cartoon Network", "PBS Kids", "Universal Kids",
                "Baby TV", "Boomerang", "Discovery Kids", "Sprout"
            ],
        },
        {
            name: "Movies",
            icon: "🎥",
            channels: [
                "Netflix", "Amazon Prime", "Hulu", "Disney+", "HBO Max",
                "Peacock", "Paramount+", "Apple TV+", "MGM+", "TCM",
                "Hallmark", "Lifetime", "IFC", "Sundance"
            ],
        },
        {
            name: "International",
            icon: "🌍",
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

    return (
        <div className="channels-section-wrapper">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <span className="badge">📺 Unlimited Entertainment</span>
                    <h1 className="headline">
                        <span className="gradient-text">20,000+</span> Live TV Channels
                    </h1>
                    <p className="subheadline">
                        Premium channels from around the world including USA, UK, Canada,
                        Europe, Middle East, Asia, and more. All in glorious 4K and Full HD.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat) => (
                            <div key={stat.label} className="stat-card">
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Explore by <span className="gradient-text">Category</span></h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <div key={category.name} className="category-card">
                                <div className="category-header">
                                    <div className="category-icon">{category.icon}</div>
                                    <h3 className="category-name">{category.name}</h3>
                                </div>
                                <div className="channels-list">
                                    {category.channels.map((channel) => (
                                        <span key={channel} className="channel-tag">{channel}</span>
                                    ))}
                                    <span className="channel-tag more">And many more...</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />

            <style jsx>{`
                .channels-section-wrapper {
                    background: #000;
                    color: white;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* Hero Section */
                .hero-section {
                    padding: 160px 0 60px;
                    text-align: center;
                    background: radial-gradient(circle at top center, rgba(203, 149, 0, 0.1) 0%, transparent 70%);
                }

                .badge {
                    display: inline-block;
                    background: rgba(203, 149, 0, 0.1);
                    color: #CB9500;
                    padding: 0.5rem 1.25rem;
                    border-radius: 50px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(203, 149, 0, 0.2);
                }

                .headline {
                    font-size: clamp(2.5rem, 8vw, 4.5rem);
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    line-height: 1.1;
                }

                .gradient-text {
                    background: linear-gradient(135deg, #CB9500 0%, #F20732 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .subheadline {
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.6);
                    max-width: 800px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Stats Section */
                .stats-section {
                    padding: 40px 0;
                    background: #0d0d0d;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    text-align: center;
                }

                @media (min-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }

                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #CB9500;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                /* Categories Section */
                .categories-section {
                    padding: 80px 0 100px;
                }

                .section-title {
                    text-align: center;
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 4rem;
                }

                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2.5rem;
                }

                .category-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 2.5rem;
                    transition: all 0.3s ease;
                }

                .category-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(242, 7, 50, 0.3);
                    transform: translateY(-5px);
                }

                .category-header {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-bottom: 2rem;
                }

                .category-icon {
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.75rem;
                }

                .category-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .channels-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .channel-tag {
                    background: rgba(255, 255, 255, 0.05);
                    color: rgba(255, 255, 255, 0.7);
                    padding: 0.4rem 0.8rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }

                .channel-tag:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                .channel-tag.more {
                    background: transparent;
                    border: 1px dashed rgba(255, 255, 255, 0.2);
                    font-style: italic;
                }

                @media (max-width: 640px) {
                    .categories-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
