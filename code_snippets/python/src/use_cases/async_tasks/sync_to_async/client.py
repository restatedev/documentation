import asyncio
import json
from datetime import timedelta

import requests
from pydantic import BaseModel
from restate import Service, Context

from data_preparation_service import data_preparation


class User(BaseModel):
    id: str
    email: str


RESTATE_URL = "http://localhost:8080"


# <start_here>
def download_data(user: User):
    headers = {"Content-Type": "application/json"}
    try:
        # <mark_1>
        # <mark_2>
        # <mark_3>
        url = f"{RESTATE_URL}/dataPrep/{user.id}/run/send"
        data_prep = requests.post(url, headers=headers, timeout=30)
        # </mark_1>
        # </mark_2>
        # </mark_3>
    # <mark_4>
    except requests.exceptions.Timeout:
        # Hit timeout... Mail us the link later
        email_url = f"{RESTATE_URL}/dataPrep/{user.id}/resultAsEmail/send"
        requests.post(email_url, json=user.email, headers=headers)
        return

    # ... process result directly ...
    # </mark_4>
# <end_here>


async def read_line(prompt: str) -> str:
    return await asyncio.get_event_loop().run_in_executor(None, input, prompt)
