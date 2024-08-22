package main

import (
	"context"
	"fmt"
	"log"

	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
)

type Greeter struct{}

// <start_here>
// <mark_1>
// <mark_3>
func Greet(ctx restate.ObjectContext, greeting string) (string, error) {
	// </mark_3>
	// </mark_1>
	// <mark_2>
	count, err := restate.Get[int](ctx, "count")
	if err != nil {
		return "", err
	}
	count++
	restate.Set(ctx, "count", count)
	// </mark_2>
	// <mark_1>
	return fmt.Sprintf(
		"%s %s for the %d-th time.",
		greeting, restate.Key(ctx), count,
	), nil
	// </mark_1>
}

// <mark_1>
// <mark_3>
func Ungreet(ctx restate.ObjectContext) (string, error) {
	// </mark_3>
	// </mark_1>
	// <mark_2>
	count, err := restate.Get[int](ctx, "count")
	if err != nil {
		return "", err
	}
	// </mark_2>
	if count > 0 {
		// <mark_2>
		count--
		// </mark_2>
	}
	// <mark_2>
	restate.Set(ctx, "count", count)
	// </mark_2>
	// <mark_1>
	return fmt.Sprintf(
		"Dear %s, taking one greeting back: %d.",
		restate.Key(ctx), count,
	), nil
	// </mark_1>
}

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(Greeter{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
}

// <end_here>
