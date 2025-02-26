import requests

# <mark_1>
url = "http://localhost:8080/productService/reserve"
payload = {"product_id": "myProduct123"}
headers = {
    # <mark_2>
    "idempotency-key": "myReservation123",
    # </mark_2>
    "Content-Type": "application/json"
}
response = requests.post(url, json=payload, headers=headers)
# </mark_1>