import {GreeterClientImpl, GreetRequest} from "../generated/proto/greeter";
import * as restate from "@restatedev/restate-sdk";

export class ServiceCommunication {
    async requestResponseCall() {
        const ctx = restate.useKeyedContext(this);

        // <start_request_response>
        const client = new GreeterClientImpl(ctx.grpcChannel());
        const greeting = await client.greet(
            GreetRequest.create({name: "Restate"})
        );
        // <end_request_response>
    }
    async oneWayCall() {
        const ctx = restate.useKeyedContext(this);

        // <start_one_way>
        const client = new GreeterClientImpl(ctx.grpcChannel());
        await ctx.grpcChannel().oneWayCall(() =>
            client.greet(GreetRequest.create({name: "Restate"}))
        );
        // <end_one_way>
    }

    async delayedCall() {
        const ctx = restate.useKeyedContext(this);

        // <start_delayed>
        const client = new GreeterClientImpl(ctx.grpcChannel());
        await ctx.grpcChannel().delayedCall(() =>
            client.greet(GreetRequest.create({ name: "Restate" })),
            5000
        );
        // <end_delayed>

        return {};
    }
}