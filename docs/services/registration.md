---
sidebar_position: 4
description: "Find out how to register new services with Restate."
---

# Registration

After deploying a service endpoint, in order to use it, it must be registered with Restate as follows with curl  (>v7.82.0):

```bash
$ curl <RESTATE_META_ENDPOINT>/endpoints --json '{"uri": "<SERVICE_ENDPOINT_URI>"}'
```

When registering a service endpoint, Restate uses a mechanism similar to "reflections" to discover the available services and their schemas and properties. A service can be registered only once, and subsequent registration requests to the same service endpoint will fail. For more details on how to update services, check the [versioning documentation](/services/upgrades-removal).

The service endpoint creation can be forced to overwrite an existing endpoint using curl (>v7.82.0):

```bash
$ curl <RESTATE_META_ENDPOINT>/endpoints --json '{"uri": "<SERVICE_ENDPOINT_URI>", "force": true}'
```

This will forcefully overwrite the existing endpoint with the same uri, forcing the discovery process again. It will also remove services that were served by that endpoint and are not available anymore.

:::warning
Forcing an endpoint registration is a feature designed to simplify local Restate service development, and should never be used in a production Restate deployment, as it potentially breaks all the in-flight invocations to that endpoint.
:::

For more details on the API, refer to the [admin API docs](/references/admin-api#tag/service_endpoint/operation/create_service_endpoint).