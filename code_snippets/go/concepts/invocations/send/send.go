package send

import (
	restate "github.com/restatedev/sdk-go"
)

type MyService struct{}

// <start_one_way_call>
func (MyService) MyRestateHandler(ctx restate.Context) error {
	// !focus
	restate.
		// !focus
		ServiceSend(ctx, "Greeter", "Greet").
		// !focus
		Send("Hi")
	return nil
}

// <end_one_way_call>
