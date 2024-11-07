"use server";

import { dashboardApi } from "../mockstox-api";

export async function loadUserFunds({ amount }: { amount: number }) {
  return dashboardApi.loadUserFund({
    amount,
  });
}
