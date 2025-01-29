"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";
import { formatNepaliCurrency } from "@/lib/utils";
import PageHeader from "@/components/shared/page-header";

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

interface PortfolioData {
  recent_transactions: Transaction[];
  holdings: any[];
}

export default function MyPortfolio({
  recent_transactions,
  holdings,
}: PortfolioData) {
  console.log(holdings);
  const sectorData = holdings.reduce((acc, holding) => {
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

  const tradeHistoryData = recent_transactions.map((transaction) => ({
    date: new Date(transaction.created_at).toLocaleDateString(),
    value: parseFloat(transaction.unit_price) * transaction.quantity,
    action: transaction.action,
  }));

  const COLORS = [
    "#E23670",
    "#2662D9",
    "#2EB88A",
    "#E88C30",
    "#AF57DB",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#BD10E0",
    "#9013FE",
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        <PageHeader
          title="My Portfolio"
          description="View your historical transactions and current holdings"
        />
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
              {sectorChartData.length > 0 ? (
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
              ) : (
                <div className="text-center">No sector data found</div>
              )}
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
              {tradeHistoryData.length > 0 ? (
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
                    <LineChart data={tradeHistoryData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-value)"
                        dot={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="text-center">No trade history found</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  {recent_transactions.length > 0 ? (
                    recent_transactions.slice(0, 5).map((transaction) => (
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">
                    Buying Unit Price
                  </TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.length > 0 ? (
                  holdings.map((holding) => (
                    <TableRow key={holding.symbol}>
                      <TableCell>{holding.name || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        {holding.quantity || 0}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNepaliCurrency(holding.buying_price || 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNepaliCurrency(holding.value || 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(holding.bought_at).toLocaleDateString() ||
                          "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No holdings found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
