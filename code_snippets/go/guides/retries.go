package guides

import (
	"fmt"
	"math/rand/v2"
	"time"

	restate "github.com/restatedev/sdk-go"
)

type RetriesService struct{}

func (RetriesService) Greet(ctx restate.Context, name string) error {
	// <start_catch>
	result, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return writeToOtherSystem()
	})
	if err != nil {
		if restate.IsTerminalError(err) {
			// Handle the terminal error after retries exhausted
			// For example, undo previous actions (see sagas guide) and
			// propagate the error back to the caller
		}
		return err
	}
	// <end_catch>

	_ = result

	return nil
}

func writeToOtherSystem() (string, error) {
	return "", nil
}
