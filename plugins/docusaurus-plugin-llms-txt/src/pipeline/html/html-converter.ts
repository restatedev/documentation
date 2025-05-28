// Unified pipeline helper
import { toHtml } from 'hast-util-to-html';
import type * as HostHast from 'hast';
import { MarkdownConversionOptions, ConversionResult } from '../../types';
import { createError } from '../../utils';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { buildMarkdownProcessor } from '../core/pipeline-builder';
import { extractTitle } from './title-extractors';
import { select } from 'hast-util-select';

/**
 * Extract content, title, and description from HTML AST
 * 
 * @param tree - The HTML AST
 * @param selectors - CSS selectors to find main content
 * @returns Object containing content, title, and description
 */
function extractContent(
  tree: HostHast.Root, 
  selectors: readonly string[]
): { content: HostHast.Element | null; title: string; description: string } {
  // Get meta description
  const metaDesc = select('meta[name="description"]', tree) as HostHast.Element | null;
  const description = metaDesc?.properties?.content ? String(metaDesc.properties.content) : '';
  
  // Extract title using strategy pattern
  const title = extractTitle(tree);

  // Content extraction - try each selector in order until we find content
  let content: HostHast.Element | null = null;
  for (const selector of selectors) {
    content = select(selector, tree) as HostHast.Element | null;
    if (content) break;
  }
  
  // Fall back to body if no selectors matched
  if (!content) {
    content = select('body', tree) as HostHast.Element | null;
  }

  return { content, title, description };
}

/**
 * Extract only title and description from HTML (lightweight version for llms.txt generation)
 * 
 * @param html - HTML content to extract metadata from
 * @param _selectors - CSS selectors to find main content (unused but kept for consistency)
 * @returns Metadata only
 */
export async function extractHtmlMetadata(
  html: string,
  _selectors: readonly string[] = [],
): Promise<{ title: string; description: string }> {
  try {
    const parser = unified().use(rehypeParse, { fragment: false });
    const htmlAst = parser.parse(html) as HostHast.Root;

    // Get meta description directly from HTML
    const metaDesc = select('meta[name="description"]', htmlAst) as HostHast.Element | null;
    const description = metaDesc?.properties?.content ? String(metaDesc.properties.content) : '';
    
    // Extract title directly from HTML
    const title = extractTitle(htmlAst);

    return { 
      title: title || 'Untitled Document', 
      description: description || '' 
    };
  } catch (error) {
    throw createError(
      `Error extracting HTML metadata: ${error instanceof Error ? error.message : String(error)}`,
      undefined,
      error instanceof Error ? error : undefined,
    );
  }
}

/**
 * Process HTML content to Markdown with metadata
 * 
 * @param html - HTML content to convert
 * @param options - Conversion options
 * @param selectors - CSS selectors to find main content
 * @returns Conversion result with content, title, and description
 */
export async function processHtmlToMarkdown(
  html: string,
  options: MarkdownConversionOptions = {},
  selectors: readonly string[] = [],
): Promise<ConversionResult> {
  try {
    const parser = unified().use(rehypeParse, { fragment: false });
    const htmlAst = parser.parse(html) as HostHast.Root;

    const { content, title, description } = extractContent(htmlAst, selectors);

    if (!content) {
      return { 
        content: '', 
        title: title || 'Untitled Document', 
        description: description || '' 
      };
    }

    const contentHtml = toHtml(content as HostHast.Nodes);

    const processor = buildMarkdownProcessor({
      remarkGfm: options.remarkGfm,
      remarkStringify: options.remarkStringify,
      rehypeProcessTables: options.rehypeProcessTables,
      rehypeProcessLinks: options.rehypeProcessLinks,
      baseUrl: options.baseUrl,
      relativePaths: options.relativePaths,
      enableMarkdownFiles: options.enableMarkdownFiles,
      excludePaths: options.excludePaths,
      logger: options.logger,
    });

    const result = await processor.process(contentHtml);
    const markdown = String(result);

    return { 
      content: markdown, 
      title: title || 'Untitled Document', 
      description: description || '' 
    };
  } catch (error) {
    throw createError(
      `Error processing HTML to Markdown: ${error instanceof Error ? error.message : String(error)}`,
      undefined,
      error instanceof Error ? error : undefined,
    );
  }
} 