package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log"
)

type TaskOpts struct {
	Id          string `json:"id"`
	Description string `json:"description"`
}

type Result struct {
	Description string `json:"description"`
}

// <start_here>
type AsyncTaskWorker struct{}

// <mark_1>
func (AsyncTaskWorker) RunTask(ctx restate.Context, task TaskOpts) (Result, error) {
	return someHeavyWork(task)
}

// </mark_1>
// <end_here>

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(AsyncTaskWorker{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
}

func someHeavyWork(task TaskOpts) (Result, error) {
	// Implement doing the heavy work...
	return Result{}, nil
}
