import type { Options as RemarkGfmOptions } from 'remark-gfm';
import type { Options as RemarkStringifyOptions } from 'remark-stringify';
import { Joi } from '@docusaurus/utils-validation';
import { DEFAULT_CONTENT_SELECTORS, DEFAULT_BUILD_DIR, DEFAULT_DOCS_ROOT, DEFAULT_OUTPUT_DIR, DEFAULT_DEPTH } from '../constants';
import type * as HostHast from 'hast';

/**
 * Depth levels for document categorization
 */
export type Depth = 1 | 2 | 3 | 4 | 5;

/**
 * Log level to control verbosity
 */
export type LogLevel = 0 | 1 | 2 | 3;

/**
 * Configuration for processing specific route paths
 */
export interface PathRule {
  /** Glob pattern to match route paths */
  readonly path: string;
  /** Override depth for this path */
  readonly depth?: Depth;
  /** Exclude these sub-paths from this rule */
  readonly excludePaths?: readonly string[];
  /** Override content selectors for this path */
  readonly contentSelectors?: readonly string[];
  /** Category override for this path */
  readonly category?: string;
}

/**
 * Optional link for inclusion in llms.txt
 */
export interface OptionalLink {
  /** Link title */
  readonly title: string;
  /** Link URL */
  readonly url: string;
  /** Optional description */
  readonly description?: string;
}

/**
 * Main plugin configuration options
 */
export interface PluginOptions {
  // Core functionality options
  readonly enableMarkdownFiles?: boolean;
  readonly siteTitle?: string;
  readonly enableCache?: boolean;
  readonly relativePaths?: boolean;
  readonly enableDescriptions?: boolean;
  
  // Content filtering options
  readonly includeBlog?: boolean;
  readonly includePages?: boolean;
  readonly includeDocs?: boolean;
  readonly skipGeneratedPages?: boolean;
  
  // Content extraction options
  readonly contentSelectors?: readonly string[];
  readonly docsRoot?: string;
  readonly outputDir?: string;
  readonly buildDir?: string;
  
  // Structure options
  readonly depth?: Depth;
  readonly excludePaths?: readonly string[];
  readonly pathRules?: readonly PathRule[];
  
  // Format options
  readonly remarkStringify?: Readonly<RemarkStringifyOptions>;
  readonly remarkGfm?: boolean | Readonly<RemarkGfmOptions>;
  readonly rehypeProcessTables?: boolean;
  
  // Additional features
  readonly siteDescription?: string;
  readonly optionalLinks?: readonly OptionalLink[];
  
  // Logging
  readonly logLevel?: LogLevel;
  readonly runOnPostBuild?: boolean;
}

/**
 * Configuration with path rule applied
 */
export type EffectiveConfig = PluginOptions & PathRule;

/**
 * Information about a document
 */
export interface DocInfo {
  readonly routePath: string;
  readonly htmlPath: string;
  readonly title: string;
  readonly description: string;
}

/**
 * Represents a node in the document tree
 */
export interface TreeNode {
  readonly name: string;
  readonly relPath: string;
  readonly title?: string;
  readonly description?: string;
  indexDoc?: DocInfo;
  docs: DocInfo[];
  subCategories: TreeNode[];
}

/**
 * HTML to Markdown conversion options
 */
export interface MarkdownConversionOptions {
  readonly remarkStringify?: Readonly<RemarkStringifyOptions>;
  readonly remarkGfm?: boolean | Readonly<RemarkGfmOptions>;
  readonly rehypeProcessTables?: boolean;
  readonly rehypeProcessLinks?: boolean;
  readonly baseUrl?: string;
  readonly relativePaths?: boolean;
  readonly enableMarkdownFiles?: boolean;
  readonly excludePaths?: readonly string[];
  readonly logger?: import('../types/logging').Logger;
}

/**
 * HTML to Markdown conversion result
 */
export interface ConversionResult {
  readonly content: string;
  readonly title: string;
  readonly description: string;
}

/**
 * Type for title extraction strategy functions
 */
export type TitleExtractor = (tree: HostHast.Root) => string | null;

/**
 * Joi schema for runtime validation
 */
export const pluginOptionsSchema = Joi.object({
  // Core toggles
  enableMarkdownFiles: Joi.boolean().default(true),
  runOnPostBuild: Joi.boolean().default(true),
  siteTitle: Joi.string().allow('').default(''),
  enableCache: Joi.boolean().default(true),
  relativePaths: Joi.boolean().default(true),
  enableDescriptions: Joi.boolean().default(true),

  // Content filtering options
  includeBlog: Joi.boolean().default(false),
  includePages: Joi.boolean().default(false),
  includeDocs: Joi.boolean().default(true),
  skipGeneratedPages: Joi.boolean().default(true),
  excludePaths: Joi.array().items(Joi.string()).default([]),

  // Extraction / path options
  docsRoot: Joi.string().allow('').default(DEFAULT_DOCS_ROOT),
  contentSelectors: Joi.array().items(Joi.string()).default([...DEFAULT_CONTENT_SELECTORS]),
  depth: Joi.number().integer().min(1).max(5).default(DEFAULT_DEPTH),
  outputDir: Joi.string().allow('').default(DEFAULT_OUTPUT_DIR),
  buildDir: Joi.string().allow('').default(DEFAULT_BUILD_DIR),

  // Path-specific rules
  pathRules: Joi.array().items(
    Joi.object({
      path: Joi.string().required(),
      depth: Joi.number().integer().min(1).max(5),
      excludePaths: Joi.array().items(Joi.string()),
      contentSelectors: Joi.array().items(Joi.string()),
      category: Joi.string(),
    }).unknown(false)
  ).default([]),

  // Markdown / remark settings
  remarkStringify: Joi.object().unknown(true).default({
    bullet: '-',
    emphasis: '_',
    strong: '*',
    fence: '`',
    fences: true,
    incrementListMarker: true,
    listItemIndent: 'one',
    tightDefinitions: true,
    setext: false,
  }),
  remarkGfm: Joi.alternatives().try(Joi.boolean(), Joi.object().unknown(true)).default(true),
  rehypeProcessTables: Joi.boolean().default(true),

  // Misc
  siteDescription: Joi.string().allow('').default(''),
  optionalLinks: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      url: Joi.string().required(),
      description: Joi.string().optional(),
    })
  ).default([]),
  logLevel: Joi.number().integer().min(0).max(3).default(2),
}); 