package develop

import (
	"context"
	"log/slog"
	"os"

	restate "github.com/restatedev/sdk-go"
	server "github.com/restatedev/sdk-go/server"
)

type Monitoring struct{}

func (Monitoring) Greet(ctx restate.Context, name string) error {
	// <start_logger>
	ctx.Log().Info("This will not be printed again during replays")
	ctx.Log().Debug("This will not be printed again during replays")
	// <end_logger>

	return nil
}

func main() {
	// <start_handler>
	myHandler := slog.NewJSONHandler(os.Stdout, nil)
	server.NewRestate().
		WithLogger(myHandler, true).
		Bind(restate.Reflect(Monitoring{})).
		Start(context.Background(), "0.0.0.0:9080")
	// <end_handler>
}
