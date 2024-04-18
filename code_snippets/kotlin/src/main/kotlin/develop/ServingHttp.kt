package develop

import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder

// <start_here>
fun main() {
    RestateHttpEndpointBuilder.builder()
        .bind(Greeter())
        .buildAndListen()
}
// <end_here>

