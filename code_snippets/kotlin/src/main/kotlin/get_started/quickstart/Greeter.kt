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
package get_started

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.kotlin.KtSerdes
import kotlin.time.Duration.Companion.seconds

// <start_here>
@Service
class Greeter {
    @Handler
    suspend fun greet(ctx: Context, text: String): String {
        // this is a persistent workflow step. the result of the function is
        // durably committed before it is returned and further steps can execute
        val greeting: String = ctx.runBlock(
            KtSerdes.json<String>()
        ) { if ((Math.random() < 0.5)) "Hello" else "Howdy" }

        // this is a delay during which the code may suspend (if running on FaaS)
        ctx.sleep(2.seconds)

        return "$greeting - $text"
    }
}

fun main() {
  RestateHttpEndpointBuilder.builder().bind(Greeter()).buildAndListen()
}
// <end_here>