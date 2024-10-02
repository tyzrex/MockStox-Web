import StockChart from "@/components/dashboard/stock-detail/stock-chart";
import { dashboardApi } from "@/services/api/mockstox-api";
import { Suspense } from "react";

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
  const year = props.searchParams?.year ?? "2024";
  const month = props.searchParams?.month ?? "07";
  const { response, error } = await dashboardApi.getStockDetail({
    slug: props.params.slug,
    query: `year=${year}&month=${month}`,
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

  return (
    <>
      <StockChart mockData={response} slug={props.params.slug} />
    </>
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
