import * as restate from "@restatedev/restate-sdk";
import {myGreeterApi, myGreeterApiType} from "./service_communication";

const router = restate.router({
    greet: async (ctx: restate.Context, name: string) => {
        // start_here
        // option 1: use only types and supply service name separately
        ctx.send<myGreeterApiType>({path: "greeter"}).greet("Pete");

        // option 2: use full API spec
        ctx.send(myGreeterApi).greet("Pete");
        // end_here
    },
})