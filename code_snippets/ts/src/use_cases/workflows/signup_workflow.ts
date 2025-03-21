import * as restate from "@restatedev/restate-sdk";

// <start_here>
// <mark_1>
const signupWorkflow = restate.workflow({
  name: "user-signup",
  handlers: {
    run: async (
      ctx: restate.WorkflowContext,
      user: { name: string; email: string }
    ) => {
      // </mark_1>
      // workflow ID = user ID; workflow runs once per user
      const userId = ctx.key;

      // <mark_2>
      await ctx.run(() => createUserEntry(user));
      // </mark_2>

      // <mark_2>
      const secret = ctx.rand.uuidv4();
      await ctx.run(() => sendEmailWithLink({ userId, user, secret }));
      // </mark_2>

      // <mark_2>
      // <mark_3>
      const clickSecret = await ctx.promise<string>("link-clicked");
      // </mark_3>
      // </mark_2>
      return clickSecret === secret;
    },

    click: async (
      ctx: restate.WorkflowSharedContext,
      request: { secret: string }
    ) => {
      // <mark_3>
      await ctx.promise<string>("link-clicked").resolve(request.secret);
      // </mark_3>
    },
  },
});
// <end_here>

export type SignUpWorkflow = typeof signupWorkflow;

restate.endpoint().bind(signupWorkflow).listen(9080);

function createUserEntry(user: { name: string; email: string }) {}

function sendEmailWithLink(param: {
  userId: string;
  user: { name: string; email: string };
  secret: string;
}) {
  return undefined;
}
