import requests

# <start_here>
restate = "http://localhost:8080"

# 1. Submit the workflow
user_id = "myUser123"
# !mark
requests.post(
    # !mark
    f"${restate}/signupWorkflow/${user_id}/run/send",
    json={"email": "user@user.com", "name": "Pete"},
    headers={"Content-Type": "application/json"},
)

# Do something else, with workflow running in the background

# 2. Attach back to the workflow
# !mark
response = requests.get(
    # !mark
    f"${restate}/restate/workflow/signupWorkflow/${user_id}/attach"
    # !mark
)
# <end_here>
