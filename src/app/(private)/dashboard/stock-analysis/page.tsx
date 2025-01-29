import StockAnalysis from "@/components/dashboard/stock-analysis";
import { StockCombobox } from "@/components/dashboard/stock-popover";
import PageHeader from "@/components/shared/page-header";
import { dashboardApi } from "@/services/api/mockstox-api";
import { FormattedHistory } from "@/types/dashboard-api-types";
import {
  calculateRSI,
  calculateSMA,
  identifyPatterns,
} from "../../../../../utils/indicators";

export default async function StockAnalysisPage({
  searchParams,
}: {
  searchParams?: { stock: string; number_of_months?: string };
}) {
  const { response, error } = await dashboardApi.getStocksList();

  if (error || !response) {
    return <div>Error</div>;
  }

  const stockSymbol = searchParams?.stock;
  let stockHistoricalData = null;
  const number_of_months = searchParams?.number_of_months || 12;

  let patterns, sma20, sma50, sma200, rsi;

  if (stockSymbol) {
    //from todays date get the 6 months back date
    const date = new Date();
    date.setMonth(date.getMonth() - Number(number_of_months));
    const sixMonthsBack = date.toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];

    console.log(sixMonthsBack, today);

    const { response, error } = await dashboardApi.getStockHistoryByDate({
      slug: stockSymbol,
      from: sixMonthsBack,
      to: today,
    });

    if (error || !response) {
      return <div>Error</div>;
    }

    const formattedHistory: FormattedHistory[] = Object.entries(
      response.history
    ).map(([date, values]) => ({
      date,
      open: parseFloat(values.open),
      close: parseFloat(values.close),
      low: parseFloat(values.low),
      high: parseFloat(values.high),
      volume: parseInt(values.volume),
    }));

    stockHistoricalData = formattedHistory;

    const closes = formattedHistory.map((d) => d.close);
    patterns = identifyPatterns(formattedHistory).map((p) => ({
      pattern: p.pattern,
      index: p.index,
      date: formattedHistory[p.index].date,
    }));
    sma20 = calculateSMA(closes, 20) as number[];
    sma50 = calculateSMA(closes, 50) as number[];
    sma200 = calculateSMA(closes, 200) as number[];
    rsi = calculateRSI(closes) as number[];
  }

  return (
    <>
      <PageHeader
        title="Technical Analysis"
        description="Select a stock to view its technical analysis."
      />
      <StockCombobox stocksList={response} />
      {stockHistoricalData && sma20 && sma50 && sma200 && rsi && patterns && (
        <StockAnalysis
          stocksData={stockHistoricalData}
          rsi={rsi}
          sma20={sma20}
          sma50={sma50}
          patterns={patterns}
        />
      )}
    </>
  );
}
