---
sidebar_position: 1
description: "Learn how to deploy Restate services."
---

# General

Restate services are deployed within *Service endpoints*. The Restate runtime interacts with service endpoints by sending requests to them using a custom protocol on top of HTTP.

A service endpoint can be deployed as a Lambda function, a Kubernetes pod, a Knative Service, or any other deployment environment where the service endpoint can be reached at a specific URL.

The URL (including path prefix) MUST be **unique**, meaning that no two service endpoints with the same URL can exist at the same time in a Restate instance.

Moreover, service endpoints are **immutable**, and are assumed to be reachable throughout the entire lifecycle of an invocation. To deploy any change to a service, either in the Protobuf definition or in the business logic, you should deploy a new service endpoint with a new URL. See the [versioning documentation](/services/upgrades-removal) for more details on how to update services.


:::info Running services locally
Have a look at the [Quickstart](/quickstart) to set up your local development environment.
:::
