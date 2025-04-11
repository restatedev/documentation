const fs = require('fs');
const fetch = require('node-fetch');

const LANGUAGE_SYMBOLS = {
    ts: {
        commentSymbol: "//",
        serviceSymbol: ["restate.service", "restate.object", "restate.workflow"]
    },
    java: {
        commentSymbol: "//",
        serviceSymbol: ["@Service", "@VirtualObject", "@Workflow", "@RestateService", "@RestateVirtualObject", "@RestateWorkflow"]
    },
    kotlin: {
        commentSymbol: "//",
        serviceSymbol: ["@Service", "@VirtualObject", "@Workflow", "@RestateService", "@RestateVirtualObject", "@RestateWorkflow"]
    },
    python: {
        commentSymbol: "#",
        serviceSymbol: ["= VirtualObject(", "= Service(", "= Workflow("]
    },
    go: {
        commentSymbol: "//",
        serviceSymbol: ["struct{}"]
    },
    proto: {
        commentSymbol: "//",
        serviceSymbol: []
    },
    rust: {
        commentSymbol: "//",
        serviceSymbol: ["#[restate_sdk::service]", "#[restate_sdk::object]", "#[restate_sdk::workflow]"]
    }
};

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

        // Take care of the collapse_prequel tag (we then need to collapse all imports before the first restate object)
        const doCollapsePrequel = str.includes("collapse_prequel")
        const doRemoveComments = str.includes("remove_comments")
        const cleanedStr = str.split("\n").filter(line => !line.includes("collapse_prequel") && !line.includes("remove_comments")).join("\n")

        const fileContent = await readFileOrFetch(fileData.filePath);
        const data = extractAndClean(fileContent, fileData.customTag, fileData.markNumber, fileData.filePath, doCollapsePrequel, doRemoveComments);
        return cleanedStr.replace(codeLoadRegex, (match) => match.replace(/.*CODE_LOAD::[^#?]+(?:#([^?]*))?(?:\?(.+))?$/, data));
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

    function extractLanguageSymbol(filePath) {
        if (filePath.includes(".java")) {
            return LANGUAGE_SYMBOLS.java;
        } else if (filePath.includes(".kt")) {
            return LANGUAGE_SYMBOLS.kotlin;
        } else if (filePath.includes(".ts")) {
            return LANGUAGE_SYMBOLS.ts;
        } else if (filePath.includes(".py")) {
            return LANGUAGE_SYMBOLS.python;
        } else if (filePath.includes(".go")) {
            return LANGUAGE_SYMBOLS.go;
        } else if (filePath.includes(".rs")) {
            return LANGUAGE_SYMBOLS.rust;
        } else if (filePath.includes(".proto")) {
            return LANGUAGE_SYMBOLS.proto;
        } else {
            throw new Error(`language not detected for filepath ${filePath}`)
        }
    }

    function extractAndClean(fileContent, customTag, markNumber, filePath, doCollapsePrequel, doRemoveComments) {
        const {commentSymbol, serviceSymbol} = extractLanguageSymbol(filePath)

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

        // if language is go, then replace tab by 4 spaces
        // go fmt does not like spaces so we need to do that here
        if (filePath.includes(".go")) {
            lines = lines.map(line => line.replace(/\t/g, '  '))
        }

        let filteredLines = [];
        if (markNumber) {
            const markStartTag = `${commentSymbol} <mark_${markNumber}>`;
            const markEndTag = `${commentSymbol} </mark_${markNumber}>`;

            let needToMark = false;
            let marking = ""; // to keep the color of the marking (codehike allows choosing mark color)
            lines.forEach(function (line, index) {
                if(line.includes(markStartTag)){
                    if(needToMark){
                        throw new Error(`Mark start tag ${markStartTag} found before mark end tag in file ${filePath}`)
                    }
                    needToMark = true;
                    marking = line.replace(`<mark_${markNumber}>`, "!mark");
                }
                if(line.includes(markEndTag)){
                    if(!needToMark){
                        throw new Error(`Mark end tag ${markEndTag} found before mark start tag in file ${filePath}`)
                    }
                    needToMark = false;
                }

                if(!line.includes('<start_') && !line.includes('<end_') && !line.includes('<mark_') && !line.includes('</mark_')) {
                    if(needToMark){
                        filteredLines.push(marking)
                    }
                    filteredLines.push(line);
                }
            });
        } else {
            filteredLines = lines;
        }

        const leadingWhitespace = lines[0].match(/^\s*/)[0];

        let inBlockComment = false;
        let finalLines = filteredLines.filter(line => {
            let trimmedLine = line.trim();

            // Handle multi-line comments
            if (doRemoveComments) {
                if (trimmedLine.startsWith('/*')) {
                    inBlockComment = true;
                }
                if (inBlockComment) {
                    if (trimmedLine.endsWith('*/')) {
                        inBlockComment = false;
                    }
                    return false; // Ignore everything inside /* ... */
                }
            }
            // filter out all code loader tags
            let keepLine = !line.includes('<start_') &&
                !line.includes('<end_') &&
                !line.includes('<mark_') &&
                !line.includes('</mark_') &&
                !line.includes('collapse_prequel');

            if (doRemoveComments) {
                keepLine = keepLine && !trimmedLine.includes(commentSymbol)
            }
            return keepLine
        })

        if (doCollapsePrequel) {
            finalLines = collapsePrequel(finalLines, serviceSymbol, commentSymbol);
        }

        return finalLines
            .map(line => line.replace(new RegExp(`^${leadingWhitespace}`), ''))
            .join('\n');
    }

    function collapsePrequel(lines, serviceSymbol, commentSymbol) {
        let collapseIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (serviceSymbol.some(symbol => lines[i].includes(symbol))) {
                collapseIndex = i;
                break;
            }
        }

        if (collapseIndex !== -1) {
            const collapseComment = `${commentSymbol} !collapse(1:${collapseIndex + 1}) collapsed \n ${commentSymbol} Click to expand imports/comments...`
            // Add collapseComment as first line to lines
            return [collapseComment, ...lines];
        } else {
            throw new Error('No service/object/workflow found in file, so cannot collapse prequel');
        }
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
