import {
  Tag,
  Users,
  Settings,
  Bookmark,
  PenSquare,
  LayoutGrid,
  FileArchive,
  BoxIcon,
  ImagePlus,
  CopyIcon,
  PenIcon,
  PenLineIcon,
  ListOrderedIcon,
  BanknoteIcon,
  Building2,
  PercentCircle,
  Gift,
  LayoutDashboard,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      menus: [
        // {
        //   href: "/dashboard",
        //   label: "Dashboard",
        //   active: pathname.includes("/dashboard/home"),
        //   icon: LayoutDashboard,
        //   submenus: [],
        // },
        {
          href: "/dashboard/live-market",
          label: "Share Market",
          active: pathname.includes("/dashboard/live-market"),
          icon: Bookmark,
          submenus: [
            {
              href: "/dashboard/stocks-list",
              label: "Stocks List",
              active: pathname.includes("/dashboard/stocks-list"),
            },
            {
              href: "/dashboard/stocks-by-category",
              label: "Stocks by Sector",
              active: pathname.includes("/dashboard/stocks-by-category"),
            },
          ],
        },
        {
          href: "/dashboard/trades",
          label: "My Trades",
          active: pathname.includes("/dashboard/trades"),
          icon: Bookmark,
          submenus: [],
        },
        // {
        //   href: "/dashboard/price-prediction",
        //   label: "Price Prediction",
        //   active: pathname.includes("/dashboard/price-prediction"),
        //   icon: Bookmark,
        //   submenus: [],
        // },
        // {
        //   href: "/dashboard/portfolio",
        //   label: "My Portfolio",
        //   active: pathname.includes("/dashboard/my-portfolio"),
        //   icon: Bookmark,
        //   submenus: [],
        // },
      ],
    },

    {
      menus: [
        {
          href: "/dashboard/profile/settings",
          label: "Profile Management",
          active: pathname.includes("/dashboard/profile/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
