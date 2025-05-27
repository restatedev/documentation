import { Processor, unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { applyPluginsToProcessor } from '../plugins/plugin-registry';
import { MarkdownConversionOptions } from '../../types';

/**
 * Builds a unified markdown processor with configurable pipeline.
 * 
 * The pipeline stages are:
 * 1. Parse HTML (rehypeParse)
 * 2. Apply rehype plugins while content is still HTML (rehypeProcessTables, etc.)
 * 3. Convert to markdown AST (rehypeRemark)
 * 4. Apply remark plugins to markdown (remarkGfm, remarkStringify, etc.)
 * 
 * @param opts - Markdown conversion options
 * @returns A configured unified processor
 */
export function buildMarkdownProcessor(opts: MarkdownConversionOptions): Processor {
  // Start with HTML parser
  const proc = unified();
  proc.use(rehypeParse, { fragment: false });

  // Apply all plugins in the correct order
  applyPluginsToProcessor(proc, opts);

  return proc;
} 