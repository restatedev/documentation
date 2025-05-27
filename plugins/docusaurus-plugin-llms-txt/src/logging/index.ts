import baseLogger from '@docusaurus/logger';
import { Logger } from '../types';
import { LogLevel } from '../constants';


/**
 * Logger implementation that can be instantiated
 */
class PluginLogger implements Logger {
  private name: string;
  private logLevel: LogLevel;

  constructor(name: string, logLevel: LogLevel = LogLevel.INFO) {
    this.name = name;
    this.logLevel = logLevel;
  }

  /**
   * Gets the prefix for log messages
   * 
   * @returns The formatted prefix string
   */
  private getPrefix(): string {
    return `[${this.name}]`;
  }

  /**
   * Checks if a message should be logged based on level
   * 
   * @param level - The level of the message
   * @returns True if the message should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  /**
   * Logs an error message
   * 
   * @param msg - The error message
   */
  public error(msg: string): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      baseLogger.error(`${this.getPrefix()} ${msg}`);
    }
  }

  /**
   * Logs a warning message
   * 
   * @param msg - The warning message
   */
  public warn(msg: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      baseLogger.warn(`${this.getPrefix()} ${msg}`);
    }
  }

  /**
   * Logs an info message
   * 
   * @param msg - The info message
   */
  public info(msg: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      baseLogger.info(`${this.getPrefix()} ${msg}`);
    }
  }

  /**
   * Logs a debug message
   * 
   * @param msg - The debug message
   */
  public debug(msg: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      // Use info since Docusaurus has no debug level
      baseLogger.info(`${this.getPrefix()} [DEBUG] ${msg}`);
    }
  }
}

/**
 * Factory function to create logger instances
 * 
 * @param name - Name for log prefix
 * @param logLevel - Minimum log level to display
 * @returns A new logger instance
 */
export function createLogger(name: string, logLevel: LogLevel = LogLevel.INFO): Logger {
  return new PluginLogger(name, logLevel);
}

/**
 * No-operation logger that doesn't output anything
 */
export const noopLogger: Logger = {
  error: () => {},
  warn: () => {},
  info: () => {},
  debug: () => {},
}; 