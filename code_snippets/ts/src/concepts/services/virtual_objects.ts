import * as restate from "@restatedev/restate-sdk";
import {
  handlers,
  ObjectContext,
  ObjectSharedContext,
} from "@restatedev/restate-sdk";

// <start_here>
// <mark_1>
export const greeterObject = restate.object({
  // </mark_1>
  name: "greeter",
  handlers: {
    // <mark_1>
    // <mark_3>
    greet: async (ctx: restate.ObjectContext, req: { greeting: string }) => {
      // </mark_3>
      const name = ctx.key;
      // </mark_1>
      // <mark_2>
      let count = (await ctx.get<number>("count")) ?? 0;
      // </mark_2>
      count++;
      // <mark_2>
      ctx.set("count", count);
      // </mark_2>
      return `${req.greeting} ${name} for the ${count}-th time.`;
    },

    // <mark_1>
    // <mark_3>
    ungreet: async (ctx: restate.ObjectContext) => {
      // </mark_3>
      const name = ctx.key;
      // </mark_1>
      // <mark_2>
      let count = (await ctx.get<number>("count")) ?? 0;
      // </mark_2>
      if (count > 0) {
        count--;
      }
      // <mark_2>
      ctx.set("count", count);
      // </mark_2>
      return `Dear ${name}, taking one greeting back: ${count}.`;
    },

    // <mark_4>
    // <mark_1>
    getGreetCount: handlers.object.shared(
      async (ctx: restate.ObjectSharedContext) => {
        // </mark_1>
        // <mark_2>
        return (await ctx.get<number>("count")) ?? 0;
        // </mark_2>
      }
    ),
    // </mark_4>
  },
});

restate.endpoint().bind(greeterObject).listen();
// <end_here>
