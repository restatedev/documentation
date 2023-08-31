---
sidebar_position: 1
description: "Get an idea of what a Restate Typescript service looks like."
---

# Overview

Restate offers a Typescript SDK to author Restate services using Typescript.

:::tip
To get started quickly, use the [Typescript service template generator](https://github.com/restatedev/node-template-generator)!
:::

## Installation

Add the `@restatedev/restate-sdk` dependency to your NodeJS project to start developing Restate services.

The Typescript SDK uses the `protobufjs` and `ts-proto` dependencies to work with the Protobuf-generated Typescript code.
So add these as well to your project.

## APIs
Restate currently supports two Typescript APIs for implementing services: the handler API and the gRPC API.
The gRPC API requires you to specify the service contract (services, methods and data types) via a Protobuf definition.
The handler API does not require this. 

### Example of a service with the Handler API
Below is an example of a Typescript service with the Handler API.

This example shows a greeter service comprising two methods:
- `greet`: returns a greeting as a response without performing any additional operations.
- `countGreetings`: maintains a record of the number of times it has received a request for a given name.

```typescript
const doGreet = async (ctx: restate.RpcContext, name: string) => {
  return `Hello ${name}!`;
};

const doCountGreetings = async (ctx: restate.RpcContext, name: string) => {
  // Retrieve state; number of times this name was seen
  let seen = await ctx.get<number>("seen") || 0;
  seen += 1;
  // Set the incremented counter as the new state
  ctx.set("seen", seen);
  
  return `Hello ${name} for the ${seen}th time!`
}

// Create the Restate server to accept requests
restate
  .createServer()
  .bindKeyedRouter("greeter", restate.keyedRouter({
      greet: sayHello, countGreetings: doCountGreetings
  }))
  .listen(8080);
```

The app logic is implemented inside `doGreet` and `doCountGreetings`.
These functions have the `restate.RpcContext` as their first parameter. This context is used to interact with Restate (call other methods, retrieve state, etc.).
Then, the service is registered as a keyed service under the path `greeter`, and the `greet` and `countGreetings` routes are added.

###  Example of a gRPC service
Below is an example of a Typescript gRPC service.

This example shows a greeter service comprising two methods:
- `greet`: returns a greeting as a response without performing any additional operations.
- `countGreetings`: maintains a record of the number of times it has received a request for a given name.

```typescript
import * as restate from "@restatedev/restate-sdk";
import {
Greeter,
GreetRequest,
GreetResponse,
protoMetadata,
} from "./generated/proto/example";

// Implementation of the gRPC service
export class GreeterService implements Greeter {
    async greet(request: GreetRequest): Promise<GreetResponse> {
        // Retrieving the Restate context
        const ctx = restate.useContext(this);
        
        const client = new GreeterClientImpl(ctx);
        client.countGreetings(request);
        
        return GreetResponse.create({ greeting: `Hello ${request.name}` });
    }

    async countGreetings(request: GreetRequest): Promise<GreetResponse> {
        // Retrieving the Restate context
        const ctx = restate.useContext(this);

        // Retrieve state; number of times this name was seen
        let seen = (await ctx.get<number>("seen")) || 0;
        seen += 1;
        // Set the incremented counter as the new state
        await ctx.set("seen", seen);

        return GreetResponse.create({
          greeting: `Hello ${request.name} for the ${seen}th time!`,
        });
    }
}

// Setting up the Restate server to serve the GreeterService methods.
// The server will listen on port 8000 for connections and requests.
restate
.createServer()
.bindService({
    descriptor: protoMetadata,
    service: "Greeter",
    instance: new GreeterService(),
})
.listen(8080);
```

The contract of the gRPC service is defined in the Protobuf service contracts, that are shown below.
Within the method, the Restate context is retrieved, enabling interaction with Restate (e.g. getting stating, calling other services).
Finally, the Restate server is set up to serve both methods of the greeter service.

This is what corresponding Protobuf definition would look like for this service:

```protobuf
syntax = "proto3";

package example;

import "dev/restate/ext.proto";

service Greeter {
  option (dev.restate.ext.service_type) = KEYED;

  rpc Greet(GreetRequest) returns (GreetResponse) {};

  rpc CountGreetings(GreetRequest) returns (GreetResponse) {};
}

message GreetRequest {
  string name = 1 [(dev.restate.ext.field) = KEY];
}

message GreetResponse {
  string greeting = 1;
}
```

To understand the Restate-specific parts of this Protobuf definition, have a look at the documentation [here](/services/service_type#restate-service-contract).

Now that you have a high-level idea of what a Restate Typescript service might look like, let's dive into the details!
