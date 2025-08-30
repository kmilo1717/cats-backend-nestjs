import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Create a success response.
 * @param data - The data to include in the response.
 * @param message - An optional success message.
 * @returns The success response object.
 */
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Create an error response.
 * @param error - The error message.
 * @returns The error response object.
 */
export function createErrorResponse(error: string): ApiResponse<null> {
  return {
    success: false,
    error,
  };
}