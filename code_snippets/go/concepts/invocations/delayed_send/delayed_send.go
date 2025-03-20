package delayed_send

import (
	"time"

	restate "github.com/restatedev/sdk-go"
)

type MyService struct{}

// <start_delayed_call>
func (MyService) MyRestateHandler(ctx restate.Context) error {
	// !focus
	restate.
		// !focus
		ServiceSend(ctx, "Greeter", "Greet").
		// !focus
		Send("Hi", restate.WithDelay(1*time.Second))
	return nil
}

// <end_delayed_call>
