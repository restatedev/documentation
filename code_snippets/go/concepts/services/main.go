package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"os"

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

var killProcess = os.Getenv("CRASH_PROCESS") == "true"

func maybeCrash(probability float64) error {
	if rand.Float64() < probability {
		log.Println("A failure happened!")

		if killProcess {
			log.Fatal("--- CRASHING THE PROCESS ---")
		} else {
			return fmt.Errorf("A failure happened!")
		}
	}
	return nil
}

func applyUserRole(
	userId string,
	userRole UserRole,
) (bool, error) {
	if err := maybeCrash(0.3); err != nil {
		return false, err
	}
	log.Printf(`>>> Applied role %s for user %s\n`, userRole.RoleKey, userId)
	return true, nil
}

func applyPermission(
	userId string,
	permission Permission,
) error {
	if err := maybeCrash(0.2); err != nil {
		return err
	}
	log.Printf(
		">>> Applied permission %s:%2 for user %s\n", permission.PermissionKey, permission.Setting, userId,
	)
	return nil
}
