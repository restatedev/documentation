import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import { formatDocUrl } from '../../utils';
import { parseLocalURLPath, createMatcher } from '@docusaurus/utils';
import type { RehypeLinksOptions } from '../../types';
import { HTML_OR_MD_EXTENSION_REGEX } from '../../constants';

/**
 * Check if a URL is an internal relative link using Docusaurus utilities
 * Uses parseLocalURLPath which handles edge cases better than custom regex
 */
function isInternalLink(href: string): boolean {
  if (!href || href.startsWith('#')) {
    return false;
  }
  
  // Use Docusaurus parseLocalURLPath which returns null for external URLs
  const parsed = parseLocalURLPath(href);
  return parsed !== null;
}

/**
 * Check if a URL should be excluded from transformation based on exclude patterns
 */
function isExcludedLink(href: string, excludePaths?: readonly string[]): boolean {
  if (!excludePaths?.length) {
    return false;
  }
  
  // Parse the URL to get the pathname
  const parsed = parseLocalURLPath(href);
  if (!parsed) {
    return false;
  }
  
  let { pathname } = parsed;
  
  // Normalize pathname to match exclude patterns (ensure it starts with /)
  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }
  
  // Create matcher and test the pathname
  const isExcluded = createMatcher([...excludePaths]);
  return isExcluded(pathname);
}

/**
 * Check if link transformation should be skipped entirely
 */
function shouldSkipLinkTransformation(options: RehypeLinksOptions): boolean {
  const { enableMarkdownFiles = true, relativePaths = true } = options;
  // If relative paths are enabled and markdown files are disabled,
  // skip processing as links don't need transformation
  return relativePaths && !enableMarkdownFiles;
}

/**
 * Determine transformation options for excluded links
 */
function getExcludedLinkOptions(options: RehypeLinksOptions): RehypeLinksOptions | null {
  const { relativePaths = true } = options;
  
  // For excluded links, still apply base URL transformation if using absolute paths
  // but don't add .md extension since we're not generating files for excluded paths
  if (!relativePaths) {
    return {
      ...options,
      enableMarkdownFiles: false  // Force no .md extension for excluded links
    };
  }
  
  // If using relative paths, leave excluded links unchanged
  return null;
}

/**
 * Transform a relative link based on configuration
 */
function transformInternalLink(
  href: string,
  options: RehypeLinksOptions
): string {
  const { enableMarkdownFiles = true, relativePaths = true, baseUrl = '' } = options;

  // Parse the URL to handle query params and hash fragments properly
  const parsed = parseLocalURLPath(href);
  if (!parsed) {
    return href; // Fallback if parsing fails
  }

  let { pathname } = parsed;
  
  // Convert to standardized path (remove leading ./ if present)
  if (pathname.startsWith('./')) {
    pathname = pathname.slice(2);
  }
  
  // If it starts with /, it's already an absolute path from site root
  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }
  
  // Remove any existing file extensions and trailing slashes for consistent processing
  pathname = pathname.replace(HTML_OR_MD_EXTENSION_REGEX, '');
  
  // Remove trailing slashes (except for root path)
  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  
  // Use our URL formatting utility for the pathname
  const transformedPathname = formatDocUrl(
    pathname, 
    { relativePaths, enableMarkdownFiles }, 
    baseUrl
  );
  
  // Reconstruct the URL with query params and hash if they exist
  const search = parsed.search ? `?${parsed.search}` : '';
  const hash = parsed.hash ? `#${parsed.hash}` : '';
  
  return `${transformedPathname}${search}${hash}`;
}

/**
 * Process a single anchor element for link transformation
 */
function processAnchorElement(node: Element, options: RehypeLinksOptions): void {
  // Only process anchor elements with href attributes
  if (node.tagName !== 'a' || !node.properties?.href) {
    return;
  }
  
  const href = String(node.properties.href);
  
  // Only transform internal links
  if (!isInternalLink(href)) {
    return;
  }
  
  // Check if the link is excluded
  const isExcluded = isExcludedLink(href, options.excludePaths);
  
  if (isExcluded) {
    const excludedOptions = getExcludedLinkOptions(options);
    if (excludedOptions) {
      const transformedHref = transformInternalLink(href, excludedOptions);
      node.properties.href = transformedHref;
    }
    return;
  }
  
  // Transform non-excluded links normally
  const transformedHref = transformInternalLink(href, options);
  node.properties.href = transformedHref;
}

/**
 * Rehype plugin that transforms internal links based on plugin configuration.
 * 
 * This plugin automatically determines when to run:
 * - If relativePaths=true AND enableMarkdownFiles=false → plugin disabled (no transformation needed)
 * - If relativePaths=false → prepend baseUrl to internal links  
 * - If enableMarkdownFiles=true → append .md to internal links
 * - If relativePaths=false AND enableMarkdownFiles=true → do both
 * 
 * Special handling for excluded links:
 * - If relativePaths=false → excluded links get baseUrl but NO .md extension (since no file is generated)
 * - If relativePaths=true → excluded links are left unchanged
 */
export default function rehypeLinks(options: RehypeLinksOptions = {}) {
  return function transformer(tree: Root): Root {
    // Check if we should skip transformation entirely
    if (shouldSkipLinkTransformation(options)) {
      return tree;
    }
    
    visit(tree, 'element', (node: Element) => {
      processAnchorElement(node, options);
    });
    
    return tree;
  };
} 