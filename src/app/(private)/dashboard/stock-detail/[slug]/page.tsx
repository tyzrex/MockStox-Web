import StockChart from "@/components/dashboard/stock-detail/stock-chart";
import { dashboardApi } from "@/services/api/mockstox-api";

interface StockDetailPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    year: string;
    month: string;
  };
}

export default async function StockDetailPage(props: StockDetailPageProps) {
  console.log(props.params.slug);
  const year = props.searchParams?.year;
  const month = props.searchParams?.month;
  const { response, error } = await dashboardApi.getStockDetail({
    slug: props.params.slug,
    query: `year=${year}&month=${month}`,
  });
  return (
    <>
      <StockChart mockData={response} />
    </>
  );
}
