"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StockListItem } from "@/types/dashboard-api-types";
import { useRouter } from "next/navigation";

export function StockCombobox({ stocksList }: { stocksList: StockListItem[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="sm:w-[500px] justify-between"
        >
          {value
            ? stocksList.find((stock) => stock.symbol === value)?.symbol
            : "Select stock..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Search stock..." className="h-9" />
          <CommandList>
            <CommandEmpty>No stock found.</CommandEmpty>
            <CommandGroup>
              {stocksList.map((stock) => (
                <CommandItem
                  key={stock.symbol}
                  value={stock.symbol}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    router.push(
                      `/dashboard/stock-analysis?stock=${currentValue}`
                    );
                  }}
                >
                  {stock.symbol}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === stock.symbol ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
