"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Flame, TrendingDown, TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import { formatNepaliCurrency } from "@/lib/utils";

interface Transaction {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  quantity: number;
  symbol: string;
  unit_price: string;
  date: string;
  action: "BUY" | "SELL";
  user: number;
}

interface StockPerformance {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  symbol: string;
  ltp: string;
  point_change: string;
  percentage_change: string;
  open_price: string;
  high_price: string;
  low_price: string;
  volume: number;
  prev_close: string;
  sector: string;
  date: string;
}

interface PortfolioData {
  recent_transactions: Transaction[];
  streak: number;
  top_performers: StockPerformance[];
  worst_performers: StockPerformance[];
  profit_or_loss: string;
  holdings: any[];
}

const portfolioData: PortfolioData = {
  recent_transactions: [
    {
      id: 3,
      created_at: "2024-12-08T14:19:42.882877+05:45",
      updated_at: null,
      deleted_at: null,
      quantity: 100,
      symbol: "NABIL",
      unit_price: "515.10",
      date: "2024-12-08",
      action: "BUY",
      user: 3,
    },
    {
      id: 2,
      created_at: "2024-12-08T12:01:12.542242+05:45",
      updated_at: null,
      deleted_at: null,
      quantity: 100,
      symbol: "ADBL",
      unit_price: "345.00",
      date: "2024-12-08",
      action: "BUY",
      user: 3,
    },
    {
      id: 1,
      created_at: "2024-12-07T10:30:00.000000+05:45",
      updated_at: null,
      deleted_at: null,
      quantity: 50,
      symbol: "NTC",
      unit_price: "500.00",
      date: "2024-12-07",
      action: "SELL",
      user: 3,
    },
    {
      id: 0,
      created_at: "2024-12-06T09:15:00.000000+05:45",
      updated_at: null,
      deleted_at: null,
      quantity: 75,
      symbol: "UPPER",
      unit_price: "240.00",
      date: "2024-12-06",
      action: "BUY",
      user: 3,
    },
  ],
  streak: 1,
  top_performers: [
    {
      id: 361020,
      created_at: "2024-12-09T05:44:55.866906+05:45",
      updated_at: null,
      deleted_at: null,
      symbol: "ADBL",
      ltp: "341.20",
      point_change: "-7.80",
      percentage_change: "-2.23",
      open_price: "346.10",
      high_price: "349.00",
      low_price: "340.00",
      volume: 53335,
      prev_close: "349.00",
      sector: "COMMERCIAL BANKS",
      date: "2024-12-08",
    },
    {
      id: 361168,
      created_at: "2024-12-09T05:44:57.772722+05:45",
      updated_at: null,
      deleted_at: null,
      symbol: "NABIL",
      ltp: "514.50",
      point_change: "-10.50",
      percentage_change: "-2.00",
      open_price: "526.00",
      high_price: "526.00",
      low_price: "513.50",
      volume: 76545,
      prev_close: "525.00",
      sector: "COMMERCIAL BANKS",
      date: "2024-12-08",
    },
  ],
  worst_performers: [
    {
      id: 361020,
      created_at: "2024-12-09T05:44:55.866906+05:45",
      updated_at: null,
      deleted_at: null,
      symbol: "ADBL",
      ltp: "341.20",
      point_change: "-7.80",
      percentage_change: "-2.23",
      open_price: "346.10",
      high_price: "349.00",
      low_price: "340.00",
      volume: 53335,
      prev_close: "349.00",
      sector: "COMMERCIAL BANKS",
      date: "2024-12-08",
    },
    {
      id: 361168,
      created_at: "2024-12-09T05:44:57.772722+05:45",
      updated_at: null,
      deleted_at: null,
      symbol: "NABIL",
      ltp: "514.50",
      point_change: "-10.50",
      percentage_change: "-2.00",
      open_price: "526.00",
      high_price: "526.00",
      low_price: "513.50",
      volume: 76545,
      prev_close: "525.00",
      sector: "COMMERCIAL BANKS",
      date: "2024-12-08",
    },
  ],
  profit_or_loss: "-1110.00",
  holdings: [
    {
      symbol: "NABIL",
      name: "Nabil Bank Limited",
      quantity: 100,
      averageCost: 1000,
      currentPrice: 1100,
      value: 110000,
      gainLoss: 10000,
      gainLossPercentage: 10,
      sector: "Banking",
    },
    {
      symbol: "DHPL",
      name: "Dibyashwori Hydropower Ltd.",
      quantity: 500,
      averageCost: 200,
      currentPrice: 220,
      value: 110000,
      gainLoss: 10000,
      gainLossPercentage: 10,
      sector: "Hydropower",
    },
    {
      symbol: "NRIC",
      name: "Nepal Reinsurance Company Ltd.",
      quantity: 200,
      averageCost: 500,
      currentPrice: 480,
      value: 96000,
      gainLoss: -4000,
      gainLossPercentage: -4,
      sector: "Insurance",
    },
    {
      symbol: "NTC",
      name: "Nepal Telecom",
      quantity: 150,
      averageCost: 600,
      currentPrice: 650,
      value: 97500,
      gainLoss: 7500,
      gainLossPercentage: 8.33,
      sector: "Telecommunications",
    },
    {
      symbol: "UPPER",
      name: "Upper Tamakoshi Hydropower Ltd.",
      quantity: 300,
      averageCost: 300,
      currentPrice: 320,
      value: 96000,
      gainLoss: 6000,
      gainLossPercentage: 6.67,
      sector: "Hydropower",
    },
  ],
};

