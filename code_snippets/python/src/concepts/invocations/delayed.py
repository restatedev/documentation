from datetime import timedelta

from restate import Service, Context

from src.concepts.invocations.utils import greet

my_service = Service("MyService")


# <start_delayed_call>
@my_service.handler()
async def my_handler(ctx: Context, arg):
    # !focus
    ctx.service_send(greet, arg="Hi", send_delay=timedelta(seconds=1))
# <end_delayed_call>
