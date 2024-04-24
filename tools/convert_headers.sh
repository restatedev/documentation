#!/bin/bash

# Check if an input file is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <input_file>"
    exit 1
fi

# Check if the input file exists
if [ ! -f "$1" ]; then
    echo "Error: Input file '$1' not found."
    exit 1
fi

# Read the input file line by line
while IFS= read -r line; do
    # Check if the line starts with ##
    if [[ "$line" =~ ^##\  ]]; then
        # Extract the header text
        header_text=$(echo "$line" | sed 's/^##\ //')

        # Replace the header with HTML format
        echo "<h2 class=\"anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module\" id=\"$header_text\">$header_text<a href=\"#$header_text\" class=\"hash-link\">&#8203;</a></h2>"
    else
        # Print the line as is
        echo "$line"
    fi
done < "$1"
