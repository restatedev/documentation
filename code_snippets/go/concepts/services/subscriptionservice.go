package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log"
)

type SubscriptionRequest struct {
	UserID        string   `json:"userId"`
	CreditCard    string   `json:"creditCard"`
	Subscriptions []string `json:"subscriptions"`
}

// <start_here>
// <mark_2>
type SubscriptionService struct{}

// </mark_2>

// <mark_2>
func (SubscriptionService) Add(ctx restate.Context, req SubscriptionRequest) error {
	// </mark_2>
	// <mark_3>
	// <mark_1>
	paymentId := restate.Rand(ctx).UUID().String()
	// </mark_1>

	// <mark_1>
	payRef, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return CreateRecurringPayment(req.CreditCard, paymentId)
	})
	// </mark_1>
	if err != nil {
		return err
	}

	for _, subscription := range req.Subscriptions {
		// <mark_1>
		if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			return restate.Void{}, CreateSubscription(req.UserID, subscription, payRef)
			// </mark_1>
		}); err != nil {
			return err
		}
	}

	return nil
	// </mark_3>
}

func main() {
	// <mark_4>
	if err := server.NewRestate().
		Bind(restate.Reflect(SubscriptionService{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
	// </mark_4>
}

// <end_here>

func CreateSubscription(id string, subscription string, ref string) error {
	return nil
}

func CreateRecurringPayment(card string, id string) (string, error) {
	return id, nil
}
