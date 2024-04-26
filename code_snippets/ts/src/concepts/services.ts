/**
 * WARNING:
 * The Services page relies on the line numbers for the code animations
 * Make sure you adapt the line numbers when adapting the code
 */

// <start_service>
import * as restate from "@restatedev/restate-sdk";
import {Context} from "@restatedev/restate-sdk";

export const roleUpdateService = restate.service({
    name: "roleUpdate",
    handlers: {
        applyRoleUpdate: async (ctx: Context, update: UpdateRequest) => {
            const { userId, role, permissions } = update;

            const success = await ctx.run(() => applyUserRole(userId, role));
            if (!success) {
                return;
            }

            for (const permission of permissions) {
                await ctx.run(() => applyPermission(userId, permission));
            }
        }
    }
});

restate.endpoint().bind(roleUpdateService).listen();
// <end_service>

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

const killProcess: boolean = Boolean(process.env.CRASH_PROCESS);

export function maybeCrash(probability: number = 0.5): void {
    if (Math.random() < probability) {
        console.error("A failure happened!");

        if (killProcess) {
            console.error("--- CRASHING THE PROCESS ---");
            process.exit(1);
        } else {
            throw new Error("A failure happened!");
        }
    }
}

export async function applyUserRole(userId: string, userRole: UserRole): Promise<boolean> {
    maybeCrash(0.3);
    console.log(`>>> Applied role ${userRole.roleKey} for user ${userId}`);
    return true;
}

export async function applyPermission(userId: string, permission: Permission): Promise<void> {
    maybeCrash(0.2);
    console.log(
        `>>> Applied permission ${permission.permissionKey}:${permission.setting} for user ${userId}`
    );
}