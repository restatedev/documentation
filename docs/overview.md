---
id: Overview
title: Welcome to Restate
[//]: # (sidebar_position: 1 --> this is now set by sidebars.js)
slug: /
description: "Documentation overview"
---

Build applications with **distributed durable async/await**.
Write RPC and event handlers, and Restate makes them reliable by adding durability to invocations, promises, communication and state.
Restate handles durability and recovery (including recovering partial handler executions).

![Restate overview](/img/overview/restate_overview.svg)

# Building blocks

![Building blocks](/img/overview/building_blocks.png)

# Examples

* [**Stateful serverless applications**](https://github.com/restatedev/examples/tree/main/typescript/hello-world-lambda): Create one (or a few) functions with stateful business logic and run them on any FaaS.
* **Low-latency workflows**: Like payments processing, inventory keeping, user management, billing, … Including cases where you want high consistency, but hadn’t thought of workflows before, due to latency
    * [Keeping track of a shopping cart and ticket inventory](https://github.com/restatedev/examples/tree/main/typescript/ticket-reservation)
    * [Consistent payment processing via Stripe-style concurrent API](https://github.com/restatedev/examples/tree/main/typescript/payment-api)
* [**Microservice orchestration**](https://github.com/restatedev/examples/tree/main/typescript/ecommerce-store): Writing orchestration functions as simple promise-based code where you previously needed to create complex state machines and handle state transitions durability.

<div id="container">
<div id="overviewButtonDiv"><a id="quickstartButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="/quickstart" role="button">>> Quickstart</a></div>
<div id="overviewButtonDiv"><a id="tourButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="/tour" role="button">>> Tour of Restate</a></div>
<div id="overviewButtonDiv"><a id="examplesButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="https://github.com/restatedev/examples" role="button">>> Examples</a></div>
</div>
