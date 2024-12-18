const fs = require('fs');
const fetch = require('node-fetch');

const COMMENT_SYMBOL = {
    ts: "//",
    java: "//",
    kotlin: "//",
    python: "#",
    go: "//",
    proto: "//",
    rust: "//"
}

const plugin = (options) => {
    const codeLoadRegex = /.*CODE_LOAD::([^#?]+)(?:#([^?]*))?(?:\?(.+))?$/g;

    const injectCode = async (str) => {
        let fileData = null;
        str.replace(codeLoadRegex, (match, filePath, customTag, markNumber) => {
            fileData = { filePath, customTag, markNumber };
            return match;
        });

        if (!fileData) {
            return str;
        }

        const fileContent = await readFileOrFetch(fileData.filePath);
        const data = extractAndClean(fileContent, fileData.customTag, fileData.markNumber, fileData.filePath);
        return str.replace(codeLoadRegex, (match) => match.replace(/.*CODE_LOAD::[^#?]+(?:#([^?]*))?(?:\?(.+))?$/, data));
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

    function extractCommentSymbol(filePath) {
        if (filePath.includes(".java")) {
            return COMMENT_SYMBOL.java;
        } else if (filePath.includes(".kt")) {
            return COMMENT_SYMBOL.kotlin;
        } else if (filePath.includes(".ts")) {
            return COMMENT_SYMBOL.ts;
        } else if (filePath.includes(".py")) {
            return COMMENT_SYMBOL.python;
        } else if (filePath.includes(".go")) {
            return COMMENT_SYMBOL.go;
        } else if (filePath.includes(".rs")) {
            return COMMENT_SYMBOL.rust;
        } else if (filePath.includes(".proto")) {
            return COMMENT_SYMBOL.proto;
        } else {
            throw new Error(`language not detected for filepath ${filePath}`)
        }
    }

    function extractAndClean(fileContent, customTag, markNumber, filePath) {
        const commentSymbol = extractCommentSymbol(filePath)

        const startTag = (customTag) ? `<start_${customTag}>` : "<start_here>";
        const endTag = (customTag) ? `<end_${customTag}>` : "<end_here>";
        if (customTag && !fileContent.includes(startTag)) {
            throw new Error(`Custom start tag "${startTag}" not found in file ${filePath}`);
        }
        if (customTag && !fileContent.includes(endTag)) {
            throw new Error(`Custom end tag "${endTag}" not found in file ${filePath}`);
        }

        let lines;
        // Only remove the tag lines if there are tags present
        if(fileContent.includes(startTag) && fileContent.includes(endTag)){
            lines = fileContent.split(startTag).pop().split(endTag).shift().split('\n').slice(1,-1)
                // filter out the forced spotless breaks
                .filter(line => !line.includes(`${commentSymbol} break`));
        } else {
            lines = fileContent.split('\n')
                // filter out the forced spotless breaks
                .filter(line => !line.includes(`${commentSymbol} break`));
        }

        let finalLines = [];
        if (markNumber) {
            const markStartTag = `${commentSymbol} <mark_${markNumber}>`;
            const markEndTag = `${commentSymbol} </mark_${markNumber}>`;

            let needToMark = false;
            lines.forEach(function (line, index) {
                if(line.includes(markStartTag)){
                    if(needToMark){
                        throw new Error(`Mark start tag ${markStartTag} found before mark end tag in file ${filePath}`)
                    }
                    needToMark = true;
                }
                if(line.includes(markEndTag)){
                    if(!needToMark){
                        throw new Error(`Mark end tag ${markEndTag} found before mark start tag in file ${filePath}`)
                    }
                    needToMark = false;
                }

                if(!line.includes('<start_') && !line.includes('<end_') && !line.includes('<mark_') && !line.includes('</mark_')) {
                    if(needToMark){
                        finalLines.push(`${commentSymbol} !mark`)
                    }
                    finalLines.push(line);
                }
            });
        } else {
            finalLines = lines;
        }

        const leadingWhitespace = lines[0].match(/^\s*/)[0];

        return finalLines.filter(line => {
            // filter out all code loader tags
                return !line.includes('<start_') &&
                    !line.includes('<end_') &&
                    !line.includes('<mark_') &&
                    !line.includes('</mark_');
            })
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
