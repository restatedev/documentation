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

// <start_here>
const profileService = restate.object({
    name: "profile",
    handlers: {
        registration: async (
            ctx: restate.ObjectContext,
            event: { name: string }
        ) => {
            ctx.set("name", event.name);
        },

        email: async (ctx: restate.ObjectContext, event: { email: string }) => {
            ctx.set("email", event.email);
        },

        get: async (ctx: restate.ObjectContext): Promise<UserProfile> => {
            return {
                id: ctx.key,
                name: (await ctx.get<string>("name")) ?? "",
                email: (await ctx.get<string>("email")) ?? "",
            };
        },
    },
});
// <end_here>

type UserProfile = {
    id: string;
    name: string;
    email: string;
};