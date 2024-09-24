"use client";
import Link from "next/link";
import { PanelTopClose } from "lucide-react";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "./dashboard-menu";

export function DashboardSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed top-0 no-scrollbar bg-mockstox-primary left-0 z-20 h-screen  overflow-x-hidden -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen === false ? "w-[72px]" : "w-72"
      )}
    >
      <div className="relative flex flex-col h-full py-4 overflow-y-auto shadow-md">
        <div className="flex items-start pl-2 py-2 w-full">
          <Button
            className={cn(
              "transition-transform p-0 ease-in-out duration-300 mb-1"
            )}
            variant="link"
            asChild
          >
            <div className="flex items-center mt-2 gap-2">
              <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />

              <h1
                className={cn(
                  "font-bold text-lg text-mockstox-secondary whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                  isOpen === false
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                )}
              >
                Welcome User
              </h1>
            </div>
          </Button>
        </div>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md border-none bg-transparent text-mockstox-icon"
      >
        <ChevronLeft
          size={24}
          className={cn(
            "transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
