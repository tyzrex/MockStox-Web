import MyPortfolio from "@/components/dashboard/profile/portfolio";
import { getSectorFromSymbol } from "@/lib/utils";
import { dashboardApi, transactionApi } from "@/services/api/mockstox-api";

export default async function PortfolioPage() {
  const [
    { response: portfolioResponse, error: portfolioError },
    { response: transactionResponse, error: transactionError },
  ] = await Promise.all([
    dashboardApi.getPortfolio(),
    transactionApi.getAllTransactions(),
  ]);

  if (
    portfolioError ||
    transactionError ||
    !portfolioResponse ||
    !transactionResponse
  ) {
    return null;
  }

  return (
    <MyPortfolio
      holdings={portfolioResponse.results[0].stocks.map((stock) => ({
        symbol: stock.symbol,
        quantity: stock.quantity,
        sector: getSectorFromSymbol(stock.symbol),
        name: stock.symbol,
        value: stock.quantity * Number(stock.buying_price),
        buying_price: stock.buying_price,
        bought_at: stock.created_at,
      }))}
      recent_transactions={transactionResponse.results}
    />
  );
}
