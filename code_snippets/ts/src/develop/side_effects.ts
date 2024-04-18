import * as restate from "@restatedev/restate-sdk";
import {CombineablePromise} from "@restatedev/restate-sdk";

const service = restate.service({
    name: "SideEffects",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_side_effect>
            const result = await ctx.run<string>(async () => doDbRequest());
            // <end_side_effect>

            const txId = ""
            const amount = 1;
            // <start_retry>
            const success: boolean = await ctx.run(async () => {
                const result = await paymentClient.call(txId, amount);
                if (result.error) {
                    //highlight-next-line
                    throw result.error;
                } else {
                    return result.isSuccess;
                }
            });
            // <end_retry>


            // <start_manual>
            //highlight-next-line
            const retrySettings = { initialDelayMs: 1000, maxDelayMs: 60000, maxRetries: 10 }
            try {
                await ctx.run(async () => {
                        const result = await paymentClient.call(txId, amount);
                        if (result.error) {
                            throw result.error;
                        } else {
                            return result.isSuccess;
                        }
                    }
                );
            } catch (error) {
                // handle terminal error
            }
            // <end_manual>
        },
        greet2: async (ctx: restate.Context, name: string) => {
            // <start_retry_settings>
            // DOESNT EXIST
            // <end_retry_settings>

            const txId = ""
            const amount = 1;
            // <start_terminal>
            try {
                await ctx.run(async () => {
                    const result = await paymentClient.call(txId, amount);
                    if (result.error) {
                        //highlight-next-line
                        throw new restate.TerminalError(result.error);
                    } else {
                        return result.isSuccess;
                    }
                });
            } catch (error) {
                // handle terminal error
            }
            // <end_terminal>
        },
        promiseCombinators: async (ctx: restate.Context, name: string) => {
            const promise1 = ctx.sleep(100);
            const promise2 = ctx.sleep(200);

            // <start_combine_all>
            const resultArray = await CombineablePromise.all([promise1, promise2]);
            // <end_combine_all>

            // <start_combine_any>
            const anyResult = await CombineablePromise.any([promise1, promise2]);
            // <end_combine_any>

            // <start_combine_race>
            const raceResult = await CombineablePromise.race([promise1, promise2]);
            // <end_combine_race>

            // <start_combine_allsettled>
            const allSettledResult = await CombineablePromise.allSettled([promise1, promise2]);
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




