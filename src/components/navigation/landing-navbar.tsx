"use client";
import Link from "next/link";
import { MobileMenu } from "./landing-mobile-menu";
import { useState } from "react";
import { Button } from "../ui/button";
import SectionContainerWrapper from "../wrappers/section-container-wrapper";

export default function Navbar() {
  return (
    <section>
      <nav className="lg:relative lg:top-0">
        <SectionContainerWrapper className="flex py-5 justify-between items-center">
          <Link href="/" prefetch={false}>
            <p className="text-primary text-3xl font-bold">MockStox</p>
          </Link>

          <div className="hidden md:block">
            <Button variant={"ghost"} asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </SectionContainerWrapper>
      </nav>
    </section>
  );
}
