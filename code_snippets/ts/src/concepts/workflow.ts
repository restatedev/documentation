/*
 * Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate examples,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/examples/
 */

import * as restate from "@restatedev/restate-sdk";
import {deliveryManager, emailClnt, Order, paymentClnt, restaurant, Status} from "./utils";


/**
 * Order processing workflow Gets called for each Kafka event that is published to the order topic.
 * The event contains the order ID and the raw JSON order. The workflow handles the payment, asks
 * the restaurant to start the preparation, and triggers the delivery.
 */
interface PaymentRequest {
    amount: number;
    account: string;
    email: string;
}

interface PaymentSuccess {
    account: string;
}

// <start_workflow>
const payment = restate.workflow({
    name: "payment",
    handlers: {
        run: async (ctx: restate.WorkflowContext, payment: PaymentRequest) => {

            // Validate payment. If not valid, end workflow right here without retries.
            if (payment.amount < 0) {
                throw new restate.TerminalError("Payment refused: negative amount");
            }

            await ctx.run("make a payment", async () => {
                await paymentClnt.charge(ctx.key, payment.account, payment.amount);
            });

            await ctx.promise<PaymentSuccess>("payment.success");
            ctx.set("status", "Payment succeeded");

            await ctx.run("notify the user", async () => {
                await emailClnt.sendSuccessNotification(payment.email);
            });

            ctx.set("status", "User notified of payment success");

            return "success";
        },

        paymentWebhook: async (ctx: restate.WorkflowSharedContext, account: string) => {
            await ctx.promise<PaymentSuccess>("payment.success").resolve({ account });
        },

        status: (ctx: restate.WorkflowSharedContext) => ctx.get("status"),
    },
});
// <end_workflow>