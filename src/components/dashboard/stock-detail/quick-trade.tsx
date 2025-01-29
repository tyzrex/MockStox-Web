import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, LoaderIcon } from "lucide-react";
import { formatNepaliCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { dashboardApi } from "@/services/api/mockstox-api";
import { useQuery } from "@tanstack/react-query";
import { PortfolioObject, StockHolding } from "@/types/dashboard-api-types";
import PredictionModal from "../prediction/prediction-model";
import { Badge } from "@/components/ui/badge";

export interface StockPrediction {
  predictions: Record<string, number>;
  potential_gain: number;
  potential_loss: number;
  risk_reward_ratio: number;
  volatility: number;
  buy_probability: number;
  sell_probability: number;
  hold_probability: number;
}

export const COMMERCIAL_BANKS = [
  "ADBL",
  "CZBIL",
  "EBL",
  "GBIME",
  "HBL",
  "KBL",
  "MBL",
  "NABIL",
  "NBL",
  "NICA",
  "NMB",
  "PCBL",
  "SANIMA",
  "SBI",
  "SBL",
  "SCB",
  "PRVU",
  "RBB",
  "NIMB",
  "LSL",
];

export default function EnhancedTradingComponent({
  symbol,
  number_of_stocks,
  latestPrice,
  stockHolding,
}: {
  symbol: string;
  number_of_stocks: number;
  latestPrice: number;
  stockHolding: PortfolioObject[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");

  const isCommercialBank = COMMERCIAL_BANKS.includes(symbol);

  const {
    data: predictions,
    isLoading: loading,
    error: predictionError,
    refetch: refetchPredictions,
  } = useQuery({
    queryKey: ["prediction", symbol],
    queryFn: async () => {
      const { response, error } =
        await dashboardApi.getPredictionBySymbolClientSide({
          symbol,
        });

      if (error || !response) {
        throw new Error("Failed to fetch predictions");
      }

      return response;
    },
    enabled: isCommercialBank,
  });

  const relevantHoldings =
    stockHolding[0]?.stocks.filter((holding) => holding.symbol === symbol) ||
    [];

  const handleTradeClick = (type: "buy" | "sell") => {
    if (type === "sell" && number_of_stocks === 0) {
      toast.error("You don't have any stocks to sell.");
      return;
    }
    setTradeType(type);
    setModalOpen(true);
  };

  const handleTradeComplete = () => {
    // Refetch predictions and any other data that might have changed
    refetchPredictions();
    // You might want to add other refetch calls here if needed
  };

  return (
    <div className="grid grid-cols-3 gap-5 w-full">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg mt-3 font-semibold mb-4">Stock Details</h3>
          <div className="flex flex-col justify-between items-start gap-5">
            <div>
              <div className="text-sm">Symbol</div>
              <div className="font-semibold">{symbol}</div>
            </div>
            <div>
              <div className="text-sm">Stocks Owned</div>
              <div className="font-semibold">{number_of_stocks}</div>
            </div>
            <div>
              <div className="text-sm">Current Price</div>
              <div className="font-semibold">
                {formatNepaliCurrency(latestPrice)}
              </div>
            </div>
            <div>
              <div className="text-sm">Total Value</div>
              <div className="font-semibold">
                {formatNepaliCurrency(latestPrice * number_of_stocks)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {COMMERCIAL_BANKS.includes(symbol) ? (
        loading ? (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">AI Predictions</h3>
              <div className="text-center flex items-center">
                <LoaderIcon className="animate-spin h-8 w-8 text-blue-500" />
                <span className="ml-2">Loading predictions...</span>
                <span className="ml-2 text-gray-500">
                  This may take a while
                </span>
              </div>
            </CardContent>
          </Card>
        ) : predictions ? (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">AI Predictions</h3>
              <div className="space-y-4">
                {Object.entries(predictions.predictions)
                  .splice(0, 5)
                  .map(([date, price]) => (
                    <div key={date}>
                      <div className="flex justify-between mb-2">
                        <span>{date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Predicted Price</span>
                        <Badge
                          className={
                            price > latestPrice ? "bg-green-500" : "bg-red-500"
                          }
                        >
                          <span>{formatNepaliCurrency(price)}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">AI Predictions</h3>
              <div className="text-center">
                <span className="text-gray-500">
                  {predictionError?.message}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">AI Predictions</h3>
            <div className="text-center">
              <span className="text-gray-500">No predictions available</span>
            </div>
            <div className="text-center">
              Only available for Commercial Banks
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Trade</h3>
          <div>
            <div className=" text-sm">Stocks Owned</div>
            <div className="text-lg font-semibold">{number_of_stocks}</div>
          </div>
          {relevantHoldings.length > 0 && (
            <div className="mt-2">
              <label
                htmlFor="holding-select"
                className="block text-sm font-medium text-gray-700"
              >
                View Holdings
              </label>
              <select
                id="holding-select"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Show Holdings</option>
                {relevantHoldings.map((holding) => (
                  <option key={holding.id} value={holding.id}>
                    {holding.quantity} shares @{" "}
                    {formatNepaliCurrency(
                      Number.parseFloat(holding.buying_price)
                    )}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="space-y-4 mt-5">
            <Button
              onClick={() => handleTradeClick("buy")}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold"
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Buy
            </Button>
            <Button
              onClick={() => handleTradeClick("sell")}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
              disabled={number_of_stocks === 0}
            >
              <ArrowDown className="mr-2 h-4 w-4" />
              Sell
            </Button>
          </div>
        </CardContent>
      </Card>

      {modalOpen && (
        <PredictionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          prediction={predictions}
          symbol={symbol}
          tradeType={tradeType}
          holdings={relevantHoldings}
          onTradeComplete={handleTradeComplete}
        />
      )}
    </div>
  );
}
