---
sidebar_position: 6
description: "Try out Restate without any servers."
---

# Managed service

If you're using Restate with a function as a service platform, it can be challenging to 
continuously run the runtime in your infrastructure. To make Restate easier to test out,
we offer a managed cluster to private beta users by request. If you'd like access,
please email [info@restate.dev](mailto:info@restate.dev).

## SLA
The managed service is intended to help people try out Restate, and **should never be used in
production. We offer no promises of data durability or uptime.**

## Using your cluster
A managed service comprises of a url like `yourcluster.dev.restate.cloud` and a JWT token. This
token will be needed for all interactions with the cluster.

There are several API endpoints at this hostname:

### Registering services (8081)
A Restate meta endpoint, which can be used as described in the 
[Lambda registration docs](/services/deployment/lambda#discovering-the-services-behind-the-lambda-endpoint),
with an bearer token set.
```bash
curl -H "Authorization: Bearer $(cat /token)" https://yourcluster.dev.restate.cloud:8081/endpoints -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/my-greeter", "additional_headers": {"x-api-key": "your-api-key"} }'
```

### Invoking services (9090)
A Restate ingress endpoint, which can be used as described in the
[Lambda registration docs](/services/deployment/lambda#send-requests),
with an bearer token set.
```bash
curl -H "Authorization: Bearer $(cat /token)" https://yourcluster.dev.restate.cloud:9090/org.example.Greeter/MultiWord -H 'content-type: application/json' -d '{"name": "Pete"}'
```
This endpoint is rate limited to 36000 requests per hour.

### Introspection (5432)
A Restate introspection endpoint, which can be used as described in the
[introspection docs](/services/introspection) with a user and password set:
```bash
PGPASSWORD=$(cat /token) psql -U yourcluster -h yourcluster.dev.restate.cloud
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

## Using the lambda proxy
Managed service users can also request access to the lambda proxy. This is an endpoint that exposes a versioned, authenticated
HTTP url for your Lambda, meaning you don't need to create an API gateway, and you can easily call different versions
of your Lambda with different URLs. Under the hood, the lambda proxy is just a Lambda itself, behind an API gateway, 
which accepts the name and version of your Lambda and invokes it.

By letting us know the AWS account you want to invoke at [info@restate.dev](mailto:info@restate.dev), we will provision
you an API key which is allowed to invoke Lambdas on that AWS account. You'll also need to give the proxy's AWS principal
`arn:aws:iam::663487780041:role/lambda_proxy` access to invoke each of your Lambdas:

```bash
aws lambda add-permission --function-name <your-lambda-name> --action lambda:InvokeFunction --principal arn:aws:iam::663487780041:role/lambda_proxy --statement-id lambda_proxy
```

You can then discover your Lambda through the proxy like this:
```bash
curl -H "Authorization: Bearer $(cat /token)" https://yourcluster.dev.restate.cloud:8081/endpoints -H 'content-type: application/json' -d \
 '{"uri": "https://<your-region>.lambda-proxy.restate.cloud/<your-account-id>/<your-lambda-name>/<your-lambda-version>", "additional_headers": {"x-api-key": "<your-api-key>"}}'
```
New Lambdas don't have a version yet, so use `$LATEST` until you've published an immutable version - make sure to escape the `$` in your shell.
See the [versioning documentation](/services/upgrades-removal) for more context.
