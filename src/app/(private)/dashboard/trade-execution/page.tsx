import StockTrade from "@/components/dashboard/stock-trader";
import { dashboardApi } from "@/services/api/mockstox-api";

export default async function TradeExecutionPage() {
  const { response, error } = await dashboardApi.getStocksList();

  if (error || !response) {
    return <div>Error</div>;
  }

  return <StockTrade stocks={response} />;
}
