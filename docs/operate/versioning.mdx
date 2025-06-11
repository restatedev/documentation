---
sidebar_position: 6
description: "All you need to know on upgrading deployments."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import {Terminal} from "../../src/components/code/terminal";
import {CodeWithTabs} from "../../src/components/code/code";

# Versioning

Restate comes with different solutions to update the services, to simplify development and evolution of your codebase without sacrificing Restate's strong guarantees.

## Inspecting deployments

To check which deployments are currently serving your services, you can use the [UI](/develop/local_dev#restate-ui) or do the following:

<Tabs groupId="interface" queryString>
    <TabItem value="cli" label="CLI">

        <Terminal>
            ```bash !command
            restate services list
            ```

            ```shell !output
            NAME             REVISION  FLAVOR  DEPLOYMENT TYPE  DEPLOYMENT ID
            🌎  TicketObject     1                 HTTP 2           dp_14LsPzGz9HBxXIeBoH5wYUh
            🌎  CartObject       1                 HTTP 2           dp_14LsPzGz9HBxXIeBoH5wYUh
            🌎  CheckoutService  1                 HTTP 2           dp_14LsPzGz9HBxXIeBoH5wYUh
            ```
        </Terminal>

        To list only the deployments, you can do `restate deployments list`.

        Note that deployment IDs start with `dp_`. You can use it to describe the deployment:

        ```bash
        restate deployment describe dp_14LsPzGz9HBxXIeBoH5wYUh
        ```

    </TabItem>

    <TabItem value="curl" label="curl">

        <Terminal>
            ```bash !command
            curl localhost:9070/services/Greeter
            ```

            ```json !output
            {
                "name": "Greeter",
                "revision": 2,
                // withClass highlight-line
                "endpoint_id": "Z3JlZXRlci12Mi8",
                [...]
            }
            ```
        </Terminal>

        Note that deployment IDs start with `dp_`. You can use it to describe the deployment:

        <Terminal>
            ```bash !command
            curl localhost:9070/deployments/Z3JlZXRlci12Mi8
            ```

            ```json !output
            {
                "id": "Z3JlZXRlci12Mi8",
                "uri": "http://greeter-v2/",
                "additional_headers": {},
                "protocol_type": "BidiStream",
                "services": [
                    {
                        "name": "Greeter",
                        "revision": 2
                    }
                ]
            }
            ```
        </Terminal>


    </TabItem>
</Tabs>



## Deploying new service versions

As described in the [deployment docs](/deploy/overview), deployments are immutable, and are assumed to be reachable throughout the entire lifecycle of an invocation.
To deploy an updated version of a service, you need to deploy and register a new deployment.

For example, let's assume there is a `Greeter` service deployed at `http://greeter-v1/`.
To update it, we deploy a new revision at `http://greeter-v2/`, and then register it via the [UI](/develop/local_dev#restate-ui) or via:

<CodeWithTabs groupId="interface">
        ```shell !!tabs CLI
        restate deployments register http://greeter-v2/
        ```
        ```shell !!tabs curl
        curl localhost:9070/deployments --json '{"uri": "http://greeter-v2/"}'
        ```
</CodeWithTabs>

When the services at the new endpoint were already registered before, Restate will treat them as new revisions.
New invocations are always routed to the latest service revision, while old invocations will continue to use the previous deployment.
So new invocations will be routed to `http://greeter-v2/`, while existing invocations continue execution at `http://greeter-v1/` (e.g. sleeping/waiting invocations) until completion.

<Admonition type={"caution"}>
It must be guaranteed that the old deployment lives until all the existing invocations complete.
</Admonition>


<Admonition type={"info"} title={"State compatibility"}>
When updating Virtual Objects, the new revisions will continue to use the same state created by previous revisions. You must ensure state entries are evolved in a backward compatible way.
</Admonition>

<Admonition type={"tip"} title={"Versioning in Kubernetes"}>
    The Restate Kubernetes operator can handle registration and versioning for your automatically.
</Admonition>

## Removing services

You cannot remove a single service, but you can remove the deployment containing it.

**Before you remove a deployment, you need to ensure the following:**

1. Make sure that there are no other handlers with business logic that calls this service.
2. If several services are bundled in the same deployment, you can't remove only one of them. You have to remove the whole deployment.
So make sure that you first deploy the services you want to keep in a separate new deployment.
4. [Make the service private](/operate/security#private-services) to avoid accepting new HTTP requests.
5. Check whether the service has pending invocations by filtering the invocations on deployment ID in the [UI](/develop/local_dev#restate-ui) or via `restate services status`, and wait until the service is drained (i.e. no ongoing invocations).

**When all prerequisites are fulfilled**, you can remove the deployment containing the service via the [UI](/develop/local_dev#restate-ui) or via:

<CodeWithTabs groupId="interface">
```shell !!tabs CLI
restate deployments remove dp_14LsPzGz9HBxXIeBoH5wYUh
```
```bash !!tabs curl
curl -X DELETE localhost:9070/deployments/dp_14LsPzGz9HBxXIeBoH5wYUh
```
</CodeWithTabs>
If the deployment isn't drained yet but you still want to remove it, use the `--force` flag in CLI, or `?force=true` for curl.

## Updating deployments in-place
Deployments should be immutable; the URI or Lambda ARN defined in them is expected to maintain the same behaviour, and be available, for as long as
the deployment has in-flight invocations. However, we recognise that there can be bugs which necessitate updating the code backing a particular deployment.

For example, a null pointer exception might be thrown some way into a handler. If this code executes, you will be left with invocations
stuck retrying where the exception is thrown, and registering a new deployment with a fix will only resolve the issue for new invocations, not those already in flight.
In production, it is often not appropriate to cancel or kill these failing invocations, necessitating an update to the code to allow them to complete.

There are two ways to change the code backing a particular deployment:
1. Update the underlying deployed code, but keep it available at the same URI. This is not possible for Lambda ARNs, but is a natural strategy in, for example, Kubernetes deployments.
2. Use the update deployment API to change the URI or ARN backing the deployment to point to a patched version of the code:
   ```shell
   curl -X PUT localhost:9070/deployments/dp_14LsPzGz9HBxXIeBoH5wYUh --json '{"uri": "http://greeter-patched/"}'
   ```

Let's discuss some scenarios in which you may need to take this action.

### First scenario - failing invocations noticed on the active deployment for a service
In this case, the deployment that is handling new invocations needs to be fixed, and the failing invocations on it allowed to complete. The following steps should be taken:
1. Develop a fix, based on the current deployed version, that resolves the failing invocations.
   Care should be taken to ensure that the new version has the same behaviour as the old version, for any code paths that in-flight invocations have successfully completed (ie, any changes must be from the point of failure onwards).
2. By updating the underlying code or with the update deployment API, change the active deployment to include the fix. Verify that this resolves the issue both for new invocations, and for those already failing.

### Second scenario - failing invocations noticed on a previous (draining) deployment for a service
It's common to notice failing invocations because they are preventing an old deployment from fully draining. In this case there are several concerns; the failing invocations on deployment 1, any failing invocations on deployment 2,
and the potential for new failing invocations to occur on deployment 2 as well. The following steps should be taken:
1. Develop a fix as above, based on the version backing deployment 1.
2. By updating the underlying code or with the update deployment API, change deployment 1 to include the fix. Verify that this resolves the failing invocations on this deployment.
3. Rebase the fix onto the version backing deployment 2.
4. By updating the underlying code or with the update deployment API, change deployment 2 to include the fix. Verify that this resolves any failing invocations, if any, new invocations.

<Admonition type={"info"} title={"Updating a deployment to use a conflicting endpoint"}>
It is possible to use the update deployment API to give a deployment the same URI/ARN as another deployment. This is useful where the an appropriate fix for a drained deployment has already been registered as a new deployment.
If this is done, there will be two deployments with the same endpoint, which is otherwise not allowed. It is strongly recommended that you delete one of the two deployments when the failing invocations have been resolved.
</Admonition>
