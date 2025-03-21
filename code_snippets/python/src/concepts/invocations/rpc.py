from restate import Service, Context

from src.concepts.invocations.utils import greet

my_service = Service("MyService")


# <start_rpc_call>
@my_service.handler()
async def my_handler(ctx: Context, arg):
    # !focus
    greeting = await ctx.service_call(greet, arg="Hi")


# <end_rpc_call>
