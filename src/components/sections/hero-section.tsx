import BlurryBlob from "../molecules/blurry-blob";
import { Button } from "../ui/button";
import SectionContainerWrapper from "../wrappers/section-container-wrapper";
import SectionWrapper from "../wrappers/section-wrapper";

export default function HeroSection() {
  return (
    <SectionWrapper className="relative overflow-hidden  flex items-center">
      <SectionContainerWrapper className="py-20">
        <BlurryBlob
          className="rounded-xl opacity-35"
          firstBlobColor="bg-yellow-300"
          secondBlobColor="bg-blue-400"
        />
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none max-w-6xl mx-auto">
              Welcome to MockStox - Your Gateway to Smart, Risk-Free Trading
            </h1>
            <p className="mx-auto max-w-5xl  text-gray-500 md:text-xl dark:text-gray-400">
              MockStox is an AI-powered mock trading platform that lets you
              explore the stock market with virtual currency, providing a
              risk-free environment to hone your trading skills. Whether you’re
              a beginner or a seasoned trader, MockStox combines real-time paper
              trading with powerful AI predictions and dynamic data
              visualization to elevate your trading experience.
            </p>
          </div>
          <div className="space-x-4">
            <Button>Sign Up Now</Button>
            <Button variant="outline">Open Dashboard</Button>
          </div>
        </div>
      </SectionContainerWrapper>
    </SectionWrapper>
  );
}
