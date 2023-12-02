# Restate documentation

This repository contains Restate's documentation: https://docs.restate.dev/

## Offline use

You can read the Restate documentation offline by downloading the docker image:

```shell
docker run --rm -p 3000:80 ghcr.io/restatedev/documentation:latest
```

This will serve the documentation under `localhost:3000`.

You can also check this repository out and build the documentation yourself by following the instructions below.

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

## Releasing the documentation

Before releasing the documentation, update schemas and version of Restate artifacts, either:

* Automatically by executing the _Pre-release updates_ workflow.
* Manually, as described [here](#manually-update-the-schemas).

Once the branch `main` is ready to be released, create and push the release tag:

```shell
git checkout main
git tag -m "Documentation v0.3.0" v0.3.0
git push --tags
```

The tag triggers the build of the new `restatedev/documentation:vX.Y.Z` container image and creates a draft [release on Github](https://github.com/restatedev/documentation/releases) that needs manual approval.
Moreover, it will push the latest `main` to the `production` branch which triggers the deployment of the documentation.

### Manually update the schemas

To update the configuration schemas, the default configuration and the Meta OpenAPI document,
clone [Restate](https://github.com/restatedev/restate/) and execute the following:

```shell
$ ./tools/generate.sh <PATH to Restate repo clone>
```

### Manually update artifact versions

The config file `restate.config.json` contains versions of various Restate artifacts:

* Typescript SDK: `TYPESCRIPT_SDK_VERSION`
* Runtime: `RESTATE_VERSION`
* Tour: `TOUR_VERSION`
