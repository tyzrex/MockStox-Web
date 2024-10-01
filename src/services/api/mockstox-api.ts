import { SessionService } from "./base-api";
import { DashboardApi } from "./dashboard/dashboard-api";

const sessionService = new SessionService();
export const dashboardApi = new DashboardApi(sessionService);
