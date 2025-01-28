import Header from "@/components/header";
import Features from "@/components/features";
import AIPredictor from "@/components/ai-predictor";
import VirtualTrading from "@/components/virtual-trading";
import MarketTrends from "@/components/market-trends";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import HeroSection from "@/components/landing/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <AIPredictor />
        <VirtualTrading />
      </main>
      <Footer />
    </div>
  );
}
