---
sidebar_position: 7
description: "Try out Restate without any servers."
---

# Restate Cloud

If you're using Restate with a function as a service platform, it can be challenging to 
continuously run the runtime in your infrastructure. To make Restate easier to test out,
we offer a managed cluster to users by request. 

:::info Join the waitlist
If you'd like to try out Restate Cloud, join the waitlist by filling out the [request form](https://restate.dev/get-restate-cloud/).
:::

## SLA
Restate Cloud is intended to help people try out Restate, and **should never be used in
production. We offer no promises of data durability or uptime.**

## Using your cluster
A managed service comprises of a url like `yourcluster.dev.restate.cloud` and a JWT token. This
token will be needed for all interactions with the cluster.

There are several API endpoints at this hostname:

### Registering services (9070)
A Restate admin endpoint, which can be used to register Restate Lambda functions written in 
[TypeScript](/deploy/lambda/lambda-typescript#discovery-of-services) and [Java](/deploy/lambda/lambda-java#discovery-of-services),
with a bearer token set.

```bash
curl -H "Authorization: Bearer $(cat /token)" https://<CLUSTER_NAME>.dev.restate.cloud:9070/deployments -H 'content-type: application/json' -d '{"uri": "https://<LAMBDA_FUNCTION_ENDPOINT>/default/my-greeter", "additional_headers": {"x-api-key": "<YOUR_API_KEY>"} }'
```

### Invoking services (8080)
A Restate ingress endpoint, which can be used to invoke Restate Lambda functions written in
[TypeScript or Java](/deploy/lambda/lambda-typescript#send-requests),
with a bearer token set.
```bash
curl -H "Authorization: Bearer $(cat /token)" https://<CLUSTER_NAME>.dev.restate.cloud:8080/org.example.Greeter/MultiWord -H 'content-type: application/json' -d '{"name": "Pete"}'
```
This endpoint is rate limited to 36000 requests per hour.

### Introspection (9071)
A Restate introspection endpoint, which can be used as described in the
[introspection docs](/operate/introspection) with a user and password set:
```bash
PGPASSWORD=$(cat /token) psql -U yourcluster -h <CLUSTER_NAME>.dev.restate.cloud -p 9071
```

### Observability (3100)
A [Loki](https://grafana.com/oss/loki/) and [Tempo](https://grafana.com/oss/tempo/) endpoint,
to allow reading logs and traces respectively from the managed cluster.

#### Adding to your Grafana
`https://yourcluster.dev.restate.cloud:3100` is a valid endpoint for both Loki
and Tempo data sources in Grafana - we do not run a Grafana instance on your behalf, however.
For both data sources you will need to set a 'Custom HTTP Header' with key `Authorization` and value `Bearer <your-token>`.

Grafana supports correlating logs and traces. In your Loki data source configuration, after you have a Tempo data source configured,
set up a [Derived field](https://grafana.com/docs/grafana/latest/datasources/loki/configure-loki-data-source/#derived-fields)
with the following parameters:
```yaml
name: restate.invocation.id
# pull invocation ids out of logs
regex: '"restate.invocation.id":"(.+?)"' # single quotes not needed
# find traces with that invocation id
query: '{ .restate.invocation.id="${__value.raw}" }' # single quotes not needed
internal_link:
  enabled: true
  data_source: <your Tempo data source>
```

In your Tempo configuration, after you have a Loki data source configured, set up 
[Trace to logs](https://grafana.com/docs/grafana/latest/datasources/tempo/#trace-to-logs) with data source set to your Loki data source,
and query set to `{kubernetes_container_name="restate"} |= "${__span.tags["restate.invocation.id"]}"`.

You can view logs in Grafana on the explore page by selecting the Loki data source. To get started you can query:
```logql
{kubernetes_container_name="restate"} != `DEBUG` | json fields | line_format `{{ .fields }}`
```

You can view traces in Grafana on the explore page by selecting the Tempo data source. To get started use the 'Search'
tab to find traces, and click on them to open a Jaeger-style UI.

#### Querying logs by CLI
Loki provides the excellent [LogCLI](https://grafana.com/docs/loki/latest/tools/logcli/) tool to query without Grafana.
You can query logs from your cluster like this:
```bash
export LOKI_ADDR=https://yourcluster.dev.restate.cloud:3100
export LOKI_BEARER_TOKEN_FILE=/token
logcli query --no-labels '{kubernetes_container_name="restate"} != `DEBUG` | json fields | line_format `{{.fields}}`'
```
Use `-f` to tail logs - check the [LogCLI docs](https://grafana.com/docs/loki/latest/tools/logcli/#logcli-query-command-reference)
for more tips.

## Giving permission for your cluster to Invoke your Lambdas
Managed service clusters by default assume a role in Restate's AWS account: `arn:aws:iam::663487780041:role/restate-dev`.
However, allowing this role to invoke your Lambda via its resource policy is dangerous and not recommended, as this will
allow *any* Restate Cloud cluster to invoke your Lambda, not just yours!

Instead, cross account Lambda access should be achieved with [Role Chaining](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html).
First, set up a role on one your own AWS accounts that Restate will assume when calling your Lambda. This role needs
a trust policy that allows Restate to assume it:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::663487780041:role/restate-dev"
      },
      "Action": [
        "sts:AssumeRole"
      ],
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": [
            "<your-cluster-name>"
          ]
        }
      }
    }
  ]
}
```
Notice the trust policy mandates that your cluster name is provided as an 
[external ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html). This ensures
that your role is being assumed by your Restate cluster, and no one else's. On Restate's side, we ensure that the ID is
always set correctly to the name of cluster.

This role needs to have permission to call your Lambda. For example, you may want to give it `lambda:InvokeFunction` on `*`,
which will give it access to all Lambdas that allow this role via their 
[Resource Policy](https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html), which will include
all Lambdas in the same account as the role. For accessing Lambdas in other accounts, you can add the role to their
Resource Policies, or you can create a role per account - Restate can assume a different role per Lambda if needed.

Once you have a role that has permission to call the Lambda, and allows Restate to assume it, you just need to discover
the Lambda:

```shell
curl <RESTATE_ADMIN_URL>/deployments -H 'content-type: application/json' -d '{"arn": "<LAMBDA_FUNCTION_ARN>", "assume_role_arn": "<ROLE_ARN>" }'
```
