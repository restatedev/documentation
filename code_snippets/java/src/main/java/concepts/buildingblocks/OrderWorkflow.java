package concepts.buildingblocks;

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

  // <mark_1>
  @Handler
  public void process(ObjectContext ctx, OrderRequest order) {
    // </mark_1>
    String id = order.getOrderId();
    // <mark_4>
    ctx.set(STATUS, StatusEnum.CREATED);
    // </mark_4>

    // 2. Handle payment
    // <mark_5>
    String token = ctx.random().nextUUID().toString();
    boolean paid =
        ctx.run(
            JsonSerdes.BOOLEAN,
            // break
            () -> PaymentClient.charge(id, token, order.getTotalCost()));
    // </mark_5>

    if (!paid) {
      // <mark_4>
      ctx.set(STATUS, StatusEnum.REJECTED);
      // </mark_4>
      return;
    }

    // 3. Schedule preparation
    // <mark_4>
    ctx.set(STATUS, StatusEnum.SCHEDULED);
    // </mark_4>
    ctx.sleep(Duration.ofMillis(order.getDeliveryDelay()));

    // 4. Trigger preparation
    // <mark_3>
    var awakeable = ctx.awakeable(Serde.VOID);
    // <mark_5>
    ctx.run(() -> RestaurantClient.prepare(id, awakeable.id()));
    // </mark_5>
    // </mark_3>
    // <mark_4>
    ctx.set(STATUS, StatusEnum.IN_PREPARATION);
    // </mark_4>

    // <mark_3>
    awakeable.await();
    // </mark_3>
    // <mark_4>
    ctx.set(STATUS, StatusEnum.SCHEDULING_DELIVERY);
    // </mark_4>

    // 5. Find a driver and start delivery
    // <mark_2>
    DeliveryManagerClient.fromContext(ctx, id).startDelivery(order).await();
    // </mark_2>
    // <mark_4>
    ctx.set(STATUS, StatusEnum.DELIVERED);
    // </mark_4>
  }
}
// <end_here>
