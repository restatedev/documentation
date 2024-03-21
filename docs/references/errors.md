---
sidebar_position: 10
slug: errors
---

# Error codes

This page contains the list of error codes emitted by Restate components.

## META0001 {#META0001}

Bad service definition encountered while registering/updating a service.
When defining a service, make sure:

* The service has at least one method 
* Use a fully qualified service name (`package_name.service_name`) that doesn't start with `dev.restate` or `grpc`
* The service is annotated with the `dev.restate.ext.service_type` extension

Example:

```protobuf
syntax = "proto3";
import "dev/restate/ext.proto";

package com.example;

service HelloWorld {
  option (dev.restate.ext.service_type) = KEYED;

  rpc greet (GreetingRequest) returns (GreetingResponse);
}
```

## META0002 {#META0002}

Bad key definition encountered while registering/updating a service. 
When a service is keyed, for each method the input message must have a field annotated with `dev.restate.ext.field`. 
The key field type must be `string`.

Example:

```protobuf
service HelloWorld {
  option (dev.restate.ext.service_type) = KEYED;

  rpc greet (GreetingRequest) returns (GreetingResponse);
}

message GreetingRequest {
  string person_id = 1 [(dev.restate.ext.field) = KEY];
}
```

## META0003 {#META0003}

Cannot reach the service deployment to execute service discovery. Make sure:

* The provided `URI`/`ARN` is correct
* The deployment is up and running
* Restate can reach the deployment through the configured `URI`/`ARN`
* If additional authentication is required, make sure it's configured through `additional_headers`

## META0004 {#META0004}

Cannot register the provided deployment, because it conflicts with the uri of an already registered deployment.

In Restate deployments have a unique uri/arn and are immutable, thus it's not possible to discover the same deployment twice. 
Make sure, when updating a deployment, to assign it a new uri/arn. 

You can force the override using the `"force": true` field in the discover request, but beware that this can lead in-flight invocations to an unrecoverable error state.  

