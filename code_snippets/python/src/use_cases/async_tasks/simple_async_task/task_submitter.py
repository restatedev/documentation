import json
import uuid

import requests

from async_task_service import TaskOpts

RESTATE_URL = "http://localhost:8080"


# <start_here>
def submit_and_await_task(task: TaskOpts):
    # <mark_1>
    idempotency_key = task["id"]
    headers = {
        # <mark_2>
        "idempotency-key": idempotency_key,
        # </mark_2>
        "Content-Type": "application/json"
    }
    url = f"{RESTATE_URL}/taskWorker/runTask/send"
    requests.post(url, json=json.dumps(task), headers=headers)
    # </mark_1>

    # Do something else, with task running in the background

    # Attach back to the task to retrieve the result
    # <mark_3>
    # <mark_4>
    attach_url = f"{RESTATE_URL}/restate/invocation/taskWorker/runTask/{idempotency_key}/attach"
    response = requests.get(attach_url)
    # </mark_3>
    # </mark_4>
# <end_here>


submit_and_await_task(TaskOpts(task_id="myTask123"))
