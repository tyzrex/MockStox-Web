import { AuthApi } from "./auth/auth-api";
import { SessionService } from "./base-api";
import { DashboardApi } from "./dashboard/dashboard-api";
import { TransactionApi } from "./transaction/transaction-api";

const sessionService = new SessionService();
export const authApi = new AuthApi();
export const dashboardApi = new DashboardApi(sessionService);
export const transactionApi = new TransactionApi(sessionService);
