'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

type Step = { text: string; image?: string };
type Guide = {
    id: string;
    label: string;
    icon: "fire" | "android" | "apple" | "tv" | "box" | "desktop" | "play";
    title: string;
    intro: string;
    steps: Step[];
};

const guides: Guide[] = [
    {
        id: "4klive",
        label: "4Klive · Fire & Android TV",
        icon: "play",
        title: "How to install 4Klive on Fire TV Stick & Android TV",
        intro:
            "4Klive is the RabbitAI TV app — a premium native player for Fire TV Stick, Fire TV, Android TV, Google TV and Nvidia Shield. Install it with the free Downloader app using code 9234307. Your 7-day free trial starts automatically on first launch — no signup.",
        steps: [
            { text: 'Install the free "Downloader" app from your TV store (Fire TV: search "Downloader"; Android / Google TV: Google Play Store), then open it.' },
            { text: 'Fire TV only: go to Settings → My Fire TV → Developer options → "Install unknown apps", and turn ON Downloader. (On Android / Google TV, Downloader asks for this permission when needed.)' },
            { text: "In Downloader, select the address box and type the code 9234307, then press Go.", image: "/images/4klive-code.png" },
            { text: "4Klive starts downloading — wait for it to finish, then open the file." },
            { text: 'When the installer asks "Do you want to install this application?", select Install.', image: "/images/4klive-install.png" },
            { text: 'Select "Open" (or later, find 4Klive under "Your Apps & Channels") to launch it.', image: "/images/4klive-banner.png" },
            { text: "4Klive opens and your 7-day free trial starts automatically — every feature, no card needed. After it ends you keep the app with a one-time or yearly licence." },
            { text: "To watch, sign in with your RabbitAI TV details (Xtream Codes) or activate from the code the app shows on screen. Your channels come from your RabbitAI TV subscription, billed separately." },
        ],
    },
    {
        id: "firestick",
        label: "Fire TV Stick",
        icon: "fire",
        title: "How to setup 4K IPTV Smarter on Fire TV Stick",
        intro:
            "Note: To access our 4K IPTV service, you can install any app or player. In this beginner's tutorial, we will provide examples using the 4K IPTV smarter app (free app), Ibo Player app and the Tivimate app.",
        steps: [
            { text: 'On the Home screen of your device, hover over the "Find" option.', image: "/images/t1.jpeg" },
            { text: 'Use the "Find" function and click on "Search" to find the Downloader app.', image: "/images/t2.jpeg" },
            { text: 'Type "Downloader" in the search field.', image: "/images/t3.jpeg" },
            { text: "Click on the Downloader app when it appears in the search results.", image: "/images/t4.jpeg" },
            { text: "Go to Settings > My Fire TV to access developer options.", image: "/images/t5.jpeg" },
            { text: 'Select "Developer Options" from the menu.', image: "/images/t6.jpeg" },
            { text: 'Enable "Install from unknown apps" or "Apps from Unknown Sources".', image: "/images/t7.jpeg" },
            { text: "Open Downloader and enter the URL we provide via WhatsApp.", image: "/images/t8.png" },
            { text: "The APK file will start downloading.", image: "/images/t9.jpeg" },
            { text: 'Click "Install" when the download is complete.', image: "/images/t10.jpeg" },
            { text: "After installation, you can delete the APK file to save space.", image: "/images/t11.jpeg" },
            { text: 'The app is now installed! Click "Done" or "Open".', image: "/images/t12.jpeg" },
            { text: 'Launch the app from "Your Apps & Channels" section.', image: "/images/t13.jpeg" },
            { text: "Accept the terms and conditions to continue.", image: "/images/t14.jpeg" },
            { text: 'Click "Add User" to add your IPTV subscription.', image: "/images/t15.jpeg" },
            { text: 'Select "Login with Xtream Codes API" option.', image: "/images/t16.jpeg" },
            { text: "Enter your username, password, and server URL.", image: "/images/t17.jpeg" },
            { text: "Your user profile is now created! Click to access.", image: "/images/t18.png" },
            { text: "Wait while the content is downloading...", image: "/images/t19.jpeg" },
            { text: "Done! Enjoy your 4K IPTV streaming experience!", image: "/images/t20.png" },
        ],
    },
    {
        id: "android",
        label: "Android",
        icon: "android",
        title: "How to setup IPTV on Android with IPTV Smarters Player",
        intro:
            "Step 1: Start by downloading IPTV Smarters app through this URL: https://www.iptvsmarters.com/smarters.apk",
        steps: [
            { text: "Download IPTV Smarters Pro from the URL above or Google Play Store." },
            { text: "Open the app once downloaded and enter the login details." },
            { text: 'Select "Xtream Codes API" login option.' },
            { text: "Enter the Server URL, Username, and Password we send you via WhatsApp." },
            { text: 'Click "Add User" and wait for channels to load.' },
            { text: "Start streaming your favorite content!" },
        ],
    },
    {
        id: "apple",
        label: "Apple / iOS",
        icon: "apple",
        title: "How to setup IPTV on iPhone/iPad with IPTV Smarters",
        intro:
            "Step 1: Start by downloading IPTV Smarters app from the Apple Store: https://apps.apple.com/in/app/smarters-player-lite/id1628995509",
        steps: [
            { text: "Open the App Store on your iPhone or iPad." },
            { text: 'Search for "IPTV Smarters" or "Smarters Player Lite".' },
            { text: "Download and install the app." },
            { text: 'Open the app and tap "Add New User".' },
            { text: 'Select "Xtream Codes API" option.' },
            { text: "Enter the credentials we send you via WhatsApp." },
            { text: "Wait for the channels to load." },
            { text: 'To add EPG, click on "Install EPG" (no URL needed).' },
            { text: "Done! Enjoy streaming on your iOS device!" },
        ],
    },
    {
        id: "smarttv",
        label: "Smart TV",
        icon: "tv",
        title: "How to setup IPTV on Samsung/LG Smart TV",
        intro:
            "You can download IPTV Smarters from your TV store on Samsung, LG, etc. Sometimes Smart TVs don't support IPTV Smarters - in that case, use the iBo Player app.",
        steps: [
            { text: "Go to your TV's App Store (Samsung: Smart Hub, LG: LG Content Store)." },
            { text: 'Search for "IPTV Smarters Pro" or "Smart IPTV".' },
            { text: "Download and install the app." },
            { text: 'Open the app and select "Add New User".' },
            { text: 'Choose "Xtream Codes API" login method.' },
            { text: "Enter the credentials we provided after purchase." },
            { text: "If IPTV Smarters is not available, try iBo Player app instead." },
        ],
    },
    {
        id: "mag",
        label: "MAG Box",
        icon: "box",
        title: "How to setup IPTV on MAG Box",
        intro: "Configure your MAG device to access our IPTV service using your MAC Address.",
        steps: [
            { text: "Send us the MAC Address of your MAG via WhatsApp/Email/Live Chat." },
            { text: "After making the payment, we will send you the portal link." },
            { text: "Go to Settings > System Settings > Servers > Portals." },
            { text: "Enter our Portal URL in the Portal 1 field." },
            { text: 'Leave Portal 1 Name blank or enter "RabbitAI TV".' },
            { text: "Save your settings and restart your MAG box." },
            { text: "Your channels will load automatically!" },
        ],
    },
    {
        id: "windows",
        label: "Windows / Mac",
        icon: "desktop",
        title: "How to setup IPTV on Windows/Mac",
        intro: "Use IPTV Smarters or VLC Media Player to watch on your computer.",
        steps: [
            { text: "For Windows: Download IPTV Smarters from https://www.iptvsmarters.com/download?download=windows_ap" },
            { text: "For Mac: Download IPTV Smarters from https://www.iptvsmarters.com/download?download=mac" },
            { text: "Install and open the application." },
            { text: 'Select "Xtream Codes API" login option.' },
            { text: "Enter your credentials (Server URL, Username, Password)." },
            { text: "Alternatively, use VLC Media Player with the M3U URL we provide." },
            { text: "Start streaming your favorite content!" },
        ],
    },
];

