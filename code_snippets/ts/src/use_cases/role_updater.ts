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
const roleUpdater = restate.object({
    name: "roleUpdate",
    handlers: {
        applyRoleUpdate: async function applyRoleUpdate(ctx: restate.Context, update: UpdateRequest) {
            // parameters are durable across retries
            const { userId, role, permissions: permissions } = update;

            const previousRole = await ctx.run(() => getCurrentRole(userId));
            await ctx.run(() => tryApplyUserRole(userId, role));

            // Apply all permissions in order.
            // We collect the previous permission settings to reset if the process fails.
            const previousPermissions: Permission[] = [];
            for (const permission of permissions) {
                try {
                    const previous = await ctx.run(() => tryApplyPermission(userId, permission));
                    previousPermissions.push(previous); // remember the previous setting
                } catch (err) {
                    if (err instanceof restate.TerminalError) {
                        await rollback(ctx, userId, previousRole, previousPermissions);
                    }
                    throw err;
                }
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
        await ctx.run(() => tryApplyPermission(userId, prev));
    }
    await ctx.run(() => tryApplyUserRole(userId, role));
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


export async function applyPermission(userId: string, permission: Permission): Promise<void> {
    console.log(
        `>>> Applied permission ${permission.permissionKey}:${permission.setting} for user ${userId}`
    );
}

export async function tryApplyUserRole(userId: string, userRole: UserRole): Promise<void> {

}

export async function tryApplyPermission(
    userId: string,
    permission: Permission
): Promise<Permission> {
    const { permissionKey, setting } = permission;
    return { permissionKey, setting: "blocked" };
}