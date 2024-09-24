"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar/dashboard-sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AdminLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebar, setSidebar] = useState<{
    isOpen: boolean;
    setIsOpen?: () => void;
  }>({
    isOpen: true,
    setIsOpen: () => setSidebar((prev) => ({ ...prev, isOpen: !prev.isOpen })),
  });
  return (
    <>
      <DashboardSidebar isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen} />
      <main
        className={cn(
          "p-4 lg:p-12 mt-16 min-h-[calc(100vh_-_56px)] bg-white transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}
