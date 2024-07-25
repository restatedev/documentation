package use_cases.microservices

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.kotlin.KtSerdes
import dev.restate.sdk.kotlin.runBlock
import kotlinx.serialization.Serializable

// <start_here>
// <mark_1>
@Service
class RoleUpdateService {
    // </mark_1>

// <mark_1>
// <mark_2>
    @Handler
    suspend fun applyRoleUpdate(ctx: Context, update: UpdateRequest) {
    // </mark_2>
    // </mark_1>

    // <mark_3>
        val previousRole: UserRole = ctx.runBlock(
            KtSerdes.json<UserRole>()
        ) { getCurrentRole(update.userId) }
        ctx.runBlock { tryApplyUserRole(update.userId, update.role) }
    // </mark_3>

        val previousPermissions = ArrayList<Permission>()
        for (permission in update.permissions) {
            // <mark_4>
            try {
                // <mark_3>
                val previous: Permission = ctx.runBlock (
                    KtSerdes.json<Permission>()
                ) { tryApplyPermission(update.userId, permission) }
                // </mark_3>
                previousPermissions.add(previous) // remember the previous setting
            } catch (err: TerminalException) {
                rollback(ctx, update.userId, previousRole, previousPermissions)
                throw err
            }
            // </mark_4>
        }
    }
}
// <end_here>

fun tryApplyPermission(id: String?, permission: Permission): Permission {
    return Permission("", "")
}

fun getCurrentRole(name: String?): UserRole {
    return UserRole("", "")
}

fun tryApplyUserRole(name: String?, role: String?): UserRole {
    return UserRole("", "")
}

fun rollback(ctx: Context, user: String, role: UserRole, previousPermissions: ArrayList<Permission>) {
}

@Serializable
data class UpdateRequest(val userId: String, val role: String, val permissions: Array<Permission>)

@Serializable
data class UserRole(val roleKey: String, val roleDescription: String)

@Serializable
data class Permission(val permissionKey: String, val setting: String)