import asyncio
import requests
from pydantic import BaseModel

class User(BaseModel):
    id: str
    email: str


RESTATE_URL = "http://localhost:8080"


# <start_here>
def upload_file(user: User):
    try:
        url_uploaded_file = requests.post(
            # <mark_1>
            f"{RESTATE_URL}/FileUploadWorkflow/{user.id}/run",
            # </mark_1>
            headers={"Content-Type": "application/json"},
            # <mark_1>
            timeout=30
            # </mark_1>
        )

        # ... process file url ...

    # <mark_2>
    except requests.exceptions.Timeout:
        # </mark_2>
        # Ask the workflow to send an email with the upload URL
        requests.post(
            # <mark_2>
            f"{RESTATE_URL}/FileUploadWorkflow/{user.id}/getUrlViaEmail/send",
            # </mark_2>
            headers={"Content-Type": "application/json"},
            json=user.email
        )
        return

# <end_here>
