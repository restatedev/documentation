import * as restate from "@restatedev/restate-sdk";

export const router = restate.object({
  name: "State",
  handlers: {
    greet: async (ctx: restate.ObjectContext, name: string) => {
      // <start_statekeys>
      const stateKeys = ctx.stateKeys();
      // <end_statekeys>

      // <start_get>
      const myString = (await ctx.get<string>("my-string-key")) ?? "my-default";
      const myNumber = (await ctx.get<number>("my-number-key")) ?? 0;
      // <end_get>

      // <start_set>
      ctx.set("my-key", "my-new-value");
      // <end_set>

      // <start_clear>
      ctx.clear("my-key");
      // <end_clear>

      // <start_clear_all>
      ctx.clearAll();
      // <end_clear_all>
    },
  },
});
