import { RestateTestEnvironment } from "@restatedev/restate-sdk-testcontainers";
import { router } from "./state.js";
import * as clients from "@restatedev/restate-sdk-clients";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

// <start_setup>
describe("ExampleObject", () => {
  // import { RestateTestEnvironment } from "@restatedev/restate-sdk-testcontainers";
  let restateTestEnvironment: RestateTestEnvironment;
  // import * as clients from "@restatedev/restate-sdk-clients";
  let restateIngress: clients.Ingress;

  beforeAll(async () => {
    restateTestEnvironment = await RestateTestEnvironment.start(
      (restateServer) => restateServer.bind(router)
    );
    restateIngress = clients.connect({ url: restateTestEnvironment.baseUrl() });
  }, 20_000);

  afterAll(async () => {
    if (restateTestEnvironment !== undefined) {
      await restateTestEnvironment.stop();
    }
  });
  // <end_setup>

  // <start_methods>
  it("Can call methods", async () => {
    const client = restateIngress.objectClient(router, "myKey");

    await client.greet("Test!");
  });
  // <end_methods>

  // <start_state>
  it("Can read state", async () => {
    const state = restateTestEnvironment.stateOf(router, "myKey");

    expect(await state.getAll()).toStrictEqual({});
    expect(await state.get("count")).toBeNull();
  });

  it("Can write state", async () => {
    const state = restateTestEnvironment.stateOf(router, "myKey");

    await state.setAll({
      count: 123,
    });
    await state.set("count", 321);
  });
  // <end_state>

  // <start_typedstate>
  type ServiceState = { count: number };

  it("Can operate on typed state", async () => {
    const state = restateTestEnvironment.stateOf<ServiceState>(router, "myKey");

    await state.setAll({ count: 1 });
    await state.set("count", 2);
  });
  // <end_typedstate>
});
