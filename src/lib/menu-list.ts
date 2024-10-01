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
          active: pathname.includes("/dashboard"),
          icon: LayoutDashboard,
          submenus: [],
        },
        {
          href: "/dashboard/live-market",
          label: "Share Market",
          active: pathname.includes("/dashboard/live-market"),
          icon: Bookmark,
          submenus: [
            {
              href: "/dashboard/live-market/stock",
              label: "Market Live",
              active: pathname.includes("/dashboard/live-market/stock"),
            },
            {
              href: "/dashboard/stocks-list",
              label: "Stock Details",
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
          href: "/dashboard/paper-trading",
          label: "Paper Trading",
          active: pathname.includes("/dashboard/paper-trading"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/dashboard/price-prediction",
          label: "Price Prediction",
          active: pathname.includes("/dashboard/price-prediction"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/dashboard/portfolio",
          label: "My Portfolio",
          active: pathname.includes("/dashboard/my-portfolio"),
          icon: Bookmark,
          submenus: [],
        },
      ],
    },

    {
      menus: [
        {
          href: "/admin/users/roles",
          label: "Profile Management",
          active: pathname.includes("/admin/users/roles"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
