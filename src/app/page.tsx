import { Hero } from "@/components/sections/Hero";
import { ChannelLogos } from "@/components/sections/ChannelLogos";
import { ContentTabs } from "@/components/sections/ContentTabs";
import { SportsSection } from "@/components/sections/SportsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { DevicesSection } from "@/components/sections/DevicesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
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
