import * as restate from "@restatedev/restate-sdk";

export const greeterService = restate.service({
  name: "greeterService",
  handlers: {
    greet: async (ctx: restate.Context, request: { greeting?: string }) => {
      return `Hello ${request.greeting}`;
    },
  },
});

export const greetCounterObject = restate.object({
  name: "greetCounterObject",
  handlers: {
    greet: async (
      ctx: restate.ObjectContext,
      request: { greeting?: string }
    ) => {
      let count = (await ctx.get<number>("count")) ?? 0;
      count++;
      ctx.set("count", count);
      return count;
    },
  },
});
