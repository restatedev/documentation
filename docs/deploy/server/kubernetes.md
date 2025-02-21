---
title: "Kubernetes"
sidebar_position: 2
description: "Learn how to run Restate applications on Kubernetes."
---

import Admonition from '@theme/Admonition';

# Deploying Restate Server on Kubernetes

This page describes how to deploy Restate on [Kubernetes](https://kubernetes.io/).

The recommended Kubernetes deployment strategy is a one-replica StatefulSet. We recommend installing Restate in its own
namespace. The easiest way to do this is with
our [Helm chart](https://github.com/restatedev/restate/tree/main/charts/restate-helm):

```shell
helm install restate oci://ghcr.io/restatedev/restate-helm --namespace restate --create-namespace
```

<Admonition type="tip" title="Restate Kubernetes Operator">
If you want to run multiple Restate clusters in Kubernetes, or want advanced functionality like online volume expansion
and network policies, you can also use the [Restate Operator](https://github.com/restatedev/restate-operator). Details
of how to install it and deploy a cluster can be found in the [README](https://github.com/restatedev/restate-operator/blob/main/README.md).
</Admonition>