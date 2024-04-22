---
sidebar_position: 1
description: "Learn how to deploy Restate services."
---

import Admonition from '@theme/Admonition';

# Overview

Restate applications exist of two parts: the Restate server and the services it hosts:

![Restate overview](/img/deployment_overview.svg)

This page describes how to deploy Restate and Restate services.

## Restate Server

There are a few options for hosting the Restate Server:

- [Self-host open-source Restate on AWS](/deploy/lambda/self-hosted)
- [Self-host open-source Restate on Kubernetes](/deploy/kubernetes).
- [Use Restate Cloud](/deploy/restate_cloud): a managed Restate service

The Restate Server is a single binary that contains everything you need to host an environment. See the [Get Restate](https://restate.dev/get-restate/) page for various ways of obtaining it.

The server process exposes four services by default, available on different ports:

| Name      | Port | Description                                                                                                                   | Protocol                                          |
| --------- | ---- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Node-ctrl | 5122 | control port for restate server nodes                                                                                         | gRPC + HTTP for prometheus metrics `/metrics`     |
| Ingress   | 8080 | Acts as an API gateway for all services registered with Restate                                                               |  |
| Admin     | 9070 | Allows for CRUD operations on service/service deployment metadata, eg for service registration                                | REST                                              |
| Postgres  | 9071 | Exposes Restate RocksDB read-only storage operations using the Postgres protocol. See [Introspection](/operate/introspection) | Postgres                                          |

It will store metadata and RocksDB data in the relative directory of `./restate-data` under the current working directory of the
process.

The Restate server requires outbound connectivity to the services you deploy in order to discover and send requests to them.

## Restate services

Restate services are deployed within _Service deployments_. The Restate runtime interacts with service deployments by sending requests to them using a custom protocol on top of HTTP.

A service deployment can be a Lambda function, a Kubernetes pod, a Knative Service, or any other process reachable at a specific URL.

The URL (including path prefix) MUST be **unique**, meaning that no two deployments with the same URL can exist at the same time in a Restate instance.

Moreover, service deployments are **immutable**, and are assumed to be reachable throughout the entire lifecycle of an invocation. To deploy any change to a service, either in the Protobuf definition or in the business logic, you should deploy a new deployment with a new URL. See the [versioning documentation](/operate/versioning) for more details on how to update services.

<Admonition type="info" title="Running services locally">
Have a look at the [Quickstart](/get_started/quickstart) to set up your local development environment.
</Admonition>
