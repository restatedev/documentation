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

#### Formatting code snippets

For TS:
```
cd code_snippets/ts
npm run format
```

For Java:
```
cd code_snippets/java
./gradlew spotlessApply
```

For Kotlin:
```
cd code_snippets/kotlin
./gradlew spotlessApply
```

For Go:
```
cd code_snippets/go
go fmt
```

For Python:
```
cd code_snippets/python
python3 -m black .
```

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Staging area

The `main` branch of the documentation is continuously deployed at https://main.documentation-beg.pages.dev.

## Adding code snippets
If you want to add code snippets to the docs, they should be testable and compileable on PR merges and releases.

### Adding the code snippet
Add you code snippet in the folder [`code_snippets`](/code_snippets) in the subprojects for the respective language: [TypeScript](code_snippets/ts) or [Java](code_snippets/java). Keep the package structure identical to path of where the code snippet is referenced in the documentation.

### Using tags in the code snippet for start and end
If you only want to use a section of the code snippet in the docs. Specify the start by specifying a comment `<start_here>` and the end by specifying a comment `<end_here>` inside the code snippet. For example:
```
greet: async (ctx: restate.Context, name: string) => {
    // <start_here>
    // option 1: use full API spec
    ctx.send(myGreeterApi).greet("Pete");
    // <end_here>
},
```
You can also use custom tags. Tags need to follow the format  `// <start_custom_tag>` and `// <end_custom_tag>`. 

Refer to the code snippet from within the markdown documentation file as follows `CODE_LOAD::<path_to_snippet>`. If you use custom tags, specify them as  `CODE_LOAD::<path_to_snippet>#custom_tag`. You need to put this inside a code block with the language specified. The path is relative from **within** the code_snippets folder. For example, `CODE_LOAD::java/src/main/java/Greeter.java#greet_function` will look for the tags `// <start_greet_function>` and `// <end_greet_function>` in the code.

### Marking code 
If you want to mark a specific line in the code snippet, you can use the following tags : `// <mark_1>` and `// </mark_1>`.
You can use other numbers as well 

You can specify in markdown which marking number should be applied: `CODE_LOAD::<path_to_snippet>?mark_number`, for example:
```ts user_sign_up_flow.ts
CODE_LOAD::ts/src/use_cases/signup_workflow.ts?5
```
This will look for the following tags: `// <mark_5>` and `// </mark_5>` and only mark those. Other custom tags are removed in the final output

**Reason this exists:**
For Codehike scrollycoding, the different steps should mark different parts of the code. 
To do this, you need to pass the lines that need to marked in the markdown file but this gets very quickly outdated. 
So instead, you can mark the lines in the code snippet itself and add a number to then link the correct number from the scrollycoding step.

### Using GitHub links for your code snippets. 
For example: 
`CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/tutorials/tour-of-restate-typescript/src/part1/user_session.ts#<start_expire_ticket>-<end_expire_ticket>`


Code snippets will be compiled and build on PRs and releases. 

Details on how code snippets are parsed and inserted can be found in the [code-loader.js](src/plugins/code-loader.js) file.

### Code formatting
We use Spotless for formatting the Java code snippets. 
However, Spotless is quite eager on merging lines together into longer lines. 
This doesn't work well for the documentation sometimes because it requires horizontal scrolling.
If you don't want Spotless to merge lines on formatting use `// break` in between the lines.
The code loader will filter these out and the formatter will respect the breaks:
```java
RestateHttpEndpointBuilder.builder()
    // break
    .bind(new TicketObject())
    // break
    .buildAndListen();
```

## Adding guides

Guides are written in MDX format and are located in the `docs/guides` directory.

To add a new guide:
- Create a new file in the `docs/guides` directory. Make sure to set the following head items:
    - `title`: The title of the guide.
    - `description`: A short description of the guide.
    - `pagination_next`: The path to the next guide.
    - `pagination_prev`: The path to the previous guide.
- Add an image to show as a preview for the guide to the `src/data/guides` directory.
- Add the guide to [`src/data/guides.tsx`](). Add it to the `Guides` list there with the following format:
  ```
  {
    title: "Guide title",
    description: 'Guide description',
    preview: require('./guides/guide-img.png'),
    website: '/guides/guide-title', // Link to the text of the guide
    source: null, // Optionally link to the source code
    tags: ['integrations', 'typescript'], // Add tags to filter for the guide. Choose tags from the `TagType` list in the same file.
  }
  ```

You should now see your guide listed in the overview.

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

### Algolia
The documentation uses Algolia for search. 
The Algolia crawler runs one time per week. 
So if a release contains big changes to the docs (e.g. links), then it might be a good idea to run it manually: 
1. Go to https://crawler.algolia.com/ and log in
2. Go to `restate` crawler
3. Click `restart crawling`. Once this is done, the search is fully up to date!
