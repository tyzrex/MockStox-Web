import { BaseApi, buildPageParam, ISessionService } from "../base-api";

export class TransactionApi extends BaseApi {
  constructor(sessionService: ISessionService) {
    super(sessionService);
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
    });
  }

  async sellStock({
    stockSymbol,
    quantity,
  }: {
    stockSymbol: string;
    quantity: number;
  }) {
    return this.handleServerAction({
      endpoint: "trading/sell/",
      method: "POST",
      data: {
        symbol: stockSymbol,
        quantity,
      },
      successMessage: "Stock sold successfully",
      revalidateTagName: "stock-detail",
    });
  }
}
