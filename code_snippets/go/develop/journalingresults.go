package develop

import (
	"fmt"
	"math/rand/v2"
	"time"

	restate "github.com/restatedev/sdk-go"
)

type JournalingResults struct{}

func (JournalingResults) Greet(ctx restate.Context, name string) (restate.Void, error) {
	// <start_side_effect>
	result, err := restate.RunAs(ctx, func(ctx restate.RunContext) (string, error) {
		return doDbRequest()
	})
	if err != nil {
		return restate.Void{}, nil
	}
	// <end_side_effect>

	_ = result

	return restate.Void{}, nil
}

func (JournalingResults) PromiseCombinators(ctx restate.Context, name string) (string, error) {
	// <start_race>
	sleepFuture := ctx.After(100 * time.Millisecond)
	callFuture, err := restate.CallAs[string](ctx.Service("MyService", "MyHandler")).RequestFuture("hi")
	if err != nil {
		return "", err
	}

	selector := ctx.Select(sleepFuture, callFuture)
	switch selector.Select() {
	case sleepFuture:
		if err := sleepFuture.Done(); err != nil {
			return "", err
		}
		return "sleep won", nil
	case callFuture:
		result, err := callFuture.Response()
		if err != nil {
			return "", err
		}
		return fmt.Sprintf("call won with result: %s", result), nil
	}
	// <end_race>

	// <start_uuid>
	uuid := ctx.Rand().UUID()
	// <end_uuid>

	_ = uuid

	// <start_random_nb>
	randomInt := ctx.Rand().Uint64()
	randomFloat := ctx.Rand().Float64()
	randomSource := rand.New(ctx.Rand().Source())
	// <end_random_nb>

	_ = randomInt
	_ = randomFloat
	_ = randomSource

	return "", nil
}

func doDbRequest() (string, error) {
	return "", nil
}
