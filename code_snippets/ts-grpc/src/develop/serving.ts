import {GreeterService} from "./overview";
import {protoMetadata} from "../generated/proto/greeter";
import * as restate from "@restatedev/restate-sdk";
import * as http2 from "http2";

// <start_endpoint>
restate
    .endpoint()
    .bindService({
        descriptor: protoMetadata,
        service: "Greeter",
        instance: new GreeterService(),
    })
    .listen(9080);
// <end_endpoint>

// <start_custom_endpoint>
const http2Handler = restate
    .endpoint()
    .bindService({
        descriptor: protoMetadata,
        service: "Greeter",
        instance: new GreeterService(),
    })
    .http2Handler()
const httpServer = http2.createServer(http2Handler);
httpServer.listen(9080);
// <end_custom_endpoint>

// <start_lambda>
export const handler = restate
    .endpoint()
    .bindService({
        descriptor: protoMetadata,
        service: "Greeter",
        instance: new GreeterService(),
    })
    //highlight-next-line
    .lambdaHandler();
// <end_lambda>