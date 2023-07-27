---
id: Overview
hide_title: true
sidebar_position: 1
slug: /
---

<h2 style={{textAlign: 'center'}}>Stateful Services, FaaS, and Workflows with distributed durable async/await.
</h2>
<h3 style={{textAlign: 'center'}}>Make applications simple and lightweight to write, yet resilient and scalable as you grow.</h3>

----

## Durable and suspendable RPC handlers

<img src="img/overview/durable_handlers.png" width="500" style={{float: 'right', marginLeft: '20px'}}/>

Write RPC handlers that **execute reliably** by **recovering partial progress** on failures, via *durable execution*.
No need for manual retries and recovery logic.

Handlers may be **long-running** and **suspend during async/await**, e.g., when waiting for RPC responses and  events, or when sleeping.

**Reliable service-to-service RPC & messaging**: Persistent channels and duplicate-free retries.

<div style={{clear: 'both'}}></div>

----

## Stateful and Serverless

<img src="img/overview/stateful_serverless.png" width="500" style={{float: 'left', marginRight: '20px'}}/>

Shard RPC handlers and **attach long-lived k/v state**. State **changes commit atomically** with handler completion, for easy correctness.

**Deploy handlers on FaaS (AWS Lambda)**. Restate pushes messages and state into the functions, for efficient stateful serverless logic.

Create **stateful serverless workflows**, as if writing reliable long-running processes but run them on FaaS.

<div style={{clear: 'both'}}></div>

----

## Infrastructure Swiss Army Knife

<img src="img/overview/infra_toolbox.png" width="400" style={{float: 'right', marginLeft: '20px'}}/>

Restate is an event broker on steroids and adds additional capabilities to each handler invocation:

**Reliable RPC/messaging, k/v storage, service discovery, durable execution, rich OpenTelemetry tracing, and scheduled actions**.

All in one simple package.

<div style={{clear: 'both'}}></div>

----

## Single Binary that runs everywhere

<img src="img/overview/single_binary.png" width="400" style={{float: 'left', marginRight: '20px'}}/>

Restate comes as a **single binary** that runs **without any dependencies**, and with a small resource footprint. It runs as well on your laptop as it does in the cloud.

Restate is built for modern cloud architectures and works seamlessly with services **standalone**, on **FaaS** *(AWS Lambda)*, and as scale-out deployments on container engines like **Kubernetes**.

<div style={{clear: 'both'}}></div>

----

## Observability out-of-the box

<img src="img/overview/tracing.png" width="400" style={{float: 'right', marginLeft: '20px'}}/>

Restate generates **OpenTelemetry traces** and **call trees** for services, **without any code or configuration**.

Restate's unique way of managing inter-service communication and durable execution together means that it can generate detailed observability data right out of the box.


<div style={{clear: 'both'}}></div>

----

## Built for low-latency durable execution

<img src="img/overview/low_latency.png" width="400" style={{float: 'left', marginRight: '20px'}}/>

Restate is built as a **low-latency message system**, around a sharded command log that drives all features, including communication, durable execution, and state updates.

Serve end-user requests with durable services.
