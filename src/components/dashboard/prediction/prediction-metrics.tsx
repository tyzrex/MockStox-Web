"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatNepaliCurrency } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Scale,
  LineChart,
  ArrowRight,
  Wallet,
  PauseCircle,
} from "lucide-react";

interface MetricsProps {
  potential_gain: number;
  potential_loss: number;
  risk_reward_ratio: number;
  volatility: number;
  buy_probability: number;
  sell_probability: number;
  hold_probability: number;
}

export function PredictionMetrics({
  potential_gain,
  potential_loss,
  // risk_reward_ratio,
  volatility,
  buy_probability,
  sell_probability,
  hold_probability,
}: MetricsProps) {
  const getPercentageColor = (value: number) => {
    if (value >= 70) return "text-green-500";
    if (value >= 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Potential Gain/Loss Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Potential Returns
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm">Potential Gain</span>
            </div>
            <span className="text-lg font-bold text-green-500">
              {formatNepaliCurrency(potential_gain)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <span className="text-sm">Potential Loss</span>
            </div>
            <span className="text-lg font-bold text-red-500">
              {formatNepaliCurrency(potential_loss)}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${
                  (potential_gain / (potential_gain + potential_loss || 1)) *
                  100
                }%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Risk Metrics Card */}
      <Card className=" ">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Risk Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LineChart className="h-5 w-5 text-purple-500" />
              <span className="text-sm">Volatility</span>
            </div>
            <span className="text-lg font-bold text-purple-500">
              {volatility.toFixed(2)}%
            </span>
          </div>
          <div className="pt-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${Math.min(volatility, 100)}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Probabilities Card */}
      <Card className=" ">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Trading Signals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ArrowRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Buy</span>
                </div>
                <span
                  className={`text-sm font-bold ${getPercentageColor(
                    buy_probability
                  )}`}
                >
                  {buy_probability.toFixed(1)}%
                </span>
              </div>
              <Progress value={buy_probability} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Hold</span>
                </div>
                <span
                  className={`text-sm font-bold ${getPercentageColor(
                    hold_probability
                  )}`}
                >
                  {hold_probability.toFixed(1)}%
                </span>
              </div>
              <Progress value={hold_probability} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PauseCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Sell</span>
                </div>
                <span
                  className={`text-sm font-bold ${getPercentageColor(
                    sell_probability
                  )}`}
                >
                  {sell_probability.toFixed(1)}%
                </span>
              </div>
              <Progress value={sell_probability} className="h-2" />
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-200/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${getPercentageColor(
                  buy_probability
                )}`}
              />
              <span className="text-sm font-medium">
                {buy_probability === 100
                  ? "Strong Buy Signal"
                  : buy_probability >= 70
                  ? "Buy Signal"
                  : hold_probability >= 70
                  ? "Hold Signal"
                  : "Sell Signal"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
