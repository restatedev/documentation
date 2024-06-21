import * as restate from "@restatedev/restate-sdk";

const service = restate.object({
  name: "KafkaService",
  handlers: {
    myEventHandler: async (ctx: restate.Context, name: string) =>
      // <start_headers>
      ctx.request().headers,
    // <end_headers>
  },
});
