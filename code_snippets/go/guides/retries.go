package guides

import (
	restate "github.com/restatedev/sdk-go"
	"log/slog"
	"time"
)

type MyService struct{}

func (MyService) Greet(ctx restate.Context, name string) error {
	// <start_catch>
	result, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return writeToOtherSystem()
	})
	if err != nil {
		if restate.IsTerminalError(err) {
			// Handle the terminal error after retries exhausted
			// For example, undo previous actions (see sagas guide) and
			// propagate the error back to the caller
		}
		return err
	}
	// <end_catch>

	_ = result

	return nil
}

// <start_raw>
func (MyService) myHandler(ctx restate.Context) (string, error) {
	// !mark
	rawRequest := ctx.Request().Body
	decodedRequest, err := decodeRequest(rawRequest)
	if err != nil {
		if restate.IsTerminalError(err) {
			// Propagate to DLQ/catch-all handler
		}
		return "", err
	}

	// ... rest of your business logic ...
	return decodedRequest, nil
}

// <end_raw>

func (MyService) myTimeoutHandler(ctx restate.Context) error {
	// <start_timeout>
	awakeable := restate.Awakeable[string](ctx)
	// !mark
	timeout := restate.After(ctx, 5*time.Second)
	// !mark
	selector := restate.Select(ctx, awakeable, timeout)
	switch selector.Select() {
	case awakeable:
		result, err := awakeable.Result()
		if err != nil {
			return err
		}
		slog.Info("Awakeable resolved first with: " + result)
	case timeout:
		if err := timeout.Done(); err != nil {
			return err
		}
		slog.Info("Timeout hit first")
	}
	// <end_timeout>
	return nil
}

func decodeRequest(request []byte) (string, error) {
	return "req", nil
}

func writeToOtherSystem() (string, error) {
	return "", nil
}
