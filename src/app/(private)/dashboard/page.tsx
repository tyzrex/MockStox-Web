"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for the dashboard
const portfolioPerformance = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const recentTrades = [
  {
    id: 1,
    stock: "AAPL",
    action: "Buy",
    quantity: 10,
    price: 150.25,
    date: "2023-06-15",
  },
  {
    id: 2,
    stock: "GOOGL",
    action: "Sell",
    quantity: 5,
    price: 2500.75,
    date: "2023-06-14",
  },
  {
    id: 3,
    stock: "MSFT",
    action: "Buy",
    quantity: 15,
    price: 305.5,
    date: "2023-06-13",
  },
  {
    id: 4,
    stock: "AMZN",
    action: "Buy",
    quantity: 8,
    price: 122.75,
    date: "2023-06-12",
  },
  {
    id: 5,
    stock: "TSLA",
    action: "Sell",
    quantity: 12,
    price: 650.0,
    date: "2023-06-11",
  },
];

const topPerformers = [
  { stock: "NVDA", change: 15.2 },
  { stock: "AMD", change: 8.7 },
  { stock: "AAPL", change: 5.4 },
];

const worstPerformers = [
  { stock: "GME", change: -12.5 },
  { stock: "BBBY", change: -8.9 },
  { stock: "AMC", change: -6.2 },
];

export default function UserDashboard() {
  const [funds, setFunds] = useState(10000);
  const [portfolioValue, setPortfolioValue] = useState(15000);
  const [profitLoss, setProfitLoss] = useState(2500);

  return (
    <div className="min-h-screen bg-[#1d1d1d] text-[#e5ebeb]">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Trading Dashboard</h1>
          <Select defaultValue="1D">
            <SelectTrigger className="w-[100px] bg-[#2d2d2d] border-none">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-[#2d2d2d] border-none">
              <SelectItem value="1D">1D</SelectItem>
              <SelectItem value="1W">1W</SelectItem>
              <SelectItem value="1M">1M</SelectItem>
              <SelectItem value="3M">3M</SelectItem>
              <SelectItem value="1Y">1Y</SelectItem>
              <SelectItem value="ALL">ALL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Funds
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${funds.toLocaleString()}
              </div>
              <p className="text-xs text-[#a3a2a3]">Last updated: 5 mins ago</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Portfolio Value
              </CardTitle>
              <PieChart className="h-4 w-4 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${portfolioValue.toLocaleString()}
              </div>
              <p className="text-xs text-[#a3a2a3]">+5.25% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit/Loss
              </CardTitle>
              <Activity className="h-4 w-4 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${profitLoss.toLocaleString()}
              </div>
              <p className="text-xs text-[#a3a2a3]">
                +12.5% from initial investment
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 bg-[#2d2d2d] border-none">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={portfolioPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#a3a2a3" />
                  <YAxis stroke="#a3a2a3" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2d2d2d",
                      border: "none",
                    }}
                    labelStyle={{ color: "#e5ebeb" }}
                  />
                  <Bar dataKey="value" fill="#d5e14e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((stock) => (
                  <div key={stock.stock} className="flex items-center">
                    <div className="w-16 font-medium">{stock.stock}</div>
                    <div className="w-full bg-[#1d1d1d] rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${stock.change}%` }}
                      ></div>
                    </div>
                    <span className="w-12 text-right text-green-500 ml-2">
                      +{stock.change}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 bg-[#2d2d2d] border-none">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stock</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTrades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-medium">
                        {trade.stock}
                      </TableCell>
                      <TableCell>{trade.action}</TableCell>
                      <TableCell>{trade.quantity}</TableCell>
                      <TableCell>${trade.price.toFixed(2)}</TableCell>
                      <TableCell>{trade.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader>
              <CardTitle>Worst Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {worstPerformers.map((stock) => (
                  <div key={stock.stock} className="flex items-center">
                    <div className="w-16 font-medium">{stock.stock}</div>
                    <div className="w-full bg-[#1d1d1d] rounded-full h-2.5">
                      <div
                        className="bg-red-500 h-2.5 rounded-full"
                        style={{ width: `${Math.abs(stock.change)}%` }}
                      ></div>
                    </div>
                    <span className="w-12 text-right text-red-500 ml-2">
                      {stock.change}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Day's Gain/Loss
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+$345.67</div>
              <p className="text-xs text-[#a3a2a3]">+2.34% today</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Most Active Stock
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">TSLA</div>
              <p className="text-xs text-[#a3a2a3]">23 trades today</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Biggest Loss
              </CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">GME</div>
              <p className="text-xs text-[#a3a2a3]">-12.5% today</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2d2d2d] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Close
              </CardTitle>
              <Clock className="h-4 w-4 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3:59:45</div>
              <p className="text-xs text-[#a3a2a3]">15 seconds remaining</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
