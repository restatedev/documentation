---
sidebar_position: 4
description: "Find out how to register new services with Restate."
---

# Registration

After deploying a service deployment, in order to use it, it must be registered with Restate as follows with curl  (>v7.82.0):

```bash
$ curl <RESTATE_META_ENDPOINT>/deployments -H 'content-type: application/json' -d '{"uri": "<SERVICE_ENDPOINT_URI>"}'
```

When registering a service deployment, Restate uses a mechanism similar to "reflections" to discover the available services and their schemas and properties. A service can be registered only once, and subsequent registration requests to the same deployment will fail. For more details on how to update services, check the [versioning documentation](/services/upgrades-removal).

The deployment creation can be forced to overwrite an existing deployment using curl (>v7.82.0):

```bash
$ curl <RESTATE_META_ENDPOINT>/deployments -H 'content-type: application/json' -d '{"uri": "<SERVICE_ENDPOINT_URI>", "force": true}'
```

This will forcefully overwrite the existing service deployment with the same uri, forcing the discovery process again. It will also remove services that were served by that deployment and are not available anymore.

:::warning
Forcing a deployment registration is a feature designed to simplify local Restate service development, and should never be used in a production Restate deployment, as it potentially breaks all the in-flight invocations to that deployment.
:::

For more details on the API, refer to the [admin API docs](/references/admin-api#tag/deployment/operation/create_deployment).