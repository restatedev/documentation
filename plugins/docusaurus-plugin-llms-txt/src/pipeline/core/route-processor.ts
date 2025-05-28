import path from 'path';
import fs from 'fs-extra';
import type { PluginRouteConfig, RouteConfig } from '@docusaurus/types';
import { createMatcher, normalizeUrl, isValidPathname } from '@docusaurus/utils';
import type { PluginOptions, DocInfo, Logger, CachedRouteInfo } from '../../types';
import { processHtmlFileWithRoute } from '../html/html-processor';
import { getErrorMessage, getErrorCause } from '../../utils';
import { createCachedRouteInfo, updateCachedRouteWithDoc, isCachedRouteValid, hashFile } from '../../fs/cache/manager';

/**
 * Determines if a route should be processed based on plugin configuration
 */
export function shouldProcessRoute(route: PluginRouteConfig, options: PluginOptions): boolean {
  const plugin = route.plugin;
  
  // Handle routes with plugin information
  if (plugin) {
    switch (plugin.name) {
      case 'docusaurus-plugin-content-blog':
        return options.includeBlog === true;
      case 'docusaurus-plugin-content-pages':
        return options.includePages === true;
      default:
        // Unknown plugins are treated as docs by default
        return options.includeDocs !== false;
    }
  }
  
  // Routes without plugin info are considered docs
  return options.includeDocs !== false;
}

/**
 * Checks if a route path should be excluded based on exclude patterns
 */
