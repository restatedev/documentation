package microservices

import (
	"context"

	restate "github.com/restatedev/sdk-go"
)

// <start_here>
// <mark_1>
type RoleUpdate struct{}

// <mark_2>
func (RoleUpdate) Update(ctx restate.Context, update UpdateRequest) error {
	// </mark_2>
	// </mark_1>

	// <mark_3>
	previousRole, err := restate.Run(ctx, func(ctx restate.RunContext) (UserRole, error) {
		return getCurrentRole(ctx, update.UserId)
	})
	if err != nil {
		return err
	}
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (bool, error) {
		return applyUserRole(ctx, update.UserId, update.Role)
	}); err != nil {
		return err
	}
	// </mark_3>

	var previousPermissions []Permission
	for _, permission := range update.Permissions {
		// <mark_4>
		// <mark_3>
		previous, err := restate.Run(ctx, func(ctx restate.RunContext) (Permission, error) {
			return applyPermission(ctx, update.UserId, permission)
		})
		if err != nil {
			if restate.IsTerminalError(err) {
				if err := rollback(ctx, update.UserId, previousRole, previousPermissions); err != nil {
					return err
				}
			}
			return err
		}
		// </mark_3>
		previousPermissions = append(previousPermissions, previous)
		// </mark_4>
	}

	return nil
}

// <end_here>

func rollback(
	ctx restate.Context,
	userId string,
	role UserRole,
	permissions []Permission,
) error {
	ctx.Log().Info(">>> !!! ROLLING BACK CHANGES !!! <<<")
	for i := len(permissions) - 1; i >= 0; i-- {
		if _, err := restate.Run(ctx, func(ctx restate.RunContext) (Permission, error) {
			return applyPermission(ctx, userId, permissions[i])
		}); err != nil {
			return err
		}
	}
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (bool, error) {
		return applyUserRole(ctx, userId, role)
	}); err != nil {
		return err
	}
	return nil
}

type UserRole struct {
	RoleKey         string
	RoleDescription string
}

type Permission struct {
	PermissionKey string
	Setting       string
}

type UpdateRequest struct {
	UserId      string
	Role        UserRole
	Permissions []Permission
}

func applyUserRole(
	ctx context.Context,
	userId string,
	userRole UserRole,
) (bool, error) {
	return true, nil
}

func applyPermission(
	ctx context.Context,
	userId string,
	permission Permission,
) (Permission, error) {
	return Permission{PermissionKey: permission.PermissionKey, Setting: "blocked"}, nil
}

func getCurrentRole(ctx context.Context, userId string) (UserRole, error) {
	// in this example, the previous role was always just 'viewer'
	return UserRole{RoleKey: "viewer", RoleDescription: "User that cannot do much"}, nil
}
