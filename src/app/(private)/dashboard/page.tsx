import Dashboard from "@/components/dashboard/dashboard-page/dashboard-page";
import { dashboardApi } from "@/services/api/mockstox-api";

export default async function Page() {
  const { response, error } = await dashboardApi.getUserDashboardData();
  if (error) {
    console.error(error);
    return null;
  }

  console.log(response);
  return (
    <Dashboard
      funds={response.funds}
      portfolioValue={response.portfolio_value}
      profitLoss={response.profitLoss}
      worstPerformers={response.worst_performers}
      bestPerformers={response.top_performers}
      recentTrades={response.recent_transactions}
    />
  );
}
