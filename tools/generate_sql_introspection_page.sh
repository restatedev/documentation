#!/usr/bin/env bash
shopt -s nullglob

if [ -z "$1" ]
  then
    echo "You must provide the restate project path"
fi

RESTATE_PATH=$1
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
OUT_FILE=$SCRIPT_DIR/../docs/references/sql-introspection.md

cat > $OUT_FILE << EOF
---
sidebar_position: 3
description: "API reference for inspecting the invocation status and service state."
---
EOF

pushd $RESTATE_PATH

cargo xtask generate-table-docs >> $OUT_FILE

popd
