import * as restate from "@restatedev/restate-sdk";

// <start_here>
const signupWorkflow = restate.workflow({
  name: "user-signup",
  handlers: {
    // <mark_1>
    run: async (
      ctx: restate.WorkflowContext,
      user: { name: string; email: string }
    ) => {
      // workflow ID = user ID; workflow runs once per user
      const userId = ctx.key;

      // <mark_2>
      await ctx.run(() => createUserEntry(user));
      // </mark_2>

      const secret = ctx.rand.uuidv4();
      // <mark_2>
      await ctx.run(() => sendEmailWithLink({ userId, user, secret }));
      // </mark_2>

      // <mark_3>
      const clickSecret = await ctx.promise<string>("link-clicked");
      // </mark_3>
      return clickSecret === secret;
    },
    // </mark_1>

    // <mark_3>
    click: async (
      ctx: restate.WorkflowSharedContext,
      request: { secret: string }
    ) => {
      await ctx.promise<string>("link-clicked").resolve(request.secret);
    },
    // </mark_3>
  },
});

restate.endpoint().bind(signupWorkflow).listen(9080);
// <end_here>

function createUserEntry(user: { name: string; email: string }) {}

function sendEmailWithLink(param: {
  userId: string;
  user: { name: string; email: string };
  secret: string;
}) {
  return undefined;
}
