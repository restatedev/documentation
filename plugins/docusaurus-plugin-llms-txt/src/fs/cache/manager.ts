import fs from 'fs-extra';
import path from 'path';
import { DocInfo, PluginOptions, CacheSchema, CachedRouteInfo } from '../../types';
import { createFileError, getErrorCause } from '../../utils';
import { writeJsonAtomic } from '../io/atomic';
import { md5Hash } from '@docusaurus/utils';
import { getCacheDir, getCacheFilePath } from '../path';
import { CACHE_FILE_NAME, INDEX_HTML_REGEX, HTML_EXTENSION_REGEX } from '../../constants';
import type { RouteConfig, PluginRouteConfig } from '@docusaurus/types';
import { routePathToHtmlPath } from '../../pipeline/core/route-processor';

/**
 * Extract only the options that affect content generation.
 * Changes to these options should invalidate the cache.
 * 
 * INCLUDED (affect content):
 * - enableMarkdownFiles: affects link formats and file generation
 * - relativePaths: affects link formats in generated content  
 * - enableDescriptions: affects whether descriptions are included in output
 * - contentSelectors: affects what content is extracted from HTML
 * - depth: affects categorization and tree structure
 * - pathRules: affects categorization, content selectors, and processing
 * - remarkStringify: affects Markdown output formatting
 * - remarkGfm: affects Markdown features and formatting
 * - rehypeProcessTables: affects how tables are processed
 * - siteTitle: affects the title in llms.txt
 * - siteDescription: affects the description in llms.txt
 * - optionalLinks: affects content in llms.txt
 * - excludePaths: affects which links are processed by rehype-links
 * 
 * EXCLUDED (don't affect content):
 * - logLevel: only affects logging verbosity
 * - enableCache: affects caching behavior, not content
 * - runOnPostBuild: affects when plugin runs, not content
 * - docsRoot, outputDir, buildDir: affect file paths, not content
 */
function getContentAffectingOptions(options: Partial<PluginOptions>): Partial<PluginOptions> {
  const {
    // Content generation options
    enableMarkdownFiles,
    relativePaths,
    enableDescriptions,
    
    // Content extraction options
    contentSelectors,
    
    // Structure options
    depth,
    pathRules,
    
    // Format options
    remarkStringify,
    remarkGfm,
    rehypeProcessTables,
    
    // Content options
    siteTitle,
    siteDescription,
    optionalLinks,
    
    // Processing options that affect content
    excludePaths,
    
    // Note: We DON'T include options that don't affect content:
    // - logLevel: only affects logging
    // - enableCache: affects caching behavior, not content
    // - runOnPostBuild: affects when plugin runs, not content
    // - docsRoot, outputDir, buildDir: affect file paths, not content
  } = options;

  return {
    enableMarkdownFiles,
    relativePaths,
    enableDescriptions,
    contentSelectors,
    depth,
    pathRules,
    remarkStringify,
    remarkGfm,
    rehypeProcessTables,
    siteTitle,
    siteDescription,
    optionalLinks,
    excludePaths,
  };
}

export function calcConfigHash(options: Partial<PluginOptions>): string {
  const contentOptions = getContentAffectingOptions(options);
  
  // Remove undefined values to ensure stable serialization
  const stableOptions = Object.fromEntries(
    Object.entries(contentOptions).filter(([_, value]) => value !== undefined)
  );
  
  const stable = JSON.stringify(stableOptions, Object.keys(stableOptions).sort());
  return md5Hash(stable);
}

export async function loadCache(siteDir: string): Promise<{ cache: CacheSchema; dir: string }> {
  const cacheDir = getCacheDir(siteDir);
  const cachePath = getCacheFilePath(siteDir);
  try {
    const data = await fs.readJson(cachePath);
    return { cache: data as CacheSchema, dir: cacheDir };
  } catch (error) {
    // Non-critical - return empty cache if we can't load
    return { cache: { pluginVersion: '', configHash: '', routes: [] }, dir: cacheDir };
  }
}

export async function saveCache(cacheDir: string, cache: CacheSchema): Promise<void> {
  const cachePath = path.join(cacheDir, CACHE_FILE_NAME);
  try {
    await writeJsonAtomic(cachePath, cache);
  } catch (error) {
    const errorCause = getErrorCause(error);
    throw createFileError('Failed to write cache file', cachePath, errorCause);
  }
}

export async function hashFile(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, 'utf8');
  return md5Hash(content);
}

