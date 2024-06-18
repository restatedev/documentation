package concepts.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class EmailClient {
  private static final Logger logger =
      LogManager.getLogger(concepts.buildingblocks.utils.PaymentClient.class);

  public static boolean sendSuccessNotification(String email) {
    // ... do the call ...
    return true;
  }
}
