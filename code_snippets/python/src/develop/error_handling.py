from datetime import timedelta

from restate import Service, Context
from restate.exceptions import TerminalError

my_service = Service("MyService")


@my_service.handler()
async def my_handler(ctx: Context, arg):
    # <start_here>
    raise TerminalError("Something went wrong.")
    # <end_here>
