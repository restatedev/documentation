import * as restate from "@restatedev/restate-sdk";

const router = restate.keyedRouter({
    greet: async (ctx: restate.KeyedContext, name: string) => {
        return `Hello ${name}!`;
    },
    countGreetings: async (ctx: restate.KeyedContext, name: string) => {
        // Retrieve state; number of times this name was seen
        let seen = await ctx.get<number>("seen") || 0;
        seen += 1;
        // Set the incremented counter as the new state
        ctx.set("seen", seen);

        return `Hello ${name} for the ${seen}th time!`
    }
})

// Create the Restate server to accept requests
restate
    .endpoint()
    .bindKeyedRouter("greeter", router)
    .listen();