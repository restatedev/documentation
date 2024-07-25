const myService = restate.service({
  name: "MyService",
  handlers: {},
});

const myVirtualObject = restate.object({
  name: "MyVirtualObject",
  handlers: {},
});

const myWorkflow = restate.workflow({
  name: "MyWorkflow",
  handlers: { run: async () => {} },
});

// <start_fetch>
import * as restate from "@restatedev/restate-sdk/fetch";
const handler = restate
  .endpoint()
  .bind(myService)
  .bind(myVirtualObject)
  .bind(myWorkflow)
  .handler();
// Cloudflare expects the handler as a default export
export default handler;
// Bun expects an object containing the inner fetch function
Bun.serve({
  port: 9080,
  ...handler,
});
// Deno expects to be passed the fetch function
Deno.serve({ port: 9080 }, handler.fetch);
// <end_fetch>

namespace Bun {
  export function serve(_: object): void {}
}
namespace Deno {
  export function serve(_: object, _: object): void {}
}
