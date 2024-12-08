"use server";

import { RegisterSchemaType } from "@/schema/register-schema";
import { authApi } from "../mockstox-api";

export async function RegisterNewUser(data: RegisterSchemaType) {
  return await authApi.register(data);
}
