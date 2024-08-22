package main

import (
	"context"
	"fmt"
	"log"

	"github.com/restatedev/documentation/code_snippets/go/develop/codegen/proto"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
)

// <start_server>
type greeter struct {
	proto.UnimplementedGreeterServer
}

func (greeter) SayHello(ctx restate.Context, req *proto.HelloRequest) (*proto.HelloResponse, error) {
	return &proto.HelloResponse{
		Message: fmt.Sprintf("%s!", req.Name),
	}, nil
}

func main() {
	if err := server.NewRestate().
		Bind(proto.NewGreeterServer(greeter{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
}

// <end_server>

type GreeterClient struct{}

func (GreeterClient) CallGreeter(ctx restate.Context) error {
	// <start_client>
	client := proto.NewGreeterClient(ctx)
	resp, err := client.SayHello().Request(&proto.HelloRequest{Name: "world"})
	if err != nil {
		return err
	}
	// <end_client>
	_ = resp

	{
		// <start_virtual_object_client>
		client := proto.NewCounterClient(ctx, "key-1")
		resp, err := client.Add().Request(&proto.AddRequest{Delta: 1})
		if err != nil {
			return err
		}
		// <end_virtual_object_client>
		_ = resp
	}

	return nil
}
