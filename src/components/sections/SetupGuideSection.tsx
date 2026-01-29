'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from "@/config/site";
import CTASection from "@/components/sections/CTASection";

export default function SetupGuideSection() {
    const [activeTab, setActiveTab] = useState('firestick');

    const tabs = [
        { id: 'firestick', label: 'FIRETVSTICK' },
        { id: 'android', label: 'ANDROID' },
        { id: 'apple', label: 'APPLE/IOS' },
        { id: 'smarttv', label: 'SMART TV' },
        { id: 'mag', label: 'MAG' },
        { id: 'windows', label: 'WINDOWS/MAC' },
    ];

    const guides: Record<string, {
        title: string;
        intro: string;
        steps: { text: string; image?: string }[];
    }> = {
        firestick: {
            title: 'How to setup 4K IPTV Smarter on Fire TV Stick',
            intro: 'Note: To access our 4K IPTV service, you can install any app or player. In this beginner\'s tutorial, we will provide examples using the 4K IPTV smarter app (free app), Ibo Player app and the Tivimate app.',
            steps: [
                { text: '1. On the Home screen of your device, hover over the "Find" option.', image: '/images/t1.jpeg' },
                { text: '2. Use the "Find" function and click on "Search" to find the Downloader app.', image: '/images/t2.jpeg' },
                { text: '3. Type "Downloader" in the search field.', image: '/images/t3.jpeg' },
                { text: '4. Click on the Downloader app when it appears in the search results.', image: '/images/t4.jpeg' },
                { text: '5. Go to Settings > My Fire TV to access developer options.', image: '/images/t5.jpeg' },
                { text: '6. Select "Developer Options" from the menu.', image: '/images/t6.jpeg' },
                { text: '7. Enable "Install from unknown apps" or "Apps from Unknown Sources".', image: '/images/t7.jpeg' },
                { text: '8. Open Downloader and enter the URL we provide via WhatsApp.', image: '/images/t8.png' },
                { text: '9. The APK file will start downloading.', image: '/images/t9.jpeg' },
                { text: '10. Click "Install" when the download is complete.', image: '/images/t10.jpeg' },
                { text: '11. After installation, you can delete the APK file to save space.', image: '/images/t11.jpeg' },
                { text: '12. The app is now installed! Click "Done" or "Open".', image: '/images/t12.jpeg' },
                { text: '13. Launch the app from "Your Apps & Channels" section.', image: '/images/t13.jpeg' },
                { text: '14. Accept the terms and conditions to continue.', image: '/images/t14.jpeg' },
                { text: '15. Click "Add User" to add your IPTV subscription.', image: '/images/t15.jpeg' },
                { text: '16. Select "Login with Xtream Codes API" option.', image: '/images/t16.jpeg' },
                { text: '17. Enter your username, password, and server URL.', image: '/images/t17.jpeg' },
                { text: '18. Your user profile is now created! Click to access.', image: '/images/t18.png' },
                { text: '19. Wait while the content is downloading...', image: '/images/t19.jpeg' },
                { text: '20. Done! Enjoy your 4K IPTV streaming experience!', image: '/images/t20.png' },
            ],
        },
        android: {
            title: 'How to setup IPTV on Android with IPTV Smarters Player',
            intro: 'Step 1: Start by downloading IPTV Smarters app through this URL: https://www.iptvsmarters.com/smarters.apk',
            steps: [
                { text: '1. Download IPTV Smarters Pro from the URL above or Google Play Store' },
                { text: '2. Open the app once downloaded and Enter the login details.' },
                { text: '3. Select "Xtream Codes API" login option' },
                { text: '4. Enter the Server URL, Username, and Password we send you via WhatsApp' },
                { text: '5. Click "Add User" and wait for channels to load' },
                { text: '6. Start streaming your favorite content!' },
            ],
        },
        apple: {
            title: 'How to setup IPTV on iPhone/iPad with IPTV Smarters',
            intro: 'Step 1: Start by downloading IPTV Smarters app from the Apple Store: https://apps.apple.com/in/app/smarters-player-lite/id1628995509',
            steps: [
                { text: '1. Open the App Store on your iPhone or iPad' },
                { text: '2. Search for "IPTV Smarters" or "Smarters Player Lite"' },
                { text: '3. Download and install the app' },
                { text: '4. Open the app and tap "Add New User"' },
                { text: '5. Select "Xtream Codes API" option' },
                { text: '6. Enter the credentials we send you via WhatsApp' },
                { text: '7. Wait for the channels to load' },
                { text: '8. To add EPG, click on "Install EPG" (no URL needed)' },
                { text: '9. Done! Enjoy streaming on your iOS device!' },
            ],
        },
        smarttv: {
            title: 'How to setup IPTV on Samsung/LG Smart TV',
            intro: 'You can download IPTV Smarters from your TV store on Samsung, LG, etc. Sometimes Smart TVs don\'t support IPTV Smarters - in that case, use the iBo Player app.',
            steps: [
                { text: '1. Go to your TV\'s App Store (Samsung: Smart Hub, LG: LG Content Store)' },
                { text: '2. Search for "IPTV Smarters Pro" or "Smart IPTV"' },
                { text: '3. Download and install the app' },
                { text: '4. Open the app and select "Add New User"' },
                { text: '5. Choose "Xtream Codes API" login method' },
                { text: '6. Enter the credentials we provided after purchase' },
                { text: '7. If IPTV Smarters is not available, try iBo Player app instead' },
            ],
        },
        mag: {
            title: 'How to setup IPTV on MAG Box',
            intro: 'Configure your MAG device to access our IPTV service using your MAC Address.',
            steps: [
                { text: '1. Send us the MAC Address of your MAG via WhatsApp/Email/Live Chat' },
                { text: '2. After making the payment, we will send you the portal link' },
                { text: '3. Go to Settings > System Settings > Servers > Portals' },
                { text: '4. Enter our Portal URL in the Portal 1 field' },
                { text: '5. Leave Portal 1 Name blank or enter "RabbitAI TV"' },
                { text: '6. Save your settings and restart your MAG box' },
                { text: '7. Your channels will load automatically!' },
            ],
        },
        windows: {
            title: 'How to setup IPTV on Windows/Mac',
            intro: 'Use IPTV Smarters or VLC Media Player to watch on your computer.',
            steps: [
                { text: '1. For Windows: Download IPTV Smarters from https://www.iptvsmarters.com/download?download=windows_ap' },
                { text: '2. For Mac: Download IPTV Smarters from https://www.iptvsmarters.com/download?download=mac' },
                { text: '3. Install and open the application' },
                { text: '4. Select "Xtream Codes API" login option' },
                { text: '5. Enter your credentials (Server URL, Username, Password)' },
                { text: '6. Alternatively, use VLC Media Player with the M3U URL we provide' },
                { text: '7. Start streaming your favorite content!' },
            ],
        },
    };

    const currentGuide = guides[activeTab];

    return (
        <div className="setup-guide-wrapper">
            {/* Hero Section with Background */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container">
                    <h1 className="headline">Setup guide</h1>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <span>Setup guide</span>
                    </div>
                </div>
            </section>

            {/* Device Tabs */}
            <section className="tabs-section">
                <div className="container">
                    <div className="tabs-container">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guide Content */}
            <section className="guide-content">
                <div className="container">
                    <p className="intro-text">{currentGuide.intro}</p>
                    <h2 className="guide-title">{currentGuide.title}</h2>

                    <div className="steps-container">
                        {currentGuide.steps.map((step, index) => (
                            <div key={index} className="step-item">
                                <p className="step-text">{step.text}</p>
                                {step.image && (
                                    <div className="step-image">
                                        <Image
                                            src={step.image}
                                            alt={`Step ${index + 1}`}
                                            width={800}
                                            height={450}
                                            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Support Banner */}
                    <div className="support-banner">
                        <h3>Need Help?</h3>
                        <p>If you encounter any issues during the installation, please feel free to contact us via WhatsApp, and we will do our best to assist you.</p>
                        <a
                            href={siteConfig.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-support"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '10px' }}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Get Live Support on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <CTASection />

            <style jsx>{`
                .setup-guide-wrapper {
                    background: #0D0D0D;
                    color: white;
                    min-height: 100vh;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* Hero Section */
                .hero-section {
                    position: relative;
                    padding: 140px 0 60px;
                    text-align: center;
                    background: url('/images/Screenshot-2024-12-03-215102.png') center/cover no-repeat;
                    background-color: #0D0D0D;
                }

                .hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                }

                .hero-section .container {
                    position: relative;
                    z-index: 1;
                }

                .headline {
                    font-size: clamp(3rem, 10vw, 5rem);
                    font-weight: 700;
                    font-style: italic;
                    margin-bottom: 1rem;
                    color: white;
                }

                .breadcrumb {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.7);
                }

                .breadcrumb a {
                    color: rgba(255, 255, 255, 0.7);
                    transition: color 0.3s ease;
                }

                .breadcrumb a:hover {
                    color: #F20732;
                }

                .breadcrumb span:last-child {
                    color: #F20732;
                }

                /* Tabs Section */
                .tabs-section {
                    padding: 2rem 0;
                    background: #0D0D0D;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .tabs-container {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .tab-btn {
                    padding: 0.75rem 1.5rem;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-radius: 4px;
                }

                .tab-btn:hover {
                    border-color: #F20732;
                    color: #F20732;
                }

                .tab-btn.active {
                    background: #F20732;
                    border-color: #F20732;
                    color: white;
                }

                /* Guide Content */
                .guide-content {
                    padding: 3rem 0;
                }

                .intro-text {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-left: 3px solid #F20732;
                    border-radius: 0 8px 8px 0;
                }

                .guide-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                    color: white;
                }

                .steps-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .step-item {
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }

                .step-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(242, 7, 50, 0.3);
                }

                .step-text {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1.1rem;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    font-weight: 500;
                }

                .step-image {
                    margin-top: 1rem;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                /* Support Banner */
                .support-banner {
                    margin-top: 4rem;
                    background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 3rem;
                    text-align: center;
                }

                .support-banner h3 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                }

                .support-banner p {
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 1.5rem;
                    font-size: 1rem;
                }

                .btn-support {
                    display: inline-flex;
                    align-items: center;
                    background: #25D366;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .btn-support:hover {
                    box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .tabs-container {
                        gap: 0.25rem;
                    }
                    .tab-btn {
                        padding: 0.5rem 0.75rem;
                        font-size: 0.75rem;
                    }
                    .hero-section {
                        padding: 120px 0 40px;
                    }
                    .headline {
                        font-size: 2.5rem;
                    }
                    .support-banner {
                        padding: 2rem 1.5rem;
                    }
                    .step-item {
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
