import * as restate from "@restatedev/restate-sdk";


// <start_here>
const orderProcessor = restate.object({
    name: "order-processor",
    handlers: {
        process: async (ctx: restate.ObjectContext, order: Order) => {
            const {id, totalCost, deliveryDelay} = order;

            // 1. Set status
            ctx.set("status", Status.CREATED);

            // 2. Handle payment
            const token = ctx.rand.uuidv4();
            // focus
            const paid = await ctx.sideEffect(() => paymentClnt.charge(id, token, totalCost));

            if (!paid) {
                ctx.set(id, Status.REJECTED);
                return;
            }

            // 3. Wait until the requested preparation time
            ctx.set(id, Status.SCHEDULED);
            await ctx.sleep(deliveryDelay);

            // 4. Trigger preparation
            const preparationPromise = ctx.awakeable();
            // focus
            await ctx.sideEffect(() => restaurant.prepare(id, preparationPromise.id));
            ctx.set(id, Status.IN_PREPARATION);

            await preparationPromise.promise;
            ctx.set(id, Status.SCHEDULING_DELIVERY);

            // 5. Find a driver and start delivery
            await ctx.objectClient(deliveryManager, deliveryId)
                .start(order);
        }
    }
});
// <end_here>


export enum Status {
    NEW = "NEW",
    CREATED = "CREATED",
    SCHEDULED = "SCHEDULED",
    IN_PREPARATION = "IN_PREPARATION",
    SCHEDULING_DELIVERY = "SCHEDULING_DELIVERY",
    WAITING_FOR_DRIVER = "WAITING_FOR_DRIVER",
    IN_DELIVERY = "IN_DELIVERY",
    DELIVERED = "DELIVERED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
}
