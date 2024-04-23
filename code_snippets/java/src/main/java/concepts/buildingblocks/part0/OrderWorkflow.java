package concepts.buildingblocks.part0;

import concepts.buildingblocks.DeliveryManagerClient;
import concepts.buildingblocks.types.OrderRequest;
import concepts.buildingblocks.types.StatusEnum;
import concepts.buildingblocks.utils.PaymentClient;
import concepts.buildingblocks.utils.RestaurantClient;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.serde.jackson.JacksonSerdes;

import java.time.Duration;

// <start_here>
@VirtualObject
public class OrderWorkflow {
    public final static StateKey<StatusEnum> STATUS =
        StateKey.of("status", JacksonSerdes.of(StatusEnum.class));

    @Handler
    public void process(ObjectContext ctx, OrderRequest order) {
        String id = order.getOrderId();
        ctx.set(STATUS, StatusEnum.CREATED);

        // 2. Handle payment
        String token = ctx.random().nextUUID().toString();
        boolean paid = ctx.run(CoreSerdes.JSON_BOOLEAN, () ->
            PaymentClient.charge(id, token, order.getTotalCost()));

        if (!paid) {
            ctx.set(STATUS, StatusEnum.REJECTED);
            return;
        }

        // 3. Schedule preparation
        ctx.set(STATUS, StatusEnum.SCHEDULED);
        ctx.sleep(Duration.ofMillis(order.getDeliveryDelay()));

        // 4. Trigger preparation
        var awakeable = ctx.awakeable(CoreSerdes.VOID);
        ctx.run(() ->
            RestaurantClient.prepare(id, awakeable.id()));
        ctx.set(STATUS, StatusEnum.IN_PREPARATION);

        awakeable.await();
        ctx.set(STATUS, StatusEnum.SCHEDULING_DELIVERY);

        // 5. Find a driver and start delivery
        DeliveryManagerClient.fromContext(ctx, id)
            .startDelivery(order).await();
        ctx.set(STATUS, StatusEnum.DELIVERED);
    }
}
// <end_here>

