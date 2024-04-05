package concepts.buildingblocks;

import concepts.buildingblocks.types.OrderRequest;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

@VirtualObject(name = "DeliveryManager")
public class DeliveryManager {

    @Handler
    public void startDelivery(ObjectContext ctx, OrderRequest order) {

    }
}
