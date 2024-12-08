"use client";

import { useState } from "react";
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

// Mock data for order book
const buyOrders = [
  { price: 150.25, quantity: 100 },
  { price: 150.2, quantity: 200 },
  { price: 150.15, quantity: 150 },
  { price: 150.1, quantity: 300 },
];

const sellOrders = [
  { price: 150.3, quantity: 150 },
  { price: 150.35, quantity: 100 },
  { price: 150.4, quantity: 200 },
  { price: 150.45, quantity: 120 },
];

export default function TradeExecutionPage() {
  const [side, setSide] = useState("buy");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log("Order submitted:", {
      side,
      symbol,
      quantity,
      price,
    });
    // Reset form
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div className="text-[#e5ebeb]">
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
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="e.g. AAPL"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="mt-2 "
                  />
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
                          <TableCell>{order.price.toFixed(2)}</TableCell>
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
                          <TableCell>{order.price.toFixed(2)}</TableCell>
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
              <div className="text-2xl font-bold">$150.25</div>
              <p className="text-xs text-muted-foreground">
                Updated 5 seconds ago
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,670,901</div>
              <p className="text-xs text-muted-foreground">
                +12.3% from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Status
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date().getHours() >= 11 && new Date().getHours() < 15 ? (
                  <span className="text-green-500">Open</span>
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date().getHours() >= 11 && new Date().getHours() < 15
                  ? // get the time until the market closes
                    `Closes in ${15 - new Date().getHours() - 1} hours and ${
                      60 - new Date().getMinutes()
                    } minutes`
                  : `Opens in ${11 - new Date().getHours() - 1} hours`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
