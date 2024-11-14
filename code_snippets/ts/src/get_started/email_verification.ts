// <start_full>
import * as restate from "@restatedev/restate-sdk";
import { randomUUID } from "node:crypto";
import { CombineablePromise } from "@restatedev/restate-sdk";

// <start_here>
const emailVerificationWorkflow = restate.workflow({
  name: "EmailVerificationWorkflow",
  handlers: {
    run: async (
      ctx: restate.WorkflowContext,
      req: { email: string }
    ) => {

      const secret = ctx.rand.uuidv4();
      await ctx.run(() => sendEmailWithLink(req.email, secret));

      // Wait for approval or timeout. On timeout, send reminder.
      // <mark_1>
      const clickPromise = ctx.promise("link_clicked").get();
      // </mark_1>
      let clickSecret;
      while (!clickSecret) {
        // <mark_1>
        clickSecret = await CombineablePromise.any([
          clickPromise,
          // <mark_2>
          ctx.sleep(10 * 1000),
          // </mark_2>
        ]);
        // </mark_1>

        if ( clickSecret == undefined) {
          await ctx.run(() => sendReminderWithLink(req.email, secret));
        }
      }

      return clickSecret == secret;
    },

    evaluate: async (ctx: restate.WorkflowSharedContext, approved: boolean) => {
      // <mark_1>
      await ctx.promise("approval").resolve(approved);
      // </mark_1>
    },
  },
});
// <end_here>

export const EmailVerificationWorkflow: typeof emailVerificationWorkflow = {name: "EmailVerificationWorkflow"};

restate.endpoint().bind(emailVerificationWorkflow).listen();

function sendEmailWithLink(email: string, secret: string) {
  return undefined;
}

function sendReminderWithLink(email: string, secret: string) {
  return undefined;
}
// <end_full>
