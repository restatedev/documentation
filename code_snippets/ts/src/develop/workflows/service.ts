import * as restate from "@restatedev/restate-sdk";
import { SignUpWorkflow } from "./signup";
import { ObjectContext } from "@restatedev/restate-sdk";

export default restate.object({
  name: "user-management",
  handlers: {
    // <start_here>
    signUpUser: async (ctx: ObjectContext, email: string) => {
      // focus(1:3)
      const result = await ctx
        .workflowClient<SignUpWorkflow>({ name: "signup" }, "someone")
        .run({ email });
    },
    queryStatus: async (ctx: ObjectContext) => {
      // focus(1:3)
      const status = await ctx
        .workflowClient<SignUpWorkflow>({ name: "signup" }, "someone")
        .getStatus();
    },
    // <end_here>
  },
});
