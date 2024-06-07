---
sidebar_position: 10
slug: errors
---

# Error codes

This page contains the list of error codes emitted by Restate components.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0003">META0003<a href="#META0003" class="hash-link">&#8203;</a></h2>

Cannot reach the service endpoint to execute discovery. Make sure:

* The provided `URI`/`ARN` is correct
* The deployment is up and running
* Restate can reach the deployment through the configured `URI`/`ARN`
* If additional authentication is required, make sure it's configured through `additional_headers`

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0004">META0004<a href="#META0004" class="hash-link">&#8203;</a></h2>

Cannot register the provided deployment, because it conflicts with the uri of an already registered deployment.

In Restate deployments have a unique uri/arn and are immutable, thus it's not possible to discover the same deployment twice. 
Make sure, when updating a deployment, to assign it a new uri/arn. 

You can force the override using the `"force": true` field in the discover request, but beware that this can lead in-flight invocations to an unrecoverable error state.  

See the [versioning documentation](https://docs.restate.dev/operate/versioning) for more information.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0005">META0005<a href="#META0005" class="hash-link">&#8203;</a></h2>

Cannot propagate deployment/service metadata to Restate services. If you see this error when starting Restate, this might indicate a corrupted Meta storage.

We recommend wiping the Meta storage and recreating it by registering deployments in the same order they were registered before.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0006">META0006<a href="#META0006" class="hash-link">&#8203;</a></h2>

Cannot register the newly discovered service revision in the provided deployment, because it conflicts with an already existing service revision.

When implementing a new service revision, make sure that:

* The service type is the same as the previous revision.
* The new revision contains at least all the handlers of the previous revision.

See the [versioning documentation](https://docs.restate.dev/operate/versioning) for more information.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0009">META0009<a href="#META0009" class="hash-link">&#8203;</a></h2>

The provided subscription is invalid. Subscriptions should have:

* A `source` field in the format of `kafka://<CLUSTER_NAME>/<TOPIC_NAME>`. When registering, the Kafka cluster should be configured in the Restate configuration.
* A `sink` field in the format of `service://<service_NAME>/<HANDLER_NAME>`. When registering, service and handler should be available already in the registry, meaning they have been previously registered.
* Additional constraints may apply depending on the sink service type.

Please look at the Kafka documentation (for [TypeScript](https://docs.restate.dev/develop/ts/kafka) and [Java](https://docs.restate.dev/develop/java/kafka)) for more details on subscriptions and event handlers.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0010">META0010<a href="#META0010" class="hash-link">&#8203;</a></h2>

Trying to open meta storage directory, configured via `meta.storage_path`, which contains incompatible data. This indicates that your data was written with a different Restate version than you are running right now.

Suggestions:

* Up/Downgrade your Restate server to the requested version.
* Migrate your data to the requested version by running the migration scripts.
* Wipe your meta storage directory to start afresh via `--wipe=meta`.
* Configure a different meta storage directory via `meta.storage_path`.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0011">META0011<a href="#META0011" class="hash-link">&#8203;</a></h2>

Non-empty meta storage directory, configured via `meta.storage_path`, is missing the version file. This indicates data corruption or that the data has been written with an incompatible Restate version < 0.8.

Suggestions:

* Wipe your meta storage directory to start afresh via `--wipe=meta`.
* Configure a different meta storage directory via `meta.storage_path`.
* Downgrade your Restate server to {'<='} 0.7.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0012">META0012<a href="#META0012" class="hash-link">&#8203;</a></h2>

Trying to register a service endpoint whose supported service protocol versions is incompatible with the server. This indicates that you have to upgrade your server to make it work together with the deployed SDK.

Suggestions:

* Check the compatibility matrix between SDK and server versions
  * Try upgrading to a server version which is compatible with your SDK
  * Try using an SDK version which is compatible with your server

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="META0013">META0013<a href="#META0013" class="hash-link">&#8203;</a></h2>

Received a bad service discovery response from the specified service endpoint. This indicates that you are trying to register a service endpoint with an incompatible server. 

Suggestions:

* Check the compatibility matrix between SDK and server versions
  * Either deploy a server version which is compatible with your SDK
  * Or use an SDK version which is compatible with your server

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0001">RT0001<a href="#RT0001" class="hash-link">&#8203;</a></h2>

The invocation response stream was aborted due to the timeout configured in `worker.invoker.abort_timeout`.
This timeout is fired when Restate has an open invocation, and it's waiting only for response messages, but no message is seen for the configured time.

Suggestions:

* Check for bugs in your code. Most likely no message was sent to Restate because your code is blocked and/or reached a deadlock.
* If your code is supposed to not send any message to Restate for longer than the configured timeout, because for example is doing a blocking operation that takes a long time, change the configuration accordingly.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0002">RT0002<a href="#RT0002" class="hash-link">&#8203;</a></h2>

Cannot start Restate because the configuration cannot be parsed. Check the configuration file and the environment variables provided.

For a complete list of configuration options, and a sample configuration, check https://docs.restate.dev/operate/configuration

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0003">RT0003<a href="#RT0003" class="hash-link">&#8203;</a></h2>

The invocation failed because Restate received a message from a service larger than the `worker.invoker.message_size_limit`.

Suggestions:

* Check in your code whether there is a case where a very large message can be generated, such as a state entry being too large, a request payload being too large, etc.
* Increase the limit by tuning the `worker.invoker.message_size_limit` config entry, eventually tuning the memory of your operating system/machine where Restate is running.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0004">RT0004<a href="#RT0004" class="hash-link">&#8203;</a></h2>

Failed starting process because it could not bind to configured address.
This happens usually if another process has already bound to this address.

Suggestions:

* Select an address that is free.
* Stop the process that has bound to the specified address.
* Make sure you have the permissions to bind to the configured port. Some operating systems require admin/root privileges to bind to ports lower than 1024.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0005">RT0005<a href="#RT0005" class="hash-link">&#8203;</a></h2>

Failed opening RocksDB, because the db file is currently locked.  
This happens usually if another process still holds the lock.

Suggestions:

* Check no other Restate process is running and using the same db file.
* Configure a different RocksDB storage directory via `worker.storage_rocksdb.path`.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0006">RT0006<a href="#RT0006" class="hash-link">&#8203;</a></h2>

A generic error occurred while invoking the service.
We suggest checking the service/deployment logs as well to get any hint on the error cause.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0007">RT0007<a href="#RT0007" class="hash-link">&#8203;</a></h2>

A retry-able error was received from the service while processing the invocation. Suggestions:

* Check the component/deployment logs to get more info about the error cause, like the stacktrace.
* Look at the error handling docs for more info about error handling in components (for [TypeScript](https://docs.restate.dev/develop/ts/error-handling) or [Java](https://docs.restate.dev/develop/java/error-handling)).

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0009">RT0009<a href="#RT0009" class="hash-link">&#8203;</a></h2>

Trying to open worker storage directory, configured via `worker.storage_rocksdb.path`, which contains no storage format version information. This indicates data corruption or that the data has been written with an incompatible Restate version < 0.8.

Suggestions:

* Wipe your worker storage directory to start afresh via `--wipe=worker`.
* Configure a different worker storage directory via `worker.storage_rocksdb.path`.
* Downgrade your Restate server to < 0.8.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0010">RT0010<a href="#RT0010" class="hash-link">&#8203;</a></h2>

Network error when interacting with the service endpoint. This can be caused by a variety of reasons including:

* The service is (temporarily) down
* The service is (temporarily) not reachable over the network
* Your network security setup blocks Restate from reaching the service
* A config error where the registered service endpoint and the actually deployed service endpoint differ

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0011">RT0011<a href="#RT0011" class="hash-link">&#8203;</a></h2>

No deployment found for the given service. 
This might indicate that the service and/or the associated deployment was removed from the schema registry before starting to process the invocation. 
Check whether the schema registry contains the related service and deployment.

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0012">RT0012<a href="#RT0012" class="hash-link">&#8203;</a></h2>

Protocol violation error. This can be caused by an incompatible runtime and SDK version. If the error persists, please file a [bug report](https://github.com/restatedev/restate/issues). 

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0013">RT0013<a href="#RT0013" class="hash-link">&#8203;</a></h2>

The service endpoint does not support any of the supported service protocol versions of the server. Therefore, the server cannot talk to this endpoint. Please make sure that the service endpoint's SDK and the Restate server are compatible.

Suggestions:

* Register a service endpoint which uses an SDK which is compatible with the used server
* Upgrade the server to a version which is compatible with the used SDK

<h2 class="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module" id="RT0014">RT0014<a href="#RT0014" class="hash-link">&#8203;</a></h2>

The server cannot resume an in-flight invocation which has been started with a now incompatible service protocol version. Restate does not support upgrading service protocols yet.

Suggestions:

* Downgrade the server to a version which is compatible with the used service protocol version
* Kill the affected invocation via the CLI.

