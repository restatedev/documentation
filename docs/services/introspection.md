---
title: "Introspection"
sidebar_position: 7
description: "Learn how to inspect/troubleshoot stuck or failing invocations."
draft: false
---

# Introspection

Restate exposes information on invocations and application state via its Introspection SQL API. You can use this to gain insight into the status of invocations and the service state that is stored.

This can be useful for troubleshooting. For example, a handler might be blocked for a specific key, and you want to kill the invocation that is blocking it but you don't know the invocation ID. Or you want to check what is currently stored in the state of a service.

To let you do this, Restate exposes two SQL tables that you can query via the [*psql* client](https://www.postgresql.org/docs/current/app-psql.html):
- `sys_status` table to inspect invocation status.
- `sys_invocation_state` table to inspect the in-memory state of the invoker
- `sys_journal` table to inspect the journal of running invocations
- `state` table to inspect application state.

## Connecting the *psql* client to Restate

[Install the *psql* client](https://www.postgresql.org/download/).

Connect with *psql* to Restate:

```shell
psql -h localhost -p 9071
```

You can change the default port `9071` by supplying the `-p` argument.

The Restate Introspection SQL API has been implemented based on [DataFusion](https://arrow.apache.org/datafusion/) and supports standard SQL syntax.

## Inspecting invocations
You can query the status of invocations via the `sys_status` table.

To retrieve the schema of the `sys_status` table, connect the *psql* client to Restate and execute:
```sql
describe sys_status;
```

An exhaustive description of the schema can be found in [the references](/references/restate-sql-introspection).

:::info
The `sys_status` table only contains entries for active invocations. Active invocations are invocations that haven't completed yet and are either invoked or suspended.
:::

### Key queries
This following list contains some key queries on the `sys_status` table to give you an idea of the insights you can get from it:

- List the ongoing invocations by executing:
    ```sql
    select * from sys_status;
    ```

- Retrieve the invocation ID (`id`) that is currently blocking a service-key combination via:
    ```sql
    select method, status, id from sys_status where service = 'test.MyServiceName' and service_key = 'myKey';
    ```
  You can then use the invocation ID to [kill the invocation](./invocation.md#cancel-an-invocation).

- Check the status of an invocation via:
    ```sql
    select service, method, status from sys_status where id = 'T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE';
    ```
  The status field shows that the invocation is either in status `invoked`, meaning actively processing, or in status is `suspended`, meaning waiting on some external input (e.g. request-response call, awakeable, sleep, ...).

- Check when an invocation was modified the last time via:
    ```sql
    select modified_at from sys_status where id = 'T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE';
    ```
  This includes any modification to the row in the table (e.g. when the service last switched its status from `invoked` to `suspended`, or when the last journal entry was added).

- To find out if an invocation was triggered via the ingress or by another service:
    ```sql
    select invoked_by, invoked_by_service, invoked_by_id from sys_status where id = 'T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE';
    ```
  The `invoked_by` field contains either `ingress` or `service`. If the invocation was triggered by another service, then the fields `invoked_by_service` and `invoked_by_id` will supply more information about the invoking service.

- Retrieve the trace ID based on a invocation ID:
    ```sql
    select trace_id from sys_status where id = 'T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE';
    ```
  Afterwards, you can use this trace ID to [search for spans in Jaeger](/restate/tracing#searching-traces).

- Retrieve all invocations that have not seen any activity for more than 1 hour:
    ```sql
    select * from sys_status where to_timestamp(modified_at) <= now() - interval '1' hour;
    ```

## Inspecting the attempt status of an invocation

Invocations can be attempted against a service endpoint many times if the endpoint is failing. The metadata around
these attempts is not committed durably to storage, but is held in memory in the `invoker` component. The metadata
includes reasons that an attempt might be failing, for example a permission error calling a Lambda endpoint.

You can query  this in-memory metadata via the `sys_invocation_state` table.

To retrieve the schema of the `sys_invocation_state` table, connect the *psql* client to Restate and execute:
```sql
describe sys_invocation_state;
```

An exhaustive description of the schema can be found in [the references](/references/restate-sql-introspection).

You can retrieve the journal of the current invocation for a given key via:

```sql
select * from sys_invocation_state where service = 'test.MyServiceName' and service_key = 'myKey';
```

Or, if you already have an invocation ID, you can query with that directly:

```sql
select * from sys_invocation_state where id = 'T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE';
```

It can be useful to filter for all invocations that are failing to be executed against the service endpoint:

```sql
select * from sys_invocation_state where retry_count > 1;
```

## Inspecting the journal of an invocation

You can query the journal of an invocation via the `sys_journal` table.

To retrieve the schema of the `sys_journal` table, connect the *psql* client to Restate and execute:
```sql
describe sys_journal;
```

An exhaustive description of the schema can be found in [the references](/references/restate-sql-introspection).

You can retrieve the journal of the current invocation for a given key via:

```sql
select * from sys_journal where service = 'test.MyServiceName' and service_key = 'myKey';
```

Or, if you only know the invocation ID, you can use the `sys_status` table to first get the key:

```sql
select * from sys_journal where service = 'test.MyServiceName' and service_key = (
    select service_key from sys_status where id = 'T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE'
  );
```

## Inspecting application state

You can query the application state via the `state` table.

To retrieve the schema of the `state` table, connect the *psql* client to Restate and execute:
```sql
describe state;
```

An exhaustive description of the schema can be found in [the references](/references/restate-sql-introspection).

You can retrieve the state of a specific service and service key via:

```sql
select * from state where service = 'test.MyServiceName' and service_key = 'myKey';
```

You can retrieve the state of a specific service, service key and state key (`key` column) via:

```sql
select * from state where service = 'test.MyServiceName' and service_key = 'myKey' and key = 'myStateKey';
```

The state key is the name you used to store the state with the SDK. For example, the code snippet `ctx.set("count", 1)` stores `1` under the key `count`.

:::info Take into account the data types of the included columns.
If your state value is a regular string, then you can access its content in the column `value_utf8`.
:::

:::tip Joining the tables
To join the `sys_status` and `state` table, you can use the `service` and `service_key` columns:
```sql
select * from sys_status JOIN state on sys_status.service = state.service and sys_status.service_key = state.service_key;
```
:::
