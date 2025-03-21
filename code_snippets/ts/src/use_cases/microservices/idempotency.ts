import * as restate from "@restatedev/restate-sdk-clients";
import { Opts } from "@restatedev/restate-sdk-clients";
import express from "express";
import { SubscriptionService } from "./subscription_service";
import { randomUUID } from "node:crypto";

const app = express();

const RESTATE_URL = "localhost:8080";

app.get("/reserve/:product/:reservationId", async (req, res) => {
  const requestId = randomUUID().toString();
  const subscriptionRequest = {
    userId: "123",
    creditCard: "1234-1234-1234",
    subscriptions: ["Netflix", "Disney+"],
  };
  // <start_here>
  // <mark_1>
  const restateClient = restate.connect({ url: RESTATE_URL });
  const reservation = await restateClient
    .serviceClient<SubscriptionService>({ name: "SubscriptionService" })
    .add(
      // target handler
      subscriptionRequest,
      // <mark_2>
      Opts.from({ idempotencyKey: requestId })
      // </mark_2>
    );
  // </mark_1>
  // <end_here>

  res.json(reservation);
});
