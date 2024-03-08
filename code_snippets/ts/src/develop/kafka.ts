import * as restate from "@restatedev/restate-sdk";

const router = restate.keyedRouter({
    // highlight-start
    eventHandler: restate.keyedEventHandler(async (ctx: restate.KeyedContext, event: restate.Event) => {
        // Extract event payload as json
        const { myData } = event.json<{ myData: string }>();
        // OR extract event payload as raw bytes
        // and deserialize it using the format of your choice (e.g. Avro, Protobuf, ...)
        const bodyBuffer = event.body();

        // ... Handle event ... //
    })
    //highlight-end
});