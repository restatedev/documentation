import * as restate from "@restatedev/restate-sdk";
import {TerminalError, WorkflowContext, WorkflowSharedContext} from "@restatedev/restate-sdk";

// <start_here>
const signUpWorkflow = restate.workflow({
    name: "sign-up-workflow",
    handlers: {
        run: async (ctx: WorkflowContext, user: User) => {
            const { id, name, email } = user;

            ctx.set("stage", "Creating User");
            await ctx.run(() => createUserEntry({ id, name }));

            ctx.set("stage", "Email Verification");
            const secret = ctx.rand.uuidv4();
            await ctx.run(() => sendEmailWithLink({ email, secret }));

            try {
                const clickSecret = await ctx.promise<string>("email-link");
                if (clickSecret !== secret) {
                    throw new TerminalError("Wrong secret from email link");
                }
            } catch (err: any) {
                ctx.set("stage", `Verification failed: ${err.message}`);
                return false;
            }
            ctx.set("stage", "User verified");
            return true;
        },

        getStage: (ctx: WorkflowSharedContext) => ctx.get("stage"),

        approveEmail: async (ctx: WorkflowSharedContext, secret: string) => {
            await ctx.promise<string>("email-link").resolve(secret);
        },

        rejectEmail: async (ctx: WorkflowSharedContext) => {
            await ctx.promise<string>("email-link").reject("Abort verification");
        },
    }
});
// <end_here>

export type SignUpWorkflow = typeof signUpWorkflow;

type KafkaEvent = { topic: string, message: string };
export type User = { id: string, name: string, email: string };

function sendEmailWithLink({ email, secret }: { email: string; secret: string }) {
    // send email with link
}

function createUserEntry({ id, name }: { id: string; name: string }) {
    // create user entry
}