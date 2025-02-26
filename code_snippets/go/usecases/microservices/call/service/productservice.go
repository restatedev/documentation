package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log/slog"
	"os"
)

type ProductService struct{}

func (ProductService) Reserve(ctx restate.ObjectContext) (bool, error) {
	reserved, err := restate.Get[bool](ctx, "reserved")
	if err != nil {
		return false, err
	}

	if reserved == true {
		slog.Info("Product already reserved")
		return false, nil
	}

	slog.Info("Reserving product")
	restate.Set(ctx, "reserved", true)
	return true, nil
}

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(ProductService{})).
		Start(context.Background(), ":9080"); err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}
}
