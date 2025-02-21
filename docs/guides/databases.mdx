---
title: "Databases and Restate"
description: "Learn when and how to use databases in combination with Restate."
pagination_next: null
pagination_prev: null
---

# Databases and Restate

Restate is not only a system for resilience and durability in communication and orchestration, it can also store data like a database system, to enable writing long-lived stateful logic with strong out-of-the-box resilience.

To avoid confusion: In this page, we refer to the type of state that outlives a single workflow or durable handler execution, and that uses Restate’s [Virtual Objects](/concepts/services#virtual-objects). This is a feature not available in typical workflow systems or durable execution frameworks.

This guide discusses thoughts on when to use Restate for that type of state, when to use a database, and how to integrate Restate and databases.

## What state to store in Restate, what to store in databases

State stored directly in Restate ([Virtual Objects](/concepts/services#virtual-objects)) has a set of advantages:
- **Ultra robust**: No coordination between systems is needed. Instead, state access/updates directly participate in the durable execution logic (go through the same consensus log), making the state always aligned with the business logic: no lost updates, duplications of state changes, stale views of state, etc.
- **Simple correctness model**: The single-writer-per-key and linearizable consistency model means developers don’t need to worry about locks, race conditions, dirty reads, change visibility, zombie processes, etc.
- **Efficient**: Computation and access patterns to state align naturally, you cannot get into situations where multiple function executions try to access/update the same database entry and contend on locks or interfere with each other's transaction.
No write amplification through separate durability in an external system (instead state is simply committed with the durable execution journal data).
- **Serverless**: when Restate invokes a handler, it attaches the relevant state to the request. On serverless, for example AWS lambda, this means your state is locally available when the function executes, no access delays, synchronization, wait times, etc.
- **No additional dependency** - the K/V store is integrated in the core of Restate. You don't need to do anything extra to start using state when developing locally, or migrating the Restate app to cloud/production.

State stored directly in Restate (Virtual Objects) has some limitations:
- K/V interface with single-key transactions (though a single key can store a document with flexible structures)
- SQL is supported only for analytics / introspection, not for updates/transactions.
- Modifiable only from the Virtual Object, not from other services. Any modification needs to be sent as a request to the Virtual Object.
- While state can be exported in a standard way (psql client), it is managed by a less standard system, compared to some databases.

## When to use which?

Use a database:
- When you need complex access patterns, full SQL, text search, time-series analysis, etc.
- For core business data, like your user database, products database, history of transactions, etc. that you want to access from other services as well

Use Restate for any state requiring tight integration with function logic, resilience, and correctness:
- State that is part of transactional state machines (payment status, activation status, ...)
- Session state (shopping cart, ongoing orders, LLM context, AI agent context, ...)
- State that is part of distributed orchestration and coordination (e.g., versions/life-cycle of shared resources, transaction IDs, reference counts, distributed locks/semaphores/leases, ...)
- Agents / Digital-twins (agent/twin memory and context)
- State in event processing pipelines (aggregates, joins)
- State of control planes (desired cluster status, resource references, ...)
- Consistent state/metadata overlay over eventual consistent infra

## How to interact with Databases from Restate

This set of examples shows various patterns to access databases from Restate handlers.

```ts https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/database/main.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/patterns-use-cases/src/database/main.ts
```

### Two-phase commit

```ts https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/database/2phasecommit.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/patterns-use-cases/src/database/2phasecommit.ts
```

## Running the examples

This is purely optional, the example code and comments document the behavior well.
Running the example can be interesting, though, if you want to play with specific failure scenarios, like pausing/killing processes at specific points and observe the behavior.

[Check out the readme of the example on how to run the example.](https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/README.md#database-interaction-patterns)