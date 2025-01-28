import { StockCombobox } from "@/components/dashboard/stock-popover";
import PageHeader from "@/components/shared/page-header";
import { dashboardApi } from "@/services/api/mockstox-api";

export default async function StockAnalysis({
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
  const number_of_months = searchParams?.number_of_months;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (stockSymbol) {
    const { response, error } = await dashboardApi.getStockDetail({
      slug: stockSymbol,
      query: `year=${currentYear}&month=${currentMonth}`,
    });

    if (error || !response) {
      return <div>Error</div>;
    }

    stockHistoricalData = response;
  }

  console.log(stockHistoricalData);

  return (
    <>
      <PageHeader
        title="Technical Analysis"
        description="Select a stock to view its technical analysis."
      />
      <StockCombobox stocksList={response} />
    </>
  );
}
