import { DataTable } from "@/components/dashboard/stock-table";
import PageHeader from "@/components/shared/page-header";
import Pagination from "@/components/shared/pagination";
import { stockListColumns } from "@/schema/columns/stock-list-column";
import { watchListColumns } from "@/schema/columns/watch-list-column";
import { dashboardApi } from "@/services/api/mockstox-api";
import { StockListItem } from "@/types/dashboard-api-types";
import { Suspense } from "react";

interface WatchListPageProps {
  searchParams?: {
    page?: string;
  };
}

async function WatchList(props: WatchListPageProps) {
  const page = props.searchParams?.page ? parseInt(props.searchParams.page) : 1;
  const { response, error } = await dashboardApi.getUserWatchlist();
  if (error || !response) {
    return <>error</>;
  }

  console.log(response);

  return (
    <div>
      <PageHeader
        title="Watch List"
        description="
        List of all stocks available for trading with their current prices.
      "
      />
      <DataTable<StockListItem> columns={watchListColumns} data={response} />
    </div>
  );
}

export default function WatchListPage(props: WatchListPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WatchList {...props} />
    </Suspense>
  );
}
