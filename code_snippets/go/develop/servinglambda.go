package develop

import (
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	restate "github.com/restatedev/sdk-go"
	server "github.com/restatedev/sdk-go/server"
)

type MyService struct{}
type MyVirtualObject struct{}

func serveLambda() {
	// <start_lambda>
	handler, err := server.NewRestate().
		Bind(restate.Reflect(MyService{})).
		Bind(restate.Reflect(MyVirtualObject{})).
		Bidirectional(false).
		LambdaHandler()
	if err != nil {
		log.Fatal(err)
	}
	lambda.Start(handler)
	// <end_lambda>

}
