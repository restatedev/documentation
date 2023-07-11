---
sidebar_position: 2
---

# Versioning

Restate comes with different solutions to update the services, to simplify development and evolution of your codebase without sacrificing Restate's strong guarantees.

## Deploy a new service revision

As described in the [deployment documentation](./deployment.md#deploying-services), *service endpoints* are immutable, and are assumed to be reacheable throughout the entire lifecycle of an invocation. In order to deploy any change to a service, either in the protobuf definition and/or in the business logic, a new service endpoint should be deployed and registered.

When registering a new service endpoint, Restate will detect if it contains already registered services, and will treat them as new revisions. Any new invocations to that service will be executed by the newly registered service endpoint, thus guaranteeing that new invocations are always routed to the latest service revision, while *old* invocations will continue to use the previous service endpoint. It must be guaranteed that the old service endpoint lives until all the existing invocations complete. 

For example, let's assume there is a `greeter.Greeter` service deployed on the service endpoint available at `http://greeter-v1/`. To update it, deploy a new service endpoint available at `http://greeter-v2/`, containing the new revision of `greeter.Greeter`, and then register it:

```bash
$ curl <RESTATE_META_ENDPOINT>/endpoints --json '{"uri": "http://greeter-v2/"}'
```

This returns:

```json
{
  "id": "Z3JlZXRlci12Mi8",
  "services": [
    {
      "name": "greeter.Greeter",
      "revision": 2
    }
  ]
}
```

This notifies that Restate detected a new revision of an already existing service, and from now on it will route any invocation of `greeter.Greeter` to `http://greeter-v2/`, while any existing invocation to `greeter.Greeter`, e.g. an invocation sleeping for some time, will continue executing on `http://greeter-v1/` until the end.

To check which endpoint is currently serving new invocations of `greeter.Greeter`:

```bash
$ curl <RESTATE_META_ENDPOINT>/services/greeter.Greeter
```

This returns:

```json
{
    "name": "greeter.Greeter",
    "revision": 2,
    "endpoint_id": "Z3JlZXRlci12Mi8",
    [...]
}
```

To get more info about the endpoint serving it:

```bash
$ curl <RESTATE_META_ENDPOINT>/endpoints/Z3JlZXRlci12Mi8
```

```json
{
    "id": "Z3JlZXRlci12Mi8",
    "uri": "http://greeter-v2/",
    "additional_headers": {},
    "protocol_type": "BidiStream",
    "services": [
      {
        "name": "greeter.Greeter",
        "revision": 2
      }
    ]
}
```

For more details on the API, refer to the [Meta operational API docs](./meta-rest-api.mdx#tag/service_endpoint/operation/create_service_endpoint).

## Updating the Protobuf service schema

Restate adopts the same rules as [Protobuf for schema evolution](https://protobuf.dev/programming-guides/dos-donts/), but adds on top the following constraints:

* You can't change the instance type of a service.
* You can't modify the key fields in Keyed services.

In all the aforementioned cases, you should define a new service instead.

:::info
Currently Restate doesn't implement all the "schema incompatibility" checks, so you must make sure the applied changes are backward compatible. 
:::

## State compatibility

When updating Keyed and Singleton services, the new revisions will continue to use the same state created by previous revisions. You must ensure state entries are evolved in a backward compatible way.
