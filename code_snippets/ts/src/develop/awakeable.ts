import * as restate from "@restatedev/restate-sdk";

const service = restate.service({
    name: "Awakeable",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_create>
            // 1. Generate the ID
            const awakeable = ctx.awakeable<string>();
            const id = awakeable.id

            // 2. Send the ID to some external system
            // ... here goes your custom code to send the ID ...

            // 3. Wait for the ID to returned and retrieve the payload
            const result = await awakeable.promise;
            // <end_create>

            // <start_resolve>
            ctx.resolveAwakeable(id, "hello");
            // <end_resolve>

            // <start_reject>
            ctx.rejectAwakeable(id, "my error reason");
            // <end_reject>
        },
    }
})