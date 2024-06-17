import userManagement from "./service";
// <start_here>
import * as restate from "@restatedev/restate-sdk";
import {WorkflowContext} from "@restatedev/restate-sdk";

const signUpWorkflow = restate.workflow({
    name: "signup",
    handlers: {
        // <mark_1>
        run: async (ctx: WorkflowContext, req: { email: string }) => {
            const secret = ctx.rand.uuidv4();
            ctx.set("status", "Generated secret");

            await ctx.run("send email", () =>
                sendEmailWithLink({ email: req.email, secret }));
            ctx.set("status", "Sent email");

            // <mark_3>
            const clickSecret = await ctx.promise<string>("email.clicked");
            // </mark_3>
            ctx.set("status", "Clicked email");

            return clickSecret == secret;
        },
        // </mark_1>


        click: (ctx: restate.WorkflowSharedContext, secret: string) =>
            // <mark_3>
            ctx.promise<string>("email.clicked").resolve(secret),
        // </mark_3>

        // <mark_2>
        getStatus: (ctx: restate.WorkflowSharedContext) =>
            ctx.get<string>("status"),
        // </mark_2>
    },
});

export type SignUpWorkflow = typeof signUpWorkflow;

// <mark_4>
restate.endpoint().bind(signUpWorkflow).listen();
// </mark_4>
// <end_here>

function sendEmailWithLink(param: { email: string, secret: string}){
    console.log(`Sending email to ${param.email} with secret ${param.secret}`);
}

