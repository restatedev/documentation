from typing import TypedDict

import restate
from restate import Service, Context


class TaskOpts(TypedDict):
    id: str


def some_heavy_work(params: TaskOpts):
    return "Work!"


# <start_here>
async_task_service = Service("taskWorker")


# <mark_1>
@async_task_service.handler("runTask")
async def run_task(ctx: Context, params: TaskOpts):
    return some_heavy_work(params)
# </mark_1>

app = restate.app([async_task_service])
# <end_here>