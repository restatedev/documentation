// <start_service>
import * as restate from "@restatedev/restate-sdk";

export const roleUpdateService = restate.service({
    name: "roleUpdate",
    handlers: {
        applyRoleUpdate: async (ctx: restate.Context, update: UpdateRequest) => {
            // parameters are durable across retries
            const { userId, role, permissions } = update;

            // Apply a change to one system (e.g., DB upsert, API call, ...)
            // and persist the result in Restate.
            const success = await ctx.sideEffect(() => applyUserRole(userId, role));
            if (!success) {
                return;
            }

            // Loop over the permission settings and
            // journal each operation in Restate to avoid re-execution during retries.
            for (const permission of permissions) {
                await ctx.sideEffect(() => applyPermission(userId, permission));
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