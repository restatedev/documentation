import * as restate from "@restatedev/restate-sdk";

// <start_here>
const userUpdates = restate.object({
    name: "userUpdates",
    handlers: {
        updateUserEvent: async (ctx: restate.ObjectContext, event: UserUpdate) => {
            const { profile, permissions, resources } = verifyEvent(event);

            let userId = await ctx.run(() => updateUserProfile(profile));
            while (userId === NOT_READY) {
                ctx.sleep(5_000);
                userId = await ctx.run(() => updateUserProfile(profile));
            }

            const roleId = await ctx.run(() =>
                setupUserPermissions(userId, permissions)
            );
            await ctx.run(() => provisionResources(userId, roleId, resources));
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

export async function updateUserProfile(profile: string, token?: string): Promise<string> {
    return Math.random() < 0.8 ? NOT_READY : profile + "-id";
}
export async function setupUserPermissions(
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