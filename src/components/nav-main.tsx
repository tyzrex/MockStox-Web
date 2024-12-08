"use client";

import { ChevronRight, TypeIcon as type, LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathName = usePathname();
  const { state } = useSidebar();
  const checkIsActive = (url: string) => pathName === url;
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items?.length ? (
              <Collapsible
                open={openItems.includes(item.title)}
                onOpenChange={() => toggleItem(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    size={state === "collapsed" ? "sm" : "lg"}
                    className={`
                      w-full justify-between
                      ${
                        checkIsActive(item.url)
                          ? "bg-purple-300 text-black"
                          : ""
                      }
                      text-base transition-all duration-200 ease-in-out
                      flex items-center px-4 py-3 rounded-md
                    `}
                    tooltip={item.title}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                        openItems.includes(item.title) ? "rotate-90" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={`
                            ml-5 py-5 text-lg
                            ${
                              checkIsActive(subItem.url)
                                ? "bg-purple-300 text-black font-medium"
                                : ""
                            }
                            text-sm transition-all duration-200 ease-in-out rounded-md
                          `}
                        >
                          <Link prefetch={false} href={subItem.url}>
                            <span className="truncate block">
                              {subItem.title}
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                size={state === "collapsed" ? "sm" : "lg"}
                className={`
                  w-full
                  ${checkIsActive(item.url) ? "bg-purple-300 text-black" : ""}
                  text-base transition-all duration-200 ease-in-out
                  flex items-center px-4 py-3 rounded-md
                `}
                asChild
                tooltip={item.title}
              >
                <Link prefetch={false} href={item.url}>
                  <item.icon className="w-5 h-5 flex-shrink-0 mr-3" />
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
