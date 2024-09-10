---
sidebar_position: 3
description: "API reference for inspecting the invocation status and service state."
---
# SQL Introspection API

This page contains the reference of the introspection tables.
To learn how to access the instrospection interface, check out the [instrospection documentation](/operate/introspection).

## Table: `state`

| Column name | Type | Description |
|-------------|------|-------------|
| `partition_key` | `UInt64` | Internal column that is used for partitioning the services invocations. Can be ignored. |
| `service_name` | `Utf8` | The name of the invoked service. |
| `service_key` | `Utf8` | The key of the Virtual Object. |
| `key` | `Utf8` | The `utf8` state key. |
| `value_utf8` | `Utf8` | Only contains meaningful values when a service stores state as `utf8`. This is the case for services that serialize state using JSON (default for Typescript SDK, Java/Kotlin SDK if using JsonSerdes). |
| `value` | `Binary` | A binary, uninterpreted representation of the value. You can use the more specific column `value_utf8` if the value is a string. |

## Table: `sys_journal`

| Column name | Type | Description |
|-------------|------|-------------|
| `partition_key` | `UInt64` | Internal column that is used for partitioning the services invocations. Can be ignored. |
| `id` | `Utf8` | [Invocation ID](/operate/invocation#invocation-identifier). |
| `index` | `UInt32` | The index of this journal entry. |
| `entry_type` | `Utf8` | The entry type. You can check all the available entry types in [`entries.rs`](https://github.com/restatedev/restate/blob/main/crates/types/src/journal/entries.rs). |
| `name` | `Utf8` | The name of the entry supplied by the user, if any. |
| `completed` | `Boolean` | Indicates whether this journal entry has been completed; this is only valid for some entry types. |
| `invoked_id` | `Utf8` | If this entry represents an outbound invocation, indicates the ID of that invocation. |
| `invoked_target` | `Utf8` | If this entry represents an outbound invocation, indicates the invocation Target. Format for plain services: `ServiceName/HandlerName`, e.g. `Greeter/greet`. Format for virtual objects/workflows: `VirtualObjectName/Key/HandlerName`, e.g. `Greeter/Francesco/greet`. |
| `sleep_wakeup_at` | `Date64` | If this entry represents a sleep, indicates wakeup time. |
| `promise_name` | `Utf8` | If this entry is a promise related entry (GetPromise, PeekPromise, CompletePromise), indicates the promise name. |
| `raw` | `Binary` | Raw binary representation of the entry. Check the [service protocol](https://github.com/restatedev/service-protocol) for more details to decode it. |

## Table: `sys_keyed_service_status`

| Column name | Type | Description |
|-------------|------|-------------|
| `partition_key` | `UInt64` | Internal column that is used for partitioning the services invocations. Can be ignored. |
| `service_name` | `Utf8` | The name of the invoked virtual object/workflow. |
| `service_key` | `Utf8` | The key of the virtual object/workflow. |
| `invocation_id` | `Utf8` | [Invocation ID](/operate/invocation#invocation-identifier). |

## Table: `sys_inbox`

| Column name | Type | Description |
|-------------|------|-------------|
| `partition_key` | `UInt64` | Internal column that is used for partitioning the services invocations. Can be ignored. |
| `service_name` | `Utf8` | The name of the invoked virtual object/workflow. |
| `service_key` | `Utf8` | The key of the virtual object/workflow. |
| `id` | `Utf8` | [Invocation ID](/operate/invocation#invocation-identifier). |
| `sequence_number` | `UInt64` | Sequence number in the inbox. |
| `created_at` | `Date64` | Timestamp indicating the start of this invocation. |

## Table: `sys_idempotency`

| Column name | Type | Description |
|-------------|------|-------------|
| `partition_key` | `UInt64` | Internal column that is used for partitioning the services invocations. Can be ignored. |
| `service_name` | `Utf8` | The name of the invoked service. |
| `service_key` | `Utf8` | The key of the virtual object or the workflow ID. Null for regular services. |
| `service_handler` | `Utf8` | The invoked handler. |
| `idempotency_key` | `Utf8` | The user provided idempotency key. |
| `invocation_id` | `Utf8` | [Invocation ID](/operate/invocation#invocation-identifier). |

## Table: `sys_promise`

| Column name | Type | Description |
|-------------|------|-------------|
| `partition_key` | `UInt64` | Internal column that is used for partitioning the services invocations. Can be ignored. |
| `service_name` | `Utf8` | The name of the workflow service. |
| `service_key` | `Utf8` | The workflow ID. |
| `key` | `Utf8` | The promise key. |
| `completed` | `Boolean` | True if the promise was completed. |
| `completion_success_value` | `Binary` | The completion success, if any. |
| `completion_success_value_utf8` | `Utf8` | The completion success as UTF-8 string, if any. |
| `completion_failure` | `Utf8` | The completion failure, if any. |

## Table: `sys_service`

| Column name | Type | Description |
|-------------|------|-------------|
| `name` | `Utf8` | The name of the registered user service. |
| `revision` | `UInt64` | The latest deployed revision. |
| `public` | `Boolean` | Whether the service is accessible through the ingress endpoint or not. |
| `ty` | `Utf8` | The service type. Either `service` or `virtual_object` or `workflow`. |
| `deployment_id` | `Utf8` | The ID of the latest deployment |

## Table: `sys_deployment`

| Column name | Type | Description |
|-------------|------|-------------|
| `id` | `Utf8` | The ID of the service deployment. |
| `ty` | `Utf8` | The type of the endpoint. Either `http` or `lambda`. |
| `endpoint` | `Utf8` | The address of the endpoint. Either HTTP URL or Lambda ARN. |
| `created_at` | `Date64` | Timestamp indicating the deployment registration time. |

## Table: `sys_invocation`

| Column name | Type | Description |
|-------------|------|-------------|
| `id` | `Utf8` | [Invocation ID](/operate/invocation#invocation-identifier). |
| `target` | `Utf8` | Invocation Target. Format for plain services: `ServiceName/HandlerName`, e.g. `Greeter/greet`. Format for virtual objects/workflows: `VirtualObjectName/Key/HandlerName`, e.g. `Greeter/Francesco/greet`. |
| `target_service_name` | `Utf8` | The name of the invoked service. |
| `target_service_key` | `Utf8` | The key of the virtual object or the workflow ID. Null for regular services. |
| `target_handler_name` | `Utf8` | The invoked handler. |
| `target_service_ty` | `Utf8` | The service type. Either `service` or `virtual_object` or `workflow`. |
| `invoked_by` | `Utf8` | Either `ingress` if the service was invoked externally or `service` if the service was invoked by another Restate service. |
| `invoked_by_service_name` | `Utf8` | The name of the invoking service. Or `null` if invoked externally. |
| `invoked_by_id` | `Utf8` | The caller [Invocation ID](/operate/invocation#invocation-identifier) if the service was invoked by another Restate service. Or `null` if invoked externally. |
| `invoked_by_target` | `Utf8` | The caller invocation target if the service was invoked by another Restate service. Or `null` if invoked externally. |
| `pinned_deployment_id` | `Utf8` | The ID of the service deployment that started processing this invocation, and will continue to do so (e.g. for retries). This gets set after the first journal entry has been stored for this invocation. |
| `trace_id` | `Utf8` | The ID of the trace that is assigned to this invocation. Only relevant when tracing is enabled. |
| `journal_size` | `UInt32` | The number of journal entries durably logged for this invocation. |
| `created_at` | `Date64` | Timestamp indicating the start of this invocation. |
| `modified_at` | `Date64` | Timestamp indicating the last invocation status transition. For example, last time the status changed from `invoked` to `suspended`. |
| `inboxed_at` | `Date64` | Timestamp indicating when the invocation was inboxed, if ever. |
| `scheduled_at` | `Date64` | Timestamp indicating when the invocation was scheduled, if ever. |
| `running_at` | `Date64` | Timestamp indicating when the invocation first transitioned to running, if ever. |
| `completed_at` | `Date64` | Timestamp indicating when the invocation was completed, if ever. |
| `retry_count` | `UInt64` | The number of invocation attempts since the current leader started executing it. Increments on start, so a value greater than 1 means a failure occurred. Note: the value is not a global attempt counter across invocation suspensions and leadership changes. |
| `last_start_at` | `Date64` | Timestamp indicating the start of the most recent attempt of this invocation. |
| `next_retry_at` | `Date64` | Timestamp indicating the start of the next attempt of this invocation. |
| `last_attempt_deployment_id` | `Utf8` | The ID of the service deployment that executed the most recent attempt of this invocation; this is set before a journal entry is stored, but can change later. |
| `last_attempt_server` | `Utf8` | Server/SDK version, e.g. `restate-sdk-java/1.0.1` |
| `last_failure` | `Utf8` | An error message describing the most recent failed attempt of this invocation, if any. |
| `last_failure_error_code` | `Utf8` | The error code of the most recent failed attempt of this invocation, if any. |
| `last_failure_related_entry_index` | `UInt64` | The index of the journal entry that caused the failure, if any. It may be out-of-bound of the currently stored entries in `sys_journal`. |
| `last_failure_related_entry_name` | `Utf8` | The name of the journal entry that caused the failure, if any. |
| `last_failure_related_entry_type` | `Utf8` | The type of the journal entry that caused the failure, if any. You can check all the available entry types in [`entries.rs`](https://github.com/restatedev/restate/blob/main/crates/types/src/journal/entries.rs). |
| `status` | `Utf8` | Either `pending` or `scheduled` or `ready` or `running` or `backing-off` or `suspended` or `completed`. |
| `completion_result` | `Utf8` | If `status = 'completed'`, this contains either `success` or `failure` |
| `completion_failure` | `Utf8` | If `status = 'completed' AND completion_result = 'failure'`, this contains the error cause |

