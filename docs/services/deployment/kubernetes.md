---
sidebar_position: 2
description: "Learn how to run Restate applications on Kubernetes."
---

# Kubernetes
## Deploying long-running services
You can deploy long-running Restate Typescript services in any preferred way,
as long as the Restate runtime can communicate with them.
Besides that, Restate does not add any requirements on how they are deployed.

For example, you can package them as a Docker container and run them on Kubernetes or on any other container platform
(e.g. AWS ECS, AWS Fargate).

:::tip
Have a look at the [shopping cart example](https://github.com/restatedev/example-shopping-cart-typescript) to see some possible deployment options in action:
Kubernetes, AWS ECS and a local Docker setup.
:::
