---
sidebar_position: 1
description: "Discover and learn Restate's key features."
---

# A Tour of Restate
To get you started with Restate, this tutorial will help you develop an end-to-end example, covering all important Restate features.
After this tutorial,
you should have a firm understanding of how Restate can help you
and feel comfortable to tackle your next application on your own.

In essence, Restate is a tool that makes it easier to develop distributed applications. Distributed applications are applications that are decomposed into several independent services (microservices) that talk to each other. Each service does a specific set of tasks and communicates to other services for its inputs and outputs. In this tutorial, we will develop such an application.

The application that we will be implementing is a ticket reservation application for a theatre. We will implement a subset of this e-commerce application.
The application allows a user to add tickets for specific seats to his shopping cart. After a ticket has been added, the seat is reserved for 15 minutes, and then it becomes available again to other users.

As we go, you will discover how Restate can help you with some intricacies in this application.

[//]: # (We will implement a ticket reservation example.
[//]: # (- get/set/clear state
[//]: # (- async calls
[//]: # (- retry with backoff
[//]: # (- delayed call
[//]: # (- side effects
[//]: # (- uuid creation for payment and saving that
[//]: # (
[//]: # (- all keyed services: no singleton/unkeyed
[//]: # (unkeyed service for checkout)

## 🚀 Let's get started!

Clone the github repo of the tour of Restate tutorial 

Let's run the app 

Run the runtime

Do the discovery 

Call some of the services 


## Reliable async communication without queues
Let's implement some of the methods. 

We have 2 services and let's make them call each other 
- user session: one method: addTicket()
- ticket manager: one method reserve()

And we want them to call each other. 
Call the second service from the first service async without a queue

First do the call async

```   typescript
const ctx = restate.useContext(this);
const ticketServiceClient = new TicketDbServiceClientImpl(ctx);
await inBackground(() =>  ticketServiceClient.reserve(
  Ticket.create({ ticketId: request.ticketId })
));
```

## Suspendable synchronous communication
Show that this works.
- Run both services in separate terminals
- Then call the usersession service addTicket method.
- Show the logs of both services.

Then say that we want to know if it was successful so make the call sync
```   typescript
const ctx = restate.useContext(this);
const ticketServiceClient = new TicketDbServiceClientImpl(ctx);
const reserveResult: ResultValue = await ticketServiceClient.reserve(
  Ticket.create({ ticketId: request.ticketId })
);
const success = reserveResult.value;
```

Show that this works.
- Run both services in separate terminals 
- Then call the usersession service addTicket method. 
- Show the logs of both services. 

All interaction goes through the Restate Context.

The Restate runtime is the one contacting the service. And when it does so, it has a connection to the service. So you in your service don't need to do anything to establish that connection.

## Suspendable async/await

Explain how the user session service gets suspended when it is waiting for the response of the ticket service.

Implement a sleep in the reserve method of the ticket service to show this.
```typescript
await setTimeout(5000);
```
Explain how this can help with serverless.

:::note
This is not the proper way to sleep in a Restate application! The Restate SDK offers you a way to do sleeps that are suspendable! Read on to discover how to do this. 
:::

Explain how replay works. 

Maybe include a little video demo of knative on minikube to show how containers are spun up and torn down. 

## Awakeables
In essence sync/async calls are about tying services together and executing workflows by having several services execute some tasks. The calls we were now talking about are executed in between Restate services. But what if you want to do a part of the tasks in an external service. For example, you want a Restate service to put a message on Kafka, have it ingested by a non-Restate service. Do some processing. And then invoke the Restate service again to continue its work. For this, you could use awakeables. This works similar as what is known as the callback task token pattern. You generate an ID. You supply that ID to the external service. Once the external service is done with the work, it sends the ID back to Restate. And when Restate receives the ID, it continues processing. 

So how can you do this with the Typescript SDK?

```typescript
const awakeable = ctx.awakeable<string>();

const id = awakeable.id

// send the ID to some external system

// Await on the ID to be send back to the runtime
const result = await awakeable.promise;
```

Calling `ctx.awakeable` gives you an object with two entries. A String ID and a promise. The promise gets resolved with a payload that the external service can attach to it. You need to supply the data return type when you create the awakeable. In this case, the return payload will be a String.

Similar to synchronous and asynchronous communication, the function is suspended while it is waiting on the return of the ID.

## Durable timers

### Suspendable sleep
But the way we were sleeping in the  ticket service does not make sense. Restate gives you sleep that also suspends.
```typescript
const ctx = restate.useContext(this);

await ctx.sleep(5000);
```

Show how the services are now both suspended During the sleep. Then the ticket one comes back. Then the user session service comes back. Then the response comes back. 

### Delayed calls
After a timeout we want the reserved ticket to become available again. What we want to do there is implement a delayed call after a duration that expires the reservation and calls unreserve(). 
```typescript
await callAsync(() => ticketService.unreserve(), 15*60*1000);
```

Put the delayed call on a low duration and show that it takes place. 


## Concurrency
- writing the proto files
  => how to write them, keyed/unkeyed/singleton, key specification

If you have a keyed service, you have the guarantee that there is at most one concurrent invocation per key.
If you have an unkeyed service, then
In a singleton service, there is always at most one invocation going on. You don't have keys. So

## Persistent application state
In our user session we actually also want to keep track of which tickets were reserved by the user. 

For this we can use application state. 

When the user calls the addTicket method, we also want it to save the ticket in the userSession shopping cart. We don't need a session database such as Redis for this. We can use the Restate application state to persistently store the application state. Currently we support key value state. 
To read the state, do the following

```typescript
const cart = Cart.fromCartData(await ctx.get<CartData>("cart"));
```

Then we add the ticket and set the state to the new value:

```typescript
cart.addToCart(request.ticketId);
ctx.set("cart", cart.toCartData())
```

Add a clear cart method with clear state:
```typescript
ctx.clear("cart")
```

## State introspection
Read the state via the CLI to check what is currently in the state. 


## Side effects
Because of the retries due to resiliency we sometimes need to save something.

```typescript
const stripe = StripeClient.get();

const idempotencyKey = await ctx.sideEffect<string>(async () => uuid());

await ctx.sideEffect<boolean>(async () => await stripe.call(idempotencyKey, amount));
```


## Resiliency
  => configuring retries, retryWithBackoff,

  => show in the logs


```typescript
const doPayment = async () => stripe.call(idempotencyKey, amount);
const success: boolean = await RestateUtils.retryExceptionalSideEffectWithBackoff(ctx, doPayment, 100, 500)
```


## Observability with Jaeger


## Next steps
follow up tutorials: Lambda & minikube




