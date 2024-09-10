from datetime import timedelta

from restate import Service, Context

my_service = Service("MyService")


@my_service.handler()
async def my_handler(ctx: Context, arg):
    # <start_here>
    await ctx.sleep(delta=timedelta(seconds=10))
    # <end_here>
