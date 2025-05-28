/**
 * Path utilities for directory setup and common path operations
 */

import path from 'path';
import { PluginOptions } from '../types';
import { DEFAULT_BUILD_DIR, DEFAULT_DOCS_ROOT } from '../constants';

/**
 * Directory configuration for plugin operations
 */
export interface DirectoryConfig {
  /** Site root directory */
  readonly siteDir: string;
  /** Build output directory */
  readonly outDir: string;
  /** HTML docs directory */
  readonly docsDir: string;
  /** Markdown output directory */
  readonly mdOutDir: string;
}

/**
 * Setup directory paths based on plugin configuration
 * Centralizes the repeated directory setup pattern used across the plugin
 * 
 * @param siteDir - Site root directory
 * @param config - Plugin configuration
 * @param outDir - Optional build output directory (if not provided, calculated from siteDir)
 * @returns Directory configuration object
 */
export function setupDirectories(
  siteDir: string,
  config: PluginOptions,
  outDir?: string
): DirectoryConfig {
  const buildOutDir = outDir || path.join(siteDir, config.buildDir || DEFAULT_BUILD_DIR);
  const docsDir = path.join(buildOutDir, config.docsRoot || DEFAULT_DOCS_ROOT);
  const mdOutDir = config.outputDir ? path.join(siteDir, config.outputDir) : docsDir;
  
  return {
    siteDir,
    outDir: buildOutDir,
    docsDir,
    mdOutDir,
  };
}

/**
 * Build site URL from site configuration
 * Centralizes the repeated site URL building pattern
 * 
 * @param siteConfig - Docusaurus site configuration
 * @returns Complete site URL
 */
export function buildSiteUrl(siteConfig: { url: string; baseUrl: string }): string {
  return siteConfig.url + (siteConfig.baseUrl !== '/' ? siteConfig.baseUrl : '');
} 