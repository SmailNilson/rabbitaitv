import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollToHash from "@/components/ScrollToHash";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Best 4K IPTV Service | 20K+ Channels | Premium Streaming`,
    template: `%s | ${siteConfig.name}`,
  },
  description: "RabbitAI TV - #1 Premium IPTV Service in 2025. Stream 20,000+ Live TV Channels, 120,000+ Movies & Series in 4K/HD. NFL, NBA, Premier League, Netflix, Disney+. 24/7 Support. From $8.99/month.",
  keywords: [
    "IPTV",
    "IPTV service",
    "IPTV subscription",
    "best IPTV 2025",
    "premium IPTV",
    "4K IPTV",
    "IPTV USA",
    "IPTV UK",
    "IPTV Canada",
    "live TV streaming",
    "movies streaming",
    "series streaming",
    "sports streaming",
    "NFL streaming",
    "NBA streaming",
    "Premier League streaming",
    "Netflix IPTV",
    "Disney+ IPTV",
    "HBO IPTV",
    "cheap IPTV",
    "affordable IPTV",
    "IPTV for Firestick",
    "IPTV for Smart TV",
    "IPTV for Android",
    "IPTV for iOS",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - Best 4K IPTV Service | 20K+ Channels`,
    description: "Premium IPTV with 20,000+ Live Channels & 120,000+ Movies in 4K. NFL, NBA, Netflix, Disney+. Try Now!",
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "RabbitAI TV - Premium IPTV Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Best 4K IPTV Service`,
    description: "Premium IPTV with 20,000+ Live Channels & 120,000+ Movies in 4K. NFL, NBA, Netflix, Disney+.",
    images: [`${siteConfig.url}/og-image.jpg`],
    creator: "@rabbitaitv",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: siteConfig.seo.googleVerification,
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: "Premium IPTV Service with 20,000+ Live TV Channels and 120,000+ Movies & Series",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.whatsapp,
    contactType: "customer service",
    availableLanguage: ["English", "French", "Spanish", "Arabic"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "15202 Marlebone Ct",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77069",
    addressCountry: "US",
  },
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.twitter,
    siteConfig.social.instagram,
  ],
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "RabbitAI TV IPTV Subscription",
  description: "Premium IPTV subscription with 20,000+ live channels and 120,000+ movies & series in 4K quality",
  brand: {
    "@type": "Brand",
    name: siteConfig.name,
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "8.99",
    highPrice: "49.99",
    offerCount: "4",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.seo.googleAnalytics}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.seo.googleAnalytics}');
          `}
        </Script>

        {/* Google Ads */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.seo.googleAds}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.seo.googleAds}');
          `}
        </Script>

        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3235102292758932" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3235102292758932"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F20732" />
      </head>
      <body style={{ backgroundColor: '#0D0D0D', color: 'white', margin: 0 }}>
        <ScrollToHash />
        <Navbar />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
