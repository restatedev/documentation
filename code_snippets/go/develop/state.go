package develop

import (
	restate "github.com/restatedev/sdk-go"
)

type State struct{}

func (State) Greet(ctx restate.ObjectContext, greeting string) error {
	// <start_statekeys>
	stateKeys, err := restate.Keys(ctx)
	if err != nil {
		return err
	}
	// <end_statekeys>
	_ = stateKeys

	// <start_get>
	myString := "my-default"
	if s, err := restate.Get[*string](ctx, "my-string-key"); err != nil {
		return err
	} else if s != nil {
		myString = *s
	}

	myNumber, err := restate.Get[int](ctx, "my-number-key")
	if err != nil {
		return err
	}
	// <end_get>
	_ = myString
	_ = myNumber

	// <start_set>
	restate.Set(ctx, "my-key", "my-new-value")
	// <end_set>

	// <start_clear>
	restate.Clear(ctx, "my-key")
	// <end_clear>

	// <start_clear_all>
	restate.ClearAll(ctx)
	// <end_clear_all>

	return nil
}
