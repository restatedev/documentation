/**
 * WARNING:
 * The Services page relies on the line numbers for the code animations
 * Make sure you adapt the line numbers when adapting the code
 */

// <start_here>
import * as restate from "@restatedev/restate-sdk";
import { Context } from "@restatedev/restate-sdk";

// <mark_2>
export const roleUpdateService = restate.service({
  // </mark_2>
  name: "roleUpdate",
  // <mark_2>
  handlers: {
    applyRoleUpdate: async (ctx: Context, update: UpdateRequest) => {
      // </mark_2>
      const { userId, role, permissions } = update;

      // <mark_1>
      const success = await ctx.run(() => applyUserRole(userId, role));
      // </mark_1>
      // <mark_3>
      if (!success) {
        return;
      }
      // </mark_3>

      // <mark_3>
      for (const permission of permissions) {
        // </mark_3>
        // <mark_1>
        await ctx.run(() => applyPermission(userId, permission));
        // </mark_1>
        // <mark_3>
      }
      // </mark_3>
    },
  },
});

restate.endpoint().bind(roleUpdateService).listen();
// <end_here>

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

export async function applyUserRole(
  userId: string,
  userRole: UserRole
): Promise<boolean> {
  maybeCrash(0.3);
  console.log(`>>> Applied role ${userRole.roleKey} for user ${userId}`);
  return true;
}

export async function applyPermission(
  userId: string,
  permission: Permission
): Promise<void> {
  maybeCrash(0.2);
  console.log(
    `>>> Applied permission ${permission.permissionKey}:${permission.setting} for user ${userId}`
  );
}
