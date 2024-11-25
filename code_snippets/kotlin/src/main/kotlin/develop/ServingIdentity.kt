package develop

// <start_here>
import dev.restate.sdk.auth.signing.RestateRequestIdentityVerifier
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder

fun main() {
  RestateHttpEndpointBuilder.builder()
      .bind(MyService())
      // !mark(1:5)
      .withRequestIdentityVerifier(
          RestateRequestIdentityVerifier.fromKeys(
              "publickeyv1_w7YHemBctH5Ck2nQRQ47iBBqhNHy4FV7t2Usbye2A6f",
          ),
      )
      .buildAndListen()
}
// <end_here>
