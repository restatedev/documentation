package develop;

// <start_here>
import dev.restate.sdk.auth.signing.RestateRequestIdentityVerifier;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;

class MySecureApp {
  public static void main(String[] args) {
    var endpoint =
        Endpoint.builder()
            .bind(new MyService())
            // !mark
            .withRequestIdentityVerifier(
                RestateRequestIdentityVerifier.fromKeys(
                    "publickeyv1_w7YHemBctH5Ck2nQRQ47iBBqhNHy4FV7t2Usbye2A6f"))
            .build();
    RestateHttpServer.listen(endpoint);
  }
}
// <end_here>
