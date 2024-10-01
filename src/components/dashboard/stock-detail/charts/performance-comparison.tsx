"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function PerformanceComparisonChart({
  stockData,
  indexData,
}: {
  stockData: {
    [date: string]: {
      close: string;
    };
  };
  indexData: {
    [date: string]: string;
  };
}) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    title: {
      text: "Stock vs Market Performance",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Stock Price",
        },
      },
      {
        opposite: true,
        title: {
          text: "Index Value",
        },
      },
    ],
  };

  const series = [
    {
      name: "Stock Price",
      data: Object.entries(stockData).map(([date, values]) => ({
        x: new Date(date).getTime(),
        y: parseFloat(values.close),
      })),
    },
    {
      name: "Market Index",
      data: Object.entries(indexData).map(([date, value]) => ({
        x: new Date(date).getTime(),
        y: parseFloat(value),
      })),
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Performance Comparison</h2>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}
