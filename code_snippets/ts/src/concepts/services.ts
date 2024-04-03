// <start_service>
import * as restate from "@restatedev/restate-sdk";

const roleUpdateService = restate.service({
    name: "roleUpdate",
    handlers: {
        applyRoleUpdate: async (ctx: restate.Context, update: UpdateRequest) => {
            // parameters are durable across retries
            const { userId, role, permissions } = update;

            // Apply a change to one system (e.g., DB upsert, API call, ...).
            // The side effect persists the result with a consensus method,
            // so any later code relies on a deterministic result.
            const success = await ctx.sideEffect(() => applyUserRole(userId, role));
            if (!success) {
                return;
            }

            // Simply loop over the array or permission settings.
            // Each operation through the Restate context is journaled,
            // and recovery restores results of previous operations from the journal without re-executing them.
            for (const permission of permissions) {
                await ctx.sideEffect(() => applyPermission(userId, permission));
            }
        }
    }
});

restate.endpoint().bind(roleUpdateService).listen();
// <end_service>

const someHandler = async (ctx: restate.ObjectContext, input: { greeting?: string }) => {
// <start_call_service>
    const request = {
        userId: "Sam Beckett",
        role: { roleKey: "content-manager", roleDescription: "Add/remove documents" },
        permissions : [{ permissionKey: "add", setting: "allow" }]
    };
    // Request-response call:
    await ctx.serviceClient(roleUpdateService).applyRoleUpdate(request);
    // One-way call:
    ctx.serviceSendClient(roleUpdateService).applyRoleUpdate(request);
// <end_call_service>
}



// When invoking this function (see below for sample request), it will apply all
// role and permission changes, regardless of crashes.
// You will see all lines of the type "Applied permission remove:allow for user Sam Beckett"
// in the log, across all retries. You will also see that re-tries will not re-execute
// previously completed actions again, so each line occurs only once.

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