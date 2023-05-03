---
sidebar_position: 4
---

# State

# NOTE: COPIED OVER FROM POC DOCS - REWORK THIS!

Restate brings state to serverless applications, thanks to its built-in state support.


## Built-in key value store

Every service instance owns a key value store, where both keys and values can store arbitrarily complex state.
With Restate, you don't need to use a database, as your data will safely be stored and handled by the Restate runtime.

Services can access the key value store using the SDK's APIs.
They offer the usual get/set/clear methods.
For more details, look at the SDK documentation.
There is no constraint on how to define state, nor how to serialize and deserialize it.

Service instances live as long as there is state associated to it.
Hence, it is a good practice to expose methods in your service to cleanup the key value store.
This prevents that dangling state is persisted forever.