"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function PriceRangeChart({
  data,
}: {
  data: {
    [date: string]: {
      high: string;
      low: string;
    };
  };
}) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "rangeArea",
      height: 350,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Stock Price Range",
    },
    xaxis: {
      type: "datetime",
    },
  };

  const series = [
    {
      name: "Price Range",
      data: Object.entries(data).map(([date, values]) => ({
        x: new Date(date).getTime(),
        y: [parseFloat(values.low), parseFloat(values.high)],
      })),
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Price Range (High-Low)</h2>
      <Chart options={options} series={series} type="rangeArea" height={350} />
    </div>
  );
}
