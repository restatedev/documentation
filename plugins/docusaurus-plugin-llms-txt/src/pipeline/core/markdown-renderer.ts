import { TreeNode } from '../../types';
import { formatDocUrl } from '../../utils';
import { createSlugger } from '@docusaurus/utils';
import { DEFAULT_MARKDOWN_HEADER_LEVEL } from '../../constants';

/**
 * Check if two titles are similar using slug comparison
 */
function areSimilarTitles(a: string, b: string): boolean {
  const slugger = createSlugger();
  return slugger.slug(a) === slugger.slug(b);
}

/**
 * Render tree structure as markdown
 */
export function renderTreeMarkdown(
  node: TreeNode, 
  level: number = DEFAULT_MARKDOWN_HEADER_LEVEL, 
  isRoot: boolean = false, 
  baseUrl: string = '', 
  useRelativePaths: boolean = true,
  enableMarkdownFiles: boolean = true,
  enableDescriptions: boolean = true
): string {
  let md = '';
  
  // Handle category heading and description
  if (!isRoot && node.name) {
    const shouldHeader = !node.indexDoc || !areSimilarTitles(node.name, node.indexDoc.title);
    if (shouldHeader) {
      md += `${'#'.repeat(level)} ${node.name}\n\n`;
      
      // Display category description directly under the header if available and descriptions are enabled
      if (enableDescriptions && node.indexDoc && node.indexDoc.description) {
        md += `${node.indexDoc.description}\n\n`;
      }
    }
  }
  
  // Handle the category index document or root index
  if (node.indexDoc) {
    const formattedUrl = formatDocUrl(
      node.indexDoc.routePath, 
      { relativePaths: useRelativePaths, enableMarkdownFiles }, 
      baseUrl
    );
    
    if (isRoot) {
      // For root level, try these sources in order:
      // 1. Config title (stored in node.title)
      // 2. Index document title
      const rootTitle = node.title && node.title.length > 0 ? node.title : node.indexDoc.title;
      md += `- [${rootTitle}](${formattedUrl})\n`;
    } else {
      // For other categories, show which category they're the main page for
      // Only add the category description if descriptions are enabled
      const categoryDesc = enableDescriptions ? `: ${node.name} page` : '';
      md += `- [${node.indexDoc.title}](${formattedUrl})${categoryDesc}\n`;
    }
  }
  
  // Handle regular documents in this category
  node.docs.forEach(d => { 
    const formattedUrl = formatDocUrl(
      d.routePath, 
      { relativePaths: useRelativePaths, enableMarkdownFiles }, 
      baseUrl
    );
    
    // Only add description if enabled
    const descriptionText = enableDescriptions && d.description ? `: ${d.description}` : '';
    md += `- [${d.title}](${formattedUrl})${descriptionText}\n`;
  });
  
  // Process subcategories
  if (node.subCategories.length) {
    [...node.subCategories]
      .sort((a, b): number => a.name.localeCompare(b.name))
      .forEach(sub => {
        md += `\n` + renderTreeMarkdown(
          sub, 
          isRoot ? level : level+1, 
          false, 
          baseUrl, 
          useRelativePaths,
          enableMarkdownFiles,
          enableDescriptions
        );
      });
  }
  return md;
} 