function DeviceIcon({ name }: { name: Guide["icon"] }) {
    const common = {
        width: 22,
        height: 22,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
    };
    switch (name) {
        case "fire":
            return (
                <svg {...common}>
                    <path d="M12 3c1 3-1.5 4.5-1.5 7A2.5 2.5 0 0013 12.5C13 10 15 9 15 9s1.5 2 1.5 5A4.5 4.5 0 0112 18.5 4.5 4.5 0 017.5 14c0-4 4.5-5 4.5-11z" />
                </svg>
            );
        case "android":
            return (
                <svg {...common}>
                    <path d="M5 16a7 7 0 0114 0" />
                    <path d="M5 16h14v2a1 1 0 01-1 1H6a1 1 0 01-1-1z" />
                    <path d="M8 6.5L6.5 4.2M16 6.5l1.5-2.3" />
                    <path d="M9.5 11.5h.01M14.5 11.5h.01" />
                </svg>
            );
        case "apple":
            return (
                <svg {...common}>
                    <path d="M16 13.4c0 2.5 2 3.4 2 3.4s-1.4 3.7-3.2 3.7c-1 0-1.4-.6-2.5-.6s-1.6.6-2.5.6c-1.9 0-3.8-3.9-3.8-6.9 0-3 2-4.6 3.7-4.6 1.1 0 1.8.7 2.6.7.8 0 1.3-.7 2.6-.7 1 0 2 .5 2.7 1.4-2.4 1.3-1.8 4.1-1.6 3.6z" />
                    <path d="M13 5.5c.6-.8 1-1.8.9-2.8-.9.1-1.9.6-2.5 1.4-.5.6-1 1.6-.8 2.6.9.1 1.9-.4 2.4-1.2z" />
                </svg>
            );
        case "tv":
            return (
                <svg {...common}>
                    <rect x="2.5" y="5" width="19" height="12" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                </svg>
            );
        case "box":
            return (
                <svg {...common}>
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M8 8h8M8 12h5" />
                    <circle cx="16.5" cy="15.5" r="1" />
                </svg>
            );
        case "desktop":
            return (
                <svg {...common}>
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8M12 16v4" />
                </svg>
            );
        case "play":
            return (
                <svg {...common}>
                    <rect x="2.5" y="4.5" width="19" height="13" rx="2.5" />
                    <path d="M8 20h8M12 17.5V20" />
                    <path d="M10.5 9.2l4 2.8-4 2.8z" fill="currentColor" stroke="none" />
                </svg>
            );
    }
}

