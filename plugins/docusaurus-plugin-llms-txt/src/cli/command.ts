import type { CommanderStatic } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import type { LoadContext } from '@docusaurus/types';
import { PluginOptions, DocInfo } from '../types';
import { createLogger } from '../logging';
import { 
  LLMS_TXT_FILENAME, 
  LogLevel, 
  DEFAULT_SITE_TITLE,
  ROOT_ROUTE_PATH,
  INDEX_ROUTE_PATH,
} from '../constants';
import { loadCache, hasCachedRoutes, getProcessedRoutesFromCache, cachedRouteToDocInfo, getCachedRoutesForProcessing, saveCache, calcConfigHash } from '../fs/cache/manager';
import { getConfig } from '../config';
import { buildTree } from '../pipeline/core/tree-builder';
import { renderTreeMarkdown } from '../pipeline/core/markdown-renderer';
import { saveMarkdownFile } from '../fs/io/write';
import { processRoutesStream } from '../pipeline/core/route-processor';
import { setupDirectories, buildSiteUrl } from '../utils';
import packageJson from '../../package.json';

/**
 * Build complete llms.txt content
 */
function buildLlmsTxtContent(
  docs: DocInfo[],
  config: PluginOptions,
  siteConfig: { title?: string; url: string; baseUrl: string }
): string {
  const tree = buildTree(docs, config);
  const rootDoc = docs.find(doc => doc.routePath === ROOT_ROUTE_PATH || doc.routePath === INDEX_ROUTE_PATH);
  
  // Generate configuration values
  const documentTitle = config.siteTitle || siteConfig.title || rootDoc?.title || DEFAULT_SITE_TITLE;
  const enableDescriptions = config.enableDescriptions !== false;
  const useRelativePaths = config.relativePaths !== false;
  const siteUrl = buildSiteUrl(siteConfig);
  
  // Build content sections
  let content = `# ${documentTitle}\n\n`;
  
  // Add description if enabled and available
  if (enableDescriptions) {
    const description = config.siteDescription || rootDoc?.description;
    if (description) {
      content += `> ${description}\n\n`;
    }
  }
  
  // Add main content
  content += renderTreeMarkdown(
    tree,
    2,
    true,
    siteUrl,
    useRelativePaths,
    !!config.enableMarkdownFiles,
    enableDescriptions
  );
  
  // Add optional links if configured
  if (config.optionalLinks?.length) {
    content += `\n## Optional\n`;
    for (const link of config.optionalLinks) {
      const descPart = enableDescriptions && link.description ? `: ${link.description}` : '';
      content += `- [${link.title}](${link.url})${descPart}\n`;
    }
  }
  
  return content;
}

/**
 * Shared function to generate llms.txt content from documents
 */
export async function generateLlmsTxt(
  docs: DocInfo[],
  config: PluginOptions,
  siteConfig: { title?: string; url: string; baseUrl: string },
  outDir: string,
  logger: ReturnType<typeof createLogger>
): Promise<void> {
  if (docs.length === 0) {
    logger.warn('No documents found to generate llms.txt');
    return;
  }

  const llmsTxtContent = buildLlmsTxtContent(docs, config, siteConfig);
  await saveMarkdownFile(path.join(outDir, LLMS_TXT_FILENAME), llmsTxtContent);
  logger.info(`Generated llms.txt with ${docs.length} documents`);
}

/**
 * CLI-specific conversion function
 */
