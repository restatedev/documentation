package develop

import (
	"time"

	restate "github.com/restatedev/sdk-go"
)

type Router struct{}

func (Router) Greet(ctx restate.Context, name string) error {
	// <start_request_response_service>
	response, err := restate.Service[string](ctx, "MyService", "MyHandler").Request("Hi")
	if err != nil {
		return err
	}
	// <end_request_response_service>

	_ = response
	return nil
}

func (Router) Greet2(ctx restate.Context, name string) error {
	// <start_request_response_object>
	response, err := restate.Object[string](ctx, "MyVirtualObject", "Mary", "MyHandler").Request("Hi")
	if err != nil {
		return err
	}
	// <end_request_response_object>

	_ = response

	// <start_one_way_service>
	restate.ServiceSend(ctx, "MyService", "MyHandler").Send("Hi")
	// <end_one_way_service>

	// <start_one_way_object>
	restate.ObjectSend(ctx, "MyService", "Mary", "MyHandler").Send("Hi")
	// <end_one_way_object>

	// <start_delayed_service>
	restate.ServiceSend(ctx, "MyService", "MyHandler").Send("Hi", restate.WithDelay(5*time.Second))
	// <end_delayed_service>

	// <start_delayed_object>
	restate.ObjectSend(ctx, "MyService", "Mary", "MyHandler").Send("Hi", restate.WithDelay(5*time.Second))
	// <end_delayed_object>

	// <start_ordering>
	restate.ObjectSend(ctx, "MyService", "Mary", "MyHandler").Send("I'm call A")
	restate.ObjectSend(ctx, "MyService", "Mary", "MyHandler").Send("I'm call B")
	// <end_ordering>

	return nil
}
