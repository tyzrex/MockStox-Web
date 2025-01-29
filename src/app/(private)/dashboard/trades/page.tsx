import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { format } from "date-fns";
import { transactionApi } from "@/services/api/mockstox-api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default async function TradesPage({
  searchParams,
}: {
  searchParams?: {
    page: string;
  };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const { response, error } = await transactionApi.getAllTransactions({
    page: page,
  });

  if (error || !response) {
    return <>Error</>;
  }

  //show latest trades first
  response.results.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
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
                  trade.action === "BUY" ? "bg-green-200" : "bg-red-200"
                } transition-colors border border-mockstox-secondary duration-200 hover:shadow-lg`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold text-black">
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
                    {trade.action === "BUY" ? "Bought" : "Sold"}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm  mb-2">
                    {format(new Date(trade.date), "MMMM d, yyyy")}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm font-medium ">Quantity</div>
                      <div className="text-lg font-semibold text-black">
                        {trade.quantity}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium ">Unit Price</div>
                      <div className="text-lg font-semibold text-black">
                        Rs. {parseFloat(trade.unit_price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-medium ">Total Value</div>
                    <div className="text-xl font-bold text-black">
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

      <div className="flex flex-row space-x-2">
        <div className="mt-6">
          <div className="flex justify-center">
            {response.previous && (
              <Button asChild disabled={!response.previous}>
                <Link
                  href={`/dashboard/trades?page=${page - 1}`}
                  className="px-4 py-2 rounded-lg"
                >
                  Previous
                </Link>
              </Button>
            )}
            {response.next && (
              <Button asChild disabled={!response.next}>
                <Link
                  href={`/dashboard/trades?page=${page + 1}`}
                  className="px-4 py-2 rounded-lg"
                >
                  Next
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
