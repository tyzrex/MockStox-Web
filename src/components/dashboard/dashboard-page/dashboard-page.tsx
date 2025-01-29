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
import { formatNepaliCurrency } from "@/lib/utils";

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
  console.log(
    funds,
    portfolioValue,
    profitLoss,
    worstPerformers.length,
    bestPerformers.length,
    recentTrades
  );
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
    const mostActiveStock =
      stockMap.size > 0
        ? Array.from(stockMap).reduce((a, b) => (a[1] > b[1] ? a : b))
        : ["", 0];
    return mostActiveStock;
  };

  const getWorstPerformer = () => {
    return worstPerformers.length > 0
      ? worstPerformers.reduce((worst, current) =>
          Number.parseFloat(current.percentage_change) <
          Number.parseFloat(worst.percentage_change)
            ? current
            : worst
        )
      : { symbol: "", percentage_change: "" };
  };

  const getBestPerformer = () => {
    return bestPerformers.length > 0
      ? bestPerformers.reduce((best, current) =>
          Number.parseFloat(current.percentage_change) >
          Number.parseFloat(best.percentage_change)
            ? current
            : best
        )
      : { symbol: "", percentage_change: "" };
  };

  const [mostActiveStock, activeStockQuantity] = getMostActiveStock();
  return (
    <div>
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Trading Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="">
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
              <p className="text-xs">Total funds available for trading</p>
            </CardContent>
          </Card>
          <Card className="">
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
              <p className="text-xs">
                Total value of all stocks in the portfolio
              </p>
            </CardContent>
          </Card>
          <Card className="">
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
              <p className="text-xs">Total profit/loss from all trades</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 ">
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
                  {recentTrades.length > 0 ? (
                    recentTrades.slice(0, 5).map((trade) => (
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No recent trades
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Worst Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {worstPerformers.length === 0 ? (
                    <div className="text-center text-gray-500 font-medium">
                      No stocks available
                    </div>
                  ) : (
                    worstPerformers
                      .sort(
                        (a, b) =>
                          Number.parseFloat(a.percentage_change) -
                          Number.parseFloat(b.percentage_change)
                      )
                      .slice(0, 3)
                      .map((stock) => (
                        <div
                          key={stock.id}
                          className="flex items-center justify-between"
                        >
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="flex items-center">
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-500 font-medium">
                              {stock.percentage_change}%
                            </span>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {bestPerformers.length === 0 ? (
                    <div className="text-center text-gray-500 font-medium">
                      No stocks available
                    </div>
                  ) : (
                    bestPerformers
                      .sort(
                        (a, b) =>
                          Number.parseFloat(b.percentage_change) -
                          Number.parseFloat(a.percentage_change)
                      )
                      .slice(0, 3)
                      .map((stock) => (
                        <div
                          key={stock.id}
                          className="flex items-center justify-between"
                        >
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="flex items-center">
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">
                              {stock.percentage_change}%
                            </span>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Most Active Stock
              </CardTitle>
              <ArrowUpRight className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mostActiveStock === "" ? "No stocks" : mostActiveStock}
              </div>
              <p className="text-xs">{activeStockQuantity} shares traded</p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Biggest Loss
              </CardTitle>
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {getWorstPerformer().symbol || "No stocks"}
              </div>
              <p className="text-xs">
                {getWorstPerformer().percentage_change || "No history"}
              </p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Biggest Gain
              </CardTitle>
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {getBestPerformer().symbol || "No stocks"}
              </div>
              <p className="text-xs">
                {getBestPerformer().percentage_change || "No history"}
              </p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Market Status
              </CardTitle>
              <Clock className="h-6 w-6 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              <p
                className={
                  new Date().getHours() < 11
                    ? `text-green-500 text-xs`
                    : new Date().getHours() > 15
                    ? `text-red-500 text-xs`
                    : `text-primary-accent`
                }
              >
                {/* closes at 3pm opens at 11am*/}
                {new Date().getHours() < 11
                  ? `Opens in ${11 - new Date().getHours()} hours`
                  : new Date().getHours() > 15
                  ? `Closed`
                  : `Closes in ${15 - new Date().getHours()} hours`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
