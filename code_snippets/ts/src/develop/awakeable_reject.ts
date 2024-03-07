import * as restate from "@restatedev/restate-sdk";

const router = restate.router({
    greet: async (ctx: restate.Context, name: string) => {
        const id = "some-string";

        // <start_here>
        ctx.rejectAwakeable(id, "my error reason");
        // <end_here>
    },
})