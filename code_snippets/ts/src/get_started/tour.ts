import * as restate from "@restatedev/restate-sdk";

const router = restate.service({
  name: "MyService",
  handlers: {
    greet: async (ctx: restate.Context, name: string) => {
      const ticketId = "";

      // <start_sleep>
      await ctx.sleep({ minutes: 15 });
      // <end_sleep>

      // <start_sleep_and_send>
      await ctx.sleep({ minutes: 15 });
      ctx.objectSendClient(TicketObject, ticketId).unreserve();
      // <end_sleep_and_send>
    },
  },
});

const checkoutService = restate.service({
  name: "MyService",
  handlers: {
    // <start_uuid>
    async handle(
      ctx: restate.Context,
      request: { userId: string; tickets: string[] }
    ) {
      // !mark(1:3)
      const idempotencyKey = ctx.rand.uuidv4();
      console.info("My idempotency key: " + idempotencyKey);
      throw new Error("Something happened!");

      return true;
    },
    // <end_uuid>
  },
});

const secondCheckoutService = restate.service({
  name: "MyService",
  handlers: {
    // <start_checkout>
    async handle(
      ctx: restate.Context,
      request: { userId: string; tickets: string[] }
    ) {
      // !mark
      const totalPrice = request.tickets.length * 40;

      const idempotencyKey = ctx.rand.uuidv4();
      // !mark(1:3)
      const success = await ctx.run(() =>
        PaymentClient.get().call(idempotencyKey, totalPrice)
      );

      return success;
    },
    // <end_checkout>
  },
});
export const ticketObject = restate.object({
  name: "TicketObject",
  handlers: {
    async unreserve(ctx: restate.ObjectContext) {
      return true;
    },
  },
});

const TicketObject: typeof ticketObject = { name: "TicketObject" };

class PaymentClient {
  static get() {
    return new PaymentClient();
  }

  async call(idempotencyKey: string, totalPrice: number) {
    return true;
  }
}
