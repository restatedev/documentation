package concepts.buildingblocks.part2_rpc;

import concepts.buildingblocks.DeliveryManagerClient;
import concepts.buildingblocks.types.OrderRequest;
import concepts.buildingblocks.types.StatusEnum;
import concepts.buildingblocks.utils.PaymentClient;
import concepts.buildingblocks.utils.RestaurantClient;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.Serde;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.serde.jackson.JacksonSerdes;
import java.time.Duration;

// <start_here>
@VirtualObject
public class OrderWorkflow {
  public static final StateKey<StatusEnum> STATUS =
      StateKey.of("status", JacksonSerdes.of(StatusEnum.class));

  @Handler
  public void process(ObjectContext ctx, OrderRequest order) {
    String id = order.getOrderId();
    ctx.set(STATUS, StatusEnum.CREATED);

    // 2. Handle payment
    String token = ctx.random().nextUUID().toString();
    boolean paid =
        ctx.run(JsonSerdes.BOOLEAN, () -> PaymentClient.charge(id, token, order.getTotalCost()));

    if (!paid) {
      ctx.set(STATUS, StatusEnum.REJECTED);
      return;
    }

    // 3. Schedule preparation
    ctx.set(STATUS, StatusEnum.SCHEDULED);
    ctx.sleep(Duration.ofMillis(order.getDeliveryDelay()));

    // 4. Trigger preparation
    var awakeable = ctx.awakeable(Serde.VOID);
    ctx.run(() -> RestaurantClient.prepare(id, awakeable.id()));
    ctx.set(STATUS, StatusEnum.IN_PREPARATION);

    awakeable.await();
    ctx.set(STATUS, StatusEnum.SCHEDULING_DELIVERY);

    // 5. Find a driver and start delivery
    // mark(1:2)
    DeliveryManagerClient.fromContext(ctx, id).startDelivery(order).await();
    ctx.set(STATUS, StatusEnum.DELIVERED);
  }
}
// <end_here>
