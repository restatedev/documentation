from restate import Service, Context
from datetime import timedelta
from restate.exceptions import TerminalError
import restate

my_service = Service("MyService")


def send_verification():
    pass


@my_service.handler()
async def my_handler(ctx: Context, arg):
    # <start_side_effect>
    async def do_db_request():
        # ... implement ...
        return "my_result"

    # !mark
    result = await ctx.run("database request", do_db_request)
    # <end_side_effect>

    # <start_select>
    _, confirmation_future = ctx.awakeable(type_hint=str)
    match await restate.select(confirmation=confirmation_future, timeout=ctx.sleep(timedelta(days=1))):
        case ["confirmation", "ok"]:
            return "success!"
        case ["confirmation", "deny"]:
            raise TerminalError("Confirmation was denied!")
        case ["timeout", _]:
            raise TerminalError("Verification timer expired!")
    # <end_select>

    f1 = ctx.sleep(timedelta(days=1))
    f2 = ctx.sleep(timedelta(days=1))
    f3 = ctx.sleep(timedelta(days=1))
    # <start_as_completed>
    async for future in restate.as_completed(f1, f2, f3):
        # do something with the completed future
        print(await future)
    # <end_as_completed>
