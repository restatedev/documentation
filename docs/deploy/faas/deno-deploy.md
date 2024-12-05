---
label: "deno-deploy"
sidebar_position: 3
description: "Learn how to run Restate TypeScript services on Deno Deploy."
---

# Deno Deploy

You can run your Restate services as serverless functions on [Deno Deploy](https://deno.com/deploy).

You can easily get started using the
[Deno+Restate template](https://github.com/restatedev/examples/tree/main/templates/deno):
```shell CLI
restate example typescript-deno-hello-world &&
cd typescript-deno-hello-world
```

You can also add Restate into an existing Deno project. The SDK should be imported with the `fetch` component eg
`npm:@restatedev/restate-sdk@^VAR::TYPESCRIPT_SDK_VERSION/fetch` and you would serve with `Deno.serve({ port: 9080 }, handler.fetch)`.

You can deploy to Deno Run with `deployctl deploy`, and register your deployed
service:
```shell CLI
restate deployments register https://my-service.deno.dev
```

Local development is as simple as running your `main.ts` and discovering the local
port:
```shell CLI
restate deployments register http://localhost:9080
```