/**
 * Create enhanced cached route info that pairs routes with their file data
 */
export function createCachedRouteInfo(routes: RouteConfig[]): CachedRouteInfo[] {
  return routes.map(route => {
    const pluginRoute = route as PluginRouteConfig;
    return {
      path: route.path,
      plugin: pluginRoute.plugin?.name,
      htmlPath: routePathToHtmlPath(route.path),
      // Other fields will be filled during processing
      hash: undefined,
      title: undefined,
      description: undefined,
      markdownFile: undefined,
      processed: false,
    };
  });
}

/**
 * Update cached route info with processing results
 */
export function updateCachedRouteWithDoc(
  cachedRoute: CachedRouteInfo, 
  doc: DocInfo, 
  hash: string,
  mdOutDir: string,
  enableMarkdownFiles: boolean
): CachedRouteInfo {
  // Create relative markdown file path (similar to how htmlPath is relative)
  let markdownFile: string | undefined;
  
  if (enableMarkdownFiles && cachedRoute.htmlPath) {
    // Convert HTML path to MD path without the absolute directory
    // Example: "voice/getting-started/index.html" -> "voice/getting-started.md"
    if (INDEX_HTML_REGEX.test(cachedRoute.htmlPath)) {
      markdownFile = cachedRoute.htmlPath.replace(INDEX_HTML_REGEX, '.md');
    } else {
      markdownFile = cachedRoute.htmlPath.replace(HTML_EXTENSION_REGEX, '.md');
    }
  }

  return {
    ...cachedRoute,
    hash,
    title: doc.title,
    description: doc.description,
    markdownFile,
    processed: true,
  };
}

/**
 * Resolve relative markdown file path to absolute path
 */
export function resolveMarkdownFilePath(
  markdownFile: string,
  mdOutDir: string
): string {
  return path.join(mdOutDir, markdownFile);
}

/**
 * Check if cached route info is still valid
 */
export async function isCachedRouteValid(
  cachedRoute: CachedRouteInfo,
  docsDir: string,
  mdOutDir?: string
): Promise<boolean> {
  if (!cachedRoute.processed || !cachedRoute.htmlPath || !cachedRoute.hash) {
    return false;
  }
  
  const fullHtmlPath = path.join(docsDir, cachedRoute.htmlPath);
  
  try {
    // Check if HTML file still exists
    if (!(await fs.pathExists(fullHtmlPath))) {
      return false;
    }
    
    // Check if file hash matches
    const currentHash = await hashFile(fullHtmlPath);
    if (currentHash !== cachedRoute.hash) {
      return false;
    }
    
    // Optionally check if markdown file still exists (if it was generated)
    if (mdOutDir && cachedRoute.markdownFile) {
      const fullMarkdownPath = resolveMarkdownFilePath(cachedRoute.markdownFile, mdOutDir);
      if (!(await fs.pathExists(fullMarkdownPath))) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    // If we can't validate, assume invalid
    return false;
  }
}

/**
 * Check if cached routes are available and valid for CLI processing
 */
export function hasCachedRoutes(cache: CacheSchema): boolean {
  return cache.routes && cache.routes.length > 0;
}

/**
 * Get processed routes from cache (routes that have been successfully processed)
 */
export function getProcessedRoutesFromCache(cache: CacheSchema): CachedRouteInfo[] {
  return cache.routes.filter(route => route.processed === true);
}

/**
 * Convert cached routes back to a format compatible with route processing
 */
export function getCachedRoutesForProcessing(cache: CacheSchema): PluginRouteConfig[] {
  return cache.routes.map(cachedRoute => ({
    path: cachedRoute.path,
    plugin: cachedRoute.plugin ? { name: cachedRoute.plugin } : undefined,
    // Add minimal required properties for PluginRouteConfig compatibility
    component: 'dummy', // Not used in our processing
    exact: true,
    routes: [],
  })) as PluginRouteConfig[];
}

/**
 * Convert cached route info to DocInfo for processing
 */
export function cachedRouteToDocInfo(cachedRoute: CachedRouteInfo): DocInfo | null {
  if (!cachedRoute.processed || !cachedRoute.htmlPath || !cachedRoute.title) {
    return null;
  }
  
  return {
    routePath: cachedRoute.path,
    htmlPath: cachedRoute.htmlPath,
    title: cachedRoute.title,
    description: cachedRoute.description || '',
  };
} 