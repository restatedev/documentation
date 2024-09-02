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

package my.example;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import java.time.Duration;

/**
 * Template of a Restate service and handler
 * Have a look at the Java QuickStart to learn how to run this: https://docs.restate.dev/get_started/quickstart?sdk=java
 */
@Service
public class Greeter {

    // <start_here>
    @Handler
    public String greet(Context ctx, String greeting) {

        ctx.run(() -> doWork(1));
        ctx.sleep(Duration.ofSeconds(2));
        ctx.run(() -> doWork(2));
        ctx.sleep(Duration.ofSeconds(2));
        ctx.run(() -> doWork(3));
        ctx.sleep(Duration.ofSeconds(2));
        ctx.run(() -> doWork(4));

        return greeting;
    }

    private void doWork(int taskNb){
        System.out.println("Task " + taskNb +
                " started at " + System.currentTimeMillis());
    }
    // <end_here>

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
                .bind(new Greeter())
                .buildAndListen();
    }
}
