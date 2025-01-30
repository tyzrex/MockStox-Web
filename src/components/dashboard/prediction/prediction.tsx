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
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  BarChart2,
} from "lucide-react";
import type { StockPrediction } from "@/types/dashboard-api-types";
import { formatNepaliCurrency } from "@/lib/utils";
import { PredictionMetrics } from "./prediction-metrics";

interface StockPredictionClientProps {
  data: StockPrediction;
  symbol: string;
}

export default function StockPredictionClient({
  data,
  symbol,
}: StockPredictionClientProps) {
  const predictionDates = Object.keys(data.predictions).sort();
  const tomorrow = predictionDates[0];
  const sevenDays = predictionDates[6];
  const fifteenDays = predictionDates[14];

  const getPriceChange = (currentPrice: number, futurePrice: number) => {
    const change = ((futurePrice - currentPrice) / currentPrice) * 100;
    return change.toFixed(2);
  };

  const renderPredictionCard = (date: string, days: string) => {
    const price = data.predictions[date];
    const priceChange = getPriceChange(data.predictions[tomorrow], price);

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {days === "Tomorrow" ? "Tomorrow" : `After ${days} days`}
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNepaliCurrency(price)}
          </div>
          <p className="text-xs text-muted-foreground">{date}</p>
          <div className="mt-2">
            <Badge
              variant={
                Number.parseFloat(priceChange) >= 0 ? "default" : "destructive"
              }
            >
              {Number.parseFloat(priceChange) >= 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}

              {days === "Tomorrow" ? null : `${priceChange}%`}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renderPredictionCard(tomorrow, "Tomorrow")}
        {renderPredictionCard(sevenDays, "7")}
        {renderPredictionCard(fifteenDays, "15")}
      </div>
    </div>
  );
}
