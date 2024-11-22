import * as restate from "@restatedev/restate-sdk";

const service = restate.service({
  name: "Awakeable",
  handlers: {
    greet: async (ctx: restate.Context, name: string) => {
      // <start_here>
      // <mark_1>
      const { id, promise } = ctx.awakeable<string>();
      // </mark_1>

      // <mark_2>
      await ctx.run(() => triggerTaskAndDeliverId(id));
      // </mark_2>

      // <mark_3>
      const payload = await promise;
      // </mark_3>
      // <end_here>

      // <start_resolve>
      ctx.resolveAwakeable(id, "hello");
      // <end_resolve>

      // <start_reject>
      ctx.rejectAwakeable(id, "my error reason");
      // <end_reject>
    },
  },
});

function triggerTaskAndDeliverId(awakeableId: string) {
  return "123";
}
