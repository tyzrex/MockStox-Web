import {
  ChartNoAxesCombined,
  DatabaseZap,
  LayoutDashboard,
  NotebookIcon,
} from "lucide-react";
import SectionContainerWrapper from "../wrappers/section-container-wrapper";
import SectionWrapper from "../wrappers/section-wrapper";

export default function FeaturesSection() {
  return (
    <>
      <SectionWrapper>
        {/* Container */}
        <SectionContainerWrapper>
          {/* Component */}
          <div className="grid gap-16 md:grid-cols-2 md:gap-4 lg:grid-cols-[1fr_340px_1fr]">
            {/* Item */}
            <div className="flex flex-col items-start gap-16 [grid-area:1/1/2/3] md:gap-24 md:[grid-area:1/1/2/2] lg:[grid-area:1/1/2/2]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2.5 bg-primary text-white">
                    <NotebookIcon />
                  </div>
                  <p className="max-w-xs text-gray-500 md:max-w-[256px]">
                    Advanced Paper Trading
                  </p>
                </div>
                <h3 className="text-2xl font-bold md:text-3xl">
                  Use our advanced paper trading platform to simulate real-time
                  trading scenarios.
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2.5 bg-primary text-white">
                    <DatabaseZap />
                  </div>
                  <p className="max-w-xs text-gray-500 md:max-w-[256px]">
                    AI-Driven Predictions
                  </p>
                </div>
                <h3 className="text-2xl font-bold md:text-3xl">
                  Leverage AI-driven predictions to make informed trading
                  decisions.
                </h3>
              </div>
            </div>
            {/* Item */}
            <div
              className="w-86 mt-4 h-88 bg-contain bg-[50%_100%] bg-no-repeat [grid-area:3/1/4/3] sm:mt-12 sm:h-[560px] sm:w-full md:mt-0 lg:[grid-area:1/2/1/3]"
              style={{
                backgroundImage:
                  'url("https://assets.website-files.com/6458c625291a94a195e6cf3a/647b2f0c0e6afb25726156ec_Column.svg")',
              }}
            ></div>
            {/* Item */}
            <div className="flex flex-col items-start gap-16 [grid-area:2/1/3/3] md:gap-24 md:[grid-area:1/2/2/3] lg:[grid-area:1/3/4/4]">
              <div className="flex flex-col gap-4 md:items-end">
                <div className="flex items-center gap-4 md:flex-row-reverse">
                  <div className="rounded-full p-2.5 bg-primary text-white">
                    <ChartNoAxesCombined />
                  </div>
                  <p className="max-w-xs text-gray-500 md:max-w-[256px] md:text-right">
                    Visualize Your Data
                  </p>
                </div>
                <h3 className="text-2xl font-bold md:text-right md:text-3xl">
                  Visualize your trading data with powerful, interactive charts.
                </h3>
              </div>
              <div className="flex flex-col gap-4 md:items-end">
                <div className="flex items-center gap-4 md:flex-row-reverse">
                  <div className="rounded-full p-2.5 bg-primary text-white">
                    <LayoutDashboard />
                  </div>
                  <p className="max-w-xs text-gray-500 md:max-w-[256px] md:text-right">
                    User-Friendly Dashboard
                  </p>
                </div>
                <h3 className="text-2xl font-bold md:text-right md:text-3xl">
                  Access a user-friendly dashboard that makes trading a breeze.
                </h3>
              </div>
            </div>
          </div>
        </SectionContainerWrapper>
      </SectionWrapper>
    </>
  );
}
