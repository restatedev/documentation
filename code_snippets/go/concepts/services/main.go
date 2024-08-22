package main

import (
	"context"
	"log"

	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
)

type RoleUpdate struct{}

// <start_here>
// <mark_2>
func (RoleUpdate) ApplyRoleUpdate(ctx restate.Context, update UpdateRequest) error {
	// </mark_2>

	// <mark_1>
	success, err := restate.Run(ctx, func(ctx restate.RunContext) (bool, error) {
		return applyUserRole(update.UserId, update.Role)
	})
	if err != nil {
		return err
	}
	// </mark_1>
	// <mark_3>
	if !success {
		return nil
	}
	// </mark_3>

	// <mark_3>
	for _, permission := range update.Permissions {
		// </mark_3>
		// <mark_1>
		if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			return restate.Void{}, applyPermission(update.UserId, permission)
		}); err != nil {
			return err
		}
		// </mark_1>
		// <mark_3>
	}
	// </mark_3>

	return nil
}

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(RoleUpdate{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
}

// <end_here>

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
	userId string,
	userRole UserRole,
) (bool, error) {
	return true, nil
}

func applyPermission(
	userId string,
	permission Permission,
) error {
	return nil
}
