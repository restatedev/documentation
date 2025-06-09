---
sidebar_position: 11
description: "Create an endpoint to serve your services."
---


import Admonition from '@theme/Admonition';

# Serving
Restate services can run in a few ways: as a Node.js HTTP handler, as an AWS
Lambda handler, or on other Javascript runtimes like Bun, Deno and Cloudflare
Workers.

## Creating a Node.js HTTP handler
1. Create the endpoint
2. Bind one or multiple services to it.
3. Listen on the specified port (default `9080`) for connections and requests.

```typescript
CODE_LOAD::ts/src/develop/serving.ts#endpoint
```

<details className={"grey-details"}>
    <summary>Customizing the HTTP2 server</summary>

    If you need to manually control or customize the HTTP2 server, you can call `http2Handler()` instead of `listen()`, and then use it to manually instantiate the HTTP server:

    ```ts
    CODE_LOAD::ts/src/develop/serving.ts#custom_endpoint
    ```
</details>

## Creating a Lambda handler

To register your service as a Lambda function, use the `/lambda` import
component and change the endpoint into a Lambda handler.
```typescript
CODE_LOAD::ts/src/develop/serving_lambda.ts#lambda
```

Have a look at the [deployment section](/category/aws-lambda)
for guidance on how to deploy your services on AWS Lambda.

<Admonition type="tip" title={"Run on Lambda without handler changes"}>
    The implementation of your services and handlers remains the same for both deployment options.
</Admonition>

## Creating a fetch handler
Other Javascript runtimes like Deno and Cloudflare Workers have
built on top of the [Fetch Standard](https://github.com/whatwg/fetch) for
defining HTTP server handlers. To register your service as a fetch handler, use
the `/fetch` import component.
```typescript
CODE_LOAD::ts/src/develop/serving_fetch.ts#fetch
```
By default, a fetch handler will not advertise itself as working
bidirectionally; the SDK will end the HTTP request at each suspension point,
and the Restate runtime will re-invoke the service when there is more work to
do.

However, you can use the method `.bidirectional()` on the endpoint builder to
change this on supported platforms, which will improve latencies once the
service is re-registered with the runtime.
- Deno (including Deno Deploy) supports HTTP2 and therefore bidirectional mode can be enabled.
- Cloudflare Workers do not support end-to-end HTTP2 or bidirectional HTTP1.1,
and enabling bidirectional mode will cause invocations to stall and time out.
Services running on Workers must be discovered with the `--use-http1.1`
CLI flag.

<details className={"grey-details"}>
    <summary>Cloudflare Workers and minification</summary>

    Cloudflare Workers minification is not working correctly with the Restate SDK. If you see an issue similar to:

    ```
    ✘ [ERROR] restate-cloudflare-worker: Uncaught TypeError: Cannot read properties of undefined (reading '__wbindgen_malloc')
    ```

    Then most likely you have enabled minification when deploying. Disable it with `minify = false` in your `workers.toml` file.
</details>

## Validating request identity

SDKs can validate that incoming requests come from a particular Restate
instance. You can find out more about request identity in the [Security docs](/operate/security#locking-down-service-access)

```typescript
CODE_LOAD::ts/src/develop/serving.ts#identity
```
