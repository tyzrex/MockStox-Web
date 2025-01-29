"use server";

import { transactionApi } from "../mockstox-api";

export async function buyStock({
  stockSymbol,
  quantity,
}: {
  stockSymbol: string;
  quantity: number;
}) {
  return transactionApi.buyStock({
    stockSymbol,
    quantity,
  });
}

export async function sellStock({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  return transactionApi.sellStock({
    id,
    quantity,
  });
}
