import * as restate from "@restatedev/restate-sdk";

const service = restate.object({
    name: "KafkaService",
    handlers: {
        // highlight-start
        myEventHandler: async (ctx: restate.Context, name: string) => {
            // // Extract event payload as json
            // const { myData } = event.json<{ myData: string }>();
            // // OR extract event payload as raw bytes
            // // and deserialize it using the format of your choice (e.g. Avro, Protobuf, ...)
            // const bodyBuffer = event.body();

            // ... Handle event ... //
        }
        //highlight-end
    }
});