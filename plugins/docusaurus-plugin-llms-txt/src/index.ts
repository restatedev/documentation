import path from 'path';
import type { LoadContext, Plugin } from '@docusaurus/types';
import { PluginOptions, pluginOptionsSchema } from './types';
import { getConfig } from './config';
import { createLogger } from './logging';
import { registerLlmsTxt, registerLlmsTxtClean, generateLlmsTxt } from './cli/command';
import { LogLevel, DEFAULT_BUILD_DIR, DEFAULT_DOCS_ROOT, ROOT_BASE_URL } from './constants';
import { flattenRoutes } from '@docusaurus/utils';
import { processRoutesStream } from './pipeline/core/route-processor';
import { loadCache, saveCache, calcConfigHash } from './fs/cache/manager';
import { setupDirectories, buildSiteUrl } from './utils';
import packageJson from '../package.json';

/**
 * Docusaurus plugin to generate Markdown versions of HTML pages and an llms.txt index file.
 * 
 * This plugin runs after the build process and:
 * 1. Processes routes from Docusaurus to find relevant content
 * 2. Converts HTML pages to Markdown using rehype/remark
 * 3. Creates an llms.txt index file with links to all documents
 */
export default function llmsTxtPlugin(
  context: LoadContext,
  options: Partial<PluginOptions> = {}
): Plugin<void> {
  // Plugin instance name - helps with debugging
  const name = 'docusaurus-plugin-llms-txt';
  
  return {
    name,
    
    async postBuild({ outDir, siteConfig, routes }): Promise<void> {
      // Get configuration and logger
      const config = getConfig(options);
      const log = createLogger(name, config.logLevel || LogLevel.INFO);

      if (config.runOnPostBuild === false) {
        log.info('Skipping postBuild processing (runOnPostBuild=false)');
        return;
      }
      
      try {
        // Setup directories using utility function
        const siteDir = path.dirname(outDir);
        const directories = setupDirectories(siteDir, config, outDir);
        
        // Get full site URL using utility function
        const siteUrl = buildSiteUrl(siteConfig);
        
        // Flatten routes and process them
        const finalRoutes = flattenRoutes(routes);
        log.info(`Processing ${finalRoutes.length} total routes`);
        
        // Load cache to get version info
        const { dir: cacheDir } = await loadCache(siteDir);
        const pluginVersion = packageJson.version;
        const configHash = calcConfigHash(config);
        
        const { docs, cachedRoutes } = await processRoutesStream(
          finalRoutes,
          directories.docsDir,
          directories.mdOutDir,
          siteDir,
          config,
          log,
          siteUrl
        );
        
        // Save updated cache with enhanced route info
        const updatedCache = {
          pluginVersion,
          configHash,
          routes: cachedRoutes,
          // Remove legacy files cache as it's now integrated into routes
        };
        
        await saveCache(cacheDir, updatedCache);
        log.info(`Cache updated with ${cachedRoutes.length} routes (${cachedRoutes.filter(r => r.processed).length} processed)`);
        
        // Use shared function to generate llms.txt (ensures identical behavior with CLI)
        await generateLlmsTxt(docs, config, siteConfig, outDir, log);
        
        log.info('llms-txt conversion completed');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        log.error(`Error: ${errorMessage}`);
        throw error;
      }
    },

    extendCli(cli): void {
      // CLI commands will use cached routes from the build process
      registerLlmsTxt(cli, name, options, context);
      registerLlmsTxtClean(cli, name, options);
    },
  };
}

// Type-safe validation function
export function validateOptions({ 
  options, 
  validate 
}: {
  options: unknown;
  validate: (schema: unknown, options: unknown) => PluginOptions;
}): PluginOptions {
  return validate(pluginOptionsSchema, options);
}
