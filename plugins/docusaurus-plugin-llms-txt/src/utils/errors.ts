/**
 * Error utilities for plugin operations
 */

/**
 * Type guard to check if an unknown value is an Error
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Safely extracts an error message from an unknown error value
 */
export function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message;
  }
  return String(error);
}

/**
 * Safely extracts an Error instance from an unknown error value
 */
export function getErrorCause(error: unknown): Error | undefined {
  return isError(error) ? error : undefined;
}

/**
 * Strategy for handling non-critical errors (log and continue)
 */
export function logAndContinue(
  logger: { warn: (msg: string) => void },
  message: string,
  error: unknown,
  filePath?: string
): void {
  const errorMsg = getErrorMessage(error);
  const context = filePath ? ` (${filePath})` : '';
  logger.warn(`${message}${context}: ${errorMsg}`);
}

/**
 * Create a simple error with context
 */
export function createError(message: string, filePath?: string, cause?: unknown): Error {
  const contextMsg = filePath ? `${message} (${filePath})` : message;
  const error = new Error(contextMsg);
  if (cause instanceof Error) {
    error.cause = cause;
  }
  return error;
}

// Legacy exports for backward compatibility
export const createFileError = createError;
export const createDocumentError = createError;
export const createConversionError = (message: string, cause?: unknown) => createError(message, undefined, cause);
export const createConfigError = (message: string, cause?: unknown) => createError(message, undefined, cause);

// Legacy types for backward compatibility
export type ErrorType = 'config' | 'file' | 'document' | 'conversion';
export class PluginError extends Error {
  constructor(
    public readonly type: ErrorType, 
    message: string, 
    public readonly filePath?: string, 
    public readonly cause?: Error
  ) {
    super(message);
    this.name = `${type.charAt(0).toUpperCase() + type.slice(1)}Error`;
  }
} 