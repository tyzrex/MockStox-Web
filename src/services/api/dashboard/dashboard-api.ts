import { BaseApi, buildPageParam, ISessionService } from "../base-api";
import {
  PortfolioObject,
  StockData,
  StockHolding,
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

  async getStockHistoryByDate({
    slug,
    from,
    to,
  }: {
    slug: string;
    from: string;
    to: string;
  }) {
    return this.handleServerQuery<StockData>({
      query: `stocks/range/${slug}?from=${from}&to=${to}`,
      cache: "no-store",
      isProtected: true,
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

  async getUserFundsClient() {
    return this.handleClientQuery<any>({
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
      // isProtected: true,
    });
  }

  async getPredictionBySymbolClientSide({ symbol }: { symbol: string }) {
    return this.handleClientQuery<StockPrediction>({
      query: `ml/predict?symbol=${symbol}`,
      cache: "no-store",
      // isProtected: true,
    });
  }

  async getPortfolio() {
    return this.handleServerQuery<PaginatedResponse<PortfolioObject>>({
      query: "portfolio/me",
      cache: "no-store",
      isProtected: true,
      tags: ["portfolio"],
    });
  }

  async addToWatchlist({ symbol }: { symbol: string }) {
    return this.handleServerAction<any, any>({
      endpoint: "user/wishlist/add/",
      method: "POST",
      data: { symbol },
      revalidateTagName: "watchlist",
      successMessage: "Stock added to watchlist.",
      isProtected: true,
    });
  }

  async getUserWatchlist() {
    return this.handleServerQuery<StockListItem[]>({
      query: "user/wishlist/list/",
      cache: "no-store",
      isProtected: true,
      tags: ["watchlist"],
    });
  }

  async removeFromWatchlist({ symbol }: { symbol: string }) {
    return this.handleServerAction<any, any>({
      endpoint: `user/wishlist/remove/${symbol}/`,
      method: "DELETE",
      revalidateTagName: "watchlist",
      successMessage: "Stock removed from watchlist.",
      isProtected: true,
    });
  }
}
