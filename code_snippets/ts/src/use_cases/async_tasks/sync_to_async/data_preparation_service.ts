import * as restate from "@restatedev/restate-sdk";
import {WorkflowContext, WorkflowSharedContext} from "@restatedev/restate-sdk";

// <start_here>
const dataPreparationService = restate.workflow({
    name: "dataPrep",
    handlers: {
        run: async (ctx: WorkflowContext, args: { userId: string }) => {
            // <mark_1>
            const url = await ctx.run("create S3 bucket", () => createS3Bucket());
            await ctx.run("upload data", () => uploadData(url));

            // <mark_2>
            await ctx.promise<URL>("url").resolve(url);
            // </mark_2>

            return url;
            // </mark_1>
        },

        resultAsEmail: async (ctx: WorkflowSharedContext, req: { email: string }) => {
            // <mark_2>
            const url = await ctx.promise<URL>("url");
            // </mark_2>
            await ctx.run("send email", () => sendEmail(url, req.email ));
        }
    }
});

export type DataPrepService = typeof dataPreparationService;
// <end_here>

async function createS3Bucket(): Promise<URL> {
    const bucket = Number(Math.random() * 1_000_000_000).toString(16);
    return new URL(`https://s3-eu-central-1.amazonaws.com/${bucket}/`);
}

async function uploadData(target: URL) {
    // simulate some work by delaying for a while. sometimes takes really long.
    return new Promise((resolve) => setTimeout(resolve, Math.random() < 0.0 ? 1_500 : 10_000));
}

async function sendEmail(url: URL, email: string) {
    // send email
    console.log(` >>> Sending email to '${email}' with URL ${url}`);
}