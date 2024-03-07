// Your custom Docusaurus plugin

const fs = require('fs');

const plugin = (options) => {
    const codeLoadRegex = /CODE_LOAD::([^\s]+)/g;

    const replace = (str) => str.replace(codeLoadRegex, (match, filePath) => {
        const fileContent = fs.readFileSync('./code_snippets/' + filePath, 'utf8');

        // Split to only keep lines between "start_here" and "end_here"
        const lines = fileContent.split("start_here").pop().split("end_here").shift();

        // If start and end tags were used, Remove the last empty line with the "//" symbol
        const endLine = fileContent.includes("end_here") ? -1 : lines.length;
        return lines.split("\n").slice(0, endLine).join("\n").trim();
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