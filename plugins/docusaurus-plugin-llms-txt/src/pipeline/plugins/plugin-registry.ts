import type { Processor } from 'unified';
import type { RehypeLinksOptions, MarkdownConversionOptions } from '../../types';
import rehypeTables from './rehype-tables';
import rehypeLinks from './rehype-links';
import remarkGfm, { Options as RemarkGfmOptions } from 'remark-gfm';
import remarkStringify, { Options as RemarkStringifyOptions } from 'remark-stringify';
import { DEFAULT_GFM } from '../../constants';

/**
 * Apply plugins to a processor based on options
 */
export function applyPluginsToProcessor(
  processor: Processor,
  options: MarkdownConversionOptions
): void {
  // Apply rehype plugins (HTML processing stage)
  
  // rehype-tables: Process tables if enabled
  if (options.rehypeProcessTables !== false) {
    processor.use(rehypeTables);
  }
  
  // rehype-links: Only apply when generating individual markdown files
  if (options.enableMarkdownFiles && options.rehypeProcessLinks) {
    const linkOptions: RehypeLinksOptions = {
      baseUrl: options.baseUrl || '',
      relativePaths: options.relativePaths !== false,
      enableMarkdownFiles: options.enableMarkdownFiles === true,
      excludePaths: options.excludePaths || [],
    };
    processor.use(rehypeLinks, linkOptions);
  }
  
  // Bridge from HTML to Markdown
  const rehypeRemark = require('rehype-remark');
  processor.use(rehypeRemark, {
    handlers: { br: () => ({ type: 'html', value: '<br />' }) },
  });
  
  // Apply remark plugins (Markdown processing stage)
  
  // remark-gfm: GitHub Flavored Markdown
  if (options.remarkGfm !== false) {
    const gfmOptions = typeof options.remarkGfm === 'object' && options.remarkGfm !== null
      ? { ...DEFAULT_GFM, ...options.remarkGfm as Partial<RemarkGfmOptions> }
      : DEFAULT_GFM;
    processor.use(remarkGfm, gfmOptions);
  }
  
  // remark-stringify: Always applied for final output
  const stringifyOptions = typeof options.remarkStringify === 'object' && options.remarkStringify !== null
    ? options.remarkStringify as RemarkStringifyOptions
    : {};
  processor.use(remarkStringify, stringifyOptions);
} 