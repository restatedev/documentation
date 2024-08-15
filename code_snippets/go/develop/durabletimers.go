package develop

import (
	"time"

	restate "github.com/restatedev/sdk-go"
)

type DurableTimers struct{}

func (DurableTimers) Greet(ctx restate.Context, name string) (restate.Void, error) {
	// <start_here>
	ctx.Sleep(10 * time.Second)
	// <end_here>
	return restate.Void{}, nil
}
