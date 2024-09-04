package main

import (
	"context"
	"fmt"
	"log"

	restate "github.com/restatedev/sdk-go"
	server "github.com/restatedev/sdk-go/server"
)

type MyVirtualObject struct{}

func (MyVirtualObject) MyHandler(ctx restate.ObjectContext, greeting string) (string, error) {
	return fmt.Sprintf("%s %s!", greeting, restate.Key(ctx)), nil
}

func (MyVirtualObject) MyConcurrentHandler(ctx restate.ObjectSharedContext, greeting string) (string, error) {
	return fmt.Sprintf("%s %s!", greeting, restate.Key(ctx)), nil
}

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(MyVirtualObject{})).
		Start(context.Background(), "0.0.0.0:9080"); err != nil {
		log.Fatal(err)
	}
}
