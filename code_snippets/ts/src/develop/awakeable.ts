import * as restate from "@restatedev/restate-sdk";

const service = restate.service({
    name: "Awakeable",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_here>
            // <mark_1>
            const awakeable = ctx.awakeable<string>();
            const awakeableId = awakeable.id
            // </mark_1>

            // <mark_2>
            await ctx.run(() => triggerTaskAndDeliverId(awakeableId));
            // </mark_2>

            // <mark_3>
            const payload = await awakeable.promise;
            // </mark_3>
            // <end_here>

            // <start_resolve>
            ctx.resolveAwakeable(awakeableId, "hello");
            // <end_resolve>

            // <start_reject>
            ctx.rejectAwakeable(awakeableId, "my error reason");
            // <end_reject>
        },
    }
})

function triggerTaskAndDeliverId(awakeableId: string){
    return "123";
}