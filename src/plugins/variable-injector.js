const plugin = (options) => {
    const transformer = async (ast) => {
        const {visit} = await import('unist-util-visit')
        visit(ast, ['text', 'code'], (node) => {
            // Replace all occurrences of VAR::varName with the value of varName
            node.value = node.value.replace(/VAR::([A-Z_]+)/g, (match, varName) => {
                return options.replacements[varName] || match;
            });
        });
    };
    return transformer;
};

module.exports = plugin;
