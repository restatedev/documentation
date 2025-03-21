from datetime import timedelta

import restate
from restate import Context, Service
from restate.exceptions import TerminalError

my_service = Service("MyService")


def write_to_other_system():
    pass


@my_service.handler("myHandler")
async def my_service_handler(ctx: Context, greeting: str) -> str:
    # <start_here>
    try:
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
    except TerminalError as err:
        # Handle the terminal error after retries exhausted
        # For example, undo previous actions (see sagas guide) and
        # propagate the error back to the caller
        raise err
    # <end_here>

    return f"${greeting}!"


app = restate.app([my_service])