export function isRouteExcluded(routePath: string, isExcluded: (path: string) => boolean): boolean {
  // Normalize route path to ensure it starts with /
  const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`;
  return isExcluded(normalizedPath);
}

/**
 * Converts a route path to the corresponding HTML file path
 * Based on Docusaurus's static site generation pattern where:
 * - Root route "/" becomes "index.html"  
 * - All other routes become "route/index.html" for pretty URLs
 */
export function routePathToHtmlPath(routePath: string): string {
  // Validate the route path
  if (!isValidPathname(routePath)) {
    throw new Error(`Invalid route pathname: ${routePath}`);
  }
  
  // Handle root path
  if (routePath === '/') {
    return 'index.html';
  }
  
  // Normalize and clean the route path
  const normalizedRoute = normalizeUrl([routePath]);
  
  // Remove leading slash for file path
  const htmlPath = normalizedRoute.startsWith('/') ? normalizedRoute.slice(1) : normalizedRoute;
  
  // All non-root routes become directories with index.html files
  // This matches Docusaurus's static site generation pattern
  // Example: /home/calling/voice/getting-started → home/calling/voice/getting-started/index.html
  return `${htmlPath}/index.html`;
}

/**
 * Setup processing context and filter routes
 */
function setupRouteProcessing(
  routes: RouteConfig[],
  options: PluginOptions,
  logger: Logger
): {
  cachedRoutes: CachedRouteInfo[];
  routesToProcess: PluginRouteConfig[];
  routeMap: Map<string, { route: PluginRouteConfig; cachedIndex: number }>;
  isExcluded: (path: string) => boolean;
} {
  // Create enhanced cached route info
  const cachedRoutes = createCachedRouteInfo(routes);
  
  // Setup exclusion matcher
  const isExcluded = options.excludePaths?.length 
    ? createMatcher([...options.excludePaths])
    : (): boolean => false;
  
  const pluginRoutes = routes as PluginRouteConfig[];
  
  // Create a map for faster route lookup
  const routeMap = new Map<string, { route: PluginRouteConfig; cachedIndex: number }>();
  
  for (let i = 0; i < pluginRoutes.length; i++) {
    const route = pluginRoutes[i];
    routeMap.set(route.path, { route, cachedIndex: i });
  }
  
  // Filter routes that should be processed
  const routesToProcess = pluginRoutes.filter(route => {
    // Check if route should be processed based on content type
    if (!shouldProcessRoute(route, options)) {
      return false;
    }
    
    // Check exclusions
    if (isRouteExcluded(route.path, isExcluded)) {
      logger.debug(`Skipping excluded route: ${route.path}`);
      return false;
    }
    
    return true;
  });
  
  return { cachedRoutes, routesToProcess, routeMap, isExcluded };
}

/**
 * Process a single route and update cache
 */
async function processRouteAndUpdateCache(
  route: PluginRouteConfig,
  routeInfo: { route: PluginRouteConfig; cachedIndex: number },
  cachedRoutes: CachedRouteInfo[],
  docsDir: string,
  mdOutDir: string,
  options: PluginOptions,
  logger: Logger,
  baseUrl: string
): Promise<{ doc: DocInfo | null; errors: Error[] }> {
  const errors: Error[] = [];
  
  const cachedRoute = cachedRoutes[routeInfo.cachedIndex];
  
  if (!cachedRoute?.htmlPath) {
    logger.warn(`No HTML path found for route: ${route.path}`);
    return { doc: null, errors };
  }
  
  const fullHtmlPath = path.join(docsDir, cachedRoute.htmlPath);
  
  // Skip if HTML file doesn't exist (for generated pages when skipGeneratedPages is true)
  if (options.skipGeneratedPages) {
    if (!(await fs.pathExists(fullHtmlPath))) {
      logger.debug(`Skipping route with missing HTML file: ${route.path} -> ${cachedRoute.htmlPath}`);
      return { doc: null, errors };
    }
  }
  
  try {
    const result = await processRouteWithCache(
      route, 
      cachedRoute, 
      docsDir, 
      mdOutDir, 
      options, 
      logger, 
      baseUrl
    );
    
    if (result.updatedCachedRoute) {
      // Update the cached route in place
      cachedRoutes[routeInfo.cachedIndex] = result.updatedCachedRoute;
      logger.debug(`Updated cache for route: ${route.path} (processed: true)`);
    }
    
    return { doc: result.doc, errors };
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    const errorCause = getErrorCause(error);
    logger.error(`Error processing route ${route.path}: ${errorMsg}`);
    errors.push(errorCause || new Error(String(error)));
    return { doc: null, errors };
  }
}

/**
 * Processes routes through the HTML processing pipeline with enhanced caching
 */
export async function processRoutesStream(
  routes: RouteConfig[],
  docsDir: string,
  mdOutDir: string,
  siteDir: string,
  options: PluginOptions,
  logger: Logger,
  baseUrl: string = '',
): Promise<{ docs: DocInfo[]; cachedRoutes: CachedRouteInfo[] }> {
  logger.debug('Processing routes (stream) with enhanced caching');
  
  // Setup processing context
  const { cachedRoutes, routesToProcess, routeMap } = setupRouteProcessing(routes, options, logger);
  
  const docs: DocInfo[] = [];
  const allErrors: Error[] = [];
  
  logger.info(`Processing ${routesToProcess.length} routes with enhanced caching`);
  
  // Process routes sequentially to avoid cache update conflicts
  for (const route of routesToProcess) {
    const routeInfo = routeMap.get(route.path);
    if (!routeInfo) {
      logger.warn(`No route info found for: ${route.path}`);
      continue;
    }
    
    const { doc, errors } = await processRouteAndUpdateCache(
      route,
      routeInfo,
      cachedRoutes,
      docsDir,
      mdOutDir,
      options,
      logger,
      baseUrl
    );
    
    if (doc) {
      docs.push(doc);
    }
    
    allErrors.push(...errors);
  }
  
  if (allErrors.length > 0) {
    logger.warn(`Encountered ${allErrors.length} errors during processing`);
  }
  
  const processedCount = cachedRoutes.filter(cr => cr.processed).length;
  logger.info(`Cache updated: ${processedCount}/${cachedRoutes.length} routes processed`);
  
  return { docs, cachedRoutes };
}

/**
 * Process a single route with enhanced caching
 */
async function processRouteWithCache(
  route: PluginRouteConfig,
  cachedRoute: CachedRouteInfo,
  docsDir: string,
  mdOutDir: string,
  options: PluginOptions,
  logger: Logger,
  baseUrl: string,
): Promise<{ doc: DocInfo | null; updatedCachedRoute: CachedRouteInfo | null }> {
  
  if (!cachedRoute.htmlPath) {
    throw new Error(`No HTML path for route: ${route.path}`);
  }
  
  const fullHtmlPath = path.join(docsDir, cachedRoute.htmlPath);
  
  try {
    // Check if we can use cached data
    const isCacheValid = await isCachedRouteValid(cachedRoute, docsDir, mdOutDir);
    const enableCache = options.enableCache !== false;
    
    if (isCacheValid && enableCache && cachedRoute.processed) {
      logger.debug(`Using cached data for route: ${route.path}`);
      
      // Convert cached route to DocInfo
      const doc: DocInfo = {
        routePath: route.path,
        htmlPath: cachedRoute.htmlPath,
        title: cachedRoute.title!,
        description: cachedRoute.description || '',
      };
      
      return { doc, updatedCachedRoute: null };
    }
    
    // Process the HTML file
    logger.debug(`Processing HTML file for route: ${route.path} -> ${cachedRoute.htmlPath}`);
    
    const doc = await processHtmlFileWithRoute(
      cachedRoute.htmlPath,
      route.path,
      docsDir,
      mdOutDir,
      options,
      logger,
      baseUrl
    );
    
    // Hash the file for cache
    const hash = await hashFile(fullHtmlPath);
    
    // Update cached route with processing results
    const updatedCachedRoute = updateCachedRouteWithDoc(
      cachedRoute,
      doc,
      hash,
      mdOutDir,
      !!options.enableMarkdownFiles
    );
    
    logger.debug(`Processed route ${route.path}: hash=${hash.substring(0, 8)}..., title="${doc.title}"`);
    
    return { doc, updatedCachedRoute };
    
  } catch (error) {
    logger.error(`Failed to process route ${route.path}: ${getErrorMessage(error)}`);
    throw error;
  }
} 