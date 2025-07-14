import { Context, WorkflowContext } from "@restatedev/restate-sdk";

// <start_zod>
import * as restate from "@restatedev/restate-sdk";
import { z } from "zod";
import { serde } from "@restatedev/restate-sdk-zod";

const Greeting = z.object({
    name: z.string(),
});

const GreetingResponse = z.object({
    result: z.string(),
});

const greeter = restate.service({
    name: "Greeter",
    handlers: {
        greet: restate.handlers.handler(
            { input: serde.zod(Greeting), output: serde.zod(GreetingResponse) },
            async (ctx: restate.Context, { name }) => {
                return { result: `You said hi to ${name}!` };
            },
        ),
    },
});
// <end_zod>

// <start_service_definition>
const myService = restate.service({
  name: "MyService",
  handlers: {
    myHandler: restate.handlers.handler(
      {
        // Set the input serde here
        input: restate.serde.binary,
        // Set the output serde here
        output: restate.serde.binary,
      },
      async (ctx: Context, data: Uint8Array): Promise<Uint8Array> => {
        // Process the request
        return data;
      }
    ),
  },
});
// <end_service_definition>

let ctx: WorkflowContext = undefined as unknown as WorkflowContext;
let input = new Uint8Array();

// <start_client>
ctx.serviceClient(myService).myHandler(
  input,
  restate.rpc.opts({
    input: restate.serde.binary,
    output: restate.serde.binary,
  })
);
// <end_client>

async function tryOut(ctx: restate.ObjectContext){
    // <start_actions>
    ctx.get("my-binary-data", restate.serde.binary);
    ctx.set("my-binary-data", new Uint8Array(), restate.serde.binary);

    ctx.awakeable(restate.serde.binary);

    await ctx.run("my-side-effect", () => new Uint8Array(), {
        serde: restate.serde.binary,
    });
    // <end_actions>
}

