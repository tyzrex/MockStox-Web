"use client";

import { useState } from "react";
import {
  CandlestickChart,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Mock data based on the provided format
const mockData = {
  symbol: "Nabil",
  number_of_stocks: 10,
  history: [
    {
      date: "2024-01-01",
      open: 220,
      close: 200,
      high: 250,
      low: 150,
    },
    {
      date: "2024-01-02",
      open: 200,
      close: 180,
      high: 220,
      low: 160,
    },
    {
      date: "2024-01-03",
      open: 180,
      close: 190,
      high: 200,
      low: 170,
    },
    {
      date: "2024-01-04",
      open: 190,
      close: 210,
      high: 230,
      low: 180,
    },
    {
      date: "2024-01-05",
      open: 210,
      close: 220,
      high: 240,
      low: 200,
    },
    {
      date: "2024-01-06",
      open: 220,
      close: 230,
      high: 250,
      low: 210,
    },
    {
      date: "2024-01-07",
      open: 230,
      close: 240,
      high: 260,
      low: 220,
    },
    {
      date: "2024-01-08",
      open: 240,
      close: 250,
      high: 270,
      low: 230,
    },
    {
      date: "2024-01-09",
      open: 250,
      close: 260,
      high: 280,
      low: 240,
    },
    {
      date: "2024-01-10",
      open: 260,
      close: 270,
      high: 290,
      low: 250,
    },
    {
      date: "2024-01-11",
      open: 270,
      close: 280,
      high: 300,
      low: 260,
    },
    {
      date: "2024-01-12",
      open: 280,
      close: 290,
      high: 310,
      low: 270,
    },
    {
      date: "2024-01-13",
      open: 290,
      close: 300,
      high: 320,
      low: 280,
    },
    {
      date: "2024-01-14",
      open: 300,
      close: 310,
      high: 330,
      low: 290,
    },
    {
      date: "2024-01-15",
      open: 310,
      close: 320,
      high: 340,
      low: 300,
    },
    {
      date: "2024-01-16",
      open: 320,
      close: 330,
      high: 350,
      low: 310,
    },
    {
      date: "2024-01-17",
      open: 330,
      close: 340,
      high: 360,
      low: 320,
    },
    {
      date: "2024-01-18",
      open: 340,
      close: 320,
      high: 370,
      low: 330,
    },
    {
      date: "2024-01-19",
      open: 350,
      close: 360,
      high: 380,
      low: 340,
    },
    {
      date: "2024-01-20",
      open: 360,
      close: 370,
      high: 390,
      low: 350,
    },
    {
      date: "2024-01-21",
      open: 370,
      close: 380,
      high: 400,
      low: 360,
    },
    {
      date: "2024-01-22",
      open: 380,
      close: 390,
      high: 410,
      low: 370,
    },
    {
      date: "2024-01-23",
      open: 390,
      close: 400,
      high: 420,
      low: 380,
    },
    {
      date: "2024-01-24",
      open: 400,
      close: 410,
      high: 430,
      low: 390,
    },
    {
      date: "2024-01-25",
      open: 410,
      close: 420,
      high: 440,
      low: 400,
    },
    {
      date: "2024-01-26",
      open: 420,
      close: 430,
      high: 450,
      low: 410,
    },
    {
      date: "2024-01-27",
      open: 430,
      close: 440,
      high: 460,
      low: 420,
    },
    {
      date: "2024-01-28",
      open: 440,
      close: 450,
      high: 470,
      low: 430,
    },
    {
      date: "2024-01-29",
      open: 450,
      close: 460,
      high: 480,
      low: 440,
    },
    {
      date: "2024-01-30",
      open: 460,
      close: 470,
      high: 490,
      low: 450,
    },
  ],
};

export default function Component() {
  const [activeTimeframe, setActiveTimeframe] = useState("Month");
  const latestPrice = mockData.history[mockData.history.length - 1].close;
  const previousClose = mockData.history[mockData.history.length - 2].close;
  const priceChange = latestPrice - previousClose;
  const percentageChange = (priceChange / previousClose) * 100;

  const chartOptions = {
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
      data: mockData.history.map((item) => ({
        x: new Date(item.date).getTime(),
        y: [item.open, item.high, item.low, item.close],
      })),
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
          <div className="mb-6">
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
          </div>

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
            <span className="font-semibold">${latestPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded font-semibold">
            Buy
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Sell for</h2>
          <div className="flex justify-between mb-2">
            <span>Sell for</span>
            <span className="font-semibold">${latestPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-gray-200 text-gray-800 py-2 rounded font-semibold">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}
