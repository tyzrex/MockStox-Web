"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedHistory } from "@/types/dashboard-api-types";
import { PatternsTable } from "@/components/stock-analysis/patterns-table";
import RSIChart from "@/components/stock-analysis/rsi-chart";
import CandlestickChart from "@/components/stock-analysis/candle-stick-chart";

export default function StockAnalysis({
  stocksData,
  rsi,
  sma20,
  sma50,
  patterns,
}: {
  rsi: number[];
  sma20: number[];
  sma50: number[];
  patterns: { pattern: string; index: number; date: string }[];
  stocksData: FormattedHistory[];
}) {
  return (
    <div className="mx-auto w-full py-4">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Price Chart with SMA</CardTitle>
            <CardDescription>
              Candlestick chart with 20 and 50 day SMAs and Patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CandlestickChart
              stocksData={stocksData}
              sma20={sma20}
              sma50={sma50}
              patterns={patterns}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>RSI</CardTitle>
            <CardDescription>
              Relative Strength Index (14 periods)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RSIChart data={rsi} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Identified Patterns</CardTitle>
            <CardDescription>
              Candlestick patterns detected in the price data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PatternsTable patterns={patterns} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
