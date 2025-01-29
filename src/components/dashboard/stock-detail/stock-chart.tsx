"use client";
import { useMemo } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { FormattedHistory, PortfolioObject } from "@/types/dashboard-api-types";
import { formatNepaliCurrency } from "@/lib/utils";
import {
  candlestickChartOptions,
  candlestickSeries,
} from "./charts/candle-options";
import EnhancedTradingComponent from "./quick-trade";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StockDashboard({
  symbol,
  number_of_stocks,
  history,
  stockHolding,
}: {
  symbol: string;
  stockHolding: PortfolioObject[];
  number_of_stocks: number;
  history: FormattedHistory[];
}) {
  const router = useRouter();
  const formattedHistory = useMemo(() => {
    return history.map((item) => ({
      ...item,
      date: new Date(item.date).getTime(),
    }));
  }, [history]);

  const latestPrice = formattedHistory[formattedHistory.length - 1].close;
  const previousClose = formattedHistory[formattedHistory.length - 2].close;
  const priceChange = latestPrice - previousClose;
  const percentageChange = (priceChange / previousClose) * 100;

  return (
    <div>
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
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
            <ToggleGroup
              variant="outline"
              className="inline-flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse"
              type="single"
            >
              <ToggleGroupItem
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
                onClick={() => {
                  router.push(
                    `/dashboard/stock-detail/${symbol}?number_of_months=1`
                  );
                }}
                value="1"
              >
                1 month
              </ToggleGroupItem>
              <ToggleGroupItem
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
                onClick={() => {
                  router.push(
                    `/dashboard/stock-detail/${symbol}?number_of_months=3`
                  );
                }}
                value="3"
              >
                3 months
              </ToggleGroupItem>
              <ToggleGroupItem
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
                onClick={() => {
                  router.push(
                    `/dashboard/stock-detail/${symbol}?number_of_months=6`
                  );
                }}
                value="6"
              >
                6 months
              </ToggleGroupItem>
              <ToggleGroupItem
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
                onClick={() => {
                  router.push(
                    `/dashboard/stock-detail/${symbol}?number_of_months=12`
                  );
                }}
                value="12"
              >
                12 months
              </ToggleGroupItem>
            </ToggleGroup>
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
          <div className="col-span-4 space-y-6">
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
              stockHolding={stockHolding}
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
