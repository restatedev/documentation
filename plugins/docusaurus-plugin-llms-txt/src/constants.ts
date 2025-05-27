/**
 * Constants used throughout the plugin
 */

// Title and content formatting
export const TITLE_TRUNCATE_LENGTH = 30 as const;
export const DEFAULT_MARKDOWN_HEADER_LEVEL = 2 as const;

// Cache and file system
export const CACHE_FOLDER_NAME = '.llms-txt' as const;
export const CACHE_FILE_NAME = 'cache.json' as const;

// Docusaurus structure
export const DOCUSAURUS_CACHE_DIR = '.docusaurus' as const;

// File extensions
export const HTML_EXTENSION = '.html' as const;
export const MD_EXTENSION = '.md' as const;

// File extension regex patterns
export const MD_EXTENSION_REGEX = /\.md$/;
export const HTML_EXTENSION_REGEX = /\.html$/;
export const INDEX_HTML_REGEX = /[/\\]index\.html$/;
export const HTML_OR_MD_EXTENSION_REGEX = /\.(html|md)$/;

// Default configuration values
export const DEFAULT_BUILD_DIR = 'build' as const;
export const DEFAULT_DOCS_ROOT = '' as const;
export const DEFAULT_OUTPUT_DIR = '' as const;
export const DEFAULT_SITE_TITLE = 'Documentation' as const;
export const DEFAULT_DEPTH = 1 as const;
export const ROOT_BASE_URL = '/' as const;

// Route patterns
export const ROOT_ROUTE_PATH = '/' as const;
export const INDEX_ROUTE_PATH = '/index.md' as const;
export const INDEX_SEGMENT = 'index' as const;

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

// Default content selectors
export const DEFAULT_CONTENT_SELECTORS = [
  '.theme-doc-markdown',
  'article', 
  'main .container'
] as const;

// Output files
export const LLMS_TXT_FILENAME = 'llms.txt' as const;

// Plugin configuration defaults
import type { Options as GfmOptions } from 'remark-gfm';
import stringWidth from 'string-width';

/**
 * Default options for remark-gfm plugin
 */
export const DEFAULT_GFM: GfmOptions = {
  singleTilde: false,
  tableCellPadding: true,
  tablePipeAlign: true,
  stringLength: stringWidth,
}; 