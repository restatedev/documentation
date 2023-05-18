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
When defining the key field, make sure:

* The field type is either a primitive or a custom message, and not a repeated field nor a map.
* The field type is the same for every method input message of the same service.

Example:

```protobuf
service HelloWorld {
  option (dev.restate.ext.service_type) = KEYED;

  rpc greet (GreetingRequest) returns (GreetingResponse);
}

message GreetingRequest {
  Person person = 1 [(dev.restate.ext.field) = KEY];
}
```

## META0003 {#META0003}

Cannot reach the endpoint to execute service discovery. Make sure:

* The provided `uri` is correct
* The service endpoint is up and running
* The Restate runtime can reach the service endpoint through the configured `uri`
* If additional authentication is required, make sure it's configured through `additional_headers`

## RT0001 {#RT0001}

The invocation response stream was aborted due to the timeout configured in `worker.invoker.response_abort_timeout`.
This timeout is fired when Restate has an open invocation, and it's waiting only for response messages, but no message is seen for the configured time.

Suggestions:

* Check for bugs in your code. Most likely no message was sent to Restate because your code is blocked and/or reached a deadlock.
* If your code is supposed to not send any message to Restate for longer than the configured timeout, because for example is doing a blocking operation that takes a long time, change the configuration accordingly.

## RT0002 {#RT0002}

Cannot start Restate because the configuration cannot be parsed. Check the configuration file and the environment variables provided.

For a complete list of configuration options, and a sample configuration, check http://restate.dev/docs/deployment-operations/configuration

## RT0003 {#RT0003}

The invocation failed because the invoker received a message from a service endpoint larger than the `worker.invoker.message_size_limit`.

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

