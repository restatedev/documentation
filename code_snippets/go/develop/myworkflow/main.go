package myworkflow

// <start_here>
import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log/slog"
	"os"
)

type MyWorkflow struct{}

func (MyWorkflow) Run(ctx restate.WorkflowContext, req string) (string, error) {
	// implement the workflow logic here
	return "success", nil
}

func (MyWorkflow) InteractWithWorkflow(ctx restate.WorkflowSharedContext) error {
	// implement interaction logic here
	// e.g. resolve a promise that the workflow is waiting on
	return nil
}

func main() {
	server := server.NewRestate().
		Bind(restate.Reflect(MyWorkflow{}))

	if err := server.Start(context.Background(), ":9080"); err != nil {
		slog.Error("application exited unexpectedly", "err", err.Error())
		os.Exit(1)
	}
}

// <end_here>
