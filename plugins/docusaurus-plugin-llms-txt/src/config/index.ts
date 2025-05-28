import { PluginOptions, EffectiveConfig, pluginOptionsSchema } from '../types/plugin';
import stringWidth from 'string-width';
import { createMatcher } from '@docusaurus/utils';

/**
 * Processes and validates plugin options, applying defaults
 */
export function getConfig(options: Partial<PluginOptions>): PluginOptions {
  const validated = pluginOptionsSchema
    .validate(options, { abortEarly: false })
    .value as PluginOptions;
  
  // Setup remark-gfm defaults if needed
  if (validated.remarkGfm === true || (typeof validated.remarkGfm === 'object' && validated.remarkGfm !== null)) {
    const defaultRemarkGfm = {
      singleTilde: false,
      tableCellPadding: true,
      tablePipeAlign: true,
      stringLength: stringWidth,
    };

    if (validated.remarkGfm === true) {
      (validated as any).remarkGfm = defaultRemarkGfm;
    } else if (typeof validated.remarkGfm === 'object') {
      (validated as any).remarkGfm = {
        ...defaultRemarkGfm,
        ...validated.remarkGfm,
      };
    }
  }

  return validated;
}

/**
 * Gets config effective for a specific path, applying any matching path rules
 */
export function getEffectiveConfigForPath(relPath: string, config: PluginOptions): EffectiveConfig {
  const matchPath = relPath.startsWith('/') ? relPath : `/${relPath}`;

  // Apply first matching path rule if any
  if (config.pathRules?.length) {
    for (const rule of config.pathRules) {
      const matcher = createMatcher([rule.path]);
      if (matcher(matchPath)) {
        return { ...config, ...rule } as EffectiveConfig;
      }
    }
  }

  return { ...config, path: matchPath } as EffectiveConfig;
} 