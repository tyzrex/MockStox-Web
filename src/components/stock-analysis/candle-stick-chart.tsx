"use client";

import type React from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { formatNepaliCurrency } from "@/lib/utils";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CandlestickChartProps {
  data: any[];
  sma20: number[];
  sma50: number[];
  patterns: { pattern: string; index: number; date: string }[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  sma20,
  sma50,
  patterns,
}) => {
  const series = [
    {
      name: "candle",
      type: "candlestick",
      data: data.map((d) => ({
        x: new Date(d.date).getTime(),
        y: [d.open, d.high, d.low, d.close],
      })),
    },
    {
      name: "SMA20",
      type: "line",
      data: sma20.map((value, index) => ({
        x: new Date(data[index + 19].date).getTime(),
        y: value,
      })),
      color: "#4169E1",
    },
    {
      name: "SMA50",
      type: "line",
      data: sma50.map((value, index) => ({
        x: new Date(data[index + 49].date).getTime(),
        y: value,
      })),
      color: "#FF69B4",
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 800,
      animations: {
        enabled: false,
      },
    },
    title: {
      text: "Candlestick Chart with SMA and Patterns",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },

    yaxis: {
      labels: {
        style: {
          colors: "#000",
        },
        formatter: function (value: number) {
          return formatNepaliCurrency(value);
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight", // Changed to straight for more accurate representation
      width: [1, 2.5, 2.5],
    },
    grid: {
      borderColor: "#f1f1f1",
      xaxis: {
        lines: {
          show: true,
        },
      },
    },

    plotOptions: {
      candlestick: {
        colors: {
          upward: "#26A69A",
          downward: "#EF5350",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    tooltip: {
      shared: true,
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        const sma20 = w.globals.series[1][dataPointIndex];
        const sma50 = w.globals.series[2][dataPointIndex];
        const date = new Date(
          w.globals.seriesX[seriesIndex][dataPointIndex]
        ).toLocaleDateString();
        const pattern = patterns.find((p) => p.date === date)?.pattern;

        return `
          <div class="apexcharts-tooltip-box">
            <div>Date: ${date}</div>
            <div>Open: ${o}</div>
            <div>High: ${h}</div>
            <div>Low: ${l}</div>
            <div>Close: ${c}</div>
            ${sma20 ? `<div>SMA20: ${sma20}</div>` : ""}
            ${sma50 ? `<div>SMA50: ${sma50}</div>` : ""}
            ${pattern ? `<div>Pattern: ${pattern}</div>` : ""}
          </div>
        `;
      },
    },
    annotations: {
      xaxis: patterns.map((pattern) => ({
        x: new Date(pattern.date).getTime(),
        borderColor: "#775DD0",
        label: {
          style: {
            color: "#fff",
            background: "#775DD0",
          },
          text: pattern.pattern,
        },
      })),
    },
  };

  return (
    <div className="w-full h-full">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={500}
      />
    </div>
  );
};

export default CandlestickChart;
