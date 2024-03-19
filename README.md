# Restate documentation

This repository contains Restate's documentation: https://docs.restate.dev/

## Developing the documentation

The documentation is built using [Docusaurus 2](https://docusaurus.io/).

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Staging area

The `main` branch of the documentation is continuously deployed at https://main.documentation-beg.pages.dev.

## Adding code snippets
If you want to add code snippets to the docs, they should be testable and compileable on PR merges and releases.
Follow these steps:
1. Add you code snippet in the folder [`code_snippets`](/code_snippets) in the subprojects for the respective language: [TypeScript](code_snippets/ts) or [Java](code_snippets/java). Keep the package structure identical to path of where the code snippet is referenced in the documentation.
2. If you only want to use a section of the code snippet in the docs. Specify the start by specifying a comment `<start_here>` and the end by specifying a comment `<end_here>` inside the code snippet. For example:
```
greet: async (ctx: restate.Context, name: string) => {
    // <start_here>
    // option 1: use full API spec
    ctx.send(myGreeterApi).greet("Pete");
    // <end_here>
},
```
You can also use custom tags. Please keep the tags a bit uniform and descriptive. For example, `// <start_custom_tag>` and `// <end_custom_tag>`. This way it's easy to discriminate tags from just comments.
3. Refer to the code snippet from within the markdown documentation file as follows `CODE_LOAD::<path_to_snippet>`. If you use custom tags, specify them as  `CODE_LOAD::<path_to_snippet>#<start_custom_tag>-<end_custom_tag>`. You need to put this inside a code block with the language specified. The path is relative from **within** the code_snippets folder. For example, `CODE_LOAD::java/src/main/java/Greeter.java#<start_greet_function>-<end_greet_function`. 

4. You can also use GitHub links for your code snippets. For example: 
`CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/issue320_docs_injection_code_snippets/tutorials/tour-of-restate-typescript/src/part1/user_session.ts#<start_expire_ticket>-<end_expire_ticket>`


Code snippets will be compiled and build on PRs and releases. 

Details on how code snippets are parsed and inserted can be found in the [code-loader.js](src/plugins/code-loader.js) file.

## Releasing the documentation

Before releasing the documentation, update schemas and version of Restate artifacts, either:

- Automatically by executing the _Pre-release updates_ workflow.
- Manually, as described [here](#manually-update-the-schemas).

Once the branch `main` is ready to be released, create and push the release tag:

```shell
git checkout main
git tag -m "Documentation v0.3.0" v0.3.0
git push --tags
```

The tag triggers creating a draft [release on Github](https://github.com/restatedev/documentation/releases) that needs manual approval.
Moreover, it will push the latest `main` to the `production` branch which triggers the deployment of the documentation.

### Manually update the schemas

To update the configuration schemas, the default configuration and the Meta OpenAPI document,
clone [Restate](https://github.com/restatedev/restate/) and execute the following:

```shell
$ ./tools/generate.sh <PATH to Restate repo clone>
```

### Manually update artifact versions

The config file `restate.config.json` contains versions of various Restate artifacts:

- TypeScript SDK: `TYPESCRIPT_SDK_VERSION`
- Java SDK: `JAVA_SDK_VERSION`
- Runtime: `RESTATE_VERSION`
