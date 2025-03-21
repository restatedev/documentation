package main

import (
	"context"
	"fmt"
	"log"

	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
)

// <start_here>
type Greeter struct{}

// <mark_1>
// <mark_3>
func Greet(ctx restate.ObjectContext, greeting string) (string, error) {
	// </mark_3>
	name := restate.Key(ctx)
	// </mark_1>
	// <mark_2>
	count, err := restate.Get[int](ctx, "count")
	// </mark_2>
	if err != nil {
		return "", err
	}
	count++
	// <mark_2>
	restate.Set(ctx, "count", count)
	// </mark_2>
	return fmt.Sprintf(
		"%s %s for the %d-th time.",
		greeting, name, count,
	), nil
}

// <mark_1>
// <mark_3>
func Ungreet(ctx restate.ObjectContext) (string, error) {
	// </mark_3>
	name := restate.Key(ctx)
	// </mark_1>
	// <mark_2>
	count, err := restate.Get[int](ctx, "count")
	// </mark_2>
	if err != nil {
		return "", err
	}
	if count > 0 {
		count--
	}
	// <mark_2>
	restate.Set(ctx, "count", count)
	// </mark_2>
	return fmt.Sprintf(
		"Dear %s, taking one greeting back: %d.",
		name, count,
	), nil
}

// <mark_4>
func GetGreetCount(ctx restate.ObjectSharedContext) (int, error) {
	// <mark_2>
	return restate.Get[int](ctx, "count")
	// </mark_2>
}

// </mark_4>

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(Greeter{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
}

// <end_here>
