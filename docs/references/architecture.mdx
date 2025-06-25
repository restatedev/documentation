---
title: "Architecture"
sidebar_position: 1
description: "Restate architecture and distributed deployment concepts"
---

import Admonition from '@theme/Admonition';

# Restate Architecture

Restate is designed to be extremely simple to get started with by delivering all the functionality in a single binary with minimal upfront configuration needs. In particular, when starting out by running Restate on a single node, you don't need to understand its internal architecture in a great level of detail.

As you begin to plan for more complex deployment scenarios, you will benefit from having a deeper understanding of the various components and how they fit together to support scalable and resilient clusters. The goal of this section is to introduce the terminology we use throughout the server documentation and inform the choices involved in configuring Restate clusters.


## Overview

Restate is implemented with a three-layered architecture: a control plane, distributed log, and processors.

<img width={"750px"} alt={"Restate Node internal architecture"} src={"/img/architecture/restate_layered_arch.png"}/>


### Control plane
This component stores all metadata about deployments (what services exist behind which endpoint addresses / URLs / ARNs) and is responsible for assigning the leaders to log partitions and processors.


### Distributed Log a.k.a Bifrost
Restate uses a distributed log, called Bifrost, to durably record all events in the system before acting on them, similar to the function of a write-ahead log (WAL) in a database system.
The design of Bifrost is based on the idea of a virtual consensus, as described in the [Delos paper](https://www.usenix.org/system/files/osdi20-balakrishnan.pdf).
The consensus algorithm powering Bifrost is based on [Flexible Paxos](https://fpaxos.github.io/).

To support scale-out operations, Restate splits the services key-space across multiple partitions, backed by logs. Currently, we map one partition to one log, though this relationship may change in the future. Thus you will see references to both partition ids and log ids, depending on context, so be aware that these are distinct concepts even if they might be the same value.

Each Bifrost log is a chain of append-only segments. The control plane takes care of sealing prior segments and extending this chain. The individual segments are backed by loglets - currently, Bifrost ships with a local loglet suitable for single-node deployments, and a replicated loglet which supports clustered deployments.

### Processors

The Processors (also called Partition Processors) receive invocations, process events from the durable log, and interact with the services/functions containing the application/workflow logic. The Processors encapsulate the state machines for durable execution and invocation life-cycles.

The Processors maintain the “state of the world” derived from log events. This state includes ongoing invocations, the journal of each invocation, durable promises, and persisted key-value state. Partition state is stored in RocksDB and can be periodically snapshotted to an object store (this is required in multi-node clusters).

## Nodes and roles

You'll see many mentions of the terms server and node throughout this documentation. Generally, we use the term "server" to refer to a running instance of the `restate-server` binary. This binary can host multiple functions. When you start a single-node Restate server, for example when doing some local development or testing, you are hosting all the essential features in a single process. These include accepting incoming requests, durably recording events, processing work (delegating invocations to services, handling key-value operations), as well as maintaining metadata used internally by the system.

At its simplest, running a cluster is not that different - multiple nodes cooperate to share the responsibilities we mentioned earlier. This is accomplished by having multiple copies of the server process running on separate machines, although it is possible to create test clusters on a single machine. **Nodes** are therefore distinct instances of the Restate server within a cluster.

Restate clusters are designed to scale out in support of large deployments. As you add more machines, it becomes wasteful to replicate all the functionality across all the machines in a cluster, since not all features need to scale out at the same rate. **Roles** control which features run on any given node, enabling specialization within the cluster.

Here is an overview of the different roles that can run on a node:

<img alt={"Restate Node internal architecture"} src={"/img/architecture/node_internal_architecture.png"}/>

- Metadata server: the source of truth for cluster-wide information
- Ingress: the entry point for external requests
- Log server: responsible for durably persisting the log
- Worker: houses the partition processors
- Admin: giving access to the admin API and running the cluster controller

## Metadata store

The Restate metadata store is part of the control plane and is the internal source of truth for node membership and responsibilities. It is essential to the correctness of the overall system: In a cluster this service enables distributed consensus about other components' configuration. All nodes in a Restate cluster must be able to access the metadata store, though not all members of the cluster need to be part of hosting it. Restate includes a built-in Raft-based metadata store which is hosted on all nodes running the `metadata-server` role.

The metadata store is designed to support relatively low volumes of read and write operations (at least compared to other parts of Restate), with the highest level of integrity and availability.

[//]: # (For some weird reason this shifts to the right if I use two hashtags)
<h2>Ingress</h2>

External requests enter the Restate cluster via the HTTP ingress component, which runs on nodes assigned the `http-ingress` role. Compared to other roles, the HTTP ingress role does not involve long-lived state and it can move around relatively freely, since it only handles ongoing client connections.

<Admonition type="info" title={"Fine-grained ingress role"}>
    The fine-grained `http-ingress` role is a new addition in Restate 1.2. For backwards-compatibility, nodes running the `worker` role will continue to run the ingress function in version 1.2.
</Admonition>


## Log servers

Log server nodes running the `log-server` role are responsible for durably persisting the log. If the log is the equivalent of a WAL, then partition stores are the materializations that enable efficient reads of the events (invocation journals, key-value data) that have been recorded. Depending on the configured **log replication** requirements, Restate will replicate log records to multiple log servers to persist a given log, and this will change over time to support maintenance and resizing of the cluster.


## Workers
Nodes assigned the `worker` role run the partition processors, which are the Restate components responsible for maintaining the partition store.
Partition processors can operate in either leader or follower mode.
Only a single leader for a given partition can be active at a time, and this is the sole processor that handles invocations to deployed services.
Followers keep up with the log without taking action, and are ready to take over in the event that the partition's leader becomes unavailable.
The overall number of processors per partition is configurable via the **partition replication** configuration option.

<img alt={"Restate invocation flow"} src={"/img/architecture/invocation_flow.png"}/>


Partition processors replicate their state by following and applying the log for their partition.
If a processor needs to stop, for example for scheduled maintenance, it will typically catch up on the records it missed by reading them from the cluster's log servers once it comes back online.
Occasionally, a worker node might lose a disk - or you might need to grow your cluster by adding fresh nodes to it.
In these cases, it's far more efficient to obtain a **snapshot** of the partition state from a recent point in time than to replay all the missing log events.
Restate clusters can be configured to use an external **object store** as the snapshot repository, allowing partition processors to skip ahead in the log.
This also enables us to **trim logs** which might otherwise grow unboundedly.

## Admin

Nodes running the `admin` role expose the admin REST API, which can be used to manage the cluster (e.g. registering services, canceling invocations, etc.) and to obtain information about available services and running invocations.
The admin role also exposes the SQL endpoint to query the cluster status which gives advanced information about the cluster.
One of the `admin` nodes runs the cluster controller which is responsible for configuring the partition processors and selecting the leader.
In case the admin node running the cluster controller fails, another admin node will take over and start a new cluster controller.

## Other reading material
- [Distributed Restate - a first look](https://restate.dev/blog/distributed-restate-a-first-look/)
- [Every System is a Log](https://restate.dev/blog/every-system-is-a-log-avoiding-coordination-in-distributed-applications/): blog post on the idea at the basis of Restate
- [Virtual Consensus in Delos](https://www.usenix.org/system/files/osdi20-balakrishnan.pdf)
- [An introduction to Virtual Consensus in Delos - Jack Vanlightly](https://jack-vanlightly.com/blog/2025/2/5/an-introduction-to-virtual-consensus-in-delos)
