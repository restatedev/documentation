import requests

from src.use_cases.microservices.subscription_service import SubscriptionRequest

RESTATE_URL = "http://localhost:8080"
subscription_request = SubscriptionRequest(user_id="user123", credit_card="1234", subscriptions=["sub1", "sub2"])
request_id = "myTask123"
# <start_here>
# <mark_1>
response = requests.post(
    url = f"${RESTATE_URL}/SubscriptionService/add",
    json=subscription_request,
    headers={
        # <mark_2>
        "idempotency-key": request_id,
        # </mark_2>
        "Content-Type": "application/json"
    }
)
# </mark_1>
# <end_here>