"use client";

import { useState } from "react";
import {
  CandlestickChart,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import PriceRangeChart from "./charts/volume-chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  buyStock,
  sellStock,
} from "@/services/api/transaction/transaction-actions";
import { toast } from "sonner";
import { showErrorToasts } from "@/lib/utils";
import DateSelector from "./date-picker";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Helper function to format the history data for chart use
const formatHistoryData = (history: any) => {
  return Object.keys(history).map((date) => {
    const { open, high, low, close } = history[date];
    return {
      x: new Date(date).getTime(),
      y: [
        parseFloat(open),
        parseFloat(high),
        parseFloat(low),
        parseFloat(close),
      ],
    };
  });
};

export default function Component({
  mockData,
  slug,
}: {
  mockData: any;
  slug: string;
}) {
  console.log(mockData);
  const [activeTimeframe, setActiveTimeframe] = useState("Month");

  const formattedHistory = formatHistoryData(mockData.history);
  console.log(formattedHistory);
  //   const latestPrice = parseFloat(
  //     formattedHistory[formattedHistory.length - 1].y[3]
  //   );
  //   const previousClose = parseFloat(
  //     formattedHistory[formattedHistory.length - 2].y[3]
  //   );
  //   const priceChange = latestPrice - previousClose;
  //   const percentageChange = (priceChange / previousClose) * 100;

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
      style: {
        color: "#FFFFFF", // Set title color to white
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#FFFFFF", // Set x-axis label color to white
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF", // Set y-axis label color to white
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const chartSeries = [
    {
      data: formattedHistory,
    },
  ];

  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);

  const handleTrade = async (type: "buy" | "sell") => {
    let response;
    if (type === "buy") {
      response = await buyStock({
        stockSymbol: slug,
        quantity: buyQuantity,
      });
    } else {
      response = await sellStock({
        stockSymbol: slug,
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

  return (
    <div className="grid grid-cols-3 gap-20">
      <div className="col-span-2">
        <div className=" ">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{mockData.symbol}</h1>
            </div>
            <button className="text-gray-400">
              <Heart />
            </button>
          </div>

          {/* Price and change */}
          {/* <div className="mb-6">
            <div className="text-4xl font-bold">${latestPrice.toFixed(2)}</div>
            <div
              className={`flex items-center ${
                priceChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {priceChange >= 0 ? (
                <ArrowUpRight size={20} />
              ) : (
                <ArrowDownRight size={20} />
              )}
              <span className="ml-1">
                {Math.abs(priceChange).toFixed(2)} (
                {percentageChange.toFixed(2)}%)
              </span>
            </div>
          </div> */}

          {/* Timeframe selector */}
          <div className="flex space-x-4 mb-6">
            <DateSelector />
          </div>

          {/* Chart */}
          <div className="h-96 mb-6">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="candlestick"
              height="100%"
            />
          </div>

          <div className="h-96 mb-6">
            <PriceRangeChart data={mockData.history} />
          </div>

          {/* Stock info */}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="col-span-1 border border-gray-600 rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Trade</h2>

          <div className="my-5">
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p>My Stocks: {mockData.number_of_stocks}</p>
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-black">Buy</span>
            {/* <span className="font-semibold">${latestPrice.toFixed(2)}</span> */}
          </div>
          <Input
            type="number"
            value={buyQuantity}
            onChange={(e) => setBuyQuantity(+e.target.value)}
          />
          <Button
            onClick={() => handleTrade("buy")}
            className="w-full mt-5 text-white py-2 rounded font-semibold"
          >
            Buy
          </Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Sell for</h2>
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
            className="w-full mt-5 bg-gray-200 hover:text-white text-gray-800 py-2 rounded font-semibold"
          >
            Sell
          </Button>
        </div>
      </div>
    </div>
  );
}
