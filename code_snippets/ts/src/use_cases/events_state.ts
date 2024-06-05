/*
 * Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate Examples for the Node.js/TypeScript SDK,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/examples/blob/main/LICENSE
 */

import * as restate from "@restatedev/restate-sdk";
import {ObjectContext} from "@restatedev/restate-sdk";

// <start_here>
const eventEnricher = restate.object({
    name: "profile",
    handlers: {
        userEvent: async (ctx: ObjectContext, event: UserProfile) => {
            ctx.set("user", event);
            ctx.objectSendClient(EventEnricher, ctx.key,{ delay: 1000 }).emit();
        },

        featureEvent: async (ctx: ObjectContext, featureEvent: string) => {
            const userEvent = await ctx.get<UserProfile>("user");
            (userEvent!.features ??= []).push(featureEvent);
            ctx.set("user", userEvent)
        },

        emit: async (ctx: ObjectContext) => {
            send(ctx.key, await ctx.get("user"));
            ctx.clearAll();
        }
    }
})

type EventEnricherType = typeof eventEnricher;
const EventEnricher: EventEnricherType = {name:"profile"}
// <end_here>

type UserProfile = {
    id: string;
    name: string;
    email: string;
    features: string[];
};

function send(key: string, user: UserProfile | null) {
}