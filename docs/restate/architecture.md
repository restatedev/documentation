---
sidebar_position: 1
description: "A deep-dive into the internals of Restate."
---

# Architecture

In order to provide the building blocks of consistent state, reliable messaging and durable execution for applications, Restate itself needs to be highly scalable, consistent and fault-tolerant with high availability.

The runtime is split into the control plane consisting of *Metas* and the data plane consisting of *Workers*.

The *Metas* are responsible for managing the service meta information and coordinating the *Workers*.

The *Workers* are responsible for invoking services, storing their journal and service state as well as maintaining processing order.
*Workers* also expose a *SQL* interface to query the runtime's internal state.

Services run on *Service Endpoints* which can be deployed independently of the runtime.

![High level architecture](/img/restate-architecture.png)

## Scalability

Restate is highly scalable because it shards the space of service invocations into partitions which are processed each by a dedicated *Partition processor*.
Each *Worker* runs a set of these *Partition processors*.
In order to react to changing workloads, the partitions can be merged and split dynamically.

![Sharding of service invocation space](/img/sharding.png)

:::note
Dynamic partitioning is still under development.
:::

## Consistency and fault-tolerance

Consistency and fault-tolerance is achieved by replicating the *Partition processors* via [Raft](https://raft.github.io/).
All commands for a partition go through the Raft log, which ensures that all partition processor replicas stay consistent and can be recovered in case of failures.

Each partition is governed by their own Raft group.
A *Worker* runs multiple *Partition processors* belonging to different Raft groups which operate independently.
Such an architecture is known as [Multi-Raft](https://tikv.org/deep-dive/scalability/multi-raft/).

![Multi-Raft](/img/multi-raft-docs.png)

:::note
Currently, Restate runs as a single process. The distributed implementation is still under development.
:::

## State storage

The Raft and *Partition processor* state is stored by the *Workers* in [RocksDB](https://github.com/facebook/rocksdb).
Using RocksDB allows for graceful spilling to disk and comparatively fast writes.
Moreover, it supports asynchronous checkpointing which is required to truncate the Raft log.

## State queries

Restate makes its internal state accessible via a SQL interface.
Any client that supports the PostgreSQL wire protocol can be used to issue queries.
Internally, the SQL queries are executed using [DataFusion](https://github.com/apache/arrow-datafusion).
