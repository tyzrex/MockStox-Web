import { CompanyInfoCard } from "@/components/dashboard/stock-detail/company-detail";
import StockChart from "@/components/dashboard/stock-detail/stock-chart";
import { dashboardApi } from "@/services/api/mockstox-api";
import { FormattedHistory } from "@/types/dashboard-api-types";
import { Suspense } from "react";
import Stocks from "@/../stocks_data.json";
import StockAnalysis from "@/app/(private)/dashboard/stock-analysis/page";

interface StockDetailPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    year: string;
    month: string;
    number_of_months?: string;
  };
}

async function StockDetailContainer(props: StockDetailPageProps) {
  const year = props.searchParams?.year ?? new Date().getFullYear().toString();
  const month =
    props.searchParams?.month ?? new Date().getMonth().toString() + 1;
  const stockDetail = Stocks.filter(
    (stock) => stock.symbol === props.params.slug
  );
  const number_of_months = props.searchParams?.number_of_months
    ? parseInt(props.searchParams.number_of_months)
    : 6;
  const date = new Date();
  date.setMonth(date.getMonth() - number_of_months);
  const sixMonthsBack = date.toISOString().split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  const { response, error } = await dashboardApi.getStockHistoryByDate({
    slug: props.params.slug,
    from: sixMonthsBack,
    to: today,
  });

  if (error || !response) {
    return (
      <div>
        <h2 className="text-2xl font-bold">Error</h2>
        <h1>
          No data available for {props.params.slug} in {year}-{month}
        </h1>
      </div>
    );
  }

  const { response: PortfolioResponse, error: PortfolioError } =
    await dashboardApi.getPortfolio();

  if (PortfolioError || !PortfolioResponse) {
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

  return (
    <div className="py-5 space-y-6">
      <StockChart
        stockHolding={PortfolioResponse?.results}
        number_of_stocks={response.number_of_stocks}
        history={formattedHistory}
        symbol={response.symbol}
      />

      <CompanyInfoCard company={stockDetail[0]} />
    </div>
  );
}

export default function StockDetailPage(props: StockDetailPageProps) {
  return (
    <Suspense
      key={
        props.params.slug &&
        props.searchParams?.year &&
        props.searchParams?.month
      }
      fallback={<div>Loading...</div>}
    >
      <StockDetailContainer {...props} />
    </Suspense>
  );
}
