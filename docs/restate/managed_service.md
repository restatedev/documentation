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

### Introspection (5432)
A Restate introspection endpoint, which can be used as described in the
[introspection docs](/services/introspection) with a user and password set:
```bash
PGPASSWORD=$(cat /token) psql -U yourcluster -h yourcluster.dev.restate.cloud
```

### Observability (3100)
A [Loki](https://grafana.com/oss/loki/) and [Tempo](https://grafana.com/oss/tempo/) endpoint,
to allow reading logs and traces respectively from the managed cluster.

#### Adding to Grafana
`https://yourcluster.dev.restate.cloud:3100` is a valid endpoint for both Loki
and Tempo data sources in Grafana. For both you will need to set a 'Custom HTTP Header' with
key `Authorization` and value `Bearer <your-token>`.

Grafana supports correlating logs and traces. In your Loki data source configuration, set up a 
[Derived field](https://grafana.com/docs/grafana/latest/datasources/loki/configure-loki-data-source/#derived-fields)
with the following parameters:
```yaml
name: restate.invocation.sid
# pull invocation ids out of logs
regex: '"restate.invocation.sid":"(.+?)"'
# find traces with that invocation id
query: '{ .restate.invocation.sid="${__value.raw}" }'
internal_link:
  enabled: true
  data_source: <your Tempo data source>
```

In your Tempo configuration, set up [Trace to logs](https://grafana.com/docs/grafana/latest/datasources/tempo/#trace-to-logs)
with data source set to your Loki data source,
and query set to `{kubernetes_container_name="restate"} |= "${__span.tags["restate.invocation.sid"]}"`.

#### Querying logs by CLI
Loki provides the excellent [LogCLI](https://grafana.com/docs/loki/latest/tools/logcli/) tool to query without Grafana.
You can query logs from your cluster like this:
```bash
logcli query --bearer-token=/token  --addr=https://yourcluster.dev.restate.cloud:3100 '{kubernetes_container_name="restate"}'
```
Use `-f` to tail logs - check the [LogCLI docs](https://grafana.com/docs/loki/latest/tools/logcli/#logcli-query-command-reference)
for more tips.
