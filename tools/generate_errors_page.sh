#!/usr/bin/env bash
shopt -s nullglob

if [ -z "$1" ]
  then
    echo "You must provide the path where the error codes are"
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
IN_PATH=$1
OUT_FILE=$SCRIPT_DIR/../docs/references/errors.md

cat > $OUT_FILE << EOF
---
sidebar_position: 10
slug: errors
---

# Error codes

This page contains the list of error codes emitted by Restate components.

EOF

for md_file in $(find $IN_PATH -type f -name "*.md" | sort); do
    echo "Using $md_file";
    printf "$(cat $md_file)\n\n" >> $OUT_FILE;
done

# We need this to have anchors with uppercase error names
yarn write-heading-ids . $OUT_FILE --maintain-case --overwrite
