import path from 'path';
import { posixPath } from '@docusaurus/utils';
import { DOCUSAURUS_CACHE_DIR, CACHE_FOLDER_NAME, CACHE_FILE_NAME, MD_EXTENSION, INDEX_HTML_REGEX, HTML_EXTENSION_REGEX } from '../constants';

/**
 * Convert any OS-specific path string to a POSIX (slash-separated) one.
 * Useful for building route paths and writing predictable keys into llms.txt.
 */
export function toPosixPath(p: string): string {
  return posixPath(p);
}

/**
 * Convert a relative HTML path (from the build output) to its corresponding Markdown
 * file path inside the chosen markdown output directory.
 *
 * Examples:
 *   blog/index.html   → blog.md
 *   api/reference.html → api/reference.md
 */
export function htmlPathToMdPath(relHtmlPath: string, mdOutDir: string): string {
  if (INDEX_HTML_REGEX.test(relHtmlPath)) {
    return path.join(mdOutDir, relHtmlPath.replace(INDEX_HTML_REGEX, '') + MD_EXTENSION);
  }
  return path.join(mdOutDir, relHtmlPath.replace(HTML_EXTENSION_REGEX, MD_EXTENSION));
}

/**
 * Build cache directory path
 */
export function getCacheDir(siteDir: string): string {
  return path.join(siteDir, DOCUSAURUS_CACHE_DIR, CACHE_FOLDER_NAME);
}

/**
 * Build cache file path
 */
export function getCacheFilePath(siteDir: string): string {
  return path.join(getCacheDir(siteDir), CACHE_FILE_NAME);
} 