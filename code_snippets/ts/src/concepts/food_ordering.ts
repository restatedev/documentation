import { ObjectContext } from "@restatedev/restate-sdk";
import {
  deliveryManager,
  Order,
  paymentClnt,
  restaurant,
  Status,
} from "./utils";

// <start_here>
// <mark_1>
async function process(ctx: ObjectContext, order: Order) {
  // </mark_1>
  // 1. Set status
  // <mark_4>
  ctx.set("status", Status.CREATED);
  // </mark_4>

  // 2. Handle payment
  // <mark_5>
  const token = ctx.rand.uuidv4();
  const paid = await ctx.run(() =>
    paymentClnt.charge(order.id, token, order.totalCost)
  );
  // </mark_5>

  if (!paid) {
    // <mark_4>
    ctx.set("status", Status.REJECTED);
    // </mark_4>
    return;
  }

  // 3. Wait until the requested preparation time
  // <mark_4>
  ctx.set("status", Status.SCHEDULED);
  // </mark_4>
  await ctx.sleep(order.deliveryDelay);

  // 4. Trigger preparation
  // <mark_3>
  const preparationPromise = ctx.awakeable();
  // <mark_5>
  await ctx.run(() => restaurant.prepare(order.id, preparationPromise.id));
  // </mark_5>
  // </mark_3>
  // <mark_4>
  ctx.set("status", Status.IN_PREPARATION);
  // </mark_4>

  // <mark_3>
  await preparationPromise.promise;
  // </mark_3>
  // <mark_4>
  ctx.set("status", Status.SCHEDULING_DELIVERY);
  // </mark_4>

  // 5. Find a driver and start delivery
  // <mark_2>
  await ctx.objectClient(deliveryManager, order.id).startDelivery(order);
  // </mark_2>
  // <mark_4>
  ctx.set("status", Status.DELIVERED);
  // </mark_4>
}
// <end_here>
