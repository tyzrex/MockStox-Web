"use client";

import classNames from "classnames";
import { ShoppingCart } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const iconsClasses = (): string => {
  return classNames("h-6 w-6");
};
const itemDivClasses = (): string => {
  return classNames(
    "bg-white",
    "rounded-full",
    "border",
    "border-accent-2",
    "p-2",
    "color-transition",
    "hover:bg-accent-3 hover:text-white",
    "cursor-pointer",
    "text-accent-2"
  );
};

const AuthenticatedContent = ({ sessionData }: { sessionData: any }) => {
  return (
    <>
      <div className="flex-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border-gray-800">
              <span className="text-white font-medium text-lg leading-none">
                {sessionData?.user?.name?.charAt(0)}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{sessionData?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/user/dashboard"} prefetch={false}>
              <DropdownMenuItem className="cursor-pointer">
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link href={"/user/orders"} prefetch={false}>
              <DropdownMenuItem className="cursor-pointer">
                My Portfolio
              </DropdownMenuItem>
            </Link>
            <Link href={"/user/profile"} prefetch={false}>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
            </Link>
            <Link href={"/user/cart"} prefetch={false}>
              <DropdownMenuItem className="cursor-pointer">
                Price Prediction
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>{/* <LogOut /> */}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href={`/user/cart`}
          prefetch={false}
          className="relative"
          aria-label="cart-button"
        >
          <div className={itemDivClasses()}>
            <ShoppingCart className={iconsClasses()} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default function NavDropdown() {
  const session = useSession();

  return (
    <>
      {session.status === "authenticated" ? (
        <AuthenticatedContent sessionData={session.data} />
      ) : session.status === "loading" ? (
        <div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
