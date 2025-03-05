package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log/slog"
	"os"
)

// <start_here>
type FanOutWorker struct{}

func (FanOutWorker) Run(ctx restate.Context, task Task) (Result, error) {
	// Split the task in subtassk
	subtasks, err := split(task)
	if err != nil {
		return Result{}, err
	}

	// <mark_1>
	subtaskFutures := make([]restate.Selectable, 0, len(subtasks))
	for _, subtask := range subtasks {
		subtaskFutures = append(subtaskFutures,
			restate.Service[SubTaskResult](ctx, "FanOutWorker", "RunSubtask").RequestFuture(subtask))
	}
	// </mark_1>

	// <mark_2>
	selector := restate.Select(ctx, subtaskFutures...)
	// </mark_2>

	subResults := make([]SubTaskResult, 0, len(subtasks))
	for selector.Remaining() {
		// <mark_2>
		response, err := selector.Select().(restate.ResponseFuture[SubTaskResult]).Response()
		// </mark_2>
		if err != nil {
			return Result{}, err
		}
		subResults = append(subResults, response)
	}

	return aggregate(subResults)
}

func (FanOutWorker) RunSubtask(ctx restate.Context, subtask SubTask) (SubTaskResult, error) {
	// Processing logic goes here ...
	// Can be moved to a separate service or FaaS to scale independently
	return executeSubtask(ctx, subtask)
}

// <end_here>

func main() {
	server := server.NewRestate().
		Bind(restate.Reflect(FanOutWorker{}))

	if err := server.Start(context.Background(), ":9080"); err != nil {
		slog.Error("application exited unexpectedly", "err", err.Error())
		os.Exit(1)
	}
}
