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
import { Flame } from "lucide-react";
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

const formatNepaliCurrency = (value: number | string) => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
  }).format(numValue);
};

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
  holdings: { symbol: string; value: number; sector: string }[];
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
    { symbol: "NABIL", value: 51450, sector: "COMMERCIAL BANKS" },
    { symbol: "ADBL", value: 34120, sector: "COMMERCIAL BANKS" },
    { symbol: "NTC", value: 25000, sector: "TELECOMMUNICATIONS" },
    { symbol: "UPPER", value: 18000, sector: "HYDROPOWER" },
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

  const radialChartData = [
    {
      name: "Profit/Loss",
      value:
        (Math.abs(parseFloat(data.profit_or_loss)) / totalPortfolioValue) * 100,
    },
    {
      name: "Remaining",
      value:
        100 -
        (Math.abs(parseFloat(data.profit_or_loss)) / totalPortfolioValue) * 100,
    },
  ];

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
    <div className="min-h-screen bg-black text-white py-6">
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

          {/* Radial Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Profit/Loss Ratio</CardTitle>
              <CardDescription>
                Radial chart showing profit/loss as a percentage of total
                portfolio value
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
                      data={radialChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                    >
                      {radialChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0
                              ? parseFloat(data.profit_or_loss) >= 0
                                ? "#4ade80"
                                : "#ef4444"
                              : "#6b7280"
                          }
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">
                  {parseFloat(data.profit_or_loss) >= 0 ? "Profit" : "Loss"}:{" "}
                  {Math.abs(
                    (parseFloat(data.profit_or_loss) / totalPortfolioValue) *
                      100
                  ).toFixed(2)}
                  %
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trade History Chart */}
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
                className="h-[300px]"
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

          {/* Additional Calculations */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Trade Statistics</CardTitle>
              <CardDescription>
                Additional calculations based on trade history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Total Trades</p>
                  <p className="text-2xl font-bold">{calculateTotalTrades()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Average Trade Value</p>
                  <p className="text-2xl font-bold">
                    {formatNepaliCurrency(calculateAverageTradeValue())}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest stock purchases and sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recent_transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.symbol}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.action === "BUY"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {transaction.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>
                      {formatNepaliCurrency(transaction.unit_price)}
                    </TableCell>
                    <TableCell>
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

        {/* Portfolio Insights */}
        <Card className="">
          <CardHeader>
            <CardTitle>Portfolio Insights</CardTitle>
            <CardDescription>Key metrics and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Performance Analysis</h4>
              <p className="text-sm">
                Your portfolio is currently showing a{" "}
                {parseFloat(data.profit_or_loss) >= 0 ? "profit" : "loss"} of{" "}
                {formatNepaliCurrency(
                  Math.abs(parseFloat(data.profit_or_loss))
                )}
                .
                {parseFloat(data.profit_or_loss) >= 0
                  ? " Keep up the good work and consider reinvesting your profits."
                  : " Don't be discouraged. Review your strategy and consider diversifying your investments."}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Streak</h4>
              <p className="text-sm">
                You're on a {data.streak} day streak of positive performance.
                {data.streak > 5
                  ? " Impressive! Your consistent strategy seems to be paying off."
                  : " Keep monitoring your investments and stick to your strategy to extend your streak."}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Top and Worst Performers</h4>
              <p className="text-sm">
                Your top performer is {data.top_performers[0].symbol} with a{" "}
                {parseFloat(data.top_performers[0].percentage_change).toFixed(
                  2
                )}
                % gain, while your worst performer is{" "}
                {data.worst_performers[0].symbol} with a{" "}
                {parseFloat(data.worst_performers[0].percentage_change).toFixed(
                  2
                )}
                % loss. Consider rebalancing your portfolio if these trends
                continue.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recent Activity</h4>
              <p className="text-sm">
                You've made {data.recent_transactions.length} transactions
                recently, focusing on {data.recent_transactions[0].symbol} and{" "}
                {data.recent_transactions[1].symbol}. Keep an eye on these
                stocks and set stop-loss orders to protect your investments.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
