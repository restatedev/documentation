package develop

import (
	"fmt"
	"math/rand/v2"
	"time"

	restate "github.com/restatedev/sdk-go"
)

type JournalingResults struct{}

func (JournalingResults) Greet(ctx restate.Context, name string) error {
	// <start_side_effect>
	result, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return doDbRequest()
	})
	if err != nil {
		return err
	}
	// <end_side_effect>

	_ = result

	return nil
}

func (JournalingResults) Greet2(ctx restate.Context, name string) error {
	// <start_side_effect_retry>
	result, err := restate.Run(ctx,
		func(ctx restate.RunContext) (string, error) {
			return doDbRequest()
		},
		// After 10 seconds, give up retrying
		restate.WithMaxRetryDuration(time.Second*10),
		// On the first retry, wait 100 milliseconds before next attempt
		restate.WithInitialRetryInterval(time.Millisecond*100),
		// Grow retry interval with factor 2
		restate.WithRetryIntervalFactor(2.0),
		// Optional: provide a name for the operation to be visible in the
		// observability tools.
		restate.WithName("my_db_request"),
	)
	if err != nil {
		return err
	}
	// <end_side_effect_retry>

	_ = result

	return nil
}

func (JournalingResults) PromiseCombinators(ctx restate.Context, name string) (string, error) {
	// <start_race>
	sleepFuture := restate.After(ctx, 100*time.Millisecond)
	callFuture := restate.Service[string](ctx, "MyService", "MyHandler").RequestFuture("hi")

	selector := restate.Select(ctx, sleepFuture, callFuture)
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
	uuid := restate.Rand(ctx).UUID()
	// <end_uuid>

	_ = uuid

	// <start_random_nb>
	randomInt := restate.Rand(ctx).Uint64()
	randomFloat := restate.Rand(ctx).Float64()
	randomSource := rand.New(restate.Rand(ctx).Source())
	// <end_random_nb>

	_ = randomInt
	_ = randomFloat
	_ = randomSource

	return "", nil
}

func doDbRequest() (string, error) {
	return "", nil
}
