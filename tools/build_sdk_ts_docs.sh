#!/usr/bin/env bash
shopt -s nullglob

if [ -z "$1" ]
  then
    echo "You must provide the sdk-typescript project path"
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
SDK_PATH=$1
DOCS_DIR=$SCRIPT_DIR/../

pushd $SDK_PATH
npm install
npm run build-docs
popd

rm -rf $DOCS_DIR/static/tsdocs
mv $SDK_PATH/docs-out $DOCS_DIR/static/tsdocs