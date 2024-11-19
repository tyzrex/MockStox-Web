// "use client";

// import { useState } from "react";
// import {
//   CandlestickChart,
//   Heart,
//   ArrowUpRight,
//   ArrowDownRight,
// } from "lucide-react";
// import dynamic from "next/dynamic";
// import PriceRangeChart from "./charts/volume-chart";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   buyStock,
//   sellStock,
// } from "@/services/api/transaction/transaction-actions";
// import { toast } from "sonner";
// import { showErrorToasts } from "@/lib/utils";
// import DateSelector from "./date-picker";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// // Helper function to format the history data for chart use
// const formatHistoryData = (history: any) => {
//   return Object.keys(history).map((date) => {
//     const { open, high, low, close } = history[date];
//     return {
//       x: new Date(date).getTime(),
//       y: [
//         parseFloat(open),
//         parseFloat(high),
//         parseFloat(low),
//         parseFloat(close),
//       ],
//     };
//   });
// };

// export default function Component({
//   mockData,
//   slug,
// }: {
//   mockData: any;
//   slug: string;
// }) {
//   console.log(mockData);
//   const [activeTimeframe, setActiveTimeframe] = useState("Month");

//   const formattedHistory = formatHistoryData(mockData.history);
//   console.log(formattedHistory);
//   //   const latestPrice = parseFloat(
//   //     formattedHistory[formattedHistory.length - 1].y[3]
//   //   );
//   //   const previousClose = parseFloat(
//   //     formattedHistory[formattedHistory.length - 2].y[3]
//   //   );
//   //   const priceChange = latestPrice - previousClose;
//   //   const percentageChange = (priceChange / previousClose) * 100;

