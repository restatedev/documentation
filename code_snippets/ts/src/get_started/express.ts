import express from "express";
import { randomUUID } from "node:crypto";

const PAYMENT_API =
  "https://pvd5p37t6zz5hpsetbqda2bzra0fwqkx.lambda-url.eu-central-1.on.aws";
const SUBSCRIPTION_API =
  "https://z2bo2pifnqgfscdzinm6szme5u0fajja.lambda-url.eu-central-1.on.aws";

const app = express();
app.use(express.json());

app.post("/add", async (req, res) => {
  const { email, creditCard, subscriptions } = req.body;

  // 1. Generate an idempotency key
  // This value is lost after a failure
  // !mark 0
  const idempotencyKey = randomUUID();

  // 2. Create a recurring payment
  // No retries in case of timeouts, API downtime, etc.
  // !mark(1:10) 1
  const paymentResp =
    // !collapse(1:9) collapsed
    await fetch(`${PAYMENT_API}/createRecurringPayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({ email, creditCard }),
    });

  const paymentRef = await paymentResp.json();

  // 3. Create subscriptions
  // All subscriptions are retried on failure
  for (const subscription of subscriptions) {
    // !mark(1:5) 2
    // !collapse(1:5) collapsed
    await fetch(`${SUBSCRIPTION_API}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, subscription, paymentRef }),
    });
  }

  res.status(200).send();
});

app.listen();
