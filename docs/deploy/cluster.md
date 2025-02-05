---
sidebar_position: 1
description: "Learn how to deploy a distributed Restate cluster."
---

import Admonition from '@theme/Admonition';

# Cluster deployment

This page describes how you can deploy a distributed Restate cluster.

<Admonition type="info" title="Quickstart using Docker">
    Check out the [Restate cluster guide](/guides/cluster) for a docker-compose ready-made example.
</Admonition>

## Configuration

To deploy a distributed Restate cluster without external dependencies, you need to configure the following settings in your [server configuration](/operate/configuration/server):

```toml
# Let every node run all roles
roles = ["metadata-server", "admin", "worker", "log-server"]
# Every node needs to have a unique node name
node-name = "UNIQUE_NODE_NAME"
# All nodes need to have the same cluster name
cluster-name = "CLUSTER_NAME"
# Make sure it does not conflict with the other nodes
advertised-address = "ADVERTISED_ADDRESS"
# At most one node can be configured with auto-provision = true
auto-provision = false

[bifrost]
# Only the replicated Bifrost provider can be used in a distributed deployment
default-provider = "replicated"

[bifrost.replicated-loglet]
# Replicate the data to 2 nodes. This requires that the cluster has at least 2 nodes to
# become operational. If the cluster has at least 3 nodes, then it can tolerate 1 node failure.
default-log-replication = 2

[metadata-server]
# To tolerate node failures, use the replicated metadata server
type = "replicated"

[metadata-client]
# List all the advertised addresses of the nodes that run the metadata-server role
addresses = ["ADVERTISED_ADDRESS", "ADVERTISED_ADDRESS_NODE_X"]

[admin]
# Make sure it does not conflict with the other nodes
bind-address = "ADMIN_BIND_ADDRESS"

[ingress]
# Make sure it does not conflict with other nodes
bind-address = "INGRESS_BIND_ADDRESS"

[admin.query-engine]
# Make sure it does not conflict with other nodes
pgsql-bind-address = "PGSQL_BIND_ADDRESS"
```

It is important that every Restate node you start has a unique `node-name` specified.
All nodes that are part of the cluster need to have the same `cluster-name` specified.
At most one node can be configured with `auto-provision = true`.
If no node is allowed to auto provision, then you have to manually provision the cluster.
Refer to the [Cluster provisioning](#cluster-provisioning) section for more information.

The log provider needs to be configured with `default-provider = "replicated"`.
The `default-log-replication` should be set to the number of nodes that the data should be replicated to.
If you run at least `2 * default-replication-property - 1` nodes, then the cluster can tolerate `default-replication-property - 1` node failures.
See the [log documentation](/operate/bifrost) for how to configure the log to tolerate up to `n` node failures.

The metadata server type should be set to `replicated` to tolerate node failures.
Every node that runs the `metadata-server` role will join the metadata store cluster.
To tolerate `n` metadata node failures, you need to run at least `2 * n + 1` Restate nodes with the `metadata-server` role configured.

The `metadata-client` should be configured with the advertised addresses of all nodes that run the `metadata-server` role.

Every Restate node that runs the `worker` role will also run the ingress server and accept incoming invocations.

For those nodes that run on the same machine, make sure that the ports do not conflict.

## Cluster provisioning

Once you start the node that is configured with `auto-provision = true`, it will provision the cluster so that other nodes can join.
The provision step initializes the metadata store and writes the initial `NodesConfiguration` with the initial cluster configuration to the metadata store.
In case none of the nodes is allowed to auto-provision, then you need to provision the cluster manually via `restatectl`.

```shell
restatectl provision --addresses <SERVER_TO_PROVISION> --yes
```

This provisions the cluster with default settings specified in the server configuration.
See the [restatectl documentation](/operate/restatectl) for more information about how to provision and operate the cluster.

## Growing the cluster

It is possible to grow the cluster after it has been started.
To do so, you need to start a new node with the same `cluster-name` and at least one of the addresses of a running node in `metadata-client.addresses`.
The latter is needed to let the node discover the metadata servers and join the cluster.

<Admonition type="note" title="Growing the cluster in the future">
    If you plan to grow your cluster after some time, we strongly recommend that you enable snapshotting.
    Otherwise, you risk that newly added nodes won't be fully used by the system.
    See the [snapshotting documentation](/deploy/snapshotting) for more information.
</Admonition>

<Admonition type="note" title="Shrinking the cluster">
    Currently, it is not supported to shrink the cluster.
    This means that nodes that have joined the cluster once, cannot be stopped!
    We will add support for removing nodes from the cluster soon.
</Admonition>
