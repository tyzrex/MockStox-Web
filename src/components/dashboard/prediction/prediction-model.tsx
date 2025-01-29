import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNepaliCurrency, showErrorToasts } from "@/lib/utils";

import {
  AlertCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  BarChart2,
  Activity,
  Scale,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  buyStock,
  sellStock,
} from "@/services/api/transaction/transaction-actions";
import { toast } from "sonner";
import type {
  StockHolding,
  StockPrediction,
} from "@/types/dashboard-api-types";
import { COMMERCIAL_BANKS } from "../stock-detail/quick-trade";

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prediction?: StockPrediction;
  symbol: string;
  tradeType: "buy" | "sell";
  holdings: StockHolding[];
  onTradeComplete: () => void;
}

const PredictionModal: React.FC<PredictionModalProps> = ({
  isOpen,
  onClose,
  prediction,
  symbol,
  tradeType,
  holdings,
  onTradeComplete,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedHolding, setSelectedHolding] = useState<StockHolding | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tradeType === "sell" && holdings.length > 0) {
      setSelectedHolding(holdings[0]);
    }
  }, [tradeType, holdings]);

  const showWarning = prediction
    ? (tradeType === "buy" && prediction.buy_probability < 0.5) ||
      (tradeType === "sell" && prediction.sell_probability < 0.5)
    : false;

  const getSignalStrength = () => {
    if (prediction) {
      if (prediction.buy_probability > 0.8) return "Strong Buy Signal";
      if (prediction.sell_probability > 0.8) return "Strong Sell Signal";
      if (prediction.hold_probability > 0.8) return "Strong Hold Signal";
      if (prediction.buy_probability > 0.6) return "Buy Signal";
      if (prediction.sell_probability > 0.6) return "Sell Signal";
    }

    return "Neutral Signal";
  };

  const getProbabilityColor = (probability: number) => {
    if (probability > 0.7) return "text-green-500";
    if (probability > 0.4) return "text-yellow-500";
    return "text-red-500";
  };

  const handleTrade = async () => {
    setIsLoading(true);
    try {
      let response;
      if (tradeType === "buy") {
        response = await buyStock({
          stockSymbol: symbol,
          quantity: quantity,
        });
      } else {
        if (!selectedHolding) {
          toast.error("Please select a holding to sell.");
          return;
        }
        response = await sellStock({
          quantity: quantity,
          id: selectedHolding.id,
        });
      }
      if (response.success) {
        toast.success(response.message);
        onTradeComplete();
        onClose();
      } else {
        showErrorToasts(response.errorData);
      }
    } catch (error) {
      console.error("Error during trade:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">
            {symbol} Trading Analysis
          </DialogTitle>
        </DialogHeader>
        {prediction && COMMERCIAL_BANKS.includes(symbol) ? (
          <ScrollArea className="max-h-[70vh]">
            <div className="grid grid-cols-2 gap-10 p-1">
              {/* Potential Returns Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Potential Returns</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ArrowUpCircle className="text-green-500 h-5 w-5" />
                      <span>Potential Gain</span>
                    </div>
                    <span className="text-green-500 font-semibold">
                      {formatNepaliCurrency(prediction.potential_gain)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ArrowDownCircle className="text-red-500 h-5 w-5" />
                      <span>Potential Loss</span>
                    </div>
                    <span className="text-red-500 font-semibold">
                      {formatNepaliCurrency(prediction.potential_loss)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk Metrics Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Risk Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Scale className="text-blue-500 h-5 w-5" />
                      <span>Risk/Reward</span>
                    </div>
                    <span
                      className={
                        prediction.risk_reward_ratio > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {prediction.risk_reward_ratio.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Activity className="text-purple-500 h-5 w-5" />
                        <span>Volatility</span>
                      </div>
                      <span className="text-purple-500">
                        {prediction.volatility.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Signals Section */}
              <div className="space-y-4 col-span-2">
                <h3 className="text-lg font-semibold">Trading Signals</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Buy</span>
                    <span
                      className={getProbabilityColor(
                        prediction.buy_probability
                      )}
                    >
                      {prediction.buy_probability.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Hold</span>
                    <span
                      className={getProbabilityColor(
                        prediction.hold_probability
                      )}
                    >
                      {prediction.hold_probability.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sell</span>
                    <span
                      className={getProbabilityColor(
                        prediction.sell_probability
                      )}
                    >
                      {prediction.sell_probability.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 bg-secondary/50 p-2 rounded-md text-center font-medium">
                    {getSignalStrength()}
                  </div>
                </div>

                {/* show tomorrow after 7 days and after 15 days prices */}
                <div className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold">Future Prices</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Tomorrow</span>
                      <span className="font-semibold">
                        {formatNepaliCurrency(prediction.predictions.tomorrow)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>After 7 days</span>
                      <span className="font-semibold">
                        {formatNepaliCurrency(
                          prediction.predictions.sevenDaysLater
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>After 15 days</span>
                      <span className="font-semibold">
                        {formatNepaliCurrency(
                          prediction.predictions.fifteenDaysLater
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <BarChart2 className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500">
              No prediction available for {symbol}
            </p>
            <p className="text-sm text-gray-400">
              Unable to provide trading analysis at this time.
            </p>
          </div>
        )}

        {/* Trade Input Section */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Trade Details</h3>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(0, Number.parseInt(e.target.value) || 0))
              }
              placeholder="Enter quantity"
              className="flex-grow"
            />
            {tradeType === "sell" && (
              <Select
                value={selectedHolding?.id.toString()}
                onValueChange={(value) =>
                  setSelectedHolding(
                    holdings.find((h) => h.id.toString() === value) || null
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select holding" />
                </SelectTrigger>
                <SelectContent>
                  {holdings.map((holding) => (
                    <SelectItem key={holding.id} value={holding.id.toString()}>
                      {holding.quantity} @{" "}
                      {formatNepaliCurrency(
                        Number.parseFloat(holding.buying_price)
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {showWarning && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {tradeType === "buy"
                ? "Warning: Buy signal is weak. Consider reviewing your decision."
                : "Warning: Sell signal is weak. Consider holding your position."}
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="mt-6">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
          {
            //if no prediction let user do trade
            !prediction && (
              <Button
                onClick={handleTrade}
                disabled={isLoading || quantity <= 0}
                variant="default"
                className={
                  tradeType === "buy"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {isLoading ? "Processing..." : `Confirm ${tradeType}`}
              </Button>
            )
          }
          {prediction && (
            <Button
              onClick={handleTrade}
              disabled={
                isLoading ||
                quantity <= 0 ||
                (tradeType === "sell" && !selectedHolding)
              }
              variant={showWarning ? "destructive" : "default"}
              className={
                !showWarning
                  ? tradeType === "buy"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                  : ""
              }
            >
              {isLoading
                ? "Processing..."
                : showWarning
                ? "Proceed Anyway"
                : `Confirm ${
                    tradeType.charAt(0).toUpperCase() + tradeType.slice(1)
                  }`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionModal;