//   const chartOptions: ApexCharts.ApexOptions = {
//     chart: {
//       type: "candlestick",
//       height: 350,
//     },
//     title: {
//       text: "CandleStick Chart",
//       align: "left",
//       style: {
//         color: "#FFFFFF", // Set title color to white
//       },
//     },
//     xaxis: {
//       type: "datetime",
//       labels: {
//         style: {
//           colors: "#FFFFFF", // Set x-axis label color to white
//         },
//       },
//     },
//     yaxis: {
//       labels: {
//         style: {
//           colors: "#FFFFFF", // Set y-axis label color to white
//         },
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     tooltip: {
//       theme: "dark",
//     },
//   };

//   const chartSeries = [
//     {
//       data: formattedHistory,
//     },
//   ];

//   const [buyQuantity, setBuyQuantity] = useState(0);
//   const [sellQuantity, setSellQuantity] = useState(0);

//   const handleTrade = async (type: "buy" | "sell") => {
//     let response;
//     if (type === "buy") {
//       response = await buyStock({
//         stockSymbol: slug,
//         quantity: buyQuantity,
//       });
//     } else {
//       response = await sellStock({
//         stockSymbol: slug,
//         quantity: sellQuantity,
//       });
//     }
//     if (response.success) {
//       toast.success(response.message);
//       setBuyQuantity(0);
//       setSellQuantity(0);
//     } else {
//       showErrorToasts(response.errorData);
//     }
//   };

//   return (
//     <div className="grid grid-cols-3 gap-20">
//       <div className="col-span-2">
//         <div className=" ">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold">{mockData.symbol}</h1>
//             </div>
//             <button className="text-gray-400">
//               <Heart />
//             </button>
//           </div>

//           {/* Price and change */}
//           {/* <div className="mb-6">
//             <div className="text-4xl font-bold">${latestPrice.toFixed(2)}</div>
//             <div
//               className={`flex items-center ${
//                 priceChange >= 0 ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {priceChange >= 0 ? (
//                 <ArrowUpRight size={20} />
//               ) : (
//                 <ArrowDownRight size={20} />
//               )}
//               <span className="ml-1">
//                 {Math.abs(priceChange).toFixed(2)} (
//                 {percentageChange.toFixed(2)}%)
//               </span>
//             </div>
//           </div> */}

//           {/* Timeframe selector */}
//           <div className="flex space-x-4 mb-6">
//             <DateSelector />
//           </div>

//           {/* Chart */}
//           <div className="h-96 mb-6">
//             <Chart
//               options={chartOptions}
//               series={chartSeries}
//               type="candlestick"
//               height="100%"
//             />
//           </div>

//           <div className="h-96 mb-6">
//             <PriceRangeChart data={mockData.history} />
//           </div>

//           {/* Stock info */}
//         </div>
//       </div>

//       {/* Right sidebar */}
//       <div className="col-span-1 border border-gray-600 rounded-2xl p-6">
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Trade</h2>

//           <div className="my-5">
//             <div>
//               <h2 className="text-xl font-semibold mb-2">Overview</h2>
//               <p>My Stocks: {mockData.number_of_stocks}</p>
//             </div>
//           </div>

//           <div className="flex justify-between mb-2">
//             <span className="text-black">Buy</span>
//             {/* <span className="font-semibold">${latestPrice.toFixed(2)}</span> */}
//           </div>
//           <Input
//             type="number"
//             value={buyQuantity}
//             onChange={(e) => setBuyQuantity(+e.target.value)}
//           />
//           <Button
//             onClick={() => handleTrade("buy")}
//             className="w-full mt-5 text-white py-2 rounded font-semibold"
//           >
//             Buy
//           </Button>
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Sell for</h2>
//           <div className="flex justify-between mb-2">
//             <span>Sell</span>
//             {/* <span className="font-semibold">${latestPrice.toFixed(2)}</span> */}
//           </div>
//           <Input
//             value={sellQuantity}
//             type="number"
//             onChange={(e) => setSellQuantity(+e.target.value)}
//           />
//           <Button
//             onClick={() => handleTrade("sell")}
//             className="w-full mt-5 bg-gray-200 hover:text-white text-gray-800 py-2 rounded font-semibold"
//           >
//             Sell
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  BarChart3,
  Globe,
  Clock,
  Newspaper,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import {
  buyStock,
  sellStock,
} from "@/services/api/transaction/transaction-actions";
import { toast } from "sonner";
import { showErrorToasts } from "@/lib/utils";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Helper function to format the history data for chart use
const formatHistoryData = (history: any) => {
  return Object.keys(history).map((date) => {
    const { open, high, low, close, volume } = history[date];
    return {
      date: new Date(date).toLocaleDateString(),
      x: new Date(date).getTime(),
      y: [
        parseFloat(open),
        parseFloat(high),
        parseFloat(low),
        parseFloat(close),
      ],
      volume: parseInt(volume),
    };
  });
};

// Helper function to convert USD to NPR
const usdToNpr = (usd: number) => {
  const exchangeRate = 132.5; // 1 USD = 132.5 NPR (approximate)
  return (usd * exchangeRate).toFixed(2);
};

const formatNpr = (amount: number) => {
  return new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
};

export default function Component({
  mockData,
  slug,
}: {
  mockData: any;
  slug: string;
}) {
  const [activeTimeframe, setActiveTimeframe] = useState("1M");
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);

  const formattedHistory = formatHistoryData(mockData.history);
  const latestPrice = parseFloat(
    formattedHistory[formattedHistory.length - 1].y[3].toString()
  );
  const previousClose = parseFloat(
    formattedHistory[formattedHistory.length - 2].y[3].toString()
  );
  const priceChange = latestPrice - previousClose;
  const percentageChange = (priceChange / previousClose) * 100;

  const candlestickOptions: ApexCharts.ApexOptions = {
    chart: { type: "candlestick", toolbar: { show: false } },
    title: { text: "Stock Price", align: "left", style: { color: "#e5ebeb" } },
    xaxis: { type: "datetime", labels: { style: { colors: "#e5ebeb" } } },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: "#e5ebeb" } },
    },
    tooltip: { theme: "dark" },
    grid: { borderColor: "#2d2d2d" },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#d5e14e",
          downward: "#ff4d4f",
        },
      },
    },
  };

  const candlestickSeries = [
    { data: formattedHistory.map((item) => ({ x: item.x, y: item.y })) },
  ];

  const handleTrade = async (type: "buy" | "sell") => {
    if (type === "buy") {
      const response = await buyStock({
        quantity: buyQuantity,
        stockSymbol: slug,
      });
      if (response.success) {
        toast.success(response.message);
      } else {
        showErrorToasts(response.errorData);
      }
    } else {
      const response = await sellStock({
        quantity: buyQuantity,
        stockSymbol: slug,
      });
      if (response.success) {
        toast.success(response.message);
      } else {
        showErrorToasts(response.errorData);
      }
    }
  };

  const marketSummary = [
    { index: "NEPSE", value: 2145.67, change: 15.23 },
    { index: "SENSITIVE", value: 412.89, change: -3.45 },
    { index: "FLOAT", value: 156.78, change: 2.11 },
  ];

  const recentNews = [
    {
      title: "Nepal Stock Exchange implements new trading system",
      time: "2 hours ago",
    },
    {
      title: "Government announces new policies to boost capital market",
      time: "5 hours ago",
    },
    { title: "Top performing stocks of the week", time: "1 day ago" },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-6 p-6"
      style={{ backgroundColor: "#1d1d1d", color: "#e5ebeb" }}
    >
      <div className="col-span-3 space-y-6">
        <Card className="bg-[#2d2d2d] border-[#3d3d3d]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              {mockData.symbol}
            </CardTitle>
            <Button variant="ghost" size="icon" style={{ color: "#a3a2a3" }}>
              <Heart className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {formatNpr(parseFloat(usdToNpr(latestPrice)))}
            </div>
            <div
              className={`flex items-center ${
                priceChange >= 0 ? "text-[#d5e14e]" : "text-[#ff4d4f]"
              }`}
            >
              {priceChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span className="ml-1">
                {formatNpr(Math.abs(parseFloat(usdToNpr(priceChange))))} (
                {percentageChange.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2d2d2d] border-[#3d3d3d]">
          <CardHeader>
            <CardTitle>Price Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="candlestick" className="space-y-4">
              <TabsList className="bg-[#3d3d3d]">
                <TabsTrigger
                  value="candlestick"
                  className="data-[state=active]:bg-[#d5e14e] data-[state=active]:text-[#1d1d1d]"
                >
                  Candlestick
                </TabsTrigger>
                <TabsTrigger
                  value="line"
                  className="data-[state=active]:bg-[#d5e14e] data-[state=active]:text-[#1d1d1d]"
                >
                  Line
                </TabsTrigger>
                <TabsTrigger
                  value="area"
                  className="data-[state=active]:bg-[#d5e14e] data-[state=active]:text-[#1d1d1d]"
                >
                  Area
                </TabsTrigger>
              </TabsList>
              <TabsContent value="candlestick">
                <div className="h-[400px]">
                  <Chart
                    options={candlestickOptions}
                    series={candlestickSeries}
                    type="candlestick"
                    height="100%"
                  />
                </div>
              </TabsContent>
              <TabsContent value="line">
                <div className="h-full">
                  <ChartContainer
                    config={{
                      price: {
                        label: "Price",
                        color: "#d5e14e",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={formattedHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3d3d3d" />
                        <XAxis dataKey="date" stroke="#e5ebeb" />
                        <YAxis stroke="#e5ebeb" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="y[3]"
                          stroke="#d5e14e"
                          name="Price"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>
              <TabsContent value="area">
                <div className="h-full">
                  <ChartContainer
                    config={{
                      price: {
                        label: "Price",
                        color: "#d5e14e",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={formattedHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3d3d3d" />
                        <XAxis dataKey="date" stroke="#e5ebeb" />
                        <YAxis stroke="#e5ebeb" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="y[3]"
                          stroke="#d5e14e"
                          fill="#d5e14e"
                          fillOpacity={0.2}
                          name="Price"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-[#2d2d2d] border-[#3d3d3d]">
          <CardHeader>
            <CardTitle>Volume Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-full">
              <ChartContainer
                config={{
                  volume: {
                    label: "Volume",
                    color: "#a3a2a3",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formattedHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3d3d3d" />
                    <XAxis dataKey="date" stroke="#e5ebeb" />
                    <YAxis stroke="#e5ebeb" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="volume" fill="#a3a2a3" name="Volume" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-[#2d2d2d] border-[#3d3d3d]">
          <CardHeader>
            <CardTitle>Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="buy-quantity"
                >
                  Buy Quantity
                </label>
                <Input
                  id="buy-quantity"
                  type="number"
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(+e.target.value)}
                  className="bg-[#3d3d3d] border-[#4d4d4d] text-[#e5ebeb]"
                />
                <Button
                  onClick={() => handleTrade("buy")}
                  className="w-full mt-2 bg-[#d5e14e] text-[#1d1d1d] hover:bg-[#c5d13e]"
                >
                  Buy
                </Button>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="sell-quantity"
                >
                  Sell Quantity
                </label>
                <Input
                  id="sell-quantity"
                  type="number"
                  value={sellQuantity}
                  onChange={(e) => setSellQuantity(+e.target.value)}
                  className="bg-[#3d3d3d] border-[#4d4d4d] text-[#e5ebeb]"
                />
                <Button
                  onClick={() => handleTrade("sell")}
                  variant="outline"
                  className="w-full mt-2 border-[#d5e14e] text-black hover:bg-[#d5e14e] hover:text-[#1d1d1d]"
                >
                  Sell
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2d2d2d] border-[#3d3d3d]">
          <CardHeader>
            <CardTitle>Stock Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Owned Stocks</span>
                <span className="font-semibold">
                  {/* {formatNpr(parseFloat(usdToNpr(mockData.market_cap / 1e9)))} B */}
                  {mockData.number_of_stocks}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2d2d2d] ">
          <CardHeader>
            <CardTitle>Key Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-2 bg-[#3d3d3d] rounded-lg">
                <DollarSign className="h-6 w-6 mb-2 text-[#d5e14e]" />
                <span className="text-sm">Revenue</span>
                <span className="font-semibold">
                  {formatNpr(parseFloat(usdToNpr(mockData.revenue / 1e9)))} B
                </span>
              </div>
              <div className="flex flex-col items-center p-2 bg-[#3d3d3d] rounded-lg">
                <TrendingUp className="h-6 w-6 mb-2 text-[#d5e14e]" />
                <span className="text-sm">Growth</span>
                <span className="font-semibold">
                  {(mockData.growth * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex flex-col items-center p-2 bg-[#3d3d3d] rounded-lg">
                <BarChart3 className="h-6 w-6 mb-2 text-[#d5e14e]" />
                <span className="text-sm">Volatility</span>
                <span className="font-semibold">
                  {(mockData.volatility * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex flex-col items-center p-2 bg-[#3d3d3d] rounded-lg">
                <DollarSign className="h-6 w-6 mb-2 text-[#d5e14e]" />
                <span className="text-sm">Dividend</span>
                <span className="font-semibold">
                  {formatNpr(parseFloat(usdToNpr(mockData.dividend)))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2d2d2d] border-[#3d3d3d]">
          <CardHeader>
            <CardTitle>Recent News</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentNews.map((news, index) => (
                <li key={index} className="border-b border-[#3d3d3d] pb-2">
                  <div className="font-semibold">{news.title}</div>
                  <div className="text-sm text-[#a3a2a3] flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {news.time}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
