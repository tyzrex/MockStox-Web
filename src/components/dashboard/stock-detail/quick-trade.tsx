import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, LoaderIcon } from "lucide-react";
import { formatNepaliCurrency, showErrorToasts } from "@/lib/utils";
import {
  buyStock,
  sellStock,
} from "@/services/api/transaction/transaction-actions";
import { toast } from "sonner";
import { dashboardApi } from "@/services/api/mockstox-api";
import { useQuery } from "@tanstack/react-query";
import type {
  PortfolioObject,
  StockHolding,
} from "@/types/dashboard-api-types";
import PredictionModal from "../prediction/prediction-model";

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

const COMMERCIAL_BANKS = [
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
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState<StockHolding | null>(
    null
  );

  const handleTrade = async (type: "buy" | "sell") => {
    if (type === "sell" && number_of_stocks === 0) {
      toast.error("You don't have any stocks to sell.");
      return;
    }

    if (isCommercialBank && predictions) {
      setModalOpen(true);
    } else {
      // Proceed with trade without showing modal
      await executeTrade(type);
    }
  };

  const executeTrade = async (type: "buy" | "sell") => {
    let response;
    if (type === "buy") {
      response = await buyStock({
        stockSymbol: symbol,
        quantity: buyQuantity,
      });
    } else {
      if (!selectedHolding) {
        toast.error("Please select a stock holding to sell.");
        return;
      }
      response = await sellStock({
        stockSymbol: symbol,
        quantity: sellQuantity,
        // holdingId: selectedHolding.id,
      });
    }
    if (response.success) {
      toast.success(response.message);
      setBuyQuantity(0);
      setSellQuantity(0);
      setSelectedHolding(null);
    } else {
      showErrorToasts(response.errorData);
    }
  };

  const isCommercialBank = COMMERCIAL_BANKS.includes(symbol);

  const {
    data: predictions,
    isLoading: loading,
    error: predictionError,
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

  return (
    <div className="grid grid-cols-3 gap-5 w-full">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg mt-3 font-semibold mb-4">Stock Details</h3>
          <div className="flex flex-col justify-between items-start gap-5">
            <div>
              <div className=" text-sm">Symbol</div>
              <div className="font-semibold">{symbol}</div>
            </div>
            <div>
              <div className=" text-sm">Stocks Owned</div>
              <div className="font-semibold">{number_of_stocks}</div>
            </div>

            <div>
              <div className=" text-sm">Current Price</div>
              <div className="font-semibold">
                {formatNepaliCurrency(latestPrice)}
              </div>
            </div>
            <div>
              <div className=" text-sm">Total Value</div>
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
                        <span>{formatNepaliCurrency(price)}</span>
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
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Buy</span>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={buyQuantity}
                  onChange={(e) =>
                    setBuyQuantity(
                      Math.max(0, Number.parseInt(e.target.value) || 0)
                    )
                  }
                  className="flex-grow"
                />
                <Button
                  onClick={() => handleTrade("buy")}
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold"
                >
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Buy
                </Button>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Sell</span>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={sellQuantity}
                  onChange={(e) =>
                    setSellQuantity(
                      Math.max(0, Number.parseInt(e.target.value) || 0)
                    )
                  }
                  className="flex-grow"
                />
                <Button
                  onClick={() => handleTrade("sell")}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                  disabled={number_of_stocks === 0}
                >
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Sell
                </Button>
              </div>
              {relevantHoldings.length > 0 && (
                <div className="mt-2">
                  <label
                    htmlFor="holding-select"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Holding to Sell
                  </label>
                  <select
                    id="holding-select"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedHolding?.id || ""}
                    onChange={(e) => {
                      const selected = relevantHoldings.find(
                        (h) => h.id === Number.parseInt(e.target.value)
                      );
                      setSelectedHolding(selected || null);
                    }}
                  >
                    <option value="">Select a holding</option>
                    {relevantHoldings.map((holding) => (
                      <option key={holding.id} value={holding.id}>
                        {holding.quantity} shares @{" "}
                        {formatNepaliCurrency(
                          Number.parseFloat(holding.buyin_price)
                        )}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-between items-center">
              <div>
                <div className=" text-sm">Stocks Owned</div>
                <div className="text-lg font-semibold">{number_of_stocks}</div>
              </div>
              <Button
                className="w-fit bg-blue-500 text-white py-2 rounded font-semibold hover:bg-red-600"
                onClick={() => {
                  setSellQuantity(number_of_stocks);
                  handleTrade("sell");
                }}
                disabled={number_of_stocks === 0}
              >
                Sell All
              </Button>
            </div>

            <div className="mt-5 flex justify-between items-center">
              Current Price
              <span className="font-semibold">
                {formatNepaliCurrency(latestPrice)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      {modalOpen && predictions && (
        <PredictionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          prediction={predictions}
          symbol={symbol}
          tradeType={buyQuantity > 0 ? "buy" : "sell"}
          quantity={buyQuantity > 0 ? buyQuantity : sellQuantity}
          onConfirm={async () => {
            setModalOpen(false);
            await executeTrade(buyQuantity > 0 ? "buy" : "sell");
          }}
        />
      )}
    </div>
  );
}
