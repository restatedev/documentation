import path from 'path';
import fs from 'fs-extra';
import { createFileError, getErrorCause } from '../../utils';

/**
 * Saves markdown content to a file, creating directories as needed.
 */
export async function saveMarkdownFile(
  outputPath: string,
  content: string,
): Promise<void> {
  try {
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, content);
  } catch (error) {
    const errorCause = getErrorCause(error);
    throw createFileError(
      `Failed to save markdown file to ${outputPath}`,
      outputPath,
      errorCause,
    );
  }
} 