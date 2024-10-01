export interface SuccessResponse {
  success: true;
  status?: number;
  message?: string; // Optional success message
  data?: any;
}

export interface ErrorResponse {
  success: false;
  status: number;
  errorData: any; // Consider using a more specific type if possible
}

export function handleErrorResponse(error: any): ErrorResponse {
  if (error) {
    return {
      success: false,
      status: error.status || 500,
      errorData: error.errorData,
    };
  }
  return {
    success: false,
    status: 500, // Default fallback status
    errorData: "An unexpected error occurred",
  };
}

export function handleCustomErrorResponse(
  status: number,
  errorData: any
): ErrorResponse {
  return {
    success: false,
    status: status,
    errorData: errorData,
  };
}

export function handleSuccessResponse<T>(
  response: any,
  message: string
): SuccessResponse {
  return {
    success: true,
    status: response.status,
    message: message,
    data: response.data as T,
  };
}
