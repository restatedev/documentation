package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log/slog"
	"os"
)

// <start_here>
type SignupWorkflow struct{}

// <mark_1>
func (SignupWorkflow) Run(ctx restate.WorkflowContext, user User) (bool, error) {
	// workflow ID = user ID; workflow runs once per user
	userId := restate.Key(ctx)

	// Durably executed action; write to other system
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, CreateUserEntry(user)
	}); err != nil {
		return false, err
	}

	// <mark_2>
	restate.Set(ctx, "status", "Created user")
	// </mark_2>

	// Send the email with the verification link
	secret := restate.Rand(ctx).UUID().String()
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, SendEmailWithLink(userId, user, secret)
	}); err != nil {
		return false, err
	}

	// <mark_2>
	restate.Set(ctx, "status", "Sent email")
	// </mark_2>

	// Wait until user clicked email verification link
	// Promise gets resolved or rejected by the other handlers
	// <mark_3>
	clickSecret, err := restate.Promise[string](ctx, "email-link").Result()
	// </mark_3>
	if err != nil {
		return false, err
	}

	return clickSecret == secret, nil
}

// </mark_1>

func (SignupWorkflow) Click(ctx restate.WorkflowSharedContext, secret string) error {
	// Send data to the workflow via a durable promise
	// <mark_3>
	return restate.Promise[string](ctx, "email-link").Resolve(secret)
	// </mark_3>
}

// <mark_2>
func (SignupWorkflow) GetStatus(ctx restate.WorkflowSharedContext) (string, error) {
	return restate.Get[string](ctx, "status")
}

// </mark_2>

func main() {
	// <mark_4>
	server := server.NewRestate().
		Bind(restate.Reflect(SignupWorkflow{}))

	if err := server.Start(context.Background(), ":9080"); err != nil {
		slog.Error("application exited unexpectedly", "err", err.Error())
		os.Exit(1)
	}
	// </mark_4>
}

// <end_here>

func SendEmailWithLink(id string, user User, secret string) error {
	return nil
}

func CreateUserEntry(user User) error {
	return nil
}

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}
