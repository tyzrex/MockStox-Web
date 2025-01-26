import { Separator } from "@/components/ui/separator";
import RegisterForm from "@/components/forms/register-form";
import Image from "next/image";
import Link from "next/link";

export default function FUISignUpWithLeftBackground() {
  return (
    <main className="w-full min-h-screen flex overflow-y-hidden">
      <div className="relative flex-1 hidden items-center justify-center min-h-screen bg-transparent lg:flex">
        <div className="relative z-10 w-full max-w-lg">
          <Image
            src="https://farmui.com/logo-dark.svg"
            width={100}
            height={100}
            className="rounded-full"
            alt="logo"
          />
          <div className=" mt-10 space-y-3">
            <h2 className="text-4xl tracking-tighter bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-transparent   mx-auto md:text-6xl">
              Register Now{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-200">
                Trade with confidence
              </span>
            </h2>

            <Separator className="h-px bg-white/20 w-[100px] mr-auto" />
            <p className=" text-md md:text-xl tracking-tight">
              Create an account and start trading with confidence with the help
              of our powerful tools.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-full"
          style={
            {
              // background: "linear- gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
            }
          }
        >
          <div className="absolute  inset-0 opacity-15  w-full bg-transparent  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          <img
            className="absolute inset-x-0 -top-20 opacity-25 "
            src={
              "https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
            }
            width={1000}
            height={1000}
            alt="back bg"
          />
        </div>
      </div>
      <div className="flex-1 relative flex items-center justify-center min-h-full">
        <img
          className="absolute inset-x-0 -z-1 -top-20 opacity-75 "
          src={
            "https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
          }
          width={1000}
          height={1000}
          alt="back bg"
        />
        <div className="w-full max-w-md md:max-w-lg space-y-8 px-4   sm:px-0 z-20">
          <div className="relative">
            <img
              src="https://farmui.com/logo.svg"
              width={100}
              className="lg:hidden rounded-full"
            />
            <div className="mt-5 space-y-2">
              <h3 className=" text-3xl  font-semibold tracking-tighter sm:text-4xl">
                Sign up - Start Your Journey
              </h3>
              <p className="">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <Separator className="h-px bg-white/20" />
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
