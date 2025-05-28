/**
 * Utilities for URL handling and formatting
 */

import { normalizeUrl, encodePath } from '@docusaurus/utils';

/**
 * Format a document path for llms.txt output
 * 
 * @param path - Document path
 * @param config - Configuration options
 * @param baseUrl - Base URL for absolute paths
 * @returns Formatted document URL
 */
export function formatDocUrl(
  path: string,
  config: { relativePaths?: boolean; enableMarkdownFiles?: boolean },
  baseUrl = ''
): string {
  if (!path) {
    return config.relativePaths !== false || !baseUrl ? '/' : normalizeUrl([baseUrl]);
  }

  // Handle .md extension based on enableMarkdownFiles setting
  let formattedPath = path;
  if (config.enableMarkdownFiles === true && !formattedPath.endsWith('.md')) {
    formattedPath = `${formattedPath}.md`;
  } else if (config.enableMarkdownFiles === false && formattedPath.endsWith('.md')) {
    formattedPath = formattedPath.slice(0, -3);
  }
  
  // Use relative paths by default, or absolute if configured
  if (config.relativePaths === false && baseUrl) {
    return normalizeUrl([baseUrl, encodePath(formattedPath)]);
  }
  
  return normalizeUrl([encodePath(formattedPath)]);
}

// Legacy exports for backward compatibility
export const formatUrl = formatDocUrl; 