"use client";

import { useEffect, useState } from "react";
import { ArrowUpDown, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardApi } from "@/services/api/mockstox-api";
import { StockListItem } from "@/types/dashboard-api-types";
import {
  buyStock,
  sellStock,
} from "@/services/api/transaction/transaction-actions";
import { toast } from "sonner";

export default function StockTrade({
  stocks,
  buyOrders,
  sellOrders,
}: {
  stocks: StockListItem[];
  buyOrders: any[];
  sellOrders: any[];
}) {
  const [side, setSide] = useState("buy");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [stocksList, setStocksList] = useState<StockListItem[]>(stocks);

  console.log(buyOrders);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Reset form
    if (side === "buy") {
      await buyStock({
        stockSymbol: symbol,
        quantity: parseInt(quantity),
      });
      toast.success("Order placed successfully");
    } else if (side === "sell") {
      await sellStock({
        stockSymbol: symbol,
        quantity: parseInt(quantity),
      });
      toast.success("Sell order placed successfully");
    }
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div>
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-8">Trade Execution</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Select value={symbol} onValueChange={setSymbol}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a stock" />
                    </SelectTrigger>
                    <SelectContent>
                      {stocksList.map((stock) => (
                        <SelectItem key={stock.symbol} value={stock.symbol}>
                          {stock.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Side</Label>
                  <RadioGroup
                    defaultValue="buy"
                    onValueChange={setSide}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buy" id="buy" />
                      <Label htmlFor="buy">Buy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="sell" />
                      <Label htmlFor="sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-2 border-[#3d3d3d]"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Place Order
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-500">
                    Buy Orders
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buyOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{order.price}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-red-500">
                    Sell Orders
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{order.price}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Trade</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rs.{" "}
                {sellOrders.length > 0
                  ? sellOrders[0].price * sellOrders[0].quantity
                  : buyOrders.length > 0
                  ? buyOrders[0].price * buyOrders[0].quantity
                  : "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                {sellOrders.length > 0
                  ? `Sold at Rs. ${sellOrders[0].price}`
                  : buyOrders.length > 0
                  ? `Bought at Rs. ${buyOrders[0].price}`
                  : "No trades yet"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
