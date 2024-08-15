package develop

import (
	"errors"

	restate "github.com/restatedev/sdk-go"
)

type State struct{}

func (State) Greet(ctx restate.ObjectContext, greeting string) (restate.Void, error) {
	// <start_statekeys>
	stateKeys := ctx.Keys()
	// <end_statekeys>
	_ = stateKeys

	// <start_get>
	myString, err := restate.GetAs[string](ctx, "my-string-key")
	if err != nil {
		if errors.Is(restate.ErrKeyNotFound, err) {
			myString = "my-default"
		} else {
			return restate.Void{}, err
		}
	}
	myNumber, err := restate.GetAs[int](ctx, "my-number-key")
	if err != nil && !errors.Is(restate.ErrKeyNotFound, err) {
		return restate.Void{}, err
	}
	// <end_get>
	_ = myString
	_ = myNumber

	// <start_set>
	if err := ctx.Set("my-key", "my-new-value"); err != nil {
		return restate.Void{}, err
	}
	// <end_set>

	// <start_clear>
	ctx.Clear("my-key")
	// <end_clear>

	// <start_clear_all>
	ctx.ClearAll()
	// <end_clear_all>

	return restate.Void{}, nil
}
