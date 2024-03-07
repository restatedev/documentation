// Plugin to load code snippets from files and replace the CODE_LOAD tag with the content of the file

const fs = require('fs');

const plugin = (options) => {
    const codeLoadRegex = /^CODE_LOAD::([^#]+)(?:#([^#]+)-([^#]+))?$/g;

    const replace = (str) => str.replace(codeLoadRegex, (match, filePath, customStartTag, customEndTag) => {
        const fileContent = fs.readFileSync('./code_snippets/' + filePath, 'utf8');

        // If custom tags are specified, extract them
        const startTag = customStartTag ?? "<start_here>";
        const endTag = customEndTag ?? "<end_here>";

        console.info(`Loaded code snippet from ${filePath} with tags: ${startTag} and ${endTag}`)

        // Split to only keep lines between "start_here" and "end_here"
        const lines = fileContent.split(startTag).pop().split(endTag).shift();

        // If start and end tags were used, Remove the last empty line with the "//" symbol
        const startLine = fileContent.includes(startTag) ? 1 : 0;
        const endLine = fileContent.includes(endTag) ? -1 : lines.length;
        const indentedCodeSnippet = lines.split("\n").slice(startLine, endLine).join("\n");

        // The code snippet can have leading whitespace on each line, so we need to reformat it
        // and remove the common whitespace
        // Determine common leading whitespace
        const leadingWhitespace = indentedCodeSnippet.match(/^\s*/)[0];

        // Remove leading whitespace from each line
        return indentedCodeSnippet.split('\n')
            .map(line => line.replace(new RegExp(`^${leadingWhitespace}`), ''))
            .join('\n');
    });

    const transformer = async (ast) => {
        const {visit} = await import('unist-util-visit')
        visit(ast, ['code', 'inlineCode'], (node) => {
            node.value = replace(node.value)
        });
    };

    return transformer;
};

module.exports = plugin;