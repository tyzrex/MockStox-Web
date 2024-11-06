"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StockListItem } from "@/types/dashboard-api-types";
import Link from "next/link";

export const stockListColumns: ColumnDef<StockListItem>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("symbol")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "ltp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-black hover:text-mockstox-primary/50"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LTP
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("ltp")}</div>,
  },
  {
    accessorKey: "point_change",
    header: "Point Change",
    cell: ({ row }) => (
      <div
        className={
          (row.getValue("point_change") as string).startsWith("-")
            ? "text-red-500"
            : "text-green-500"
        }
      >
        {row.getValue("point_change")}
      </div>
    ),
  },
  {
    accessorKey: "percentage_change",
    header: "Percentage Change",
    cell: ({ row }) => (
      <div
        className={
          (row.getValue("percentage_change") as string).startsWith("-")
            ? "text-red-500"
            : "text-green-500"
        }
      >
        {row.getValue("percentage_change")}%
      </div>
    ),
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => (
      <div>{(row.getValue("volume") as number).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "sector",
    header: "Sector",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const stock = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 text-white w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(stock.symbol)}
            >
              Copy stock symbol
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/stock-detail/${stock.symbol}`}>
                View details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Add to watchlist</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
