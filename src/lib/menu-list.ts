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
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutDashboard,
          submenus: [],
        },
        {
          href: "/dashboard/live-market",
          label: "Share Market",
          active: pathname === "/dashboard/live-market",
          icon: Bookmark,
          submenus: [
            {
              href: "/dashboard/stocks-list",
              label: "Stocks List",
              active: pathname === "/dashboard/stocks-list",
            },
            {
              href: "/dashboard/stocks-by-category",
              label: "Stocks by Sector",
              active: pathname === "/dashboard/stocks-by-category",
            },
          ],
        },
        {
          href: "/dashboard/trades",
          label: "My Trades",
          active: pathname === "/dashboard/trades",
          icon: Bookmark,
          submenus: [],
        },
        // {
        //   href: "/dashboard/price-prediction",
        //   label: "Price Prediction",
        //   active: pathname === "/dashboard/price-prediction"),
        //   icon: Bookmark,
        //   submenus: [],
        // },
        // {
        //   href: "/dashboard/portfolio",
        //   label: "My Portfolio",
        //   active: pathname === "/dashboard/my-portfolio"),
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
          active: pathname === "/dashboard/profile/settings",
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
