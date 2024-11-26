from pydantic import BaseModel
from restate import Service, Context


class Task(BaseModel):
    task_id: str


class Subtask(BaseModel):
    task_id: str
    subtask_id: str


def split(task) -> list[Subtask]:
    pass


def aggregate(results) -> list[Task]:
    pass


# <start_here>
worker_service = Service("worker")


@worker_service.handler()
async def run(ctx: Context, task: Task):
    subtasks = await ctx.run("split task", lambda: split(task))

    result_promises = []
    for subtask in subtasks:
        sub_result_promise = ctx.service_call(run_subtask, arg=subtask)
        result_promises.append(sub_result_promise)

    results = [await promise for promise in result_promises]
    return aggregate(results)


@worker_service.handler()
async def run_subtask(ctx: Context, subtask: Subtask):
    # Processing logic goes here...
    # Can be moved to a separate service to scale independently
    pass
# <end_here>
