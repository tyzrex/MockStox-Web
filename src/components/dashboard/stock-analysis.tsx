"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedHistory } from "@/types/dashboard-api-types";
import { PatternsTable } from "@/components/stock-analysis/PatternsTable";
import RSIChart from "@/components/stock-analysis/RSIChart";
import CandlestickChart from "@/components/stock-analysis/CandlestickChart";
import {
  calculateSMA,
  calculateRSI,
  identifyPatterns,
} from "../../../utils/indicators";

export default function StockAnalysis({
  stocksData,
}: {
  stocksData: FormattedHistory[];
}) {
  const [stockData, setStockData] = useState<FormattedHistory[]>(stocksData);
  const [sma20, setSma20] = useState<number[]>([]);
  const [sma50, setSma50] = useState<number[]>([]);
  const [rsi, setRsi] = useState<number[]>([]);
  const [patterns, setPatterns] = useState<
    { pattern: string; index: number; date: string }[]
  >([]);

  useEffect(() => {
    // Use mock data instead of fetching
    // Calculate indicators
    const closes = stocksData.map((d) => d.close);
    const highs = stocksData.map((d) => d.high);
    const lows = stocksData.map((d) => d.low);

    setSma20(calculateSMA(closes, 20));
    setSma50(calculateSMA(closes, 50));
    setRsi(calculateRSI(closes));

    console.log(calculateSMA(closes, 20));

    const identifiedPatterns = identifyPatterns(stocksData);
    setPatterns(
      identifiedPatterns.map((p) => ({
        ...p,
        date: stocksData[p.index].date,
      }))
    );
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Stock Technical Analysis</h1>
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
              data={stockData}
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
