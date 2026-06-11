import { Hero } from "@/components/sections/Hero";
import { ChannelLogos } from "@/components/sections/ChannelLogos";
import { ContentTabs } from "@/components/sections/ContentTabs";
import { SportsSection } from "@/components/sections/SportsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { DevicesSection } from "@/components/sections/DevicesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";
import { siteConfig } from "@/config/site";

// Product schema on the homepage only, where the plans are actually displayed
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
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Hero />
      <ChannelLogos />
      <FeaturesSection />
      <ContentTabs />
      <SportsSection />
      <PricingSection />
      <DevicesSection />
      <CTASection />
    </>
  );
}
