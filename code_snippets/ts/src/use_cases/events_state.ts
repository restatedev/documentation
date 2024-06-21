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
import { ObjectContext } from "@restatedev/restate-sdk";

// <start_here>
const eventEnricher = restate.object({
  name: "profile",
  handlers: {
    // <mark_2>
    userEvent: async (ctx: ObjectContext, event: UserProfile) => {
      // </mark_2>
      // <mark_1>
      ctx.set("user", event);
      // </mark_1>
      // <mark_3>
      ctx.objectSendClient(EventEnricher, ctx.key, { delay: 1000 }).emit();
      // </mark_3>
    },

    // <mark_2>
    featureEvent: async (ctx: ObjectContext, featureEvent: string) => {
      // </mark_2>
      // <mark_1>
      const userEvent = await ctx.get<UserProfile>("user");
      // </mark_1>
      (userEvent!.features ??= []).push(featureEvent);
      // <mark_1>
      ctx.set("user", userEvent);
      // </mark_1>
    },

    // <mark_2>
    emit: async (ctx: ObjectContext) => {
      // </mark_2>
      // <mark_1>
      send(ctx.key, await ctx.get("user"));
      ctx.clearAll();
      // </mark_1>
    },
  },
});

type EventEnricherType = typeof eventEnricher;
const EventEnricher: EventEnricherType = { name: "profile" };
// <end_here>

type UserProfile = {
  id: string;
  name: string;
  email: string;
  features: string[];
};

function send(key: string, user: UserProfile | null) {}
