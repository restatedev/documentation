import os
import random

import restate

def create_subscription(user_id: str, subscription: str, _payment_ref: str) -> str:
    return "SUCCESS"


def create_recurring_payment(_credit_card: str, payment_id: str) -> str:
    return "payment-reference"


def create_user_entry(user):
    print(f"Creating user entry for {user}")


def send_email_with_link(user_id: str, email: str, secret: str):
    print(f"Sending email to {email} with secret {secret}. \n"
          f"To simulate a user clicking the link, run the following command: \n"
          f"curl localhost:8080/usersignup/{user_id}/click --json '\"{secret}\"'")