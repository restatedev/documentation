package develop

import (
	"context"
	"log"

	restate "github.com/restatedev/sdk-go"
	server "github.com/restatedev/sdk-go/server"
)

func serving() {
	// <start_endpoint>
	if err := server.NewRestate().
		Bind(restate.Reflect(MyService{})).
		Bind(restate.Reflect(MyVirtualObject{})).
		Bind(restate.Reflect(MyWorkflow{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
	// <end_endpoint>

	// <start_custom_endpoint>
	handler, err := server.NewRestate().
		Bind(restate.Reflect(MyService{})).
		Bind(restate.Reflect(MyVirtualObject{})).
		Bind(restate.Reflect(MyWorkflow{})).
		Handler()
	if err != nil {
		log.Fatal(err)
	}
	// <end_custom_endpoint>
	_ = handler

	// <start_identity>
	if err := server.NewRestate().
		Bind(restate.Reflect(MyService{})).
		// !mark
		WithIdentityV1("publickeyv1_w7YHemBctH5Ck2nQRQ47iBBqhNHy4FV7t2Usbye2A6f").
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
	// <end_identity>
}
