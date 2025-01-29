import { BaseApi, buildPageParam, ISessionService } from "../base-api";

interface Trade {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  quantity: number;
  symbol: string;
  unit_price: string;
  date: string;
  action: "BUY" | "SELL";
  user: number;
}

export class TransactionApi extends BaseApi {
  constructor(sessionService: ISessionService) {
    super(sessionService);
  }

  async getAllTransactions() {
    return this.handleServerQuery<PaginatedResponse<Trade>>({
      query: "user/transactions",
      isProtected: true,
      cache: "no-store",
      tags: ["my-trades", "stock-detail"],
    });
  }

  async buyStock({
    stockSymbol,
    quantity,
  }: {
    stockSymbol: string;
    quantity: number;
  }) {
    return this.handleServerAction({
      endpoint: "trading/buy/",
      method: "POST",
      data: {
        symbol: stockSymbol,
        quantity,
      },
      successMessage: "Stock bought successfully",
      revalidateTagName: "stock-detail",
      isProtected: true,
    });
  }

  async sellStock({ id, quantity }: { id: number; quantity: number }) {
    return this.handleServerAction({
      endpoint: "trading/sell/",
      method: "POST",
      data: {
        id: id,
        quantity,
      },
      successMessage: "Stock sold successfully",
      revalidateTagName: "stock-detail",
      isProtected: true,
    });
  }
}
