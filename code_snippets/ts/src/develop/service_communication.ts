import * as restate from "@restatedev/restate-sdk";
import {MyService} from "./my_service";
import {MyVirtualObject} from "./my_virtual_object";

const service = restate.service({
    name: "Router",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_request_response_service>
            const response = await ctx.serviceClient(MyService).myHandler("Hi");
            // <end_request_response_service>
        },
        greet2: async (ctx: restate.Context, name: string) => {
            // <start_request_response_object>
            const response = await ctx.objectClient(MyVirtualObject, "Mary").myHandler("Hi");
            // <end_request_response_object>

            // <start_one_way_service>
            ctx.serviceSendClient(MyService).myHandler("Hi");
            // <end_one_way_service>

            // <start_one_way_object>
            ctx.objectSendClient(MyVirtualObject, "Mary").myHandler("Hi");
            // <end_one_way_object>

            // <start_delayed_service>
            ctx.serviceSendClient(MyService, { delay: 5000 }).myHandler("Hi");
            // <end_delayed_service>

            // <start_delayed_object>
            ctx.objectSendClient(MyVirtualObject, "Mary", { delay: 5000 }).myHandler("Hi");
            // <end_delayed_object>

            // <start_ordering>
            ctx.objectSendClient(MyVirtualObject, "Mary").myHandler("Hi!");
            ctx.objectSendClient(MyVirtualObject, "Mary").myHandler("Hi again!");
            // <end_ordering>
        },
    }
})
