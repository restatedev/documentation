package guides.sagas.clients;

import dev.restate.sdk.common.TerminalException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class PaymentClient {
  private static final Logger logger = LogManager.getLogger(PaymentClient.class);

  public record PaymentInfo(String cardNumber, Long amount) {}

  public static void charge(PaymentInfo request, String paymentId) {
    // This should implement the actual payment processing, or communication
    // to the external provider's APIs.
    // Here, we just simulate payment failure to show how the compensations run.

    if (Math.random() < 0.5) {
      logger.error("[👻 SIMULATED] This credit card is not valid! Aborting booking.");
      throw new TerminalException("[👻 SIMULATED] This credit card is not valid!");
    }

    if (Math.random() < 0.8) {
      logger.error("[👻 SIMULATED] External payment API down! Will retry...");
      throw new RuntimeException("[👻 SIMULATED] External payment API down! Will retry...");
    }

    logger.info("Payment with id {} was successful!", paymentId);
  }

  public static void refund(String paymentId) {
    // refund the payment identified by this paymentId
    // this should implement the actual payment processing, or communication
    // to the external provider's APIs
    logger.info("Refunding payment with id: {}", paymentId);
  }
}
