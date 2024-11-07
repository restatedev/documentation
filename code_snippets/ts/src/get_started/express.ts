import express from "express";
import { randomUUID } from "node:crypto";

const PAYMENT_API = "lambda-function-url";
const SUBSCRIPTION_API = "lambda-function-url";

const app = express();
app.use(express.json());

// !focus(1:30)
app.post("/add", async (req, res) => {
  const { userId, creditCard, subscriptions } = req.body;

  // 1. Generate an idempotency key
  // !mark 0
  const idempotencyKey = randomUUID();


  // 2. Create a recurring payment, using the idempotency key
  // !mark(1:8) 1
  const paymentResp = await fetch(`${PAYMENT_API}/createRecurringPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ userId, creditCard }),
  });



  const paymentRef = await paymentResp.json();

  // 3. Create subscriptions
  for (const subscription of subscriptions) {
    // !mark(1:5) 2
    await fetch(`${SUBSCRIPTION_API}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, subscription, paymentRef }),
    });
  }
});





app.listen();
