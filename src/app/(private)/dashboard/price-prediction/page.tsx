import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import StockPredictionClient from "@/components/dashboard/prediction/prediction";
import { dashboardApi } from "@/services/api/mockstox-api";
import StockSeletion from "@/components/dashboard/prediction/stock-selection";

interface StockPageProps {
  searchParams: { symbol?: string };
}

async function StockPrediction({ symbol }: { symbol: string }) {
  const data = await dashboardApi.getPredictionBySymbol({
    symbol: symbol,
  });

  if (!data.response || data.error) {
    return <div>Error loading prediction data</div>;
  }

  return (
    <>
      {symbol && !data ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <StockPredictionClient data={data.response} symbol={symbol} />
      )}
    </>
  );
}

export default async function StockPage({ searchParams }: StockPageProps) {
  const symbol = searchParams.symbol;

  const [availableStocks] = await Promise.all([
    dashboardApi.getStocksBySector({
      sector: "Commercial Banks",
    }),
  ]);

  if (!availableStocks.response || availableStocks.error) {
    return <div>Error loading available stocks</div>;
  }

  return (
    <div className="space-y-8 min-h-screen">
      <StockSeletion
        stocks={availableStocks?.response?.map((stock) => ({
          symbol: stock.symbol,
        }))}
      />
      {symbol && (
        <>
          <h1 className="text-3xl font-bold text-foreground">
            Stock Analysis: {symbol}
          </h1>

          <Suspense
            key={symbol}
            fallback={
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }
          >
            <StockPrediction symbol={symbol} />
            {/* <StockPredictionClient data={data} symbol={symbol} /> */}
          </Suspense>
        </>
      )}
    </div>
  );
}
