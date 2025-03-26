package develop

// <start_here>
import dev.restate.sdk.auth.signing.RestateRequestIdentityVerifier
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.endpoint.endpoint

fun main() {
  RestateHttpServer.listen(
      endpoint {
        bind(MyService())
        // !mark(1:3)
        requestIdentityVerifier =
            RestateRequestIdentityVerifier.fromKeys(
                "publickeyv1_w7YHemBctH5Ck2nQRQ47iBBqhNHy4FV7t2Usbye2A6f",
            )
      })
}
// <end_here>
