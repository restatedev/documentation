import * as restate from "@restatedev/restate-sdk";
import {WorkflowContext, WorkflowSharedContext} from "@restatedev/restate-sdk";

// <start_here>
export const signUpWorkflow = restate.workflow({
    name: "sign-up-workflow",
    handlers: {
        run: async (ctx: WorkflowContext, params: { name: string; email: string }) => {
            const { name, email } = params;
            const userId = ctx.key;

            ctx.set("stage", "Creating User");

            await ctx.run(() => createUserEntry({ userId, name }));

            ctx.set("stage", "Email Verification");

            const secret = await ctx.run(async () => crypto.randomUUID());
            await ctx.run(() => sendEmailWithLink({ email, secret }));

            try {
                const clickSecret = await ctx.promise<string>("email-link");
                if (clickSecret !== secret) {
                    throw new restate.TerminalError("Wrong secret from email link");
                }
            } catch (err: any) {
                ctx.set("stage", `Verification failed: ${err.message}`);
                return;
            }

            ctx.set("stage", "User verified");
        },

        getStage: (ctx: WorkflowSharedContext) => {
            return ctx.get("stage");
        },

        approveEmail: async (ctx: WorkflowSharedContext, request: { secret: string }) => {
            await ctx.promise<string>("email-link").resolve(request.secret);
        },

        rejectEmail: async (ctx: WorkflowSharedContext) => {
            await ctx.promise<string>("email-link").reject("User aborted verification");
        },

        handleKafkaEvent: async (ctx: WorkflowSharedContext, event: KafkaEvent) => {
            await ctx.promise<string>("email-link").resolve(event.message);
        },
    }
});
// <end_here>

type KafkaEvent = { topic: string, message: string };

function sendEmailWithLink({ email, secret }: { email: string; secret: string }) {
    // send email with link
}

function createUserEntry({ userId, name }: { userId: string; name: string }) {
    // create user entry
}