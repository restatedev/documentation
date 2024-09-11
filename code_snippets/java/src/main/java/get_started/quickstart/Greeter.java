/*
 * Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate examples,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/examples/
 */

package get_started.quickstart;

import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import java.time.Duration;

// <start_here>
@Service
public class Greeter {

    @Handler
    public String greet(Context ctx, String text) {
        // this is a persistent workflow step. the result of the function is
        // durably committed before it is returned and further steps can execute
        String greeting = ctx.run(JsonSerdes.STRING,
                () -> (Math.random() < 0.5) ? "Hello" : "Howdy");

        // this is a delay during which the code may suspend (if running on FaaS)
        ctx.sleep(Duration.ofMillis(2000));

        return greeting + " - " + text;
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
                .bind(new Greeter())
                .buildAndListen();
    }
}
// <end_here>
