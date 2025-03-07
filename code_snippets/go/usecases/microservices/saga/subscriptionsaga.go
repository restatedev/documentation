package saga

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
type SubscriptionSaga struct{}

func (SubscriptionSaga) Add(ctx restate.Context, req SubscriptionRequest) (err error) {
	// <mark_1>
	compensations := make([]func() error, 0, len(req.Subscriptions)+1)
	// </mark_1>
	// Run compensations at the end if err != nil
	defer func() {
		if err != nil {
			// <mark_2>
			for _, compensation := range compensations {
				if _, compErr := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
					return restate.Void{}, compensation()
				}); compErr != nil {
					err = compErr
				}
			}
			// </mark_2>
		}
	}()

	paymentId := restate.Rand(ctx).UUID().String()

	// <mark_1>
	compensations = append(compensations, func() error {
		return RemoveRecurringPayment(req.CreditCard, paymentId)
	})
	// </mark_1>
	// <mark_1> green
	_, err = restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return CreateRecurringPayment(req.CreditCard, paymentId)
		// </mark_1>
	})
	if err != nil {
		return
	}

	for _, subscription := range req.Subscriptions {
		// <mark_1>
		compensations = append(compensations, func() error {
			return RemoveSubscription(req.UserID, subscription)
		})
		// </mark_1>
		// <mark_1> green
		if _, err = restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			return CreateSubscription(req.UserID, subscription)
			// </mark_1>
		}); err != nil {
			return
		}
	}
	return nil
}

// <end_here>

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(SubscriptionSaga{})).
		Start(context.Background(), ":9080"); err != nil {

		log.Fatal(err)
	}
}

func RemoveSubscription(id string, subscription string) error {
	return nil
}

func RemoveRecurringPayment(card string, id string) error {
	return nil
}

func CreateSubscription(id string, subscription string) (restate.Void, error) {
	return restate.Void{}, nil
}

func CreateRecurringPayment(card string, id string) (restate.Void, error) {
	return restate.Void{}, nil
}
