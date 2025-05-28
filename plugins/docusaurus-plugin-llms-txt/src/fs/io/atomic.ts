import fs from 'fs-extra';
import path from 'path';

/**
 * Atomically writes JSON data to `filePath`.
 * A temporary file is written first and then renamed so the target is never left half-written.
 */
export async function writeJsonAtomic(filePath: string, data: unknown): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.ensureDir(dir);
  const tmp = path.join(dir, `.${path.basename(filePath)}.tmp-${Date.now()}`);
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tmp, filePath);
} 