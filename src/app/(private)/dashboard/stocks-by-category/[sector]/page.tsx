import { DataTable } from "@/components/dashboard/stock-table";
import { stockListColumns } from "@/schema/columns/stock-list-column";
import { dashboardApi } from "@/services/api/mockstox-api";
import { StockListItem } from "@/types/dashboard-api-types";
import { Suspense } from "react";

interface StockByCategoryPage {
  params: {
    sector: string;
  };
}

async function Stocks(props: StockByCategoryPage) {
  const { response, error } = await dashboardApi.getStocksBySector({
    sector: props.params.sector,
  });
  if (error || !response) {
    return <>error</>;
  }

  console.log(response);

  return (
    <>
      <DataTable<StockListItem> columns={stockListColumns} data={response} />
    </>
  );
}

export default function StocksPage(props: StockByCategoryPage) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Stocks {...props} />
    </Suspense>
  );
}
