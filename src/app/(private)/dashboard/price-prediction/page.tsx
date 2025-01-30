import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import StockPredictionClient from "@/components/dashboard/prediction/prediction";
import { dashboardApi } from "@/services/api/mockstox-api";
import StockSeletion from "@/components/dashboard/prediction/stock-selection";
import PageHeader from "@/components/shared/page-header";

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

  const number_of_months = 12;
  const date = new Date();
  date.setMonth(date.getMonth() - number_of_months);
  const sixMonthsBack = date.toISOString().split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  const { response, error } = await dashboardApi.getStockHistoryByDate({
    slug: symbol,
    from: sixMonthsBack,
    to: today,
  });

  if (error || !response) {
    return (
      <div>
        <h2 className="text-2xl font-bold">Error</h2>
        <h1>
          No data available for {symbol} in {number_of_months}
        </h1>
      </div>
    );
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
          <PageHeader
            title={`${symbol} Predicted Prices`}
            description="Predicted prices of the selected stock for the next 15 days."
          />

          <Suspense
            key={symbol}
            fallback={
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }
          >
            <StockPrediction symbol={symbol} />
          </Suspense>
        </>
      )}
    </div>
  );
}
