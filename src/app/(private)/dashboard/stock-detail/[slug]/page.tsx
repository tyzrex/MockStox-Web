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
  };
}

async function StockDetailContainer(props: StockDetailPageProps) {
  console.log(props.params.slug);
  const year = props.searchParams?.year ?? new Date().getFullYear().toString();
  const month =
    props.searchParams?.month ?? new Date().getMonth().toString() + 1;
  const stockDetail = Stocks.filter(
    (stock) => stock.symbol === props.params.slug
  );

  const { response, error } = await dashboardApi.getStockDetail({
    slug: props.params.slug,
    query: `year=${year}&month=${month}`,
  });

  console.log(response);

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
