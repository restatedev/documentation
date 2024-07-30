package usecases.microservices;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

@VirtualObject
public class ProductService {

  @Handler
  public boolean reserve(ObjectContext ctx) {
    return true;
  }
}
