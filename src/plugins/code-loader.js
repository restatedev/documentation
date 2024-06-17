const fs = require('fs');
const fetch = require('node-fetch');

const plugin = (options) => {
    const codeLoadRegex = /^CODE_LOAD::([^#?]+)(?:#([^#]+)-([^#]+))?(?:\?([^#]+))?$/g;

    const injectCode = async (str) => {
        let fileData = null;
        str.replace(codeLoadRegex, (match, filePath, customStartTag, customEndTag, markNumber) => {
            fileData = { filePath, customStartTag, customEndTag, markNumber };
            return match;
        });

        if (!fileData) {
            return str;
        }

        const fileContent = await readFileOrFetch(fileData.filePath);
        const data = extractAndClean(fileContent, fileData.customStartTag, fileData.customEndTag, fileData.markNumber, fileData.filePath);
        return str.replace(codeLoadRegex, () => data);
    };

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

    function extractAndClean(fileContent, customStartTag, customEndTag, markNumber, filePath) {
        if (customStartTag && !fileContent.includes(customStartTag)) {
            throw new Error(`Custom start tag "${customStartTag}" not found in file ${filePath}`);
        }
        if (customEndTag && !fileContent.includes(customEndTag)) {
            throw new Error(`Custom end tag "${customEndTag}" not found in file ${filePath}`);
        }

        const startTag = customStartTag ?? "<start_here>";
        const endTag = customEndTag ?? "<end_here>";

        let lines = fileContent.split(startTag).pop().split(endTag).shift().split('\n').slice(1,-1);
        let finalLines = [];

        if (markNumber) {
            const markStartTag = `// <mark_${markNumber}>`;
            const markEndTag = `// </mark_${markNumber}>`;

            let needToMark = false;
            lines.forEach(function (line, index) {
                if(line.includes(markStartTag)){
                    if(needToMark){
                        throw new Error(`Mark start tag found before mark end tag in file ${filePath}`)
                    }
                    needToMark = true;
                }
                if(line.includes(markEndTag)){
                    if(!needToMark){
                        throw new Error(`Mark end tag found before mark start tag in file ${filePath}`)
                    }
                    needToMark = false;
                }

                if(!line.includes('<start_') && !line.includes('<end_') && !line.includes('<mark_') && !line.includes('</mark_')) {
                    if(needToMark){
                        finalLines.push(`// mark`)
                    }
                    finalLines.push(line);
                }
            });

            console.log(finalLines)
        } else {
            finalLines = lines;
        }

        const cleanedLines = finalLines.filter(line => {
            return !line.includes('<start_') && !line.includes('<end_') && !line.includes('<mark_') && !line.includes('</mark_');
        }).join('\n');

        const leadingWhitespace = cleanedLines.match(/^\s*/)[0];

        return cleanedLines.split('\n')
            .map(line => line.replace(new RegExp(`^${leadingWhitespace}`), ''))
            .join('\n');
    }

    const transformer = async (ast) => {
        const { visit } = await import('unist-util-visit');
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
