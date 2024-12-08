import { makeKeyCleaner } from "@/lib/utils";
import { Session } from "next-auth";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type CacheOption =
  | "no-store"
  | "default"
  | "reload"
  | "no-cache"
  | "force-cache";

interface RequestOptions<TRequestBody> {
  method: HttpMethod;
  session?: Session | null;
  body?: TRequestBody;
  headers?: Record<string, string>;
  tags?: string[];
  cache?: CacheOption;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  validateStatus: (status: number) => boolean;
}

interface RequestResponse<TResponse> {
  success: boolean;
  data?: TResponse;
  status?: number;
  headers?: Headers;
  error?: Error;
}

class HTTPError extends Error {
  public status: number;
  constructor(
    public readonly response: Response,
    public readonly errorData: any,
    message?: string
  ) {
    super(message || `HTTP error! status: ${response.status}`);
    this.name = "HTTPError";
    this.status = response.status;
  }
}

const defaultOptions: Partial<RequestOptions<any>> = {
  method: "GET",
  cache: "no-store",
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  validateStatus: (status: number) => status >= 200 && status < 300,
};

async function sleep(ms: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWrapper<TResponse = unknown, TRequestBody = unknown>(
  url: string,
  options: RequestOptions<TRequestBody>
): Promise<RequestResponse<TResponse>> {
  const fullOptions = { ...defaultOptions, ...options };
  const {
    method,
    session,
    body,
    headers: customHeaders,
    tags,
    cache,
    timeout,
    retries,
    retryDelay,
    validateStatus,
  } = fullOptions;

  const headers = new Headers(customHeaders);
  if (body && !(body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (session?.user?.access) {
    headers.set("Authorization", `Bearer ${session.user.access}`);
  }

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/";
  const fullUrl = new URL(url, apiUrl);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const fetchWithRetry = async (
    attemptsLeft: number
  ): Promise<RequestResponse<TResponse>> => {
    try {
      const response = await fetch(fullUrl.toString(), {
        method,
        headers,
        body: body
          ? body instanceof FormData
            ? body
            : JSON.stringify(body)
          : undefined,
        cache: cache,
        next: { tags },
        signal: controller.signal,
      });

      if (!validateStatus(response.status)) {
        const errorData = await response.json().catch(() => ({}));

        const formattedError = formatErrorMessage(errorData);

        throw new HTTPError(response, formattedError);
      }

      if (response.status === 204) {
        return {
          success: true,
          status: response.status,
          headers: response.headers,
        };
      }

      const contentType = response.headers.get("Content-Type");
      const data = contentType?.includes("application/json")
        ? await response.json().catch(() => ({}))
        : await response.text();

      return {
        success: true,
        data: data as TResponse,
        status: response.status,
        headers: response.headers,
      };
    } catch (error: any) {
      // Do not retry on 4xx errors or AbortError (timeouts)
      if (
        attemptsLeft > 0 &&
        !(
          error instanceof HTTPError &&
          error.status >= 400 &&
          error.status <= 500
        ) &&
        error.name !== "AbortError"
      ) {
        console.warn(
          `Request failed, retrying... (${attemptsLeft} attempts left)`
        );
        await sleep(retryDelay ?? defaultOptions.retryDelay);
        return fetchWithRetry(attemptsLeft - 1);
      }

      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  try {
    return await fetchWithRetry(retries ?? defaultOptions.retries ?? 0);
  } catch (error) {
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", error.message, error.errorData);
      throw error;
    } else {
      console.error("Fetch Error:", error);
      throw error;
    }
  }
}

function formatErrorMessage(data: any): string {
  let errorMessage = "";

  if (data && typeof data === "object") {
    errorMessage = Object.entries(data)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${value}`;
        } else if (value && typeof value === "object") {
          return `${formatErrorMessage(value)}`;
        }
        return "";
      })
      .filter((message) => message)
      .join("| ");
  } else {
    errorMessage = "Something went wrong";
  }

  return errorMessage;
}
