---
sidebar_position: 1
description: "Find out how to register new deployments with Restate."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import {Terminal} from "../../src/components/code/terminal";
import {CodeWithTabs} from "../../src/components/code/code";

# Registration

After deploying an endpoint, you need to register it with Restate.
That way Restate knows where it runs and can invoke it.

## Registering deployments

You can register deployments via the [UI](/develop/local_dev#restate-ui), via the CLI or via `curl` ([via the Restate Admin API](/adminapi/create-deployment)).

<Terminal>
    ```shell !command
    restate deployments register localhost:9080
    ```

    ```shell !output
    ❯ SERVICES THAT WILL BE ADDED:
    - CheckoutService
    Type: Service
    HANDLER  INPUT TYPE                                   OUTPUT TYPE
    handle   one of "empty or value of content-type */*"  value with content-type "application/json"

    - CartObject
    Type: VirtualObject ⬅️ 🚶🚶🚶
    HANDLER       INPUT TYPE                                   OUTPUT TYPE
    addTicket     one of "empty or value of content-type */*"  value with content-type "application/json"
    expireTicket  one of "empty or value of content-type */*"  value with content-type "application/json"
    checkout      one of "empty or value of content-type */*"  value with content-type "application/json"

    - TicketObject
    Type: VirtualObject ⬅️ 🚶🚶🚶
    HANDLER     INPUT TYPE                                   OUTPUT TYPE
    reserve     one of "empty or value of content-type */*"  value with content-type "application/json"
    markAsSold  one of "empty or value of content-type */*"  value with content-type "application/json"
    unreserve   one of "empty or value of content-type */*"  value with content-type "application/json"


    ✔ Are you sure you want to apply those changes? · yes
    ✅ DEPLOYMENT:
    SERVICE          REV
    TicketObject     1
    CheckoutService  1
    CartObject       1
    ```
</Terminal>

Or you can use the shorthand `restate dp add`.

Or use curl:

<Terminal>
    ```bash !command
    curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
    ```

    ```json !output
    {
        "id": "dp_11pXug0mWsff2NOoRBZbOcV",
        "services": [
            {
                "name": "CartObject",
                "handlers": [
                        {
                            "name": "checkout",
                            "ty": "Exclusive",
                            "input_description": "one of \"empty or value of content-type */*\"",
                            "output_description": "value with content-type \"application/json\""
                        },
                        {
                            "name": "expireTicket",
                            "ty": "Exclusive",
                            "input_description": "one of \"empty or value of content-type */*\"",
                            "output_description": "value with content-type \"application/json\""
                        },
                        {
                            "name": "addTicket",
                            "ty": "Exclusive",
                            "input_description": "one of \"empty or value of content-type */*\"",
                            "output_description": "value with content-type \"application/json\""
                        }
                ],
                "ty": "VirtualObject",
                "deployment_id": "dp_11pXug0mWsff2NOoRBZbOcV",
                "revision": 3,
                "public": true,
                "idempotency_retention": "1day"
            },
            {
                "name": "CheckoutService",
                "handlers": [
                    {
                        "name": "handle",
                        "ty": "Shared",
                        "input_description": "one of \"empty or value of content-type */*\"",
                        "output_description": "value with content-type \"application/json\""
                    }
                ],
                "ty": "Service",
                "deployment_id": "dp_11pXug0mWsff2NOoRBZbOcV",
                "revision": 3,
                "public": true,
                "idempotency_retention": "1day"
            }
        ]
    }
    ```
</Terminal>

To register a Lambda handler, replace `http://localhost:9080` by the ARN of the Lambda function, for example `arn:aws:lambda:my-region:123456789101:function:my-function:my-version`.

<Admonition type={"info"} title={"Running locally Restate with Docker"}>
When running Restate in a Docker, replace `localhost` with `host.docker.internal`.
</Admonition>
<Admonition type="info" title="Updating services">
A service can be registered only once. Subsequent registration requests to the same deployment will fail. For more details on how to update services, check the [versioning docs](/operate/versioning).
</Admonition>

When developing locally, you can forcefully overwrite an existing deployment:

<CodeWithTabs groupId="interface">
    ```shell !!tabs CLI
    restate deployments register --force localhost:9080
    ```
    ```bash !!tabs curl
    curl localhost:9070/deployments --json '{"uri": "localhost:9080", "force": true}'
    ```
</CodeWithTabs>


This will forcefully overwrite the existing service deployment with the same URI, forcing the discovery process again. It will also remove services that were served by that deployment and are not available anymore.

<Admonition type="warning">
Forcing a deployment registration is a feature designed to simplify local Restate service development, and should never be used in a production Restate deployment, as it potentially breaks all the in-flight invocations to that deployment.
</Admonition>

<Admonition type="info">
    After registration, services can also be marked as 'private' to prevent them
    from being invoked through the ingress. See the
    [Security docs](/operate/security#private-services) for more information.
</Admonition>
