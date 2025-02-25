import * as restate from "@restatedev/restate-sdk-clients";
import { Opts } from "@restatedev/restate-sdk-clients";
import express from "express";
import { ProductService } from "./idempotency_utils";

const app = express();

const RESTATE_URL = "localhost:8080";

// <start_here>
app.get("/reserve/:product/:reservationId", async (req, res) => {
  const { product, reservationId } = req.params;

  // !focus(1:8)
  // <mark_1>
  const restateClient = restate.connect({ url: RESTATE_URL });
  const reservation = await restateClient
      .serviceClient<ProductService>({ name: "product" }) // target service
      .reserve( // target handler
        product,
        // <mark_2>
        Opts.from({ idempotencyKey: reservationId })
        // </mark_2>
      );
  // </mark_1>

  res.json(reservation);
});
// <end_here>
