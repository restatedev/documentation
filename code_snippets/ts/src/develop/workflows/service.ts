import * as restate from "@restatedev/restate-sdk";
import { SignUpWorkflow } from "./signup";
import { Context } from "@restatedev/restate-sdk";

export default restate.service({
  name: "user-management",
  handlers: {
    // <start_here>
    signUpUser: async (ctx: Context, email: string) => {
      // !focus(1:3)
      const result = await ctx
        .workflowClient<SignUpWorkflow>({ name: "signup" }, "someone")
        .run({ email });
    },
    queryStatus: async (ctx: Context) => {
      // !focus(1:3)
      const status = await ctx
        .workflowClient<SignUpWorkflow>({ name: "signup" }, "someone")
        .getStatus();
    },
    // <end_here>
  },
});
