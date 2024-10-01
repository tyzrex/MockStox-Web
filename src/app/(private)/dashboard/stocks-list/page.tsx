import { DataTable } from "@/components/dashboard/stock-table";
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
  const { response, error } = await dashboardApi.getStocksList({ page: page });
  if (error || !response) {
    return <>error</>;
  }

  const totalPages = Math.ceil(response.count / 25);
  return (
    <>
      <DataTable<StockListItem>
        columns={stockListColumns}
        data={response.results}
      />
      <Pagination
        currentPage={1}
        path="/dashboard/stocks-list"
        next={response.next}
        previous={response.previous}
        total_pages={totalPages}
      />
    </>
  );
}

export default function StocksPage(props: StocksPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Stocks {...props} />
    </Suspense>
  );
}
