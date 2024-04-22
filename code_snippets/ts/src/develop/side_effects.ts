import * as restate from "@restatedev/restate-sdk";
import {CombineablePromise} from "@restatedev/restate-sdk";
import {MyService} from "./my_service";

const service = restate.service({
    name: "SideEffects",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_side_effect>
            const result = await ctx.run<string>(async () => doDbRequest());
            // <end_side_effect>
        },

        promiseCombinators: async (ctx: restate.Context, name: string) => {
            // <start_promises>
            const sleepPromise = ctx.sleep(100);
            const callPromise = ctx.serviceClient(MyService).myHandler("Hi");
            // <end_promises>

            // <start_combine_all>
            const resultArray = await CombineablePromise.all([sleepPromise, callPromise]);
            // <end_combine_all>

            // <start_combine_any>
            const anyResult = await CombineablePromise.any([sleepPromise, callPromise]);
            // <end_combine_any>

            // <start_combine_race>
            const raceResult = await CombineablePromise.race([sleepPromise, callPromise]);
            // <end_combine_race>

            // <start_combine_allsettled>
            const allSettledResult = await CombineablePromise.allSettled([sleepPromise, callPromise]);
            // <end_combine_allsettled>

            // <start_uuid>
            const uuid = ctx.rand.uuidv4();
            // <end_uuid>

            // <start_random_nb>
            const randomNumber = ctx.rand.random();
            // <end_random_nb>
        }
    }
})


function doDbRequest(){
    return "";
}

const paymentClient = {
    call: (txId: string, amt: number) => {
        return {error: "", isSuccess: false}
    }
}




