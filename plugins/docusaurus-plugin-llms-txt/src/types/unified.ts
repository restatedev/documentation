import type { Plugin } from 'unified';
import type { Node } from 'unist';

/**
 * Type-safe wrapper for unified plugins with options
 */
export type UnifiedPlugin<Options> = Plugin<[Options?] | [], Node>;

/**
 * Configuration options for the rehype-links plugin
 */
export interface RehypeLinksOptions {
  /** Whether markdown files are enabled */
  enableMarkdownFiles?: boolean;
  /** Whether to use relative paths */
  relativePaths?: boolean;
  /** Base URL of the site */
  baseUrl?: string;
  /** Glob patterns to exclude from link processing */
  excludePaths?: readonly string[];
} 