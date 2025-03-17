package develop

import (
	"time"

	restate "github.com/restatedev/sdk-go"
)

type Router struct{}

func (Router) Greet(ctx restate.Context, name string) error {
	// <start_request_response_service>
	response, err := restate.Service[string](ctx, "MyService", "MyHandler").
		Request("Hi")
	if err != nil {
		return err
	}
	// <end_request_response_service>

	_ = response
	return nil
}

func (Router) Greet2(ctx restate.Context, name string) error {
	// <start_request_response_object>
	response, err := restate.Object[string](ctx, "MyVirtualObject", "Mary", "MyHandler").
		Request("Hi")
	if err != nil {
		return err
	}
	// <end_request_response_object>

	// <start_request_response_workflow>
	// Call the `run` handler of the workflow (only works once).
	result, err := restate.Workflow[bool](ctx, "MyWorkflow", "my-workflow-id", "Run").
		Request("Hi")
	if err != nil {
		return err
	}
	// Call some other `GetStatus` handler of the workflow.
	status, err := restate.Workflow[restate.Void](ctx, "MyWorkflow", "my-workflow-id", "GetStatus").
		Request("Hi again")
	if err != nil {
		return err
	}
	// <end_request_response_workflow>

	_ = response
	_ = result
	_ = status

	// <start_one_way_service>
	restate.ServiceSend(ctx, "MyService", "MyHandler").Send("Hi")
	// <end_one_way_service>

	// <start_one_way_object>
	restate.ObjectSend(ctx, "MyService", "Mary", "MyHandler").Send("Hi")
	// <end_one_way_object>

	// <start_one_way_workflow>
	// Call the `run` handler of the workflow (only works once).
	restate.WorkflowSend(ctx, "MyWorkflow", "my-workflow-id", "Run").
		Send("Hi")
	// Call some other `interactWithWorkflow` handler of the workflow.
	restate.WorkflowSend(ctx, "MyWorkflow", "my-workflow-id", "InteractWithWorkflow").
		Send("Hi again")
	// <end_one_way_workflow>

	// <start_delayed_service>
	restate.ServiceSend(ctx, "MyService", "MyHandler").
		Send("Hi", restate.WithDelay(5*time.Second))
	// <end_delayed_service>

	// <start_delayed_object>
	restate.ObjectSend(ctx, "MyService", "Mary", "MyHandler").
		Send("Hi", restate.WithDelay(5*time.Second))
	// <end_delayed_object>

	// <start_delayed_workflow>
	restate.WorkflowSend(ctx, "MyWorkflow", "my-workflow-id", "Run").
		Send("Hi", restate.WithDelay(5*time.Second))
	// <end_delayed_workflow>

	// <start_ordering>
	restate.ObjectSend(ctx, "MyService", "Mary", "MyHandler").Send("I'm call A")
	restate.ObjectSend(ctx, "MyService", "Mary", "MyHandler").Send("I'm call B")
	// <end_ordering>

	return nil
}

func (Router) Greet3(ctx restate.Context, name string) error {
	// <start_idempotency_key>
	restate.
		ServiceSend(ctx, "MyService", "MyHandler").
		// Send attaching idempotency key
		Send("Hi", restate.WithIdempotencyKey("my-idempotency-key"))
	// <end_idempotency_key>

	// <start_attach>
	// Execute the request and retrieve the invocation id
	invocationId := restate.
		ServiceSend(ctx, "MyService", "MyHandler").
		// Optional: send attaching idempotency key
		Send("Hi", restate.WithIdempotencyKey("my-idempotency-key")).
		GetInvocationId()

	// Later re-attach to the request
	response, err := restate.AttachInvocation[string](ctx, invocationId).Response()
	// <end_attach>

	_ = response
	_ = err
	return nil
}

func (Router) Greet4(ctx restate.Context, name string) error {
	// <start_cancel>
	// Execute the request and retrieve the invocation id
	invocationId := restate.
		ServiceSend(ctx, "MyService", "MyHandler").
		Send("Hi").
		GetInvocationId()

	// I don't need this invocation anymore, let me just cancel it
	restate.CancelInvocation(ctx, invocationId)
	// <end_cancel>

	return nil
}
