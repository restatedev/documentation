import * as restate from "@restatedev/restate-sdk";

// <start_here>
const userUpdates = restate.object({
    name: "userUpdates",
    handlers: {
        // <mark_1>
        updateUserEvent: async (ctx: restate.ObjectContext, event: UserUpdate) => {
            // </mark_1>
            const { profile, permissions, resources } = verifyEvent(event);

            // <mark_3>
            let userId = await ctx.run(() => updateProfile(profile));
            // </mark_3>
            // <mark_4>
            while (userId === NOT_READY) {
                // <mark_2>
                await ctx.sleep(5_000);
                // </mark_2>
                // <mark_3>
                userId = await ctx.run(() => updateProfile(profile));
                // </mark_3>
            }

            // <mark_3>
            const roleId = await ctx.run(() => setPermissions(userId, permissions));
            await ctx.run(() => provisionResources(userId, roleId, resources));
            // </mark_3>
            // </mark_4>
        },
    },
});
// <end_here>


import { TerminalError } from "@restatedev/restate-sdk";

export type UserUpdate = {
    profile: string;
    permissions: string;
    resources: string;
};

export const NOT_READY = "NOT_READY";

export async function updateProfile(profile: string, token?: string): Promise<string> {
    return Math.random() < 0.8 ? NOT_READY : profile + "-id";
}
export async function setPermissions(
    id: string,
    permissions: string,
    token?: string
): Promise<string> {
    return permissions;
}
export async function provisionResources(user: string, role: string, resources: string) {}

export function verifyEvent(request: UserUpdate): UserUpdate {
    if (request?.profile && request?.permissions && request?.resources) {
        return request;
    } else {
        throw new TerminalError("Incomplete event");
    }
}