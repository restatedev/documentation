/**
 * Types related to filesystem operations
 */

/**
 * Enhanced cached route information that pairs routes with their file data
 */
export interface CachedRouteInfo {
  /** Route path */
  readonly path: string;
  /** Plugin that owns this route (if any) */
  readonly plugin?: string;
  /** HTML file path that corresponds to this route */
  readonly htmlPath?: string;
  /** Hash of the HTML file content */
  readonly hash?: string;
  /** Extracted document title */
  readonly title?: string;
  /** Extracted document description */
  readonly description?: string;
  /** Path to generated markdown file (relative to output directory) */
  readonly markdownFile?: string;
  /** Whether this route was successfully processed */
  readonly processed?: boolean;
}

/**
 * Enhanced cache schema structure
 */
export interface CacheSchema {
  /** Plugin version used to create the cache */
  readonly pluginVersion: string;
  /** Hash of the plugin configuration */
  readonly configHash: string;
  /** Complete route information with paired file data */
  readonly routes: readonly CachedRouteInfo[];
} 