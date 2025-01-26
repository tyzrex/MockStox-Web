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

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const candlestickChartOptions: ApexOptions = {
  chart: {
    type: "candlestick",
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
      formatter: (value: number) => `Rs. ${value.toLocaleString()}`,
    },
  },
  tooltip: {
    theme: "dark",
    x: {
      format: "dd MMM yyyy",
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#00ff00",
        downward: "#ff0000",
      },
    },
  },
};

interface StockPredictionClientProps {
  data: any;
  symbol: string;
}

export default function StockPredictionClient({
  data,
  symbol,
}: StockPredictionClientProps) {
  const formatCandlestickData = (predictions: any) => {
    return Object.entries(predictions).map(([date, data]: [string, any]) => ({
      x: new Date(date).getTime(),
      y: [data.open, data.high, data.low, data.close],
    }));
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Price Prediction Chart</CardTitle>
          <CardDescription>30-day forecast for {symbol}</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart
            options={candlestickChartOptions}
            series={[{ data: formatCandlestickData(data.predictions) }]}
            type="candlestick"
            height={400}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Prediction Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="">Potential Gain</span>
              <span className="text-green-500 font-bold">
                Rs. {data.analysis.potential_gain.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">Potential Loss</span>
              <span className="text-red-500 font-bold">
                Rs. {data.analysis.potential_loss.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">Risk/Reward Ratio</span>
              <span className="font-bold">
                {data.analysis.risk_reward_ratio.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Technical Indicators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="">RSI</span>
              <span className="font-bold">
                {data.analysis.technical_indicators.rsi}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">MACD</span>
              <span className="font-bold">
                {data.analysis.technical_indicators.macd}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">50-day MA</span>
              <span className="font-bold">
                Rs.{" "}
                {data.analysis.technical_indicators.moving_average_50.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">200-day MA</span>
              <span className="font-bold">
                Rs.{" "}
                {data.analysis.technical_indicators.moving_average_200.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-lg">
                {data.analysis.recommendation.action}
              </Badge>
              <div className="flex items-center gap-2">
                <div className="text-sm">Confidence</div>
                <div
                  className={`h-3 w-3 rounded-full ${getConfidenceColor(
                    data.analysis.recommendation.confidence
                  )}`}
                />
                <div className="font-bold">
                  {data.analysis.recommendation.confidence}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium ">Supporting Factors</div>
              <div className="space-y-1">
                {data.analysis.recommendation.reasons.map(
                  (reason: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      {reason}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium ">Risk Factors</div>
              <div className="space-y-1">
                {data.analysis.recommendation.risks.map(
                  (risk: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      {risk}
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
