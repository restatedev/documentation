// Plugin to load code snippets from files and replace the CODE_LOAD tag with the content of the file

const fs = require('fs');
const fetch = require('node-fetch');

const plugin = (options) => {
    const codeLoadRegex = /^CODE_LOAD::([^#]+)(?:#([^#]+)-([^#]+))?$/g;

    const injectCode = async (str) => {
        let fileData = null;
        str.replace(codeLoadRegex, (match, filePath, customStartTag, customEndTag) => {
            console.info(`Loading code snippet from with optional custom tags: ${customStartTag} and ${customEndTag}`)
            fileData = { filePath, customStartTag, customEndTag }
            return match;
        });

        if(!fileData){
            return str;
        }

        const fileContent = await readFileOrFetch(fileData.filePath);
        const data = extractAndClean(fileContent, fileData.customStartTag, fileData.customEndTag, fileData.filePath);
        return str.replace(codeLoadRegex, () => data);
    }

    async function readFileOrFetch(filepath) {
        if (filepath.startsWith('https://raw.githubusercontent.com/')) {
            const response = await fetch(filepath);
            if (!response.ok) {
                throw new Error('Failed to fetch file from GitHub for ' + filepath);
            }
            return await response.text();
        } else {
            return fs.readFileSync('./code_snippets/' + filepath, 'utf8');
        }
    }

    function extractAndClean(fileContent, customStartTag, customEndTag, filePath){
        // If custom start and end tags are provided, check if they are present in the file, otherwise fail
        if (customStartTag && !fileContent.includes(customStartTag)) {
            throw new Error(`Custom start tag "${customStartTag}" not found in file ${filePath}`);
        }
        if (customEndTag && !fileContent.includes(customEndTag)) {
            throw new Error(`Custom end tag "${customEndTag}" not found in file ${filePath}`);
        }

        const startTag = customStartTag ?? "<start_here>";
        const endTag = customEndTag ?? "<end_here>";

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
    }

    const transformer = async (ast) => {
        const {visit} = await import('unist-util-visit')
        const codes = [];
        await visit(ast, ['code', 'inlineCode'], (node) => {
            codes.push(node);
        });

        await Promise.all(codes.map(async (node) => {
            node.value = await injectCode(node.value);
        }));
    };

    return transformer;
};

module.exports = plugin;