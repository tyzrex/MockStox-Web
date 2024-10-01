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

export default function Component({ mockData }: { mockData: any }) {
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
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const chartSeries = [
    {
      data: formattedHistory,
    },
  ];
  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 ">
        <div className="bg-white ">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{mockData.symbol}</h1>
              <p className="text-gray-500">Information Technologies</p>
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
            {["Day", "Week", "Month", "Year", "All time"].map((timeframe) => (
              <button
                key={timeframe}
                className={`px-3 py-1 rounded ${
                  activeTimeframe === timeframe
                    ? "bg-gray-200 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTimeframe(timeframe)}
              >
                {timeframe}
              </button>
            ))}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p>Number of stocks: {mockData.number_of_stocks}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Your History</h2>
              <p>Bought 10 Stocks on 2024-01-01</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-64 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Trade</h2>
          <div className="flex justify-between mb-2">
            <span>Buy for</span>
            {/* <span className="font-semibold">${latestPrice.toFixed(2)}</span> */}
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded font-semibold">
            Buy
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Sell for</h2>
          <div className="flex justify-between mb-2">
            <span>Sell for</span>
            {/* <span className="font-semibold">${latestPrice.toFixed(2)}</span> */}
          </div>
          <button className="w-full bg-gray-200 text-gray-800 py-2 rounded font-semibold">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}
