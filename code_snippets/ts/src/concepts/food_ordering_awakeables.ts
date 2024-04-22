import * as restate from "@restatedev/restate-sdk";
import {ObjectContext} from "@restatedev/restate-sdk";
import {deliveryManager, Order, paymentClnt, restaurant, Status} from "./utils";


// <start_here>
async function process(ctx: ObjectContext, order: Order) {

    // 1. Set status
    ctx.set("status", Status.CREATED);

    // 2. Handle payment
    const token = ctx.rand.uuidv4();
    const paid = await ctx.run(() =>
        paymentClnt.charge(order.id, token, order.totalCost)
    );

    if (!paid) {
        ctx.set("status", Status.REJECTED);
        return;
    }

    // 3. Wait until the requested preparation time
    ctx.set("status", Status.SCHEDULED);
    await ctx.sleep(order.deliveryDelay);

    // 4. Trigger preparation
    // focus
    const preparationPromise = ctx.awakeable();
    await ctx.run(() =>
        // focus
        restaurant.prepare(order.id, preparationPromise.id)
    );
    ctx.set("status", Status.IN_PREPARATION);

    // focus
    await preparationPromise.promise;
    ctx.set("status", Status.SCHEDULING_DELIVERY);

    // 5. Find a driver and start delivery
    await ctx.objectClient(deliveryManager, order.id)
        .startDelivery(order);
    ctx.set("status", Status.DELIVERED);
}
// <end_here>