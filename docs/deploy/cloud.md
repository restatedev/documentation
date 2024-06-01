---
sidebar_position: 4
description: "Learn how to use Restate Cloud."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# Restate Cloud

<Admonition type="warning">
    Restate Cloud is an early-access preview. Features may change, and we offer
    no reliability SLAs at this time. Production usage is not recommended.
</Admonition>

[Restate Cloud](https://cloud.restate.dev) is the early-access managed service of Restate, where we run an instance of the Restate server for you. This allows you to focus on your services, which you can deploy whereever you normally do - long-lived compute, or serverless platforms like Lambda.

## Creating your first environment

You can sign in to Cloud using an email address and password, or using Google or GitHub SSO.
After signing up, you'll be prompted to create an account, and an environment. An environment is an instance of the Restate server that is unique to you, and managed by Restate.

<Admonition type="tip" title="Naming">
Accounts and environments must have a name comprising of lowercase alphanumeric
characters or hyphens. For example, you can choose `dev` for your account and
`my-environment` for your environment.
</Admonition>

You can start using your new environment straight away using the [CLI](/operate/cli):

```bash
# authenticate to Cloud
restate cloud login
# set up your CLI to talk to your Cloud environment
restate cloud env configure
# check that everything is working!
restate whoami
```

<Admonition type="tip" title="Switching environments in the CLI">
At any time, you can switch your CLI back to point to a Restate server running
on your machine with `restate config use-environment local`. See the
[CLI docs](/operate/cli#using-the-config-file) for more.
</Admonition>

## Registering Restate services with your environment

You can use your Cloud environment exactly as a self-hosted one; register
services with `restate deployments register <service-endpoint>`.

However, currently your services must be accessible over the public internet for
Restate to be able to invoke them. If you want to develop using a
service running on your local machine, you can expose it using our tunnel
feature:
```bash
# expose localhost:9080 to Restate Cloud
restate cloud tunnel 9080
# copy the url from the output and register against your environment
restate dp add https://tunnel.us.restate.cloud:9081/...
```

### AWS Lambda services

To invoke services running on AWS Lambda, Restate Cloud needs to assume an AWS
identity in the same account that the Lambda is deployed to. Create a new role
that has permission to invoke your Lambdas and give it the following trust policy:

```json
{
  "Sid": "AllowRestateCloudToAssumeRole",
  "Effect": "Allow",
  "Principal": {
    "AWS": "AROAZQ3DNV5IY6KP4ODO4"
  },
  "Action": ["sts:AssumeRole", "sts:TagSession"],
  "Condition": {
    "StringEquals": {
      "sts:ExternalId": "$ENVIRONMENT_ID"
    }
  }
}
```

<Admonition type="info" title="Trust policy">
This trust policy allows the Restate cloud `us.restate.cloud` region role ID (`AROAZQ3DNV5IY6KP4ODO4`) to assume your role, as long as it is using an ExternalId that matches your environment ID. The environment ID can be found in the UI and in the output of `restate whoami`.
</Admonition>

You can now register your Lambda through the new role:

```shell
restate dp add <LAMBDA_FUNCTION_ARN> --assume-role-arn <ROLE_ARN>
```

If something isn't working, the environment logs in the cloud UI may help
you find the issue.

## Invoking your services

In the UI you can find the URL of your Restate environment. All requests must be
authenticated using a Bearer token. We suggest that humans use their SSO token
which is obtained by `restate cloud login`, and will be used automatically by
the CLI. If you want to test invocations using `curl` as described in the [invoke docs](/invoke/http), you can use a local authenticated proxy to expose
the Restate server as if it was running on your machine:

```bash
restate cloud env proxy
curl localhost:8080/MyService/myHandler
```

### API tokens

For programmatic invocation, awakeable completion, or admin API usage from
scripts, CI pipelines, API gateways, or services that exist outside Restate,
you can create an API key in the UI, selecting an appropriate role for your use
case.

```bash
curl -H "Authorization: Bearer $MY_API_KEY" https://201hy10cd3h6426jy80tb32n6en.env.us.restate.cloud:8080/MyService/MyHandler
curl -H "Authorization: Bearer $MY_API_KEY" https://201hy10cd3h6426jy80tb32n6en.env.us.restate.cloud:9070/deployments
```

To use the CLI programmatically with this token:

```bash
export RESTATE_HOST_SCHEME=https RESTATE_HOST=201hy10cd3h6426jy80tb32n6en.env.us.restate.cloud RESTATE_AUTH_TOKEN=$MY_API_KEY
restate whoami
```

## Securing your services

### HTTP

Restate invokes your services over the public internet. For production use cases
HTTPS must be used between Restate and your services. You can apply a
certificate to the service directly, but its likely easier to use a fronting
load balancer like an AWS NLB.

It is also a good idea to secure access to your service so that only Restate can
call it. The easiest way to do this is with our native request identity feature.
All requests to your service will contain a signature from a public key which can be seen in the UI. It's safe to include it directly in
your service code:

<CH.Code>

```typescript TypeScript
restate
  .endpoint()
  .bind(myService)
  .withIdentityV1("publickeyv1_8SyC5reu2eTUwGCH4CehFntZAnADvYU6PXZtFyKiTrWy")
  .listen();
```

```java Java
RestateHttpEndpointBuilder.builder()
    .bind(new MyService())
    .withRequestIdentityVerifier(RequestIdentityVerifier.fromKey("publickeyv1_8SyC5reu2eTUwGCH4CehFntZAnADvYU6PXZtFyKiTrWy"))
    .buildAndListen();
```

</CH.Code>

### Lambda

If your Lambda has an appropriate trust policy as described above, you do not
need to secure incoming requests any further. If you choose to however, the
`withIdentityV1` (TS) and `withRequestIdentityVerifier` (Java) functions will
work on Lambda endpoints as well.
