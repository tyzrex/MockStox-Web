import SectionContainerWrapper from "../wrappers/section-container-wrapper";
import SectionWrapper from "../wrappers/section-wrapper";

export default function HowItWorks() {
  return (
    <SectionWrapper>
      <SectionContainerWrapper>
        <div className="mx-auto w-full  ">
          {/* Title */}
          <p className="text-center text-sm font-bold uppercase">
            3 easy steps
          </p>
          <h2 className="text-center text-3xl font-bold md:text-5xl">
            How it works
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-lg text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16">
            Lorem ipsum dolor sit amet consectetur adipiscing elit ut
            aliquam,purus sit amet luctus magna fringilla urna
          </p>
          {/* Content */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* List */}
            <div className="flex h-full flex-col [grid-area:2/1/3/2] lg:[grid-area:1/2/2/3]">
              {/* Item */}
              <a
                className="mb-8 flex max-w-lg justify-center gap-4 rounded-xl border border-solid border-gray-300 px-6 py-5 text-black"
                href="#w-tabs-0-data-w-pane-0"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-100">
                  <p className="text-sm font-bold sm:text-base">1</p>
                </div>
                <div className="ml-4 flex flex-col gap-2">
                  <h5 className="text-xl font-bold">
                    Sign up and Create Account
                  </h5>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                    aliquam, purus sit.
                  </p>
                </div>
              </a>
              {/* Item */}
              <a
                className="mb-8 flex max-w-lg justify-center gap-4 px-6 py-5 text-black"
                href="#w-tabs-0-data-w-pane-1"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-100">
                  <p className="text-sm font-bold sm:text-base">2</p>
                </div>
                <div className="ml-4 flex flex-col gap-2">
                  <h5 className="text-xl font-bold">
                    Explore features and dashboard
                  </h5>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                    aliquam, purus sit.
                  </p>
                </div>
              </a>
              {/* Item */}
              <a
                className="mb-8 flex max-w-lg justify-center gap-4 px-6 py-5 text-black"
                href="#w-tabs-0-data-w-pane-2"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-100">
                  <p className="text-sm font-bold sm:text-base">3</p>
                </div>
                <div className="ml-4 flex flex-col gap-2">
                  <h5 className="text-xl font-bold">
                    Start Using AI features and Paper Trading
                  </h5>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                    aliquam, purus sit.
                  </p>
                </div>
              </a>
            </div>
            {/* Image */}
            <img
              alt=""
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
              className="block h-full w-full overflow-hidden [grid-area:1/1/2/2] lg:[grid-area:1/1/2/2]"
            />
          </div>
        </div>
      </SectionContainerWrapper>
    </SectionWrapper>
  );
}
