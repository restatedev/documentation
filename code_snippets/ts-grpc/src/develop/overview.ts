import * as restate from "@restatedev/restate-sdk";
import {
    Greeter,
    GreetRequest,
    GreetResponse,
    protoMetadata,
} from "../generated/proto/example";

// Implementation of the gRPC service
export class GreeterService implements Greeter {
    async greet(request: GreetRequest): Promise<GreetResponse> {
        // Retrieving the Restate context
        const ctx = restate.useKeyedContext(this);
        return GreetResponse.create({ greeting: `Hello ${request.name}` });
    }

    async countGreetings(request: GreetRequest): Promise<GreetResponse> {
        // Retrieving the Restate context
        const ctx = restate.useKeyedContext(this);

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
// The endpoint will be attached to port 8000 for connections and requests.
restate
    .endpoint()
    .bindService({
        descriptor: protoMetadata,
        service: "Greeter",
        instance: new GreeterService(),
    })
    .listen();