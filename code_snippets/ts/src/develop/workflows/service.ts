import * as restate from "@restatedev/restate-sdk";
import {SignUpWorkflow} from "./signup";

const signUpWorkflow: SignUpWorkflow = {name: "signup"};

export default restate.object({
    name: "user-management",
    handlers: {
        setup: async (ctx: restate.ObjectContext, email: string) => {
            await ctx.workflowClient(signUpWorkflow, ctx.key)
                .run({email});
        },
    }
})