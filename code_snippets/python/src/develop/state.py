from restate import ObjectContext, VirtualObject

my_object = VirtualObject("Caller")


@my_object.handler()
async def caller(ctx: ObjectContext, arg):
    # <start_statekeys>
    state_keys = ctx.state_keys()
    # <end_statekeys>

    # <start_get>
    my_string = await ctx.get("my-string-key", type_hint=str) or "default-key"
    my_number = await ctx.get("my-number-key", type_hint=int) or 123
    # <end_get>

    # <start_set>
    ctx.set("my-key", "my-new-value")
    # <end_set>

    # <start_clear>
    ctx.clear("my-key")
    # <end_clear>

    # <start_clear_all>
    ctx.clear_all()
    # <end_clear_all>
