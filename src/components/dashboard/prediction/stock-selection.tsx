"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function StockSeletion({
  stocks,
}: {
  stocks: {
    symbol: string;
  }[];
}) {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol");
  const [selectedStock, setSelectedStock] = useState<string>(
    symbol ? (symbol as string) : ""
  );
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);
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
      <h1 className="text-3xl font-bold mb-8">Select Stock</h1>

      <div className="flex space-x-4">
        <Select value={selectedStock} onValueChange={setSelectedStock}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a stock" />
          </SelectTrigger>
          <SelectContent>
            {stocks.map((stock) => (
              <SelectItem key={stock.symbol} value={stock.symbol}>
                {stock.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
