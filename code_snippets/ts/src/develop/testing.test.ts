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

    // State reading
    expect(await state.getAll()).toStrictEqual({});
    expect(await state.get("count")).toBeNull();
  });

  it("Can write state", async () => {
    const state = restateTestEnvironment.stateOf(router, "myKey");

    await state.setAll({
      count: 123,
    });
    expect(await state.getAll()).toStrictEqual({ count: 123 });

    await state.set("count", 321);
    expect(await state.get<number>("count")).toBe(321);
  });
  // <end_state>

  // <start_typedstate>
  type ServiceState = { count: number };

  it("Can operate on typed state", async () => {
    // Typed state
    const state = restateTestEnvironment.stateOf<ServiceState>(router, "myKey");

    await state.setAll({ count: 1 });
    // wont compile:
    // state.setAll({ count: "a" });
    // state.setAll({ foo: 1 });

    expect(await state.getAll()).toStrictEqual({ count: 1 });
    // wont compile:
    // (await state.getAll()) satisfies { count: string };
    // (await state.getAll()) satisfies { foo: number };

    await state.set("count", 2);
    // wont compile:
    // state.set("count", "a");
    // state.set("foo", 2);

    expect(await state.get("count")).toBe(2);
    // wont compile:
    // await state.get("foo");
    // (await state.get("count")) satisfies string;
  });
  // <end_typedstate>
});
