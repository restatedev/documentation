package eventprocessing

import (
	"time"

	restate "github.com/restatedev/sdk-go"
)

type Profile struct{}

// <start_here>
// <mark_2>
func (Profile) UserEvent(ctx restate.ObjectContext, event UserProfile) {
	// </mark_2>
	// <mark_1>
	restate.Set(ctx, "user", event)
	// </mark_1>
	// <mark_3>
	restate.ObjectSend(ctx, "EventEnricher", restate.Key(ctx), "Emit").
		Send(restate.Void{}, restate.WithDelay(1*time.Second))
	// </mark_3>
}

// <mark_2>
func (Profile) FeatureEvent(ctx restate.ObjectContext, featureEvent string) error {
	// </mark_2>
	// <mark_1>
	userEvent, err := restate.Get[UserProfile](ctx, "user")
	if err != nil {
		return err
	}
	// </mark_1>
	userEvent.Features = append(userEvent.Features, featureEvent)
	// <mark_1>
	restate.Set(ctx, "user", userEvent)
	// </mark_1>

	return nil
}

// <mark_2>
func (Profile) Emit(ctx restate.ObjectContext) error {
	// </mark_2>
	// <mark_1>
	user, err := restate.Get[UserProfile](ctx, "user")
	if err != nil {
		return err
	}
	// </mark_1>
	send(restate.Key(ctx), user)
	// <mark_1>
	restate.ClearAll(ctx)
	// </mark_1>

	return nil
}

// <end_here>

type UserProfile struct {
	Id       string
	Name     string
	Email    string
	Features []string
}

func send(key string, user UserProfile) error { return nil }