export default function SetupGuideContent() {
    const [activeId, setActiveId] = useState(guides[0].id);
    const active = guides.find((g) => g.id === activeId) ?? guides[0];

    return (
        <div className="setup-page">
            <div className="container">
                <header className="setup-header">
                    <span className="eyebrow">Setup</span>
                    <h1 className="setup-title">Setup guide for every device</h1>
                    <p className="setup-subtitle">
                        Get streaming in minutes. Pick your device below and follow the step-by-step
                        instructions, or reach out to our team for live assistance.
                    </p>
                </header>

                {/* Device tabs */}
                <nav className="device-nav" role="tablist" aria-label="Choose your device">
                    {guides.map((g) => (
                        <button
                            key={g.id}
                            role="tab"
                            aria-selected={activeId === g.id}
                            className={`device-chip ${activeId === g.id ? "active" : ""}`}
                            onClick={() => setActiveId(g.id)}
                        >
                            <DeviceIcon name={g.icon} />
                            <span>{g.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Active device guide */}
                <section key={active.id} className="device-card" aria-labelledby="active-title">
                    <div className="device-card-head">
                        <span className="device-icon" aria-hidden="true">
                            <DeviceIcon name={active.icon} />
                        </span>
                        <span className="device-label">{active.label}</span>
                    </div>
                    <h2 id="active-title" className="device-title">{active.title}</h2>
                    <p className="device-intro">{active.intro}</p>
                    <ol className="step-list">
                        {active.steps.map((step, i) => (
                            <li key={i} className="step">
                                <span className="step-num" aria-hidden="true">{i + 1}</span>
                                <div className="step-body">
                                    <p className="step-text">{step.text}</p>
                                    {step.image && (
                                        <span className="step-image">
                                            <Image
                                                src={step.image}
                                                alt={`${active.label} setup — step ${i + 1}`}
                                                width={800}
                                                height={450}
                                                style={{ objectFit: "contain", width: "100%", height: "auto" }}
                                            />
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Closing CTA */}
                <section className="setup-cta" aria-label="Get help">
                    <h2 className="cta-title">Need a hand?</h2>
                    <p className="cta-text">
                        If you run into any issues during installation, our team is on standby. Get live
                        support or start your free trial in seconds.
                    </p>
                    <div className="cta-actions">
                        <Link href="/free-trial" className="btn-primary">Start free trial</Link>
                        <a
                            href={siteConfig.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3 21l1.6-4A8.4 8.4 0 1112 20a8.5 8.5 0 01-4.1-1z" />
                                <path d="M8.5 9c0 3 2.5 5.5 5.5 5.5.7-1 .3-1.4-.3-1.7l-1.2-.5-.9 1c-1-.4-1.9-1.3-2.3-2.3l1-.9-.5-1.2c-.3-.6-.7-1-1.7-.3z" />
                            </svg>
                            Live support on WhatsApp
                        </a>
                    </div>
                </section>
            </div>

            <style jsx>{`
                .setup-page {
                    background: var(--background);
                    color: var(--text);
                    min-height: 100vh;
                    padding-bottom: 80px;
                }
                .container {
                    max-width: 920px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                .setup-header {
                    text-align: center;
                    max-width: 720px;
                    margin: 0 auto;
                    padding: 24px 0 8px;
                }
                .setup-title {
                    font-family: var(--font-heading);
                    font-size: clamp(2rem, 5vw, 3.25rem);
                    font-weight: 700;
                    line-height: 1.1;
                    margin: 14px 0 16px;
                }
                .setup-subtitle {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    line-height: 1.6;
                }
                .device-nav {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    margin: 32px auto 36px;
                }
                .device-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 9px 16px;
                    border: 1px solid var(--border);
                    border-radius: 999px;
                    color: var(--text-muted);
                    font-family: inherit;
                    font-size: 0.9rem;
                    font-weight: 600;
                    background: var(--surface);
                    cursor: pointer;
                    transition: border-color .2s ease, color .2s ease, background .2s ease;
                }
                .device-chip :global(svg) { color: var(--primary); }
                .device-chip:hover {
                    border-color: var(--primary-border);
                    color: var(--text);
                }
                .device-chip.active {
                    background: var(--primary);
                    border-color: var(--primary);
                    color: #fff;
                }
                .device-chip.active :global(svg) { color: #fff; }

                .device-card {
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 30px;
                }
                .device-card-head {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 14px;
                }
                .device-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    background: var(--primary-soft);
                    border: 1px solid var(--primary-border);
                    color: var(--primary);
                    flex-shrink: 0;
                }
                .device-label {
                    font-family: var(--font-heading);
                    font-weight: 600;
                    font-size: 1.15rem;
                }
                .device-title {
                    font-family: var(--font-heading);
                    font-size: 1.3rem;
                    font-weight: 700;
                    line-height: 1.3;
                    margin: 0 0 14px;
                    color: var(--text);
                }
                .device-intro {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 0 0 26px;
                    padding: 14px 16px;
                    background: var(--surface);
                    border-left: 2px solid var(--primary);
                    border-radius: 0 10px 10px 0;
                    word-break: break-word;
                }
                .step-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 22px;
                }
                .step {
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                }
                .step-num {
                    flex-shrink: 0;
                    width: 30px;
                    height: 30px;
                    border-radius: 8px;
                    background: var(--primary-soft);
                    border: 1px solid var(--primary-border);
                    color: var(--primary);
                    font-family: var(--font-heading);
                    font-size: 0.9rem;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .step-body { flex: 1; min-width: 0; }
                .step-text {
                    margin: 0;
                    color: var(--text);
                    font-size: 1rem;
                    line-height: 1.55;
                    padding-top: 3px;
                    word-break: break-word;
                }
                .step-image {
                    display: block;
                    margin-top: 14px;
                    max-width: 560px;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 1px solid var(--border);
                    background: var(--surface);
                }

                .setup-cta {
                    margin-top: 44px;
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    padding: 48px 32px;
                    text-align: center;
                }
                .cta-title {
                    font-family: var(--font-heading);
                    font-size: clamp(1.5rem, 3vw, 2rem);
                    font-weight: 700;
                    margin: 0 0 12px;
                }
                .cta-text {
                    color: var(--text-muted);
                    max-width: 540px;
                    margin: 0 auto 28px;
                    line-height: 1.6;
                }
                .cta-actions {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 14px;
                }
                .btn-whatsapp {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    padding: 13px 24px;
                    border-radius: 999px;
                    border: 1px solid var(--border-strong);
                    background: var(--surface);
                    color: var(--text);
                    font-weight: 600;
                    text-decoration: none;
                    transition: border-color .2s ease, background .2s ease;
                }
                .btn-whatsapp:hover {
                    border-color: var(--primary-border);
                    background: var(--primary-soft);
                }

                @media (max-width: 640px) {
                    .container { padding: 0 16px; }
                    .device-card { padding: 20px; }
                    .setup-cta { padding: 36px 20px; }
                }
            `}</style>
        </div>
    );
}
