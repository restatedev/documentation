import * as restate from "@restatedev/restate-sdk";

const myVirtualObject = restate.object({
    name: "MyVirtualObject",
    handlers: {
        myHandler: async (ctx: restate.ObjectContext, greeting: string) => {
            return `${greeting} ${ctx.key}!`;
        },
        myConcurrentHandler: async (ctx: restate.ObjectSharedContext, greeting: string) => {
            return `${greeting} ${ctx.key}!`;
        },
    }
})

export const MyVirtualObject: typeof myVirtualObject = { name: "MyVirtualObject" };

restate
    .endpoint()
    .bind(myVirtualObject)
    .listen();