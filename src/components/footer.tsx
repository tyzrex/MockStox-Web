import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-muted-foreground">
            &copy; 2023 MockStox, Inc. All rights reserved.
          </p>
        </div>
      </div>
      <div className=" w-full flex mt-4 items-center justify-center   ">
        <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-brand-primary-dark-2 select-none">
          MOCKSTOX
        </h1>
      </div>
    </footer>
  );
}
