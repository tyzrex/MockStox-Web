import { Session } from "next-auth";
import { goTry } from "go-go-try";
import {
  ErrorResponse,
  SuccessResponse,
  handleCustomErrorResponse,
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/response-handler";
import { revalidatePath, revalidateTag } from "next/cache";
import { fetchWrapper, CacheOption } from "../request-handler";
import { getSession } from "@/app/api/auth/[...nextauth]/options";

interface HandleServerActionOptions<ResponseType, RequestType> {
  endpoint: string;
  method: "POST" | "PATCH" | "DELETE" | "PUT" | "GET";
  successMessage?: string;
  revalidateUrl?: string;
  data?: RequestType;
  revalidateTagName?: string;
  isProtected?: boolean;
}

// Utility function
export const buildPageParam = (
  currentPage: number | null | undefined
): string => (currentPage ? `?page=${currentPage}` : "");
export const buildQueryParams = (params: Record<string, any>): string => {
  const queryParams = Object.entries(params)
    .filter(([_, value]) => value != null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );

  if (queryParams.length === 0) {
    return "";
  }

  return `?${queryParams.join("&")}`;
};
export interface ISessionService {
  getUserSession(): Promise<Session | null>;
}

class SessionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SessionError";
  }
}

export class SessionService implements ISessionService {
  async getUserSession(): Promise<Session | null> {
    return await getSession();
  }
}

// Base API Class
export class BaseApi {
  constructor(private sessionService?: ISessionService) {}

  public async getAuthenticatedSession(): Promise<Session | null> {
    if (!this.sessionService) {
      return null;
    }
    return await this.sessionService.getUserSession();
  }

  protected async handleClientQuery<K>({
    query,
    param,
    cache,
    tags,
    isProtected = false,
  }: {
    query: string;
    param?: string;
    cache?: CacheOption;
    tags?: string[];
    isProtected?: boolean;
  }) {
    let session: Session | null = null;
    if (isProtected) {
      session = await getSession();
      if (!session) {
        throw new SessionError("Session not found");
      }
    }
    const [error, response] = await goTry(
      fetchWrapper<K>(`${query}${param ? param : ""}`, {
        method: "GET",
        cache: cache,
        tags,
        session: session,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
    );

    return {
      error,
      response: response?.data,
    };
  }

  protected async handleServerQuery<K>({
    query,
    param,
    cache,
    tags,
    isProtected = false,
  }: {
    query: string;
    param?: string;
    cache?: CacheOption;
    tags?: string[];
    isProtected?: boolean;
  }) {
    let session: Session | null = null;
    if (isProtected) {
      session = await this.getAuthenticatedSession();
      if (!session) {
        throw new SessionError("Session not found");
      }
    }

    const [error, response] = await goTry(
      fetchWrapper<K>(`${query}${param ? param : ""}`, {
        method: "GET",
        cache: cache,
        tags,
        session: session,
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
    );

    return {
      error,
      response: response?.data,
    };
  }

  protected async handleServerAction<ResponseType, RequestType>(
    options: HandleServerActionOptions<ResponseType, RequestType>
  ): Promise<SuccessResponse | ErrorResponse> {
    const {
      endpoint,
      method,
      successMessage,
      revalidateUrl,
      data,
      revalidateTagName,
      isProtected,
    } = options;

    try {
      let session: Session | null = null;
      if (isProtected) {
        session = await this.getAuthenticatedSession();
        if (!session) {
          throw new SessionError("Session not found");
        }
      }

      const res = await fetchWrapper<ResponseType, RequestType>(endpoint, {
        method: method,
        session: session,
        body: data,
        validateStatus: (status: number) => status >= 200 && status < 300,
        cache: "no-store",
      });
      if (revalidateUrl) {
        revalidatePath(revalidateUrl);
      }
      if (revalidateTagName) {
        revalidateTag(revalidateTagName);
      }
      return handleSuccessResponse(res, successMessage ?? "Action Successful");
    } catch (err: any) {
      console.error("ServerAction Error: ", err);
      return handleErrorResponse(err);
    }
  }
}
