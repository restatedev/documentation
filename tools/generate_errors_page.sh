#!/usr/bin/env bash
shopt -s nullglob

if [ -z "$1" ]
  then
    echo "You must provide the path where the error codes are"
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
IN_PATH=$1
OUT_TMP_FILE=$SCRIPT_DIR/../docs/references/errors-tmp.md
OUT_FILE=$SCRIPT_DIR/../docs/references/errors.md

cat > $OUT_TMP_FILE << EOF
---
sidebar_position: 10
slug: errors
---

# Error codes

This page contains the list of error codes emitted by Restate components.

EOF

for md_file in $(find $IN_PATH -type f -name "*.md" | sort); do
    echo "Using $md_file";
    printf "$(cat $md_file)\n\n" >> $OUT_TMP_FILE;
done

chmod +x $SCRIPT_DIR/convert_headers.sh
$SCRIPT_DIR/convert_headers.sh $OUT_TMP_FILE > $OUT_FILE
rm $OUT_TMP_FILE