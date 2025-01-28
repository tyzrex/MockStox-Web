import { DataTable } from "@/components/dashboard/stock-table";
import PageHeader from "@/components/shared/page-header";
import Pagination from "@/components/shared/pagination";
import { stockListColumns } from "@/schema/columns/stock-list-column";
import { dashboardApi } from "@/services/api/mockstox-api";
import { StockListItem } from "@/types/dashboard-api-types";
import { Suspense } from "react";

interface StocksPageProps {
  searchParams?: {
    page?: string;
  };
}

async function Stocks(props: StocksPageProps) {
  const page = props.searchParams?.page ? parseInt(props.searchParams.page) : 1;
  const { response, error } = await dashboardApi.getStocksList();
  if (error || !response) {
    return <>error</>;
  }

  console.log(response);

  return (
    <div>
      <PageHeader
        title="Stocks List"
        description="
        List of all stocks available for trading with their current prices.
      "
      />
      <DataTable<StockListItem> columns={stockListColumns} data={response} />
    </div>
  );
}

export default function StocksPage(props: StocksPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Stocks {...props} />
    </Suspense>
  );
}
