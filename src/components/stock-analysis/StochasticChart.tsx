"use client"

import dynamic from "next/dynamic"
import type { ApexOptions } from "apexcharts"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface StochasticChartProps {
  data: { k: number[]; d: number[] }
}

const StochasticChart: React.FC<StochasticChartProps> = ({ data }) => {
  const series = [
    { name: "%K", data: data.k },
    { name: "%D", data: data.d },
  ]

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 160,
    },
    title: {
      text: "Stochastic Oscillator",
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
          y: 20,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: { color: "#fff", background: "#00E396" },
            text: "Oversold",
          },
        },
        {
          y: 80,
          borderColor: "#FF4560",
          label: {
            borderColor: "#FF4560",
            style: { color: "#fff", background: "#FF4560" },
            text: "Overbought",
          },
        },
      ],
    },
  }

  return <Chart options={options} series={series} type="line" height={160} />
}

export default StochasticChart

