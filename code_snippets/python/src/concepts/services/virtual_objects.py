import restate
from restate import VirtualObject, ObjectContext

# <start_here>
# <mark_1>
greeter = VirtualObject("Greeter")
# </mark_1>


# <mark_1>
# <mark_3>
@greeter.handler()
async def greet(ctx: restate.ObjectContext, greeting: str) -> str:
    # </mark_3>
    name = ctx.key
    # </mark_1>
    # <mark_2>
    count = await ctx.get("count", type_hint=int) or 0
    # </mark_2>
    count += 1
    # <mark_2>
    ctx.set("count", count)
    # </mark_2>
    return f"{greeting} {name} for the {count}-th time."


# <mark_1>
# <mark_3>
@greeter.handler()
async def ungreet(ctx: restate.ObjectContext) -> str:
    # </mark_3>
    name = ctx.key
    # </mark_1>
    # <mark_2>
    count = await ctx.get("count", type_hint=int) or 0
    # </mark_2>
    if count > 0:
        count -= 1
    # <mark_2>
    ctx.set("count", count)
    # </mark_2>
    return f"Dear {name}, taking one greeting back: {count}."


# <mark_4>
# <mark_1>
@greeter.handler(kind="shared")
async def get_greet_count(ctx: restate.ObjectSharedContext) -> int:
    # </mark_1>
    # <mark_2>
    return await ctx.get("count") or 0
    # </mark_2>


# </mark_4>

app = restate.app([greeter])
# <end_here>
