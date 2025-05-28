import type * as HostHast from 'hast';
import type { TitleExtractor } from '../../types';
import { select } from 'hast-util-select';
import { toString } from 'hast-util-to-string';

/**
 * Extract title from header H1 element (most specific, cleanest in Docusaurus)
 */
export const extractHeaderH1: TitleExtractor = (tree: HostHast.Root): string | null => {
  const headerH1 = select('header h1', tree) as HostHast.Element | null;
  if (!headerH1) return null;
  const title = toString(headerH1 as HostHast.Nodes).trim();
  return title || null;
};

/**
 * Extract title from main content area heading
 * Checks multiple common selectors for content areas
 */
export const extractContentH1: TitleExtractor = (tree: HostHast.Root): string | null => {
  // Combined selectors from both previous methods (mainContentH1 and pageH1)
  const mainH1 = select('main h1, .main-wrapper h1, article h1', tree) as HostHast.Element | null;
  if (mainH1) {
    const title = toString(mainH1 as HostHast.Nodes).trim();
    return title || null;
  }
  
  // General H1 selector as fallback
  const pageH1 = select('h1', tree) as HostHast.Element | null;
  if (pageH1) {
    const title = toString(pageH1 as HostHast.Nodes).trim();
    return title || null;
  }
  
  return null;
};

/**
 * Extract title from document title tag
 * Handles site title format like "Page Title | Site Name"
 */
export const extractDocumentTitle: TitleExtractor = (tree: HostHast.Root): string | null => {
  const titleEl = select('title', tree) as HostHast.Element | null;
  if (titleEl) {
    const fullTitle = toString(titleEl as HostHast.Nodes).trim();
    if (fullTitle) {
      // Split on pipe and take the first part (page title)
      const parts = fullTitle.split('|');
      return parts.length > 1 ? parts[0].trim() : fullTitle.trim();
    }
  }
  return null;
};

/**
 * Default title extractor strategy chain
 * Attempts extractors in order of preference until one succeeds
 */
export const defaultTitleExtractors = [
  extractHeaderH1,
  extractContentH1,
  extractDocumentTitle
];

/**
 * Extract title using a strategy chain approach
 * 
 * @param tree - HTML AST to extract title from
 * @param extractors - Array of title extraction strategies to try in order
 * @returns Extracted title or fallback
 */
export function extractTitle(
  tree: HostHast.Root,
  extractors: readonly TitleExtractor[] = defaultTitleExtractors
): string {
  for (const extractor of extractors) {
    const title = extractor(tree);
    if (title) {
      return title;
    }
  }
  
  // Fallback if no extractors succeed
  return 'Untitled Document';
} 