import random
from datetime import timedelta

import restate
from restate import Context, Service

# <start_here>
greeter = Service("Greeter")


@greeter.handler()
async def greet(ctx: Context, text: str) -> str:
    # this is a persistent workflow step. the result of the function is
    # durably committed before it is returned and further steps can execute
    greeting = await ctx.run("greeting", lambda: "Hello" if random.Random().random() < 0.5 else "Howdy")

    # this is a delay during which the code may suspend (if running on FaaS)
    await ctx.sleep(timedelta(milliseconds=2000))

    return f"${greeting} ${text}"

app = restate.app([greeter])
# <end_here>
