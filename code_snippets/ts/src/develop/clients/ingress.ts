import { greetCounterObject, greeterService } from "./utils";
import { SendOpts } from "@restatedev/restate-sdk-clients";
import { myWorkflow } from "../../concepts/invocations/utils";
import * as clients from "@restatedev/restate-sdk-clients";

const myPlainTSFunction = async () => {
  // <start_rpc_call_node>
  // import * as clients from "@restatedev/restate-sdk-clients";
  const rs = clients.connect({ url: "http://localhost:8080" });
  const greet = await rs
    .serviceClient(greeterService)
    .greet({ greeting: "Hi" });

  const count = await rs
    .objectClient(greetCounterObject, "Mary")
    .greet({ greeting: "Hi" });
  // <end_rpc_call_node>
};

const myPlainTSFunction2 = async () => {
  // <start_one_way_call_node>
  // import * as clients from "@restatedev/restate-sdk-clients";
  const rs = clients.connect({ url: "http://localhost:8080" });
  await rs.serviceSendClient(greeterService).greet({ greeting: "Hi" });

  await rs
    .objectSendClient(greetCounterObject, "Mary")
    .greet({ greeting: "Hi" });
  // <end_one_way_call_node>
};

const myPlainTSFunction3 = async () => {
  // <start_delayed_call_node>
  // import * as clients from "@restatedev/restate-sdk-clients";
  const rs = clients.connect({ url: "http://localhost:8080" });
  await rs
    .serviceSendClient(greeterService)
    .greet({ greeting: "Hi" }, SendOpts.from({ delay: 1000 }));

  await rs
    .objectSendClient(greetCounterObject, "Mary")
    .greet({ greeting: "Hi" }, SendOpts.from({ delay: 1000 }));
  // <end_delayed_call_node>
};

const servicesIdempotent = async () => {
  const request = { greeting: "Hi" };
  const rs = clients.connect({ url: "http://localhost:8080" });
  // <start_service_idempotent>
  await rs
    .serviceSendClient(greeterService)
    // withClass highlight-line
    .greet(request, SendOpts.from({ idempotencyKey: "abcde" }));
  // <end_service_idempotent>
};

const servicesAttach = async () => {
  const request = { greeting: "Hi" };
  // <start_service_attach>
  // import * as clients from "@restatedev/restate-sdk-clients";
  const rs = clients.connect({ url: "http://localhost:8080" });
  // Send a message
  const handle = await rs
    .serviceSendClient(greeterService)
    // mark
    .greet(request, SendOpts.from({ idempotencyKey: "abcde" }));

  // ... do something else ...

  // Attach later to retrieve the result
  // mark
  const response = await rs.result(handle);
  // <end_service_attach>
};
