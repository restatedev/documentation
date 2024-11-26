import requests

url = "http://localhost:8080/productService/reserve"
payload = {"product_id": "myProduct123"}
headers = {
    # <mark_1>
    "idempotency-key": "myReservation123",
    # </mark_1>
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)