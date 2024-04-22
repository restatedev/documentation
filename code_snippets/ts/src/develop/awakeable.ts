import * as restate from "@restatedev/restate-sdk";

const service = restate.service({
    name: "Awakeable",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_create>
            const awakeable = ctx.awakeable<string>();
            const awakeableId = awakeable.id

            await ctx.run(() => triggerTaskAndDeliverId(awakeableId));

            const payload = await awakeable.promise;
            // <end_create>

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