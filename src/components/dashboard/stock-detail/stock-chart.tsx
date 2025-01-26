"use client";
import { useState, useMemo } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { FormattedHistory } from "@/types/dashboard-api-types";
import { formatNepaliCurrency } from "@/lib/utils";
import DateSelector from "./date-picker";
import { areaChartOptions } from "./charts/area-options";
import {
  candlestickChartOptions,
  candlestickSeries,
} from "./charts/candle-options";
import EnhancedTradingComponent from "./quick-trade";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StockDashboard({
  symbol,
  number_of_stocks,
  history,
}: {
  symbol: string;
  number_of_stocks: number;
  history: FormattedHistory[];
}) {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [startDate, setStartDate] = useState("2024-01");
  const [endDate, setEndDate] = useState("2024-08");
  const [quickTradeQuantity, setQuickTradeQuantity] = useState(0);
  const [selectedChart, setSelectedChart] = useState("candlestick");

  const formattedHistory = useMemo(() => {
    return history.map((item) => ({
      ...item,
      date: new Date(item.date).getTime(),
    }));
  }, [history]);

  console.log(formattedHistory);

  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);

  const latestPrice = formattedHistory[formattedHistory.length - 1].close;
  const previousClose = formattedHistory[formattedHistory.length - 2].close;
  const priceChange = latestPrice - previousClose;
  const percentageChange = (priceChange / previousClose) * 100;
  const series = [
    {
      name: "Price",
      data: formattedHistory.map((item) => [item.date, item.close]),
    },
  ];

  return (
    <div>
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col text-black dark: lg:flex-row lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{symbol}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-bold">
                {formatNepaliCurrency(latestPrice)}
              </span>
              <span
                className={`flex items-center ${
                  priceChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {priceChange >= 0 ? (
                  <ArrowUpRight className="h-6 w-6" />
                ) : (
                  <ArrowDownRight className="h-6 w-6" />
                )}
                {priceChange.toFixed(2)} ({percentageChange.toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DateSelector />
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 border-l-4 border-blue-500 rounded-lg">
              <div className=" text-lg font-bold">Open</div>
              <div className="text-2xl font-semibold">
                {formatNepaliCurrency(
                  formattedHistory[formattedHistory.length - 1].open
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 border-l-4 border-green-500 rounded-lg">
              <div className=" text-lg font-bold">High</div>
              <div className="text-2xl font-semibold">
                {formatNepaliCurrency(
                  formattedHistory[formattedHistory.length - 1].high
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 border-l-4 border-red-500 rounded-lg">
              <div className=" text-lg font-bold">Low</div>
              <div className="text-2xl font-semibold">
                {formatNepaliCurrency(
                  formattedHistory[formattedHistory.length - 1].low
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 border-l-4 border-yellow-500 rounded-lg">
              <div className=" text-lg font-bold">Close</div>
              <div className="text-2xl font-semibold">
                {formatNepaliCurrency(
                  formattedHistory[formattedHistory.length - 1].close
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid xl:grid-cols-4 gap-6">
          <div className="col-span-2 space-y-6">
            <Card className="">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Line Charts</h3>

                <Chart
                  options={areaChartOptions}
                  series={series}
                  type="area"
                  height={400}
                />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-2 space-y-6">
            <Card className="">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">CandleStick Chart</h3>

                <Chart
                  options={candlestickChartOptions}
                  series={candlestickSeries(history)}
                  type="candlestick"
                  height={400}
                />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-4">
            <EnhancedTradingComponent
              symbol={symbol}
              number_of_stocks={number_of_stocks}
              latestPrice={formattedHistory[formattedHistory.length - 1].close}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
