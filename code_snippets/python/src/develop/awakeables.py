from restate import Service, Context

my_service = Service("MyService")


@my_service.handler()
async def my_handler(ctx: Context, arg):

    # <start_here>
    # <mark_1>
    name, promise = ctx.awakeable(type_hint=str)
    # </mark_1>

    # <mark_2>
    await ctx.run("trigger task", trigger_task_and_deliver_id(name))
    # </mark_2>

    # <mark_3>
    payload = await promise
    # </mark_3>
    # <end_here>

    # <start_resolve>
    ctx.resolve_awakeable(name, payload)
    # <end_resolve>

    # <start_reject>
    ctx.reject_awakeable(name, "My error reason")
    # <end_reject>

    return arg


def trigger_task_and_deliver_id(awakeable_id):
    return "123"
