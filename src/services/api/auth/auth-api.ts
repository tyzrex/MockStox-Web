import { RegisterSchemaType } from "@/schema/register-schema";
import { BaseApi } from "../base-api";

export class AuthApi extends BaseApi {
  async register(data: RegisterSchemaType) {
    const payload = {
      ...data,
      re_password: data.password,
    };
    return this.handleServerAction<any, any>({
      endpoint: "auth/users/",
      method: "POST",
      data: payload,
      successMessage: "Registration Success",
    });
  }
}
