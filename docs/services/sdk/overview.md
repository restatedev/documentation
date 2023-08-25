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

## Example of a service
Below is an example of a Restate Typescript service to get a better understanding of the potential end result.

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
        return GreetResponse.create({ greeting: `Hello ${request.name}` });
    }

    async countGreetings(request: GreetRequest): Promise<GreetResponse> {
        // Retrieving the Restate context
        const restateContext = restate.useContext(this);

        // State management
        let seen = (await restateContext.get<number>("seen")) || 0;
        seen += 1;
        await restateContext.set("seen", seen);

        // Return the final response
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
.listen(8000);
```

A Restate service is implemented as defined in the Protobuf service contracts, that are shown below.
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

To understand the Restate-specific parts of this Protobuf definition, have a look at the documentation here.

Now that you have a high-level idea of what a Restate Typescript service might look like, let's dive into the details!
