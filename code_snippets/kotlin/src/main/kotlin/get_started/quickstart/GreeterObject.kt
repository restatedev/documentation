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
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.common.StateKey
import dev.restate.sdk.kotlin.KtSerdes
import dev.restate.sdk.kotlin.KtStateKey
import dev.restate.sdk.kotlin.ObjectContext
import kotlin.time.Duration.Companion.seconds

// <start_here>
@VirtualObject
class GreeterObject {

    companion object {
        private val COUNT = KtStateKey.json<Long>("count")
    }

    @Handler
    suspend fun greet(ctx: ObjectContext, text: String): String {
        val greeting: String = ctx.runBlock(
            KtSerdes.json<String>()
        ) { if ((Math.random() < 0.5)) "Hello" else "Howdy" }

        ctx.sleep(2.seconds)

        val count = ctx.get(COUNT) ?: 0
        ctx.set(COUNT, count + 1)

        val name = ctx.key()
        return "$greeting $name - $text"
    }
}

fun main() {
  RestateHttpEndpointBuilder.builder().bind(Greeter()).buildAndListen()
}
// <end_here>