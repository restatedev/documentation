import * as restate from "@restatedev/restate-sdk";
import {handlers, ObjectContext, ObjectSharedContext} from "@restatedev/restate-sdk";

const myVirtualObject = restate.object({
    name: "MyVirtualObject",
    handlers: {
        myHandler: async (ctx: ObjectContext, greeting: string) => {
            return `${greeting} ${ctx.key}!`;
        },
        myConcurrentHandler: handlers.object.shared(
            async (ctx: ObjectSharedContext, greeting: string) => {
                return `${greeting} ${ctx.key}!`;
            }
        ),
    }
})

export const MyVirtualObject: typeof myVirtualObject = { name: "MyVirtualObject" };

restate
    .endpoint()
    .bind(myVirtualObject)
    .listen();