import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";

export default async function HeroSection() {
  const session = await getSession();
  return (
    <div className="relative">
      <div className="absolute  top-0 z-[0] h-screen"></div>
      <section className="relative max-w-full mx-auto  z-1">
        <div className="max-w-screen-xl z-10 mx-auto px-4 py-10 gap-12  md:px-8">
          <div className="space-y-5 max-w-3xl leading-0  lg:leading-5 mx-auto text-center">
            <h1 className="text-sm  group font-geist mx-auto px-5 py-2 rounded-3xl w-fit">
              Trading is for everyone
              <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>

            <h2 className="text-4xl  tracking-tighter font-bold mx-auto md:text-6xl">
              MockStox{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-brand-primary-dark-2">
                Stock Prediction and Virtual trading platform
              </span>
            </h2>

            <p className="max-w-2xl mx-auto ">
              MockStox is a stock prediction and virtual trading platform that
              allows you to trade with virtual money and learn how to trade
              stocks without risking your own money.
            </p>
            <div className="items-center  justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <Button asChild>
                <Link href={session?.user ? "/dashboard" : "/login"}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-24 mx-10">
            <Image
              src="/mockstox.png"
              width={1800}
              height={1000}
              quality={100}
              className="w-full shadow-lg rounded-lg border"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
