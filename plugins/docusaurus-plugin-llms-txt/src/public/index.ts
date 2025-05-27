/**
 * Public API for docusaurus-plugin-llms-txt
 * 
 * This module exports all types and utilities that plugin users need.
 * Internal implementation details are not exposed.
 */

// === PLUGIN EXPORTS ===

// Main plugin function and validation utility
export { default, validateOptions } from '../index';

// === CONFIGURATION TYPES ===

export type { 
  PluginOptions,
  PathRule,
  OptionalLink,
  LogLevel,
  Depth
} from '../types';

// === PLUGIN DEVELOPMENT UTILITIES ===

// Logging interface and factory for potential plugin extensions
export type { Logger } from '../types';
export { createLogger } from '../logging';

// === ERROR HANDLING ===

// Error types and utilities for graceful error handling
export type { ErrorType } from '../utils';
export { PluginError } from '../utils'; 