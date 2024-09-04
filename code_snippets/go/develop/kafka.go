package develop

import restate "github.com/restatedev/sdk-go"

type KafkaService struct{}

func (KafkaService) MyEventHandler(ctx restate.Context, name string) error {
	_ =
		// <start_headers>
		ctx.Request().Headers
	// <end_headers>

	return nil
}
