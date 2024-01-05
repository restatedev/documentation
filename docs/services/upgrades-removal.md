---
sidebar_position: 6
description: "Restate's service versioning strategy."
---

# Upgrades & removal

Restate comes with different solutions to update the services, to simplify development and evolution of your codebase without sacrificing Restate's strong guarantees.

## Deploy a new service revision

As described in the [deployment documentation](/services/deployment/general), *service deployments* are immutable, and are assumed to be reachable throughout the entire lifecycle of an invocation. In order to deploy any change to a service, either in the protobuf definition and/or in the business logic, a new deployment should be deployed and registered.

When registering a new deployment, Restate will detect if it contains already registered services, and will treat them as new revisions. Any new invocations to that service will be executed by the newly registered deployment, thus guaranteeing that new invocations are always routed to the latest service revision, while *old* invocations will continue to use the previous deployment. It must be guaranteed that the old deployment lives until all the existing invocations complete.

For example, let's assume there is a `greeter.Greeter` service deployed on the deployment available at `http://greeter-v1/`. To update it, deploy a new deployment available at `http://greeter-v2/`, containing the new revision of `greeter.Greeter`, and then register it:

```bash
$ curl <RESTATE_META_ENDPOINT>/deployments -H 'content-type: application/json' -d '{"uri": "http://greeter-v2/"}'
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

To get more info about the deployment serving it:

```bash
$ curl <RESTATE_META_ENDPOINT>/deployments/Z3JlZXRlci12Mi8
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

For more details on the API, refer to the [admin API docs](/references/admin-api#tag/deployment/operation/create_deployment).

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

## Removing a service

It is not possible to remove a single service directly, but it is possible to remove the deployment containing it. To remove a service, the suggested procedure is the following:

1. Find out which deployment is serving the latest revision of the service. You can do it with:

```bash
$ curl <RESTATE_META_ENDPOINT>/services/{SERVICE_NAME}
```

2. Make sure that removing this deployment won't affect other services you don't want to remove.
3. Make sure no other Restate service is using this service anymore.
4. [Hide the service from the ingress](/services/invocation#hiding-services-from-the-ingress) to avoid accepting new requests from the ingress.
5. Check through the Status introspection that you have no pending requests to this service anymore.
6. Remove the deployment containing the service with:

```bash
$ curl -X DELETE <RESTATE_META_ENDPOINT>/deployments/{DEPLOYMENT_ID}?force=true
```

:::info
Currently Restate doesn't implement all the checks to safely remove a service deployment, so you have to force the removal through the `force` query parameter.
:::
