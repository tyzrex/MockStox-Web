"use server";

import { dashboardApi } from "../mockstox-api";

export async function loadUserFunds({ amount }: { amount: number }) {
  return dashboardApi.loadUserFund({
    amount,
  });
}

export async function addToWatchlist({ symbol }: { symbol: string }) {
  return dashboardApi.addToWatchlist({
    symbol,
  });
}

export async function removeFromWatchlist({ symbol }: { symbol: string }) {
  return dashboardApi.removeFromWatchlist({
    symbol,
  });
}
