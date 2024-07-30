---
label: "cloudflare-workers"
sidebar_position: 2
description: "Learn how to run Restate TypeScript services on Cloudflare Workers."
---

# Cloudflare Workers

You can run your Restate services as serverless functions on [Cloudflare Workers](https://workers.cloudflare.com/).

You can easily get started using the
[Workers+Restate template](https://github.com/restatedev/examples/tree/main/templates/cloudflare-worker):
```shell CLI
# link(1:3) /develop/local_dev#running-restate-server--cli-locally
restate example typescript-cloudflare-worker-hello-world &&
cd typescript-cloudflare-worker-hello-world
```

You can also add Restate into the standard `wrangler init` template, as long
as you have the `nodejs_compat` compatibility flag set in `wrangler.toml`.
The SDK should be imported with the `fetch` component
`@restatedev/restate-sdk/fetch` and you would expose your endpoint to the Worker
runtime with `export default endpoint().bind(...).handler()`.

You can deploy with `wrangler deploy`, and register your deployed
service:
```shell CLI
restate deployments register https://my-service.my-domain.workers.dev
```

## Local development

A Workers dev server can be started on port 9080 using
`wrangler dev --port 9080`. `wrangler dev` only serves over HTTP1.1, so you'll need to register a local service with:
```shell CLI
restate deployments register --use-http1.1 http://localhost:9080
```
