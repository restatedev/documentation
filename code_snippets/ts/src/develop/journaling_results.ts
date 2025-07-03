import * as restate from "@restatedev/restate-sdk";
import { RestatePromise } from "@restatedev/restate-sdk";
import { MyService } from "./my_service";

const service = restate.service({
  name: "SideEffects",
  handlers: {
    greet: async (ctx: restate.Context, name: string) => {
      // <start_side_effect>
      const result = await ctx.run<string>(async () => doDbRequest());
      // <end_side_effect>
    },

    promiseCombinators: async (ctx: restate.Context, name: string) => {
      // <start_all>
      const sleepPromise = ctx.sleep({ milliseconds: 100 });
      const callPromise = ctx.serviceClient(MyService).myHandler("Hi");
      const externalCallPromise = ctx.run(() => httpCall());
      const resultArray = await RestatePromise.all([
        sleepPromise,
        callPromise,
        externalCallPromise,
      ]);
      // <end_all>

      // <start_uuid>
      const uuid = ctx.rand.uuidv4();
      // <end_uuid>

      // <start_random_nb>
      const randomNumber = ctx.rand.random();
      // <end_random_nb>
    },
  },
});

function doDbRequest() {
  return "";
}

async function httpCall() {
  return "";
}

const paymentClient = {
  call: (txId: string, amt: number) => {
    return { error: "", isSuccess: false };
  },
};
