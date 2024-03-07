---
sidebar_position: 5
description: "A deep-dive into the internals of Restate."
---

# Architecture

In order to provide the building blocks of consistent state, reliable messaging and durable execution for applications, Restate itself needs to be highly scalable, consistent and fault-tolerant with high availability.

The runtime is split into the control plane consisting of *Metas*, the data plane consisting of *Workers* and the durable communication layer *shared log*.

The *Metas* are responsible for managing the service meta information and coordinating the *Workers*.

The *Workers* are responsible for invoking services, storing the invocation and service state as well as maintaining processing order.
*Workers* also expose a *SQL* interface to query the runtime's internal state.

The *shared log* is used for inter-worker communication.
Log entries are durably stored which allows *Workers* to recover from faults by replaying the log.

Services run on *Service Deployments* which can be deployed independently of the runtime.

![High level architecture](/img/restate-architecture.png)

## Durable execution via journaling

Things always eventually go wrong, in particular at scale when running a distributed application.
Therefore, services that Restate invokes will also fail eventually.
In these cases, the services need to be re-invoked so that they can complete.
Ideally, services resume from the point where they failed without re-doing all the previous actions, effectively resulting into durable execution of services.

The way Restate achieves durable execution is by recording the actions a service takes in a durable journal.
When re-invoking a service, the journal is sent alongside the service state to the service deployment.
The service deployment resumes the invocation by replaying the recorded journal entries without re-doing the actual operations (e.g. calling another service, storing state, running a side-effect, etc.).
A useful side-effect of the journal is that Restate can always suspend an invocation and resume it at a later point in time if need should arise.

![Durable execution](/img/durable-execution.png)

## Service invocation flow

All service invocations need to go through Restate which acts as a reverse-proxy for the registered services.
Restate knows where the services are running and invokes them on behalf of the clients.
By putting Restate in charge of the actual invocation, the system can achieve the following properties:

* Enrich the invocation with extra information such as service and journal state
* Guarantee that keyed invocations are executed in order and isolation
* Retry failed invocations until they complete

The service invocation flow is as follows:

1. New invocations are received by the *Ingress service* running on the *Workers*. The ingress extracts the invocation key which determines the partition responsible for processing the invocation.
2. Based on the key, the invocation is forwarded to the right *Worker* running the *Partition processor* of the target partition.
3. The *Partition processor* makes sure that for a given key and service, the invocations are executed sequentially.
4. Once all preceding invocations have completed, the invocation request will be enriched with the service's state and sent to the service deployment where it executes.
5. While executing, the runtime journals actions the service takes in order to be able to recover from failures without redoing these actions.
6. Once the invocation completes with a response, it will be sent back to the *Ingress service* and then to the invoking client.

![Service invocation flow](/img/service-invocation-flow.png)

## Runtime

### Scalability

Restate is highly scalable because it shards the space of service invocations into partitions based on their keys.
Each partition is processed by a dedicated *Partition processor*.
Each *Worker* runs a set of these *Partition processors*.
In order to react to changing workloads, the partitions can be merged and split dynamically.

![Sharding of service invocation space](/img/sharding.png)

:::note
Dynamic partitioning is still under development.
:::

### Consistency and fault-tolerance

Consistency and fault-tolerance is achieved by replicating the *shared log*.
All commands for a partition go through the shared log, which ensures that all partition processor replicas stay consistent and can be recovered in case of failures.

:::note
Currently, Restate runs as a single process. The distributed implementation is still under development.
:::

### State storage

The *Partition processor* state is stored by the *Workers* in [RocksDB](https://github.com/facebook/rocksdb).
Using RocksDB allows for graceful spilling to disk and comparatively fast writes.

### State queries

Restate makes its internal state accessible via a SQL interface.
Any client that supports the PostgreSQL wire protocol can be used to issue queries.
Internally, the SQL queries are executed using [DataFusion](https://github.com/apache/arrow-datafusion).

### Service registry

All service meta information is maintained by the *Metas* via the service registry.
The service registry contains information about the registered services which includes the address of the service deployments, the exposed service methods, their signatures and type definitions.
The service contracts and their type definitions are also exposed via [gRPC reflection](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md) by the *Workers*.

Services are added to the registry by discovering service deployments.
Upon discovery request, the *Metas* reach out to the specified service deployment and retrieve all registered services, their methods and type definitions.
After discovery, the new service meta information is propagated to the *Workers* which enables invoking these services through Restate.
