import * as restate from "@restatedev/restate-sdk";
import {
  TerminalError,
  WorkflowContext,
  WorkflowSharedContext,
} from "@restatedev/restate-sdk";

// <start_here>
// <mark_1>
const signUpWorkflow = restate.workflow({
  name: "sign-up-workflow",
  handlers: {
    run: async (ctx: WorkflowContext, user: User) => {
      // </mark_1>
      const { id, name, email } = user;

      // <mark_3>
      ctx.set("stage", "Creating User");
      // </mark_3>
      // <mark_2>
      await ctx.run(() => createUserEntry({ id, name }));
      // </mark_2>

      // <mark_3>
      ctx.set("stage", "Email Verification");
      // </mark_3>
      // <mark_2>
      const secret = ctx.rand.uuidv4();
      await ctx.run(() => sendEmailWithLink({ email, secret }));
      // </mark_2>

      // <mark_5>
      const clickSecret = await ctx.promise<string>("email-link");
      // </mark_5>
      // <mark_7>
      if (clickSecret !== secret) {
        // <mark_3>
        ctx.set("stage", `Verification failed`);
        // </mark_3>
        throw new TerminalError("Wrong secret from email link");
      }
      // <mark_3>
      ctx.set("stage", "User verified");
      // </mark_3>
      return true;
      // </mark_7>
    },

    // <mark_4>
    getStage: (ctx: WorkflowSharedContext) => ctx.get("stage"),
    // </mark_4>

    // <mark_6>
    approveEmail: (ctx: WorkflowSharedContext, secret: string) =>
      ctx.promise<string>("email-link").resolve(secret),

    rejectEmail: (ctx: WorkflowSharedContext) =>
      ctx.promise<string>("email-link").reject("Abort verification"),
    // </mark_6>
  },
});
// <end_here>

export type SignUpWorkflow = typeof signUpWorkflow;

type KafkaEvent = { topic: string; message: string };
export type User = { id: string; name: string; email: string };

function sendEmailWithLink({
  email,
  secret,
}: {
  email: string;
  secret: string;
}) {
  // send email with link
}

function createUserEntry({ id, name }: { id: string; name: string }) {
  // create user entry
}