See the [versioning documentation](https://docs.restate.dev/operate/versioning) for more information.

## META0005 {#META0005}

Cannot propagate deployment/service metadata to Restate components. If you see this error when starting Restate, this might indicate a corrupted Meta storage.

We recommend wiping the Meta storage and recreating it by registering deployments in the same order they were registered before.

## META0006 {#META0006}

Cannot register the newly discovered service revision in the provided deployment, because it conflicts with an already existing service revision.

When implementing a new service revision, make sure that:

* The service instance type and the key definition, if any, are exactly the same as of the previous revisions.
* The Protobuf contract and message definitions are backward compatible.
  * The new revision must implement all the methods of the previous revisions.

See the [versioning documentation](https://docs.restate.dev/operate/versioning) for more information.

## META0007 {#META0007}

Bad input message field annotation encountered while registering/updating a service. 

You can have at most one field in a message definition annotated with the same `dev.restate.ext.field` annotation.

## META0008 {#META0008}

Bad type for input message field annotated with either `EVENT_PAYLOAD` or `EVENT_METADATA`. 

Fields annotated with `(dev.restate.ext.field) = EVENT_PAYLOAD` can have only `bytes` or `string` types.
Fields annotated with `(dev.restate.ext.field) = EVENT_METADATA` can have only `map<string, string>` type.

## META0009 {#META0009}

The provided subscription is invalid. Subscriptions should have:

* A `source` field in the format of `kafka://<CLUSTER_NAME>/<TOPIC_NAME>`. When registering, the Kafka cluster should be configured in the Restate configuration.
* A `sink` field in the format of `service://<SERVICE_NAME>/<METHOD_NAME>`. When registering, service and method should have been previously registered as well.
* Additional constraints may apply depending on the sink service contract

Please look at the Kafka documentation page(for [TypeScript](/develop/ts/kafka) or [Java](/develop/java/kafka)) for more details on subscriptions and event handlers.

## META0010 {#META0010}

Trying to open meta storage directory, configured via `meta.storage_path`, which contains incompatible data. This indicates that your data was written with a different Restate version than you are running right now.

Suggestions:

* Up/Downgrade your Restate server to the requested version.
* Migrate your data to the requested version by running the migration scripts.
* Wipe your meta storage directory to start afresh via `--wipe=meta`.
* Configure a different meta storage directory via `meta.storage_path`.

## META0011 {#META0011}

Non-empty meta storage directory, configured via `meta.storage_path`, is missing the version file. This indicates data corruption or that the data has been written with an incompatible Restate version < 0.8.

Suggestions:

* Wipe your meta storage directory to start afresh via `--wipe=meta`.
* Configure a different meta storage directory via `meta.storage_path`.
* Downgrade your Restate server to {'<='} 0.7.

## RT0001 {#RT0001}

The invocation response stream was aborted due to the timeout configured in `worker.invoker.abort_timeout`.
This timeout is fired when Restate has an open invocation, and it's waiting only for response messages, but no message is seen for the configured time.

Suggestions:

* Check for bugs in your code. Most likely no message was sent to Restate because your code is blocked and/or reached a deadlock.
* If your code is supposed to not send any message to Restate for longer than the configured timeout, because for example is doing a blocking operation that takes a long time, change the configuration accordingly.

## RT0002 {#RT0002}

Cannot start Restate because the configuration cannot be parsed. Check the configuration file and the environment variables provided.

For a complete list of configuration options, and a sample configuration, check https://docs.restate.dev/operate/configuration

## RT0003 {#RT0003}

The invocation failed because Restate received a message from a service larger than the `worker.invoker.message_size_limit`.

Suggestions:

* Check in your code whether there is a case where a very large message can be generated, such as a state entry being too large, a request payload being too large, etc.
* Increase the limit by tuning the `worker.invoker.message_size_limit` config entry, eventually tuning the memory of your operating system/machine where Restate is running.

## RT0004 {#RT0004}

Failed starting process because it could not bind to configured address.
This happens usually if another process has already bound to this address.

Suggestions:

* Select an address that is free.
* Stop the process that has bound to the specified address.
* Make sure you have the permissions to bind to the configured port. Some operating systems require admin/root privileges to bind to ports lower than 1024.

## RT0005 {#RT0005}

Failed opening RocksDB, because the db file is currently locked.  
This happens usually if another process still holds the lock.

Suggestions:

* Check no other Restate process is running and using the same db file.
* Configure a different RocksDB storage directory via `worker.storage_rocksdb.path`.

## RT0006 {#RT0006}

An error occurred while invoking the service deployment. 
This is a generic error which can be caused by many reasons, including:

* Transient network or storage errors
* Misconfiguration of the deployment and/or of the Restate runtime
* Non-deterministic user code execution
* Restate runtime and/or SDK bug

We suggest checking the service and/or deployment logs as well to get any hint on the error cause.

## RT0007 {#RT0007}

A retry-able error was received from the service deployment while processing the invocation.

Suggestions:

* Check the service/deployment logs to get more info about the error cause, like the stacktrace.
* Look at the error handling SDK docs (for [Java](/develop/java/error-handling) or [TypeScript](/develop/ts/error-handling)) for more information about error handling in services.

## RT0008 {#RT0008}

Trying to open worker storage directory, configured via `worker.storage_rocksdb.path`, which contains incompatible data. This indicates that your data was written with a different Restate version than you are running right now.

Suggestions:

* Up/Downgrade your Restate server to the requested version.
* Migrate your data to the requested version by running the migration scripts.
* Wipe your worker storage directory to start afresh via `--wipe=worker`.
* Configure a different worker storage directory via `worker.storage_rocksdb.path`. 

## RT0009 {#RT0009}

Trying to open worker storage directory, configured via `worker.storage_rocksdb.path`, which contains no storage format version information. This indicates data corruption or that the data has been written with an incompatible Restate version < 0.8.

Suggestions:

* Wipe your worker storage directory to start afresh via `--wipe=worker`.
* Configure a different worker storage directory via `worker.storage_rocksdb.path`.
* Downgrade your Restate server to < 0.8.

