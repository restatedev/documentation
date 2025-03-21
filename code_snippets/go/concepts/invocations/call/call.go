package call

import (
	restate "github.com/restatedev/sdk-go"
)

type MyService struct{}

// <start_rpc_call>
func (MyService) MyRestateHandler(ctx restate.Context) (string, error) {
	// !focus
	greet, err := restate.
		// !focus
		Service[string](ctx, "Greeter", "Greet").
		// !focus
		Request("Hi")
	return greet, err
}

// <end_rpc_call>
