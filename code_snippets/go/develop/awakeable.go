package develop

import (
	"fmt"

	restate "github.com/restatedev/sdk-go"
)

type Awakeable struct{}

func (Awakeable) Greet(ctx restate.Context, name string) (restate.Void, error) {
	// <start_here>
	// <mark_1>
	awakeable := restate.AwakeableAs[string](ctx)
	awakeableId := awakeable.Id()
	// </mark_1>

	// <mark_2>
	restate.RunAs(ctx, func(ctx restate.RunContext) (string, error) {
		return triggerTaskAndDeliverId(awakeableId)
	})
	// </mark_2>

	// <mark_3>
	payload, err := awakeable.Result()
	if err != nil {
		return restate.Void{}, err
	}
	// </mark_3>
	// <end_here>

	_ = payload

	// <start_resolve>
	if err := ctx.ResolveAwakeable(awakeableId, "hello"); err != nil {
		return restate.Void{}, err
	}
	// <end_resolve>

	// <start_reject>
	ctx.RejectAwakeable(awakeableId, fmt.Errorf("my error reason"))
	// <end_reject>

	return restate.Void{}, nil
}

func triggerTaskAndDeliverId(awakeableId string) (string, error) {
	return "123", nil
}
