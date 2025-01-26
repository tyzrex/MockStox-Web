import { Separator } from "@/components/ui/separator";
import RegisterForm from "@/components/forms/register-form";
import Image from "next/image";
import Link from "next/link";

export default function FUISignUpWithLeftBackground() {
  return (
    <main className="w-full min-h-screen flex overflow-y-hidden">
      <div className="relative flex-1 bg-primary hidden items-center justify-center min-h-screen lg:flex">
        <div className="relative z-10 w-full max-w-lg">
          <div className=" mt-10 space-y-3">
            <h2 className="text-4xl font-semibold text-white mx-auto md:text-6xl">
              Register Now{" "}
              <span className="text-white font-bold">
                Trade with confidence
              </span>
            </h2>

            <Separator className="h-px bg-white/20 w-[100px] mr-auto" />
            <p className=" text-md text-white md:text-xl tracking-tight">
              Create an account and start trading with confidence with the help
              of our powerful tools.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 my-auto h-full">
          <div className="absolute  inset-0 opacity-15  w-full bg-transparent  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
      </div>
      <div className="flex-1 relative flex items-center justify-center min-h-full">
        <div className="w-full max-w-md md:max-w-lg  space-y-2 px-4   sm:px-0 z-20">
          <div className="relative">
            <div className="space-y-2">
              <h3 className=" text-3xl  font-semibold tracking-tighter sm:text-4xl">
                Sign up - Start Your Journey
              </h3>
              <p className="">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-brand-primary hover:text-brand-primary-dark"
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
