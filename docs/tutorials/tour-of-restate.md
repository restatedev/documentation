---
sidebar_position: 1
description: "Discover and learn Restate's key features."
---

# A Tour of Restate


**This is work in progress...**

To get you started with Restate, this tutorial will help you develop an end-to-end example, covering all important Restate features.
After this tutorial,
you should have a firm understanding of how Restate can help you
and feel comfortable to tackle your next application on your own.

In essence, Restate is a tool that makes it easier to develop distributed applications. Distributed applications are applications that are decomposed into several independent services (microservices) that talk to each other. Each service does a specific set of tasks and communicates with other services.

In this tutorial, you implement a ticket reservation application for a theatre. You can see it as a subset of the services of a larger e-commerce application.
Users can add tickets for specific seats to their shopping cart. After a ticket has been added, the seat is reserved for 15 minutes. If it hasn't been bought and paid within that time interval, then it becomes available again to other users.

As we go, you will discover how Restate can help you with some intricacies in this application.

## 🚀 Let's get started!

Clone the github repo of the tour of Restate tutorial 

Let's run the app 

Run the runtime

Do the discovery 

Call some of the services and see the BoolValue response.

Starting point: 
- Skeleton of the applications. No methods implemented but just empty responses. 
- Only the ticket service and the user session service. The checkout service will be added later.

Explain the layout of the project.

## Suspendable synchronous communication
The first thing we implement is service-to-service communication, so one service sending a request to another one. 
The `addTicket` method of the user session will call the `reserve` method of the ticket service.

### Implementing synchronous calls
The first type of call that we do is an sync call, where we do not wait for the response of the request.

Let's have a look at how to do this in Restate:
```typescript
const ctx = restate.useContext(this);
const ticketServiceClient = new TicketServiceClientImpl(ctx);
const success = await ticketServiceClient.reserve(
  Ticket.create({ ticketId: request.ticketId })
);
```
The first thing you need to do in any method that interacts with Restate, is retrieve the `RestateContext`.
This is the entrypoint of all communication with the runtime. 
You can retrieve the `RestateContext` in your method as follows:
```   typescript
const ctx = restate.useContext(this);
```

Once the `RestateContext` has been retrieved, we can call the other service.
The first line we see is: 

```typescript
const ticketServiceClient = new TicketServiceClientImpl(ctx);
```

This line loads the `proto-ts` client that was generated when we ran `npm run proto`.
We can now use this client to call the `reserve`  method of the ticket service as follows:

```typescript
const success = await ticketServiceClient.reserve(
  Ticket.create({ ticketId: request.ticketId })
);
```
The reserve method returns a BoolValue that is equal to true if the ticket reservation was successful.

### Testing communication
Show that this works.
- Run both services in separate terminals
- Then call the user session service addTicket method.
- Show the logs of both services.

### What happens under-the-hood
Explain what happens. 
- Connection is setup by runtime 
- Request is send over that connection to the addTicket method of the user session service
- The user session service then sends a request to the ticket service. It sends this request over the open connection to the runtime. 
- The response of the other service can take long so the user session service suspends. 
- The runtime forwards the connection to the ticket service. (Note: the runtime makes sure these requests are done and takes care of retries. The details on retries will be covered later. )
- Once the runtime has received the response, it wakes up the user session service. 
- The code gets replayed up to the point of the request. And then the rest of the method gets executed.

The suspension mechanism of Restate is especially beneficial if you run with AWS Lambda.
You can do synchronous calls without paying for the idle time when waiting for a response.
But also for long-running services this system can be helpful because Restate makes sure that an invocation is durably recorded and can survive any failures.

To show how this works in practice and mimic that the ticket service is doing some processing for a certain amount of time, we can add a sleep call to the `reserve` method of the ticket service.
```typescript
await setTimeout(5000);
```
Then run the example and call the `addTicket` method, which calls the `reserve` method.
Show in the logs that the `addTicket` method gets suspended for 5 seconds.

:::note
This is not the proper way to sleep in a Restate application! The Restate SDK offers you a way to do sleeps that are suspendable! Read on to find out how to do this.
:::

Explain how replay works.

Maybe include a little video demo of knative on minikube to show how containers are spun up and torn down.

## Reliable async communication without queues

The calls we did in the previous section always waited for a response to the request (albeit in suspended mode). 
It is also possible to do async calls via Restate, where you do not wait for the response.

The syntax is very similar. All we need to do is wrap the call with `inBackground`, as follows:
```   typescript
const ctx = restate.useContext(this);
const ticketServiceClient = new TicketDbServiceClientImpl(ctx);
await inBackground(() =>  ticketServiceClient.reserve(
  Ticket.create({ ticketId: request.ticketId })
));
```



Show that this works.
- Run both services in separate terminals 
- Then call the usersession service addTicket method. 
- Show the logs of both services. 

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
await inBackground(() => ticketService.unreserve(), 15*60*1000);
```

Put the delayed call on a low duration and show that it takes place. 


## Concurrency
- writing the proto files
  => how to write them, keyed/unkeyed/singleton, key specification

If you have a keyed service, you have the guarantee that there is at most one concurrent invocation per key.
If you have an unkeyed service, then
In a singleton service, there is always at most one invocation going on. Y

Add checkout service


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

### Runtime configuration
  => configuring retries, retryWithBackoff,

  => show in the logs


### SDK utilities for retries

```typescript
const doPayment = async () => stripe.call(idempotencyKey, amount);
const success: boolean = await RestateUtils.retryExceptionalSideEffectWithBackoff(ctx, doPayment, 100, 500)
```

## Observability with Jaeger
Enabling tracing


Having a look at the traces. 


## 🏁 The end
What did we cover:
- reliable synchronous calls that can be suspended
- asynchronous calls without the need for queues
- suspensions for external communication
- awakeables: how to do tasks in external systems and resume processing
- durable timers for sleep or for calling other services
- concurrency guarantees of restate for keyed/unkeyed/singleton services
- persistent application state
- state introspection
- storing the results of non-deterministic operations or external calls as side effects
- resiliency: retries
- observability with Jaeger

## Next steps
This tutorial did not cover anything related to deployment. 
In this tutorial, we ran the services as long-running services in Docker containers.
But Restate services can run with minimal changes on AWS Lambda. 

Have a look at these follow-up tutorials:
- Deployment on AWS Lambda
- Deployment on Kubernetes (minikube)




