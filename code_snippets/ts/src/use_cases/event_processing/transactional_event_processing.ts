import * as restate from "@restatedev/restate-sdk";
import {randomUUID} from "node:crypto";


// <start_here>
const userFeed = restate.object({
    name: "userFeed",
    handlers: {
        // <mark_1>
        processPost: async (ctx: restate.ObjectContext, post: SocialMediaPost) => {
            // </mark_1>
            // <mark_5>
            const userId = ctx.key
            // </mark_5>

            // <mark_3>
            const postId = await ctx.run(() => createPost(userId, post));
            // </mark_3>

            // <mark_4>
            // <mark_3>
            while ((await ctx.run(() => getPostStatus(postId))) === PENDING) {
                // </mark_3>
                // <mark_2>
                await ctx.sleep(5_000);
                // </mark_2>
            }
            // </mark_4>

            // <mark_3>
            await ctx.run(() => updateUserFeed(userId, postId));
            // </mark_3>
        },
    },
});

restate.endpoint().bind(userFeed).listen();
// <end_here>

type SocialMediaPost = {
    content: string;
    metadata: string;
};

const PENDING = "PENDING";
const DONE = "DONE";

async function createPost(userId: string, post: SocialMediaPost): Promise<string> {
    const postId = randomUUID().toString();
    console.info(`Created post ${postId} for user ${userId} with content: ${post.content}`);
    return postId
}

async function getPostStatus(postId: string): Promise<string> {
    if (Math.random() < 0.8) {
        console.info(`Content moderation for post ${postId} is still pending... Will check again in 5 seconds`);
        return PENDING;
    } else {
        console.info(`Content moderation for post ${postId} is done`);
        return DONE;
    }
}

async function updateUserFeed(user: string, postId: string) {
    console.info(`Updating the user feed for user ${user} with post ${postId}`);
}