#!/usr/bin/env bash
shopt -s nullglob

if [ -z "$1" ]
  then
    echo "You must provide the sdk-java project path"
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
SDK_PATH=$1
DOCS_DIR=$SCRIPT_DIR/../

gradle -p $SDK_PATH :sdk-aggregated-javadocs:javadoc
gradle -p $SDK_PATH :dokkaHtmlMultiModule

mv $SDK_PATH/sdk-aggregated-javadocs/build/docs/javadoc $DOCS_DIR/static/javadocs
mv $SDK_PATH/build/dokka/htmlMultiModule $DOCS_DIR/static/ktdocs