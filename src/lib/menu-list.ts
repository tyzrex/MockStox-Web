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
  ChartCandlestick,
  LucideIcon,
  Radio,
  HandCoins,
  Vault,
  View,
  LineChart,
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

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items: SubNavItem[];
}

interface SubNavItem {
  title: string;
  url: string;
}

export function getMenuList(pathname: string): { navMain: NavItem[] } {
  return {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: pathname === "/dashboard",
        items: [],
      },
      {
        title: "Share Market",
        url: "#",
        icon: Bookmark,
        isActive: pathname === "/dashboard/live-market",
        items: [
          {
            title: "Stocks List",
            url: "/dashboard/stocks-list",
          },
          {
            title: "Stocks by Sector",
            url: "/dashboard/stocks-by-category",
          },
        ],
      },

      {
        title: "My Trades",
        url: "/dashboard/trades",
        icon: Bookmark,
        isActive: pathname === "/dashboard/trades",
        items: [],
      },
      {
        title: "Trade Execution",
        url: "/dashboard/trade-execution",
        icon: ChartCandlestick,
        isActive: pathname === "/dashboard/trade-execution",
        items: [],
      },
      {
        title: "My Portfolio",
        url: "/dashboard/my-portfolio",
        icon: Vault,
        isActive: pathname === "/dashboard/my-portfolio",
        items: [],
      },
      {
        title: "Watch List",
        url: "/dashboard/watch-list",
        icon: View,
        isActive: pathname === "/dashboard/watch-list",
        items: [],
      },
      {
        title: "Price Prediction",
        url: "/dashboard/price-prediction",
        icon: HandCoins,
        isActive: pathname === "/dashboard/price-prediction",
        items: [],
      },
      {
        title: "Profile Management",
        url: "/dashboard/profile/settings",
        icon: Settings,
        isActive: pathname === "/dashboard/profile/settings",
        items: [],
      },
      {
        title: "Technical Analysis",
        url: "/dashboard/stock-analysis",
        icon: LineChart,
        isActive: pathname === "/dashboard/stock-analysis",
        items: [],
      },
    ],
  };
}
