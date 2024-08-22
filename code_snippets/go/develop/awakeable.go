package develop

import (
	"fmt"

	restate "github.com/restatedev/sdk-go"
)

type Awakeable struct{}

func (Awakeable) Greet(ctx restate.Context, name string) error {
	// <start_here>
	// <mark_1>
	awakeable := restate.Awakeable[string](ctx)
	awakeableId := awakeable.Id()
	// </mark_1>

	// <mark_2>
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return triggerTaskAndDeliverId(awakeableId)
	}); err != nil {
		return err
	}
	// </mark_2>

	// <mark_3>
	payload, err := awakeable.Result()
	if err != nil {
		return err
	}
	// </mark_3>
	// <end_here>

	_ = payload

	// <start_resolve>
	restate.ResolveAwakeable(ctx, awakeableId, "hello")
	// <end_resolve>

	// <start_reject>
	restate.RejectAwakeable(ctx, awakeableId, fmt.Errorf("my error reason"))
	// <end_reject>

	return nil
}

func triggerTaskAndDeliverId(awakeableId string) (string, error) {
	return "123", nil
}
