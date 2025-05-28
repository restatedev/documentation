/**
 * Types related to logging
 */

/**
 * Logger interface for plugin operations
 */
export interface Logger {
  /**
   * Log an error message
   * @param msg - Message to log
   */
  error: (msg: string) => void;
  
  /**
   * Log a warning message
   * @param msg - Message to log
   */
  warn: (msg: string) => void;
  
  /**
   * Log an info message
   * @param msg - Message to log
   */
  info: (msg: string) => void;
  
  /**
   * Log a debug message
   * @param msg - Message to log
   */
  debug: (msg: string) => void;
} 