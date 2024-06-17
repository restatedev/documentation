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
import {Context} from "@restatedev/restate-sdk";

// <start_here>
// <mark_1>
const roleUpdater = restate.object({
    // </mark_1>
    name: "roleUpdate",
    handlers: {
        // <mark_1>
        // <mark_2>
        update: async function (ctx: Context, update: UpdateRequest) {
            // </mark_2>
            // </mark_1>
            const { userId, role, permissions: permissions } = update;

            // <mark_3>
            const previousRole = await ctx.run(() => getCurrentRole(userId));
            await ctx.run(() => applyUserRole(userId, role));
            // </mark_3>

            const previousPermissions: Permission[] = [];
            for (const permission of permissions) {
                // <mark_4>
                try {
                    // <mark_3>
                    const previous = await ctx.run(() =>
                        applyPermission(userId, permission));
                    // </mark_3>
                    previousPermissions.push(previous);
                } catch (err) {
                    if (err instanceof restate.TerminalError) {
                        await rollback(ctx, userId, previousRole, previousPermissions);
                    }
                    throw err;
                }
                // </mark_4>
            }
        }
    },
})
// <end_here>

async function rollback(
    ctx: restate.Context,
    userId: string,
    role: UserRole,
    permissions: Permission[]
) {
    console.log(">>> !!! ROLLING BACK CHANGES !!! <<<");
    for (const prev of permissions.reverse()) {
        await ctx.run(() => applyPermission(userId, prev));
    }
    await ctx.run(() => applyUserRole(userId, role));
}

export type UserRole = {
    roleKey: string;
    roleDescription: string;
};

export type Permission = {
    permissionKey: string;
    setting: string;
};

export type UpdateRequest = {
    userId: string;
    role: UserRole;
    permissions: Permission[];
};

export async function getCurrentRole(userId: string): Promise<UserRole> {
    // in this example, the previous role was always just 'viewer'
    return { roleKey: "viewer", roleDescription: "User that cannot do much" };
}

export async function applyUserRole(userId: string, userRole: UserRole): Promise<boolean> {
    console.log(`>>> Applied role ${userRole.roleKey} for user ${userId}`);
    return true;

}

export async function applyPermission(
    userId: string,
    permission: Permission
): Promise<Permission> {
    const { permissionKey, setting } = permission;
    return { permissionKey, setting: "blocked" };
}