import * as restate from "@restatedev/restate-sdk";
import {myGreeterApi} from "../develop/service_communication";

const greet = async (ctx: restate.Context, name: string) => {

    // <start_rpc>
    const response = await ctx.rpc(myGreeterApi).greet("Restate");
    // <end_rpc>

    // <start_queue>
    ctx.send(myGreeterApi).greet("Restate");
    // <end_queue>

    // <start_timers>
    // Send a message after 1 second
    ctx.sendDelayed(myGreeterApi, 1000).greet("Restate");
    // Wait for 1 second
    await ctx.sleep(1000);
    // <end_timers>

    // <start_awakeable>
    const awakeable = ctx.awakeable();
    await ctx.sideEffect<string>(async () => doTaskWithCallback({req: "request", cb: awakeable.id}));
    const result = await awakeable.promise;
    // <end_awakeable>

    // <start_side_effect>
    const dbResult = await ctx.sideEffect<string>(async () => doDbRequest());
    // <end_side_effect>


    //...the rest of your code...
};

function doDbRequest(){
    return "";
}

function doTaskWithCallback(req: {req: string, cb: string}){
    return "";
}