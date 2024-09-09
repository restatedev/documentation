import restate
from restate import VirtualObject, ObjectContext

# <start_here>
# <mark_1>
greeter = VirtualObject("Greeter")
# </mark_1>


# <mark_1>
# <mark_3>
@greeter.handler()
async def greet(ctx: ObjectContext, greeting: str) -> str:
    # </mark_3>
    # </mark_1>
    # <mark_2>
    count = await ctx.get("count") or 0
    count += 1
    ctx.set("count", count)
    # </mark_2>
    # <mark_1>
    return f"{greeting} {ctx.key} for the {count}-th time."
    # </mark_1>


# <mark_1>
# <mark_3>
@greeter.handler()
async def ungreet(ctx: ObjectContext) -> str:
    # </mark_3>
    # </mark_1>
    # <mark_2>
    count = await ctx.get("count") or 0
    # </mark_2>
    if count > 0:
        # <mark_2>
        count -= 1
    ctx.set("count", count)
    # </mark_2>
    # <mark_1>
    return f"Dear {ctx.key}, taking one greeting back: {count}."
    # </mark_1>


app = restate.app([greeter])
# <end_here>
