package saga

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log/slog"
)

type SubscriptionRequest struct {
	UserID        string   `json:"userId"`
	CreditCard    string   `json:"creditCard"`
	Subscriptions []string `json:"subscriptions"`
}

// <start_here>
type SubscriptionSaga struct{}

func (SubscriptionSaga) Add(ctx restate.Context, req SubscriptionRequest) error {
	// <mark_1>
	compensations := make([]func() error, 0, len(req.Subscriptions)+1)
	// </mark_1>
	handleError := func(err error) error {
		if restate.IsTerminalError(err) {
			// <mark_2>
			for _, compensation := range compensations {
				if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
					return restate.Void{}, compensation()
				}); err != nil {
					return err
				}
			}
			// </mark_2>
		}
		return err
	}

	paymentId := restate.Rand(ctx).UUID().String()
	// <mark_1>
	compensations = append(compensations, func() error {
		return RemoveRecurringPayment(req.CreditCard, paymentId)
	})
	// </mark_1>
	_, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return CreateRecurringPayment(req.CreditCard, paymentId)
	})
	if err != nil {
		// <mark_2>
		return handleError(err)
		// </mark_2>
	}

	for _, subscription := range req.Subscriptions {
		// <mark_1>
		compensations = append(compensations, func() error {
			return RemoveSubscription(req.UserID, subscription)
		})
		// </mark_1>
		if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			return CreateSubscription(req.UserID, subscription)
		}); err != nil {
			// <mark_2>
			return handleError(err)
			// </mark_2>
		}
	}
	return nil
}

// <end_here>

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(SubscriptionSaga{})).
		Start(context.Background(), ":9080"); err != nil {
		slog.Error(err.Error())
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
