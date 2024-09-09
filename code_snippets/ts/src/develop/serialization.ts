import * as restate from "@restatedev/restate-sdk";
import {Context, WorkflowContext} from "@restatedev/restate-sdk";

// <start_service_definition>
const myService = restate.service({
    name: "MyService",
    handlers: {
        myHandler: restate.handlers.handler({
            // Set the input serde here
            input: restate.serde.binary,
            // Set the output serde here
            output: restate.serde.binary
        }, async (ctx: Context, data: Uint8Array): Promise<Uint8Array> => {
            // Process the request
            return data;
        }),
    },
});
// <end_service_definition>

let ctx: WorkflowContext = undefined as unknown as WorkflowContext;
let input = new Uint8Array();

// <start_client>
ctx.serviceClient(myService)
    .myHandler(
        input,
        restate.rpc.opts({
            input: restate.serde.binary,
            output: restate.serde.binary
        })
    );
// <end_client>

// <start_state>
ctx.get("my-binary-data", restate.serde.binary);
ctx.set("my-binary-data", new Uint8Array(), restate.serde.binary);
// <end_state>

// <start_awakeable>
ctx.awakeable(restate.serde.binary)
// <end_awakeable>

// <start_run>
ctx.run("my-side-effect", () => new Uint8Array(), { serde: restate.serde.binary });
// <end_run>