import path from 'path';
import fs from 'fs-extra';
import { createFileError, getErrorCause } from '../../utils';
import {Logger} from "../../types/logging";
import { noopLogger } from '../../logging';

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
export async function appendToMarkdownFile(
  outputPath: string,
  content: string,
  logger: Logger = noopLogger,
): Promise<void> {
  try {
    await fs.ensureDir(path.dirname(outputPath));
    await fs.promises.appendFile(outputPath, content);
  } catch (error) {
    const errorCause = getErrorCause(error);
    throw createFileError(
      `Failed to append to markdown file at ${outputPath}`,
      outputPath,
      errorCause,
    );
  }
}