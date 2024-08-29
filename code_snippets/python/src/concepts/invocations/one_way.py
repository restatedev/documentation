from restate import Service, Context

from src.concepts.invocations.utils import greet

my_service = Service("MyService")


# <start_one_way_call>
@my_service.handler()
async def my_handler(ctx: Context, arg):
    # focus
    ctx.service_send(greet, arg="Hi")
# <end_one_way_call>
