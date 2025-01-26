import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatNepaliCurrency, showErrorToasts } from "@/lib/utils";
import {
  buyStock,
  sellStock,
} from "@/services/api/transaction/transaction-actions";
import { toast } from "sonner";

interface Prediction {
  date: string;
  predictedPrice: number;
  recommendation: "buy" | "sell" | "hold";
}

// Mock data for AI predictions
const mockPredictions: Prediction[] = [
  { date: "2024-03-15", predictedPrice: 1250, recommendation: "buy" },
  { date: "2024-03-16", predictedPrice: 1280, recommendation: "hold" },
  { date: "2024-03-17", predictedPrice: 1310, recommendation: "buy" },
  { date: "2024-03-18", predictedPrice: 1300, recommendation: "hold" },
  { date: "2024-03-19", predictedPrice: 1270, recommendation: "sell" },
];

export default function EnhancedTradingComponent({
  symbol,
  number_of_stocks,
  latestPrice,
}: {
  symbol: string;
  number_of_stocks: number;
  latestPrice: number;
}) {
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);

  const handleTrade = async (type: "buy" | "sell") => {
    let response;
    if (type === "buy") {
      response = await buyStock({
        stockSymbol: symbol,
        quantity: buyQuantity,
      });
    } else {
      response = await sellStock({
        stockSymbol: symbol,
        quantity: sellQuantity,
      });
    }
    if (response.success) {
      toast.success(response.message);
      setBuyQuantity(0);
      setSellQuantity(0);
    } else {
      showErrorToasts(response.errorData);
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "buy":
        return "bg-green-500 hover:bg-green-600";
      case "sell":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-yellow-500 hover:bg-yellow-600";
    }
  };

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

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">AI Predictions</h3>
          <div className="space-y-4">
            {mockPredictions.map((prediction, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="text-sm ">{prediction.date}</div>
                  <div className="font-semibold">
                    {formatNepaliCurrency(prediction.predictedPrice)}
                  </div>
                </div>
                <Badge
                  className={`${getRecommendationColor(
                    prediction.recommendation
                  )} text-white`}
                >
                  {prediction.recommendation.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
                    setBuyQuantity(Math.max(0, parseInt(e.target.value) || 0))
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
                    setSellQuantity(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="flex-grow"
                />
                <Button
                  onClick={() => handleTrade("sell")}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Sell
                </Button>
              </div>

              <div className="mt-5 flex justify-between items-center">
                <div>
                  <div className=" text-sm">Stocks Owned</div>
                  <div className="text-lg font-semibold">
                    {number_of_stocks}
                  </div>
                </div>
                <Button
                  className="w-fit bg-blue-500 text-white py-2 rounded font-semibold hover:bg-red-600"
                  onClick={() => handleTrade("sell")}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
