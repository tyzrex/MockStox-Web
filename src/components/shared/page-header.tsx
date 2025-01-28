import React from "react";

import { Separator } from "@/components/ui/separator";

export default function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-5 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[24px] font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {children}
      </div>

      <Separator className="mt-5" />
    </div>
  );
}
