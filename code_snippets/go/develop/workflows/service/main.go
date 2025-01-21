package main

import (
	"context"
	"log"

	restate "github.com/restatedev/sdk-go"
	server "github.com/restatedev/sdk-go/server"
)

type MyService struct{}

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func (MyService) MyHandler(ctx restate.Context, greeting string) error {

	// <start_here>
	resp, err := restate.Workflow[bool](ctx, "SignupWorkflow", "someone", "Run").
		Request(User{Name: "John Doe", Email: "john@doe.com"})
	if err != nil {
		return err
	}

	workflowStatus, err := restate.Workflow[string](ctx, "SignupWorkflow", "someone", "GetStatus").
		Request(nil)
	if err != nil {
		return err
	}
	// <end_here>

	// make compiler stop complaining
	if !resp {
		return nil
	}
	log.Printf("Workflow status: %s", workflowStatus)

	return nil
}

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(MyService{})).
		Start(context.Background(), "0.0.0.0:9081"); err != nil {
		log.Fatal(err)
	}
}
