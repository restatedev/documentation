# <start_here>
import requests

restate = "http://localhost:8080"
workflow_id = "myUser123"
payload = {
    "email": "user@user.com",
    "name": "Pete"
}
headers = {"Content-Type": "application/json"}

# !mark[/Submit/] blue
# 1. Submit the workflow
# !mark[/\/send/] blue
url = f'${restate}/signupWorkflow/${workflow_id}/run/send'
response = requests.post(url, json=payload, headers=headers)

# Do something else, with workflow running in the background

# !mark[/Attach/] blue
# 2. Attach back to the workflow
# !mark[/\/attach/] blue
attach_url = f'${restate}/restate/workflow/signupWorkflow/${workflow_id}/attach'
response = requests.get(attach_url)
# <end_here>
