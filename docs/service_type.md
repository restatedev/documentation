---
sidebar_position: 7
---

# Service type

Restate provides different state semantics and concurrency properties for services, that you can choose from when defining the service.

Services can be categorized in three different types:

1. **Keyed service**: All service invocations are sharded on a user-defined key.
2. **Singleton service**: All service invocations are executed serially, and the state is shared among every invocation.
3. **Unkeyed service**: All service invocations run in parallel, and there is not state shared among invocations.

To define the service type and key, check the [service contract](./service_contract.md) documentation.

## Keyed service

Keyed services allows to shard state and workload by a user-defined key. Each key will have its own invocations queue and its own subset of the state. There is at most one concurrent invocation per key, but there can be multiple invocations to the same service with different keys executing at the same time.

You can think to a keyed service as a class, and a service instance as object instance of that class. The key is the field that **uniquely** identifies that instance, and state entries are the other fields of that class.

A common use case for keyed services is to model an entity of your application. For example, a `CustomerService` could model a customer, where the key is the customer id card number, the state defines the properties of the customer and the methods define the operations on it. 

### Ordering guarantees

Because keyed services are executed serially on a key basis, it means that invocations will execute in the same order they're enqueued. For example, assume the following code exists in `ServiceA`:

```typescript
const client = new ServiceB(restateContext);
await restateContext.oneWayCall(() =>
  client.do(TestRequest.create({ key: "Pete", number: 1 }))
);
await restateContext.oneWayCall(() =>
  client.do(TestRequest.create({ key: "Pete", number: 2 }))
);
```

It is guaranteed that the invocation with `number: 1` will be executed before the invocation with `number: 2`. It is not guaranteed though that invocation `number: 2` will be executed immediately after invocation `number: 1`, as any other service, or a call from the ingress, could interleave these two calls enqueuing a third one.

### Common pitfalls

You should take into account some of the limitations of keyed services when designing your applications:

* Time-consuming operations, such as sleep, lock the service instance for the entire operation, hence they won't allow other enqueued invocations to be executed.
* Keyed service invocations can produce deadlocks when using request/response calls. When this happens, the keys remain locked and the system can't process any more requests. In this situation you'll have to unblock the keys manually by [cancelling invocations](./deployment-operations/manage-invocations.md#cancel-an-invocation). Some example cases:
  * Cross deadlock between service A and B: A calls B, and B calls A, both using same keys.
  * Cyclical deadlock: A calls B, and B calls C, and C calls A again.

## Singleton service

Singleton services are essentially like keyed service where the key is always the same, meaning that every invocation will access the same state and will be enqueued in the same queue.

Carefully ponder whether a service should be a singleton, given it executes all the invocations serially. If not properly used, it can end up being a quite significant source of resource contention for your application.

## Unkeyed service

Unkeyed services have no invocation queue, meaning invocations are executed as soon as they're received without any concurrency and ordering guarantee.

You should not use state in unkeyed services, as all the stored state will inaccessible forever after the end of the invocation.

Because unkeyed services don't lock any resource, they are a good fit for long running workflows with many time-consuming operations such as sleeps, or as a coordinator to invoke other keyed services.
