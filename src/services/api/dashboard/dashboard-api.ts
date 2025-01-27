import { BaseApi, buildPageParam, ISessionService } from "../base-api";
import {
  StockData,
  StockListItem,
  StockPrediction,
} from "@/types/dashboard-api-types";

export class DashboardApi extends BaseApi {
  constructor(sessionService: ISessionService) {
    super(sessionService);
  }

  async getUserDashboardData() {
    return this.handleServerQuery<any>({
      query: "user/dashboard",
      cache: "no-store",
      isProtected: true,
    });
  }

  async getStocksList(page?: number) {
    return this.handleServerQuery<StockListItem[]>({
      query: "stocks/list",
      param: page ? buildPageParam(page) : "",
      cache: "no-store",
      isProtected: true,
    });
  }

  async getStockDetail({ slug, query }: { slug: string; query?: string }) {
    return this.handleServerQuery<StockData>({
      query: `stocks/detail/${slug}?${query}`,
      cache: "no-store",
      isProtected: true,
      tags: ["stock-detail"],
    });
  }

  async getStocksBySector({ sector }: { sector: string }) {
    return this.handleServerQuery<any[]>({
      query: `stocks/list?sector=${sector}`,
      cache: "no-store",
      isProtected: true,
    });
  }

  async getUserFunds() {
    return this.handleServerQuery<any>({
      query: "user/get-funds",
      cache: "no-store",
      isProtected: true,
      tags: ["user-funds"],
    });
  }

  async loadUserFund({ amount }: { amount: number }) {
    return this.handleServerAction<any, any>({
      endpoint: "user/load-funds/",
      method: "POST",
      data: { amount },
      revalidateTagName: "user-funds",
      successMessage: "Funds loaded successfully.",
      isProtected: true,
    });
  }

  async getPredictionBySymbol({ symbol }: { symbol: string }) {
    return this.handleServerQuery<StockPrediction>({
      query: `ml/predict?symbol=${symbol}`,
      cache: "no-store",
      isProtected: true,
    });
  }
}
