from datetime import timedelta

import restate
from restate import Context, Service
from restate.exceptions import TerminalError

my_service = Service("MyService")


def write_to_other_system():
    pass


@my_service.handler("myServiceHandler")
async def my_service_handler(ctx: Context, greeting: str) -> str:
    # <start_here>
    await ctx.run(
        "write",
        lambda: write_to_other_system(),
        # <mark_1>
        # Max number of retry attempts to complete the action.
        max_attempts=3,
        # Max duration for retrying, across all retries.
        max_retry_duration=timedelta(seconds=10),
        # </mark_1>
    )
    # <end_here>

    # <start_catch>
    try:
        # Fails with a terminal error after 3 attempts or if the function throws one
        await ctx.run("write", lambda: write_to_other_system(), max_attempts=3)
    except TerminalError as err:
        # Handle the terminal error: undo previous actions and
        # propagate the error back to the caller
        raise err
    # <end_catch>

    return f"${greeting}!"


def decode_request(raw_request):
    return ""


# <start_raw>
@my_service.handler()
async def my_handler(ctx: Context):
    try:
        # !mark
        raw_request = ctx.request().body
        decoded_request = decode_request(raw_request)

        # ... rest of your business logic ...

    except TerminalError as err:
        # Propagate to DLQ/catch-all handler
        raise err


# <end_raw>


app = restate.app([my_service])
