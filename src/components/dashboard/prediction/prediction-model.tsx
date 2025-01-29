import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatNepaliCurrency } from "@/lib/utils";
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
import { StockPrediction } from "@/types/dashboard-api-types";

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: StockPrediction;
  symbol: string;
  tradeType: "buy" | "sell";
  quantity: number;
  onConfirm: () => void;
}

const PredictionModal: React.FC<PredictionModalProps> = ({
  isOpen,
  onClose,
  prediction,
  symbol,
  tradeType,
  quantity,
  onConfirm,
}) => {
  const showWarning =
    (tradeType === "buy" && prediction.buy_probability < 0.5) ||
    (tradeType === "sell" && prediction.sell_probability < 0.5);

  const getSignalStrength = () => {
    if (prediction.buy_probability > 0.8) return "Strong Buy Signal";
    if (prediction.sell_probability > 0.8) return "Strong Sell Signal";
    if (prediction.hold_probability > 0.8) return "Strong Hold Signal";
    if (prediction.buy_probability > 0.6) return "Buy Signal";
    if (prediction.sell_probability > 0.6) return "Sell Signal";
    return "Neutral Signal";
  };

  const getProbabilityColor = (probability: number) => {
    if (probability > 0.7) return "text-green-500";
    if (probability > 0.4) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">
            {symbol} Trading Analysis
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="grid grid-cols-1 gap-6 p-1">
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
                      {(prediction.volatility * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Signals Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Trading Signals</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Buy</span>
                  <span
                    className={getProbabilityColor(prediction.buy_probability)}
                  >
                    {(prediction.buy_probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hold</span>
                  <span
                    className={getProbabilityColor(prediction.hold_probability)}
                  >
                    {(prediction.hold_probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sell</span>
                  <span
                    className={getProbabilityColor(prediction.sell_probability)}
                  >
                    {(prediction.sell_probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 bg-secondary/50 p-2 rounded-md text-center font-medium">
                  {getSignalStrength()}
                </div>
              </div>
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
        </ScrollArea>

        <DialogFooter className="mt-6">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant={showWarning ? "destructive" : "default"}
            className={
              !showWarning
                ? tradeType === "buy"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
                : ""
            }
          >
            {showWarning
              ? "Proceed Anyway"
              : `Confirm ${
                  tradeType.charAt(0).toUpperCase() + tradeType.slice(1)
                }`}{" "}
            ({quantity} Shares)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionModal;
