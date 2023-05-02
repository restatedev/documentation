---
sidebar_position: 1
description: "Get an idea of what a Restate Typescript service looks like."
---

# Overview

Restate offers a Typescript SDK to author Restate services using Typescript.

:::tip
To get started quickly, have a look at our [Typescript service template](https://github.com/restatedev/node-template)!
:::

## Example of a service
Below is an example of a Restate Typescript service to get a better understanding of the potential end result. 

This example shows a greeter service comprising of two methods:
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

Initially, the required imports, including the Restate SDK, are imported.

Then the gRPC service is implemented as defined in the Protobuf service contracts.
Within the method, the Restate context is retrieved, enabling state-based operations such as getting and setting state. 

Finally, the Restate server is set up to serve both methods of the greeter service.
The server listens on port 8000 for incoming connections and requests.

Now that you have a high-level idea of what a Restate service might look like, let's dive into the details! 