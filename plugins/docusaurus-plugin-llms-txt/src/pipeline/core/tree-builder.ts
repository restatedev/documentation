import { DocInfo, PluginOptions, TreeNode } from '../../types';
import { getEffectiveConfigForPath } from '../../config';
import { createMatcher } from '@docusaurus/utils';
import { MD_EXTENSION_REGEX, INDEX_SEGMENT, DEFAULT_DEPTH } from '../../constants';

/**
 * Build hierarchical tree from docs
 */
export function buildTree(docs: DocInfo[], globalConfig: PluginOptions): TreeNode {
  const root: TreeNode = { 
    name: 'root', 
    relPath: '', 
    docs: [], 
    subCategories: [],
    // Store the config title and description in the root node
    title: globalConfig.siteTitle || '',
    description: globalConfig.siteDescription || ''
  };
  const categoryMap = new Map<string, TreeNode>();
  categoryMap.set('', root);

  for (const doc of docs) {
    // Use categoryPath (standard Docusaurus route) for categorization
    const route = doc.routePath.replace(MD_EXTENSION_REGEX, ''); // Strip .md for categorization
    const routePath = route.startsWith('/') ? route : '/' + route;
    const effectiveConfig = getEffectiveConfigForPath(routePath, globalConfig);
    const depth = effectiveConfig.depth || DEFAULT_DEPTH;

    const segments = routePath.split('/').filter(Boolean);
    if (segments.length === 1 && segments[0] === INDEX_SEGMENT) {
      root.indexDoc = doc;
      continue;
    }

    const catDepth = Math.min(depth, segments.length);
    let categoryPath = '';
    let currentNode = root;

    for (let i = 0; i < catDepth; i++) {
      const segment = segments[i];
      const nextPath = categoryPath ? `${categoryPath}/${segment}` : segment;
      if (!categoryMap.has(nextPath)) {
        // Determine the category name - check for path rule override
        let categoryName = segment; // default to segment name
        
        // Check if this specific category path has a rule with category override
        const categoryPathToCheck = `/${nextPath}`;
        if (globalConfig.pathRules?.length) {
          for (const rule of globalConfig.pathRules) {
            if (rule.category) {
              const matcher = createMatcher([rule.path]);
              
              // Special handling for wildcard rules like "/swml/**"
              if (rule.path.endsWith('/**')) {
                const rulePrefix = rule.path.slice(0, -3); // Remove "/**"
                if (categoryPathToCheck === rulePrefix) {
                  categoryName = rule.category;
                  break;
                }
              } else if (matcher(categoryPathToCheck)) {
                categoryName = rule.category;
                break;
              }
            }
          }
        }
        
        const newNode: TreeNode = { 
          name: categoryName,  // Use override or original segment
          relPath: nextPath, 
          docs: [], 
          subCategories: [] 
        };
        currentNode.subCategories.push(newNode);
        categoryMap.set(nextPath, newNode);
      }
      currentNode = categoryMap.get(nextPath)!;
      categoryPath = nextPath;
    }

    if (segments.length === catDepth) {
      currentNode.indexDoc = doc;
    } else {
      currentNode.docs.push(doc);
    }
  }
  return root;
} 