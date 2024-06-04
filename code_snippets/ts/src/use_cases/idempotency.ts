import * as restate from "@restatedev/restate-sdk-clients";
import { Opts } from "@restatedev/restate-sdk-clients";
import express from 'express';
import {ProductService} from "./idempotency_utils";

const app = express()

process.env.RESTATE_URL = "localhost:8080";

// <start_here>
const rs = restate.connect({ url: process.env.RESTATE_URL });
const productService: ProductService = {name: "product"};

app.get('/reserve/:product/:reservationId', async (req, res) => {
    const { product, reservationId } = req.params;

    const products = rs.serviceClient(productService);
    // withClass(1:4) highlight-line
    const reservation = await products.reserve(
        product,
        Opts.from({ idempotencyKey : reservationId })
    );

    res.json(reservation);
})
// <end_here>

