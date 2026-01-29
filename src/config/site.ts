// Site configuration - RabbitAI TV
export const siteConfig = {
    name: "RabbitAI TV",
    description: "Best 4K IPTV Service for Streaming - 20K+ Live TV Channels, 120K+ Movies & Series",
    url: "https://rabbitaitv.com",

    // Contact Information
    contact: {
        whatsapp: "+17575357760",
        whatsappLink: "https://api.whatsapp.com/send?phone=17575357760",
        email: "contact.rabbitaitv@gmail.com",
        address: "15202 Marlebone Ct Houston, TX 77069, USA",
    },

    // Social Links
    social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        telegram: "#",
    },

    // SEO
    seo: {
        googleVerification: "d2K_7cdRcFRiuvQPVhBqJOGJOvm-DQqbEj0k2gblS-E",
        googleAnalytics: "G-JH80J2REHG",
        googleAds: "AW-17437885569",
    },

    // Pricing Plans - prices per device
    plans: [
        {
            id: 1,
            name: "1 Month",
            duration: 1,
            price: 8.99,
            originalPrice: 17.99,
            features: [
                "+ 20K Live TV Channels",
                "+ 120K Movies & Series",
                "Updated Movies & Series",
                "SD / HD / FULL HD / 4K",
                "Netflix / Disney+ / HBO",
                "NBA, NFL, MLB, ESPN+",
            ],
            popular: false,
        },
        {
            id: 2,
            name: "3 Months",
            duration: 3,
            price: 24.99,
            originalPrice: 49.99,
            features: [
                "+ 20K Live TV Channels",
                "+ 120K Movies & Series",
                "Updated Movies & Series",
                "SD / HD / FULL HD / 4K",
                "Netflix / Disney+ / HBO",
                "NBA, NFL, MLB, ESPN+",
            ],
            popular: false,
        },
        {
            id: 3,
            name: "6 Months",
            duration: 6,
            price: 39.99,
            originalPrice: 79.99,
            features: [
                "+ 20K Live TV Channels",
                "+ 120K Movies & Series",
                "Updated Movies & Series",
                "SD / HD / FULL HD / 4K",
                "Netflix / Disney+ / HBO",
                "NBA, NFL, MLB, ESPN+",
            ],
            popular: false,
        },
        {
            id: 4,
            name: "12 Months",
            duration: 12,
            price: 49.99,
            originalPrice: 99.99,
            features: [
                "+ 20K Live TV Channels",
                "+ 120K Movies & Series",
                "Updated Movies & Series",
                "SD / HD / FULL HD / 4K",
                "Netflix / Disney+ / HBO",
                "NBA, NFL, MLB, ESPN+",
            ],
            popular: true,
        },
    ],

    // Pricing alias for components
    pricing: [
        { name: "1 Month", duration: 1, price: 8.99 },
        { name: "3 Months", duration: 3, price: 24.99 },
        { name: "6 Months", duration: 6, price: 39.99 },
        { name: "12 Months", duration: 12, price: 49.99 },
    ],

    // Navigation
    navigation: [
        { name: "Home", href: "/" },
        { name: "Pricing", href: "/pricing" },
        { name: "Setup Guide", href: "/setup-guide" },
        { name: "Channels List", href: "/channels" },
        { name: "Blog", href: "/blog" },
        { name: "Reseller", href: "/reseller" },
    ],

    // Channel logos
    channelLogos: [
        "/logos/abc.png",
        "/logos/cbs.png",
        "/logos/nbc.png",
        "/logos/fox.png",
        "/logos/espn.png",
        "/logos/hbo.png",
        "/logos/netflix.png",
        "/logos/disney.png",
    ],

    // Device compatibility
    devices: [
        { name: "Windows & Mac", icon: "💻" },
        { name: "iOS & Android", icon: "📱" },
        { name: "Roku", icon: "📺" },
        { name: "Fire TV", icon: "🔥" },
        { name: "Samsung TV", icon: "📺" },
        { name: "LG TV", icon: "📺" },
        { name: "Android TV", icon: "📺" },
    ],
};
