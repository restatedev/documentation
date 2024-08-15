package develop

import (
	"time"

	restate "github.com/restatedev/sdk-go"
)

type Router struct{}

func (Router) Greet(ctx restate.Context, name string) (restate.Void, error) {
	// <start_request_response_service>
	response, err := restate.CallAs[string](ctx.Service("MyService", "MyHandler")).Request("Hi")
	if err != nil {
		return restate.Void{}, err
	}
	// <end_request_response_service>

	_ = response
	return restate.Void{}, nil
}

func (Router) Greet2(ctx restate.Context, name string) (restate.Void, error) {
	// <start_request_response_object>
	response, err := restate.CallAs[string](ctx.Object("MyVirtualObject", "Mary", "MyHandler")).Request("Hi")
	if err != nil {
		return restate.Void{}, err
	}
	// <end_request_response_object>

	_ = response

	// <start_one_way_service>
	if err := ctx.Service("MyService", "MyHandler").Send("Hi", 0); err != nil {
		return restate.Void{}, err
	}
	// <end_one_way_service>

	// <start_one_way_object>
	if err := ctx.Object("MyService", "Mary", "MyHandler").Send("Hi", 0); err != nil {
		return restate.Void{}, err
	}
	// <end_one_way_object>

	// <start_delayed_service>
	if err := ctx.Service("MyService", "MyHandler").Send("Hi", 5*time.Second); err != nil {
		return restate.Void{}, err
	}
	// <end_delayed_service>

	// <start_delayed_object>
	if err := ctx.Object("MyService", "Mary", "MyHandler").Send("Hi", 5*time.Second); err != nil {
		return restate.Void{}, err
	}
	// <end_delayed_object>

	// <start_ordering>
	if err := ctx.Object("MyService", "Mary", "MyHandler").Send("I'm call A", 0); err != nil {
		return restate.Void{}, err
	}
	if err := ctx.Object("MyService", "Mary", "MyHandler").Send("I'm call B", 0); err != nil {
		return restate.Void{}, err
	}
	// <end_ordering>

	return restate.Void{}, nil
}
