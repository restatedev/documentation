import * as restate from "@restatedev/restate-sdk";

const myService = restate.service({
    name: "MyService",
    handlers: {
        myHandler: async (ctx: restate.Context, greeting: string) => {
            return `${greeting}!`;
        },
    }
})

export const MyService: typeof myService = { name: "MyService" };

restate
    .endpoint()
    .bind(myService)
    .listen();