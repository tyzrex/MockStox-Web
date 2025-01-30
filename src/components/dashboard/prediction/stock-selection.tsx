"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, TrendingUp } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import PageHeader from "@/components/shared/page-header";

export default function StockSelection({
  stocks,
}: {
  stocks: {
    symbol: string;
  }[];
}) {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol");
  const [open, setOpen] = React.useState(false);
  const [selectedStock, setSelectedStock] = React.useState<string>(
    symbol ? (symbol as string) : ""
  );
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePrediction = async () => {
    if (!selectedStock) {
      toast({
        title: "Error",
        description: "Please select a stock first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    router.push(`/dashboard/price-prediction?symbol=${selectedStock}`);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Price Prediction"
        description="Predict the future price of a stock using machine learning."
      />

      <div className="flex space-x-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[280px] justify-between"
            >
              {selectedStock
                ? stocks.find((stock) => stock.symbol === selectedStock)?.symbol
                : "Select stock..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0">
            <Command>
              <CommandInput placeholder="Search stock..." />
              <CommandList>
                <CommandEmpty>No stock found.</CommandEmpty>
                <CommandGroup>
                  {stocks.map((stock) => (
                    <CommandItem
                      key={stock.symbol}
                      value={stock.symbol}
                      onSelect={(currentValue) => {
                        setSelectedStock(
                          currentValue === selectedStock ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStock === stock.symbol
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {stock.symbol}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button onClick={handlePrediction} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            <>
              <TrendingUp className="mr-2 h-4 w-4" />
              Predict
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
