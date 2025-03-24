import * as restate from "@restatedev/restate-sdk-clients";
import { greetCounter, greeter } from "../utils";

// <start_one_way_call_node>
const myFunction = async () => {
  // !focus(1:5)
  // From any TypeScript/JavaScript function
  const restateClient = restate.connect({ url: "http://localhost:8080" });
  await restateClient.serviceSendClient(greeter).greet({ greeting: "Hi" });
};
// <end_one_way_call_node>
