import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { format } from "date-fns";
import { transactionApi } from "@/services/api/mockstox-api";

interface Trade {
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

// const trades: Trade[] = [
//   {
//     id: 1,
//     created_at: "2024-10-01T22:51:53.427031+05:45",
//     updated_at: null,
//     deleted_at: null,
//     quantity: 5,
//     symbol: "NABIL",
//     unit_price: "568.00",
//     date: "2024-10-01",
//     action: "BUY",
//     user: 1,
//   },
//   {
//     id: 2,
//     created_at: "2024-10-01T22:52:58.513275+05:45",
//     updated_at: null,
//     deleted_at: null,
//     quantity: 2,
//     symbol: "NABIL",
//     unit_price: "568.00",
//     date: "2024-10-01",
//     action: "SELL",
//     user: 1,
//   },
//   {
//     id: 3,
//     created_at: "2024-10-02T05:10:16.873140+05:45",
//     updated_at: null,
//     deleted_at: null,
//     quantity: 5,
//     symbol: "NABIL",
//     unit_price: "568.00",
//     date: "2024-10-02",
//     action: "BUY",
//     user: 1,
//   },
//   {
//     id: 4,
//     created_at: "2024-10-02T05:23:49.457693+05:45",
//     updated_at: null,
//     deleted_at: null,
//     quantity: 100,
//     symbol: "ACLBSL",
//     unit_price: "1030.00",
//     date: "2024-10-02",
//     action: "BUY",
//     user: 1,
//   },
//   {
//     id: 5,
//     created_at: "2024-10-02T05:30:47.348321+05:45",
//     updated_at: null,
//     deleted_at: null,
//     quantity: 232,
//     symbol: "ACLBSL",
//     unit_price: "1030.00",
//     date: "2024-10-02",
//     action: "BUY",
//     user: 1,
//   },
//   {
//     id: 6,
//     created_at: "2024-10-02T05:30:50.404622+05:45",
//     updated_at: null,
//     deleted_at: null,
//     quantity: 233,
//     symbol: "ACLBSL",
//     unit_price: "1030.00",
//     date: "2024-10-02",
//     action: "SELL",
//     user: 1,
//   },
//   {
//     id: 7,
//     created_at: "2024-10-02T05:43:04.475172+05:45",
//     updated_at: null,
//     deleted_at: null,
//     quantity: 233,
//     symbol: "CHDC",
//     unit_price: "1804.80",
//     date: "2024-10-02",
//     action: "BUY",
//     user: 1,
//   },
// ];

export default async function TradesPage() {
  const { response, error } = await transactionApi.getAllTransactions();

  if (error || !response) {
    return <>Error</>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Trades</h1>

      {response.results.length === 0 ? (
        <div>
          <h1 className="text-3xl font-bold">No trades done yet</h1>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {response.results.map((trade) => (
              <Card
                key={trade.id}
                className={`${
                  trade.action === "BUY" ? "bg-green-100" : "bg-red-100"
                } transition-colors duration-200 hover:shadow-lg`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">
                    {trade.symbol}
                  </CardTitle>
                  <div
                    className={`flex items-center ${
                      trade.action === "BUY" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {trade.action === "BUY" ? (
                      <ArrowDownIcon className="mr-1" />
                    ) : (
                      <ArrowUpIcon className="mr-1" />
                    )}
                    {trade.action}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 mb-2">
                    {format(new Date(trade.date), "MMMM d, yyyy")}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Quantity
                      </div>
                      <div className="text-lg font-semibold">
                        {trade.quantity}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Unit Price
                      </div>
                      <div className="text-lg font-semibold">
                        Rs. {parseFloat(trade.unit_price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-500">
                      Total Value
                    </div>
                    <div className="text-xl font-bold">
                      Rs.{" "}
                      {(trade.quantity * parseFloat(trade.unit_price)).toFixed(
                        2
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
