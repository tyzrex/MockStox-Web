"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, ArrowDownRight, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dynamic from "next/dynamic";
import { FormattedHistory } from "@/types/dashboard-api-types";
import { formatNepaliCurrency, showErrorToasts } from "@/lib/utils";
import DateSelector from "./date-picker";
import {
  buyStock,
  sellStock,
} from "@/services/api/transaction/transaction-actions";
import { toast } from "sonner";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const periods = [
  { value: "1D", label: "1D" },
  { value: "1W", label: "1W" },
  { value: "1M", label: "1M" },
  { value: "3M", label: "3M" },
  { value: "1Y", label: "1Y" },
];

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
  const [selectedChart, setSelectedChart] = useState("area");

  const formattedHistory = useMemo(() => {
    return history.map((item) => ({
      ...item,
      date: new Date(item.date).getTime(),
    }));
  }, [history]);

  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);

  const handleTrade = async (type: "buy" | "sell") => {
    let response;
    if (type === "buy") {
      response = await buyStock({
        stockSymbol: symbol,
        quantity: buyQuantity,
      });
    } else {
      response = await sellStock({
        stockSymbol: symbol,
        quantity: sellQuantity,
      });
    }
    if (response.success) {
      toast.success(response.message);
      setBuyQuantity(0);
      setSellQuantity(0);
    } else {
      showErrorToasts(response.errorData);
    }
  };

  const latestPrice = formattedHistory[formattedHistory.length - 1].close;
  const previousClose = formattedHistory[formattedHistory.length - 2].close;
  const priceChange = latestPrice - previousClose;
  const percentageChange = (priceChange / previousClose) * 100;

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: selectedChart as any,
      height: 400,
      background: "transparent",
      foreColor: "#ffffff",
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    grid: {
      borderColor: "#1a1a1a",
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
        formatter: function (value: number) {
          return formatNepaliCurrency(value);
        },
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: function (value: number) {
          return formatNepaliCurrency(value);
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#00ff00"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      name: "Price",
      data: formattedHistory.map((item) => [item.date, item.close]),
    },
  ];

  if (selectedChart === "candlestick") {
    if (chartOptions.chart) {
      chartOptions.chart.type = "candlestick";
    }
    chartOptions.plotOptions = {
      candlestick: {
        colors: {
          upward: "#00ff00",
          downward: "#ff0000",
        },
      },
    };
    series[0].data = formattedHistory.map((item) => [
      item.date,
      item.open,
      item.high,
      item.low,
      item.close,
    ]);
  }

  return (
    <div>
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
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
        <div className="grid grid-cols-3 gap-4">
          <Card className="">
            <CardContent className="p-4 border-l-4 border-blue-500 rounded-lg">
              <div className="text-gray-400 text-lg font-bold">Open</div>
              <div className="text-2xl font-semibold">
                {formatNepaliCurrency(
                  formattedHistory[formattedHistory.length - 1].open
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="p-4 border-l-4 border-green-500 rounded-lg">
              <div className="text-gray-400 text-lg font-bold">High</div>
              <div className="text-2xl font-semibold">
                {formatNepaliCurrency(
                  formattedHistory[formattedHistory.length - 1].high
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="p-4 border-l-4 border-red-500 rounded-lg">
              <div className="text-gray-400 text-lg font-bold">Low</div>
              <div className="text-2xl font-semibold">
                {formatNepaliCurrency(
                  formattedHistory[formattedHistory.length - 1].low
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3 space-y-6">
            <Card className="">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Stock Charts</h3>
                <div className="flex justify-between items-center mb-4">
                  <Tabs value={selectedChart} onValueChange={setSelectedChart}>
                    <TabsList className="bg-transparent">
                      <TabsTrigger
                        value="area"
                        className="data-[state=active]:bg-blue-500"
                      >
                        Area
                      </TabsTrigger>
                      <TabsTrigger
                        value="candlestick"
                        className="data-[state=active]:bg-blue-500"
                      >
                        Candlestick
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <Chart
                  options={chartOptions}
                  series={series}
                  type={
                    selectedChart === "candlestick" ? "candlestick" : "area"
                  }
                  height={400}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="">
              <CardContent className="p-4">
                <div className="text-gray-400 text-sm">Stocks Owned</div>
                <div className="text-lg font-semibold">{number_of_stocks}</div>
                {/* make a sell all button */}
                <Button
                  className="w-full mt-4 bg-blue-500 text-white py-2 rounded font-semibold hover:bg-red-600"
                  onClick={() => setSellQuantity(number_of_stocks)}
                >
                  Sell All
                </Button>
              </CardContent>
            </Card>
            <Card className="">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Trade</h3>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Buy</span>
                    {/* <span className="font-semibold">${latestPrice.toFixed(2)}</span> */}
                  </div>
                  <Input
                    type="number"
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(+e.target.value)}
                  />
                  <Button
                    onClick={() => handleTrade("buy")}
                    className="w-full mt-5 bg-green-500 hover:bg-green-700 text-white py-2 rounded font-semibold"
                  >
                    Buy
                  </Button>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between mb-2">
                    <span>Sell</span>
                    {/* <span className="font-semibold">${latestPrice.toFixed(2)}</span> */}
                  </div>
                  <Input
                    value={sellQuantity}
                    type="number"
                    onChange={(e) => setSellQuantity(+e.target.value)}
                  />
                  <Button
                    onClick={() => handleTrade("sell")}
                    className="w-full mt-5 bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600"
                  >
                    Sell
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
