import * as restate from "@restatedev/restate-sdk";

const service = restate.service({
  name: "DurableTimers",
  handlers: {
    greet: async (ctx: restate.Context, name: string) => {
      // <start_here>
      await ctx.sleep(10_000);
      // <end_here>
    },
  },
});
