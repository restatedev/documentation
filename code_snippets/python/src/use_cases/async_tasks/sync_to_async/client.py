import asyncio
from datetime import timedelta

from pydantic import BaseModel
from restate import Service, Context

from data_preparation_service import data_preparation


class User(BaseModel):
    id: str
    email: str


RESTATE_URL = "http://localhost:8080"


# <start_here>
download_client = Service("downloadClient")


@download_client.handler()
async def download_data(ctx: Context, user: User):
    # <mark_1>
    # <mark_2>
    data_prep = ctx.workflow_call(data_preparation.run, user.id, arg=None)
    # </mark_1>
    # </mark_2>

    # <mark_3>
    done, pending = await asyncio.wait(
        [data_prep, ctx.sleep(timedelta(seconds=30))],
        return_when=asyncio.FIRST_COMPLETED
    )
    # </mark_3>

    result = done.pop()
    # <mark_4>
    if result is None:
        # Hit timeout... Mail us the link later
        ctx.workflow_send(data_preparation.result_as_email, user.id, arg=user.email)
        return
    # </mark_4>

    # ... process result directly ...
# <end_here>


async def read_line(prompt: str) -> str:
    return await asyncio.get_event_loop().run_in_executor(None, input, prompt)
