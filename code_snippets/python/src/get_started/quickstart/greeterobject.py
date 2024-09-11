import random
from datetime import timedelta

import restate
from restate import Context, VirtualObject, ObjectContext

# <start_here>
greeter = VirtualObject("Greeter")


@greeter.handler()
async def greet(ctx: ObjectContext, text: str) -> str:
    greeting = await ctx.run("greeting", lambda: "Hello" if random.Random().random() < 0.5 else "Howdy")

    await ctx.sleep(timedelta(milliseconds=2000))

    count = await ctx.get("count") or 0
    ctx.set("count", count + 1)

    name = ctx.key()
    return f"${greeting} ${name} - ${text}"

app = restate.app([greeter])
# <end_here>
