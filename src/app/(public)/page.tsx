import FAQSection from "@/components/sections/faq-section";
import FeaturesSection from "@/components/sections/features-section";
import HeroSection from "@/components/sections/hero-section";
import HowItWorks from "@/components/sections/how-to-use-section";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <FAQSection />
    </main>
  );
}
