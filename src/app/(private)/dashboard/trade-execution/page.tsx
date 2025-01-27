import StockTrade from "@/components/dashboard/stock-trader";
import { dashboardApi, transactionApi } from "@/services/api/mockstox-api";

export default async function TradeExecutionPage() {
  const { response, error } = await dashboardApi.getStocksList();
  const orders = await transactionApi.getAllTransactions();
  if (orders.error || !orders.response) {
    return <div>Error</div>;
  }

  const soldOrders = orders.response?.results
    .filter((order) => order.action === "SELL")
    .slice(0, 5)
    .map((order) => ({
      price: order.unit_price,
      quantity: order.quantity,
    }));

  const boughtOrders = orders.response?.results
    .filter((order) => order.action === "BUY")
    .slice(0, 5)
    .map((order) => ({
      price: order.unit_price,
      quantity: order.quantity,
    }));

  if (error || !response) {
    return <div>Error</div>;
  }

  return (
    <StockTrade
      stocks={response}
      buyOrders={boughtOrders}
      sellOrders={soldOrders}
    />
  );
}
