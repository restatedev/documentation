import * as restate from "@restatedev/restate-sdk";

const router = restate.keyedRouter({
    greet: async (ctx: restate.KeyedContext, name: string) => {

        // <start_ordering>
        ctx.send(greeterApi).greet("Restate", 1);
        ctx.send(greeterApi).greet("Restate", 2);
        // <end_ordering>

    },
})

const greeterRouter = restate.keyedRouter({
    greet: async(ctx: restate.Context, name: string, count: number) => { /*...*/ }
});

export const greeterApi: restate.ServiceApi<typeof greeterRouter> = { path : "greeter" };
