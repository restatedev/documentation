package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log"
)

type User struct {
	Name  string
	Email string
}

// <start_here>
type SignupWorkflow struct{}

// <mark_1>
func (SignupWorkflow) Run(ctx restate.WorkflowContext, user User) (bool, error) {
	// </mark_1>
	// workflow ID = user ID; workflow runs once per user
	userId := restate.Key(ctx)

	// <mark_2>
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, CreateUserEntry(user)
		// </mark_2>
	}); err != nil {
		return false, err
	}

	// <mark_2>
	secret := restate.Rand(ctx).UUID().String()
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, SendEmailWithLink(userId, user, secret)
		// </mark_2>
	}); err != nil {
		return false, err
	}

	// <mark_2>
	// <mark_3>
	clickSecret, err := restate.Promise[string](ctx, "link-clicked").Result()
	// </mark_3>
	// </mark_2>
	if err != nil {
		return false, err
	}

	return clickSecret == secret, nil
}

func (SignupWorkflow) Click(ctx restate.WorkflowSharedContext, secret string) error {
	// <mark_3>
	return restate.Promise[string](ctx, "link-clicked").Resolve(secret)
	// </mark_3>
}

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(SignupWorkflow{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
}

// <end_here>
