package develop

import (
	"context"
	"fmt"

	restate "github.com/restatedev/sdk-go"
	server "github.com/restatedev/sdk-go/server"
)

type MyService struct{}

func (MyService) MyHandler(ctx restate.Context, greeting string) (string, error) {
	return fmt.Sprintf("%s!", greeting), nil
}

func serveMyService() {
	server.NewRestate().
		Bind(restate.Reflect(MyService{})).
		Start(context.Background(), "0.0.0.0:9080")
}
