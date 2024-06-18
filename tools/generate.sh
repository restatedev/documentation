#!/usr/bin/env bash
shopt -s nullglob

if [ -z "$1" ]
  then
    echo "You must provide the restate project path"
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
RESTATE_PATH=$1
DOCS_DIR=$SCRIPT_DIR/../

# Generate docs
echo "Generate errors.md"
$SCRIPT_DIR/generate_errors_page.sh $RESTATE_PATH/crates/errors/src/error_codes

pushd $RESTATE_PATH

echo "Generate OpenAPI"
cargo xtask generate-rest-api-doc > $DOCS_DIR/static/schemas/openapi-admin.json

echo "Generate config schema"
cargo xtask generate-config-schema > $DOCS_DIR/static/schemas/config_schema.json

echo "Generate default config"
cargo xtask generate-default-config > $DOCS_DIR/static/schemas/restate.toml

echo "Generate sql introspection page"
$SCRIPT_DIR/generate_sql_introspection_page.sh $RESTATE_PATH


popd
