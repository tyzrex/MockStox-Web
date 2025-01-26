import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import StockPredictionClient from "@/components/dashboard/prediction/prediction";
import { StockMetricsCards } from "@/components/dashboard/prediction/stock-metrics-cards";

interface StockPageProps {
  searchParams: { symbol?: string };
}

async function fetchStockData(symbol: string) {
  // Simulate API call with 2s delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    metrics: {
      open: 1058.0,
      high: 1132.0,
      low: 1057.0,
      close: 1115.0,
    },
    predictions: {
      "2025-01-26": { open: 313.53, high: 316.8, low: 312.1, close: 315.2 },
      "2025-01-27": { open: 315.2, high: 318.5, low: 314.8, close: 317.9 },
      "2025-01-28": { open: 317.9, high: 321.2, low: 316.5, close: 320.55 },
      "2025-01-29": { open: 320.55, high: 325.1, low: 319.8, close: 324.35 },
      "2025-01-30": { open: 324.35, high: 328.5, low: 323.2, close: 327.85 },
    },
    analysis: {
      potential_gain: 96.82,
      potential_loss: 0,
      risk_reward_ratio: -0.20068167733939238,
      volatility: 23.714429458782163,
      technical_indicators: {
        rsi: 65.5,
        macd: 12.3,
        moving_average_50: 1050.25,
        moving_average_200: 980.5,
      },
      recommendation: {
        action: "BUY",
        confidence: 85,
        reasons: [
          "Strong upward momentum",
          "Above 50-day moving average",
          "Positive MACD crossover",
        ],
        risks: [
          "High RSI indicates potential overbought condition",
          "Market volatility above average",
        ],
      },
    },
  };
}

export default async function StockPage({ searchParams }: StockPageProps) {
  const symbol = searchParams.symbol;

  if (!symbol) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Please select a stock symbol
        </h1>
      </div>
    );
  }

  const data = await fetchStockData(symbol);

  return (
    <div className="space-y-8 min-h-screen">
      <h1 className="text-3xl font-bold text-foreground">
        Stock Analysis: {symbol}
      </h1>

      <Suspense
        fallback={
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        <StockMetricsCards metrics={data.metrics} />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        <StockPredictionClient data={data} symbol={symbol} />
      </Suspense>
    </div>
  );
}
