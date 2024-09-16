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

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import java.time.Duration;

// <start_here>
@VirtualObject
public class GreeterObject {

    private static final StateKey<Long> COUNT =
            StateKey.of("count", JsonSerdes.LONG);

    @Handler
    public String greet(ObjectContext ctx, String text) {
        String greeting = ctx.run(JsonSerdes.STRING,
                () -> (Math.random() < 0.5) ? "Hello" : "Howdy");

        ctx.sleep(Duration.ofMillis(2000));

        var count = ctx.get(COUNT).orElse(0L);
        ctx.set(COUNT, count + 1);

        String name = ctx.key();
        return String.format("%s %s - %s", greeting, name, text);
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
                .bind(new Greeter())
                .buildAndListen();
    }
}
// <end_here>
