import Dashboard from "@/components/dashboard/dashboard-page/dashboard-page";
import { dashboardApi } from "@/services/api/mockstox-api";

export default async function Page() {
  const { response, error } = await dashboardApi.getUserDashboardData();
  if (error || !response) {
    console.error(error);
    return null;
  }

  return (
    <Dashboard
      funds={response.funds}
      portfolioValue={response.portfolio_value}
      profitLoss={response.profit_or_loss}
      worstPerformers={response.worst_performers}
      bestPerformers={response.top_performers}
      recentTrades={response.recent_transactions}
    />
  );
}
