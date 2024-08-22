package eventprocessing

import (
	"context"
	"time"

	restate "github.com/restatedev/sdk-go"
)

type UserUpdates struct{}

// <start_here>
// <mark_1>
func (UserUpdates) UpdateUserEvent(ctx restate.ObjectContext, event UserUpdate) error {
	// </mark_1>

	// <mark_3>
	userId, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return updateProfile(ctx, event.Profile)
	})
	if err != nil {
		return err
	}
	// </mark_3>
	// <mark_4>
	for userId == NOT_READY {
		// <mark_2>
		if err := restate.Sleep(ctx, 5*time.Second); err != nil {
			return err
		}
		// </mark_2>
		// <mark_3>
		userId, err = restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
			return updateProfile(ctx, event.Profile)
		})
		if err != nil {
			return err
		}
		// </mark_3>
	}

	// <mark_3>
	roleId, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return setPermissions(ctx, userId, event.Permissions)
	})
	if err != nil {
		return err
	}
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, provisionResources(ctx, userId, roleId, event.Resources)
	}); err != nil {
		return err
	}
	// </mark_3>
	// </mark_4>

	return nil
}

// <end_here>

type UserUpdate struct {
	Profile     string
	Permissions string
	Resources   string
}

const NOT_READY = "NOT_READY"

func updateProfile(
	ctx context.Context,
	profile string,
) (string, error) {
	return "", nil
}

func setPermissions(
	ctx context.Context,
	id string,
	permissions string,
) (string, error) {
	return permissions, nil
}
func provisionResources(
	ctx context.Context,
	user string,
	role string,
	resources string,
) error {
	return nil
}