export default function MyPortfolio() {
  const [data] = useState<PortfolioData>(portfolioData);

  const performerChartData = [
    ...data.top_performers,
    ...data.worst_performers,
  ].map((stock) => ({
    symbol: stock.symbol,
    change: parseFloat(stock.percentage_change),
  }));

  const sectorData = data.holdings.reduce((acc, holding) => {
    if (!acc[holding.sector]) {
      acc[holding.sector] = 0;
    }
    acc[holding.sector] += holding.value;
    return acc;
  }, {} as Record<string, number>);

  const sectorChartData = Object.entries(sectorData).map(([sector, value]) => ({
    sector,
    value,
  }));

  const totalPortfolioValue = data.holdings.reduce(
    (sum, holding) => sum + holding.value,
    0
  );

  const tradeHistoryData = data.recent_transactions.map((transaction) => ({
    date: new Date(transaction.created_at).toLocaleDateString(),
    value: parseFloat(transaction.unit_price) * transaction.quantity,
    action: transaction.action,
  }));

  const COLORS = ["#E23670", "#2662D9", "#2EB88A", "#E88C30", "#AF57DB"];

  const calculateTotalTrades = () => data.recent_transactions.length;
  const calculateAverageTradeValue = () => {
    const total = data.recent_transactions.reduce(
      (sum, transaction) =>
        sum + parseFloat(transaction.unit_price) * transaction.quantity,
      0
    );
    return total / data.recent_transactions.length;
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        <h1 className="text-3xl font-bold">My Portfolio</h1>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  parseFloat(data.profit_or_loss) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatNepaliCurrency(data.profit_or_loss)}
              </div>
              <p className="text-xs">
                {parseFloat(data.profit_or_loss) >= 0 ? "Profit" : "Loss"}
              </p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Flame className="mr-2 h-4 w-4 text-orange-500" />
                <span className="text-2xl font-bold">
                  {data.streak} day{data.streak !== 1 ? "s" : ""}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Top Performer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.top_performers[0].symbol}
              </div>
              <p className="text-xs text-green-500">
                +
                {parseFloat(data.top_performers[0].percentage_change).toFixed(
                  2
                )}
                %
              </p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Worst Performer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.worst_performers[0].symbol}
              </div>
              <p className="text-xs text-red-500">
                {parseFloat(data.worst_performers[0].percentage_change).toFixed(
                  2
                )}
                %
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Showing the last 5 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recent_transactions.slice(0, 5).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.symbol}</TableCell>
                      <TableCell>{transaction.action}</TableCell>
                      <TableCell className="text-right">
                        {transaction.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNepaliCurrency(transaction.unit_price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNepaliCurrency(
                          parseFloat(transaction.unit_price) *
                            transaction.quantity
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sector Donut Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Sectors</CardTitle>
              <CardDescription>
                Donut chart showing the distribution of sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Value",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorChartData}
                      dataKey="value"
                      nameKey="sector"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="var(--color-value)"
                      label
                    >
                      {sectorChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <CardDescription>
                Line chart showing recent trade values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Trade Value",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tradeHistoryData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
            <CardDescription>
              Detailed breakdown of your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Avg. Cost</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Gain/Loss</TableHead>
                  <TableHead className="text-right">Gain/Loss %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.holdings.map((holding) => (
                  <TableRow key={holding.symbol}>
                    <TableCell className="font-medium">
                      {holding.symbol || "N/A"}
                    </TableCell>
                    <TableCell>{holding.name || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      {holding.quantity || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNepaliCurrency(holding.averageCost || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNepaliCurrency(holding.currentPrice || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNepaliCurrency(holding.value || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNepaliCurrency(holding.gainLoss || 0)}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        (holding.gainLossPercentage || 0) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {(holding.gainLossPercentage || 0) >= 0 ? (
                        <TrendingUp className="inline h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="inline h-4 w-4 mr-1" />
                      )}
                      {(holding.gainLossPercentage || 0).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
