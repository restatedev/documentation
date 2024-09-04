package develop

import (
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/httpadapter"
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
		Handler()
	if err != nil {
		log.Fatal(err)
	}
	lambda.Start(httpadapter.New(handler).ProxyWithContext)
	// <end_lambda>

}
