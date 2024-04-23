---
sidebar_position: 1
description: "Learn how to deploy Restate services."
---

import Admonition from '@theme/Admonition';

# Overview

Restate applications exist of two parts: the Restate [server](#restate-server) and the [services](#restate-services) it hosts:

![Restate overview](/img/deployment_overview.svg)

This page describes how to deploy Restate and Restate services.

## Restate Server

The Restate Server is a single binary that contains everything you need to host an environment. See the [Get Restate](https://restate.dev/get-restate/) page for various ways of obtaining it.

There are a few options for hosting the Restate Server:

- [Self-host on AWS](/deploy/lambda/self-hosted)
- [Self-host on Kubernetes](/deploy/kubernetes).

The server will store metadata and RocksDB data under `./restate-data/<NODE-NAME>`.
`<NODE-NAME>` is the name of the Restate server, which is set by the `--node-name` flag (defaults to hostname).
The server requires outbound connectivity to the services you deploy in order to discover and send requests to them.

### Exposed Ports

The server process exposes four services by default, available on different ports:

| Name           | Port | Description                                                                                                                    | Protocol                                      |
| -------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Node-ctrl      | 5122 | Control port for Restate Server nodes                                                                                          | gRPC + HTTP for Prometheus metrics `/metrics` |
| Metadata store | 5123 | Service used for storing metadata used by the Restate Server                                                                   | gRPC                                          |
| Ingress        | 8080 | Acts as an API gateway for all services registered with Restate                                                                |                                               |
| Admin          | 9070 | Allows for CRUD operations on service/service deployment metadata, eg for service registration                                 | REST                                          |
| Postgres       | 9071 | Exposes Restate RocksDB read-only storage operations using the Postgres protocol. See [Introspection](/operate/introspection). | Postgres                                      |

## Restate services

Restate services are deployed as _Service deployments_.
A service deployment can be a Lambda function, a Kubernetes pod, a Knative Service, or any other process reachable at a specific URL.
The URL (including path prefix) MUST be **unique**, meaning that no two deployments with the same URL can be registered with Restate.

Service deployments are considered **immutable** and to be reachable throughout the entire lifecycle of an invocation.
To deploy any change to a service, you should create a new deployment with a new URL.
See the [versioning documentation](/operate/versioning) for more details on how to update services.

<Admonition type="info" title="Running services locally">
Have a look at the [Quickstart](/get_started/quickstart) to set up your local development environment.
</Admonition>

<Admonition type="info" title="Restate's service protocol">
The Restate runtime interacts with service deployments via HTTP using Restate's [service protocol](https://github.com/restatedev/service-protocol).
</Admonition>
