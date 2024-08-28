package develop

import (
	"time"

	restate "github.com/restatedev/sdk-go"
)

type DurableTimers struct{}

func (DurableTimers) Greet(ctx restate.Context, name string) error {
	// <start_here>
	if err := restate.Sleep(ctx, 10*time.Second); err != nil {
		return err
	}
	// <end_here>
	return nil
}
