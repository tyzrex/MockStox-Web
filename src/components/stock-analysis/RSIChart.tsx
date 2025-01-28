"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RSIChartProps {
  data: number[];
}

const RSIChart: React.FC<RSIChartProps> = ({ data }) => {
  const series = [{ name: "RSI", data }];

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 400,
    },
    title: {
      text: "RSI",
      align: "left",
    },
    xaxis: {
      type: "numeric",
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: { color: "#fff", background: "#00E396" },
            text: "Oversold",
          },
        },
        {
          y: 70,
          borderColor: "#FF4560",
          label: {
            borderColor: "#FF4560",
            style: { color: "#fff", background: "#FF4560" },
            text: "Overbought",
          },
        },
      ],
    },
  };

  return <Chart options={options} series={series} type="line" height={400} />;
};

export default RSIChart;
