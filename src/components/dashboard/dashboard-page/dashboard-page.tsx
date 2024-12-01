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
  DollarSign,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { formatNepaliCurrency } from "@/lib/utils";

// Mock data for the dashboard
const portfolioPerformance = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

interface StockPerformers {
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

interface Trade {
  id: number;
  created_at: string;
  symbol: string;
  unit_price: string;
  quantity: number;
  action: string;
  date: string;
}

export default function Dashboard({
  funds = 0,
  portfolioValue = 0,
  profitLoss = 0,
  worstPerformers = [],
  bestPerformers = [],
  recentTrades = [],
}: {
  funds: number;
  portfolioValue: number;
  profitLoss: number;
  worstPerformers: StockPerformers[];
  bestPerformers: StockPerformers[];
  recentTrades: Trade[];
}) {
  const getMostActiveStock = () => {
    const stockMap = new Map<string, number>();
    recentTrades.forEach((trade) => {
      if (stockMap.has(trade.symbol)) {
        stockMap.set(
          trade.symbol,
          stockMap.get(trade.symbol)! + trade.quantity
        );
      } else {
        stockMap.set(trade.symbol, trade.quantity);
      }
    });
    const mostActiveStock = Array.from(stockMap).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );
    return mostActiveStock;
  };

  const getWorstPerformer = () => {
    return worstPerformers.sort(
      (a, b) =>
        parseFloat(b.percentage_change) - parseFloat(a.percentage_change)
    );
  };

  const [mostActiveStock, activeStockQuantity] = getMostActiveStock();
  return (
    <div>
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Trading Dashboard</h1>
          <Select defaultValue="1D">
            <SelectTrigger className="w-[100px] bg-neutral-950 border border-zinc-800">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-950 border border-zinc-800">
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
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Funds
              </CardTitle>
              <DollarSign className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNepaliCurrency(funds)}
              </div>
              <p className="text-xs text-[#a3a2a3]">
                Total funds available for trading
              </p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Portfolio Value
              </CardTitle>
              <PieChart className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNepaliCurrency(portfolioValue)}
              </div>
              <p className="text-xs text-[#a3a2a3]">
                Total value of all stocks in the portfolio
              </p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit/Loss
              </CardTitle>
              <Activity className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNepaliCurrency(profitLoss)}
              </div>
              <p className="text-xs text-[#a3a2a3]">
                Total profit/loss from all trades
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 bg-neutral-950 border border-zinc-800">
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
                  {recentTrades.slice(0, 5).map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-medium">
                        {trade.symbol}
                      </TableCell>
                      <TableCell className="font-medium">
                        {
                          <span
                            className={`${
                              trade.action === "BUY"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {trade.action}
                          </span>
                        }
                      </TableCell>
                      <TableCell className="text-blue-500 font-medium">
                        {trade.quantity <= 10 ? (
                          <span className="text-orange-500">
                            {trade.quantity}
                          </span>
                        ) : trade.quantity < 50 ? (
                          <span className="text-yellow-500">
                            {trade.quantity}
                          </span>
                        ) : (
                          <span className="text-cyan-500">
                            {trade.quantity}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatNepaliCurrency(trade.unit_price)}
                      </TableCell>
                      <TableCell>{trade.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-5">
            <Card className="bg-neutral-950 border border-zinc-800">
              <CardHeader>
                <CardTitle>Worst Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {worstPerformers.map((stock) => (
                    <div key={stock.id} className="flex items-center">
                      <div className="w-16 font-medium">{stock.symbol}</div>
                      <div className="w-full bg-[#1d1d1d] rounded-full h-2.5">
                        <div
                          className="bg-red-500 h-2.5 rounded-full"
                          style={{
                            width: `${Math.abs(
                              parseFloat(stock.percentage_change)
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-12 text-right text-red-500 ml-2">
                        -{stock.percentage_change}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-950 border border-zinc-800">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bestPerformers.map((stock) => (
                    <div key={stock.id} className="flex items-center">
                      <div className="w-16 font-medium">{stock.symbol}</div>
                      <div className="w-full bg-[#1d1d1d] rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{
                            width: `${Math.abs(
                              parseFloat(stock.percentage_change)
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-12 text-right text-green-500 ml-2">
                        +{stock.percentage_change}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Day's Gain/Loss
              </CardTitle>
              <TrendingUp className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+$345.67</div>
              <p className="text-xs text-[#a3a2a3]">+2.34% today</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Most Active Stock
              </CardTitle>
              <ArrowUpRight className="h-6 w-6 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mostActiveStock}</div>
              <p className="text-xs text-[#a3a2a3]">
                {activeStockQuantity} shares traded
              </p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Biggest Loss
              </CardTitle>
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {getWorstPerformer()[0].symbol}
              </div>
              <p className="text-xs text-[#a3a2a3]">
                {getWorstPerformer()[0].percentage_change}% loss
              </p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Close
              </CardTitle>
              <Clock className="h-6 w-6 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2:59:59 PM</div>
              <p className="text-xs text-[#a3a2a3]">15 seconds remaining</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