async function runCliConversion(
  siteDir: string,
  options: Partial<PluginOptions>,
  context: LoadContext,
): Promise<void> {
  const config = getConfig(options);
  const log = createLogger('docusaurus-plugin-llms-txt', config.logLevel || LogLevel.INFO);
  
  try {
    const { cache, dir: cacheDir } = await loadCache(siteDir);
    
    if (!hasCachedRoutes(cache)) {
      log.error('❌ No cached routes found. Please run "npm run build" first.');
      process.exit(1);
    }
    
    let docs: DocInfo[];
    
    if (config.enableCache !== false) {
      // Use cached data for instant processing
      const processedRoutes = getProcessedRoutesFromCache(cache);
      docs = processedRoutes
        .map(cachedRoute => cachedRouteToDocInfo(cachedRoute))
        .filter((doc): doc is NonNullable<typeof doc> => doc !== null);
      
      log.info(`Using ${docs.length} cached documents`);
    } else {
      // Reprocess files but maintain cache
      const routesForProcessing = getCachedRoutesForProcessing(cache);
      const directories = setupDirectories(siteDir, config);
      const siteUrl = buildSiteUrl(context.siteConfig);
      
      const { docs: processedDocs, cachedRoutes } = await processRoutesStream(
        routesForProcessing,
        directories.docsDir,
        directories.mdOutDir,
        siteDir,
        config,
        log,
        siteUrl
      );
      
      docs = processedDocs;
      
      // Update cache
      const updatedCache = {
        pluginVersion: packageJson.version,
        configHash: calcConfigHash(config),
        routes: cachedRoutes,
      };
      
      await saveCache(cacheDir, updatedCache);
      log.info(`Reprocessed ${docs.length} documents`);
    }
    
    const directories = setupDirectories(siteDir, config);
    await generateLlmsTxt(docs, config, context.siteConfig, directories.outDir, log);
    log.info('✅ CLI conversion completed successfully');
  } catch (error) {
    log.error(`❌ CLI conversion failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

/**
 * Register the `llms-txt` command
 */
export function registerLlmsTxt(
  cli: CommanderStatic,
  pluginName: string,
  baseOptions: Partial<PluginOptions>,
  context: LoadContext,
): void {
  cli
    .command('llms-txt [siteDir]')
    .description('Generate llms.txt and/or Markdown files using cached routes from build')
    .action(async (siteDirArg: string | undefined) => {
      const siteDir = siteDirArg ? path.resolve(siteDirArg) : process.cwd();
      await runCliConversion(siteDir, baseOptions, context);
    });
}

/**
 * Register the `llms-txt-clean` command
 */
export function registerLlmsTxtClean(
  cli: CommanderStatic,
  pluginName: string,
  baseOptions: Partial<PluginOptions>,
): void {
  cli
    .command('llms-txt-clean [siteDir]')
    .description('Remove all generated markdown files and llms.txt using cached file info')
    .action(async (siteDirArg: string | undefined) => {
      const siteDir = siteDirArg ? path.resolve(siteDirArg) : process.cwd();
      const config = getConfig(baseOptions);
      const log = createLogger(pluginName, config.logLevel || LogLevel.INFO);
      
      try {
        const { cache } = await loadCache(siteDir);
        const directories = setupDirectories(siteDir, config);
        
        if (!await fs.pathExists(directories.outDir)) {
          log.info(`Build directory not found: ${directories.outDir} (already clean)`);
          return;
        }
        
        let cleanedFiles = 0;
        
        if (cache.routes?.length > 0) {
          for (const cachedRoute of cache.routes) {
            if (cachedRoute.markdownFile && cachedRoute.processed) {
              try {
                const fullMarkdownPath = config.outputDir 
                  ? path.join(siteDir, config.outputDir, cachedRoute.markdownFile)
                  : path.join(directories.outDir, cachedRoute.markdownFile);
                  
                if (await fs.pathExists(fullMarkdownPath)) {
                  await fs.remove(fullMarkdownPath);
                  cleanedFiles++;
                }
              } catch (error) {
                log.warn(`Failed to remove ${cachedRoute.markdownFile}: ${error instanceof Error ? error.message : String(error)}`);
              }
            }
          }
        }
        
        // Clean up llms.txt file
        const llmsTxtPath = path.join(directories.outDir, LLMS_TXT_FILENAME);
        if (await fs.pathExists(llmsTxtPath)) {
          await fs.remove(llmsTxtPath);
          log.info(`Removed ${LLMS_TXT_FILENAME}`);
        }
        
        log.info(`✅ Cleanup completed (${cleanedFiles} files removed)`);
      } catch (error) {
        log.error(`❌ Cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
} 