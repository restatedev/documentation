package concepts

import (
	"time"

	restate "github.com/restatedev/sdk-go"
)

type MyService struct{}

/*
// <start_rpc_call>
func (MyService) MyRestateHandler(ctx restate.Context) error {
	// focus
	greet, err := restate.
		// focus
		Service[string](ctx, "Greeter", "Greet").
		// focus
		Request("Hi")
	return err
}

// <end_rpc_call>

// <start_one_way_call>
func (MyService) MyRestateHandler(ctx restate.Context) error {
	// focus
	restate.
		// focus
		ServiceSend(ctx, "Greeter", "Greet").
		// focus
		Send("Hi")
	return nil
}

// <end_one_way_call>
*/

// <start_delayed_call>
func (MyService) MyRestateHandler(ctx restate.Context) error {
	// focus
	restate.
		// focus
		ServiceSend(ctx, "Greeter", "Greet").
		// focus
		Send("Hi", restate.WithDelay(1*time.Second))
	return nil
}

// <end_delayed_call>
