import path from 'path';
import fs from 'fs-extra';
import { DocInfo, PluginOptions, MarkdownConversionOptions, Logger } from '../../types';
import { processHtmlToMarkdown, extractHtmlMetadata } from './html-converter';
import { htmlPathToMdPath } from '../../fs/path';
import { noopLogger } from '../../logging';
import { createDocumentError, getErrorMessage, getErrorCause } from '../../utils';
import { saveMarkdownFile } from '../../fs/io/write';
import { TITLE_TRUNCATE_LENGTH } from '../../constants';

/**
 * Check if a markdown file exists for the given HTML path
 */
export async function checkMarkdownFileExists(
  relHtmlPath: string, 
  mdOutDir: string
): Promise<boolean> {
  const mdPath = htmlPathToMdPath(relHtmlPath, mdOutDir);
  try {
    return await fs.pathExists(mdPath);
  } catch (error) {
    // Non-critical operation - return false if we can't check
    return false;
  }
}

/**
 * Process a single HTML file → Markdown + metadata (with provided route path)
 */
export async function processHtmlFileWithRoute(
  relHtmlPath: string,
  routePath: string,
  docsDir: string,
  mdOutDir: string,
  config: PluginOptions,
  logger: Logger = noopLogger,
  baseUrl: string = '',
): Promise<DocInfo> {
  const absHtmlPath = path.join(docsDir, relHtmlPath);

  logger.debug(`Processing file: ${relHtmlPath} → ${routePath}`);

  try {
    const html = await fs.readFile(absHtmlPath, 'utf8');

    const contentSelectors = config.contentSelectors ? [...config.contentSelectors] : [];
    
    let title: string;
    let description: string;
    let markdown = '';

    if (config.enableMarkdownFiles) {
      // Full processing for individual markdown files
      const conversionOptions: MarkdownConversionOptions = {
        remarkStringify: config.remarkStringify,
        remarkGfm: config.remarkGfm,
        rehypeProcessTables: config.rehypeProcessTables,
        rehypeProcessLinks: true,
        baseUrl: baseUrl,
        relativePaths: config.relativePaths,
        enableMarkdownFiles: config.enableMarkdownFiles,
        excludePaths: config.excludePaths,
        logger: logger,
      };
      
      const result = await processHtmlToMarkdown(html, conversionOptions, contentSelectors);
      title = result.title;
      description = result.description;
      markdown = result.content;
      
      if (!markdown) throw createDocumentError('Conversion resulted in empty content', relHtmlPath);

      logger.debug(`Processed ${relHtmlPath}: title="${title.substring(0, TITLE_TRUNCATE_LENGTH)}${title.length > TITLE_TRUNCATE_LENGTH ? '...' : ''}"`);

      logger.debug(`Saving markdown file for ${relHtmlPath}`);
      const mdPath = htmlPathToMdPath(relHtmlPath, mdOutDir);
      await saveMarkdownFile(mdPath, markdown);
    } else {
      // Lightweight processing for llms.txt only - just extract metadata
      const result = await extractHtmlMetadata(html, contentSelectors);
      title = result.title;
      description = result.description;
      
      logger.debug(`Extracted metadata for ${relHtmlPath}: title="${title.substring(0, TITLE_TRUNCATE_LENGTH)}${title.length > TITLE_TRUNCATE_LENGTH ? '...' : ''}"`);
    }

    return { routePath, htmlPath: relHtmlPath, title, description };
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    const errorCause = getErrorCause(error);
    
    logger.debug(`Error processing ${relHtmlPath}: ${errorMsg}`);
    throw createDocumentError(`Failed to process HTML file: ${errorMsg}`, relHtmlPath, errorCause);
  }
} 