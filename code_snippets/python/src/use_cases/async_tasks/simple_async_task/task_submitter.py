import json

import requests

from src.use_cases.async_tasks.simple_async_task.async_task_service import TaskOpts


# <start_here>
RESTATE_URL = "http://localhost:8080"


def schedule_task(task: TaskOpts):
    # <mark_1>
    requests.post(
        f"{RESTATE_URL}/taskWorker/runTask/send",
          json=json.dumps(task),
          headers={
              # <mark_2>
              "idempotency-key": "dQw4w9WgXcQ",
              # </mark_2>
              "Content-Type": "application/json"
          })
    # </mark_1>

    # Do something else, with task running in the background

    # Attach back to the task to retrieve the result
    # <mark_3>
    # <mark_4>
    attach_url = f"{RESTATE_URL}/restate/invocation/taskWorker/runTask/dQw4w9WgXcQ/attach"
    response = requests.get(attach_url)
    # </mark_3>
    # </mark_4>
# <end_here>


schedule_task(TaskOpts(id="myTask123"))