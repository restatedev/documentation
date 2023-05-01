# Restate documentation

This repository contains Restate's documentation.

In order to serve the documentation under `localhost:3000` you can run the documentation container image:

```shell
docker run --rm -p 3000:80 ghcr.io/restatedev/documentation:latest
```

> **Note**
> Make sure that you have access to Github's container registry by [following these instructions](https://github.com/restatedev/restate-dist#container-registry).

You can also check this repository out and build the documentation yourself by following the instructions below.

## Building the documentation

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

## Releasing the documentation

In order to release the documentation you have to push a tag of the form `vX.Y.Z`.
This will trigger the [release workflow](.github/workflows/release.yml), which builds and publishes and new `restatedev/documentation:vX.Y.Z` container image.
Moreover, it will create a draft [release on Github](https://github.com/restatedev/documentation/releases) that needs manual approval.
