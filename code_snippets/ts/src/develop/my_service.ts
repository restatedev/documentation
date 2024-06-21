import * as restate from "@restatedev/restate-sdk";
import {Context} from "@restatedev/restate-sdk";

const myService = restate.service({
    name: "MyService",
    handlers: {
        myHandler: async (ctx: Context, greeting: string) => {
            return `${greeting}!`;
        },
    }
})

// <start_api_export>
export const MyService: typeof myService = { name: "MyService" };
// <end_api_export>

restate
    .endpoint()
    .bind(myService)
    .listen();