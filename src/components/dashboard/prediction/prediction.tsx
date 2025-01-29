"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  DollarSign,
  Gauge,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { StockPrediction } from "@/types/dashboard-api-types";
import { formatNepaliCurrency } from "@/lib/utils";
import { PredictionMetrics } from "./prediction-metrics";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const lineChartOptions: ApexOptions = {
  chart: {
    type: "area",
    height: 400,
    background: "transparent",
    foreColor: "#000",
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

  xaxis: {
    type: "datetime",
    labels: {
      style: {
        colors: "#000",
      },
    },
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

interface StockPredictionClientProps {
  data: StockPrediction;
  symbol: string;
}

export default function StockPredictionClient({
  data,
  symbol,
}: StockPredictionClientProps) {
  console.log(data);
  const chartData = [
    {
      name: "Price",
      data: Object.entries(data.predictions).map(([date, prediction]) => ({
        x: new Date(date).getTime(),
        y: prediction,
      })),
    },
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <PredictionMetrics
        buy_probability={data.buy_probability}
        hold_probability={data.hold_probability}
        sell_probability={data.sell_probability}
        potential_gain={data.potential_gain}
        potential_loss={data.potential_loss}
        risk_reward_ratio={data.risk_reward_ratio}
        volatility={data.volatility}
      />
      <Card>
        <CardHeader>
          <CardTitle>Price Prediction Chart</CardTitle>
          <CardDescription>30-day forecast for {symbol}</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart
            options={lineChartOptions}
            series={chartData}
            type="area"
            height={400}
          />
        </CardContent>
      </Card>
    </div>
  );
}
