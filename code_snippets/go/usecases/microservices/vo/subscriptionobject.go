package vo

import (
	"github.com/aws/aws-lambda-go/lambda"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log"
)

type SubscriptionRequest struct {
	UserID       string `json:"userId"`
	CreditCard   string `json:"creditCard"`
	Subscription string `json:"subscription"`
}

// <start_here>
type SubscriptionObject struct{}

// <mark_2>
func (SubscriptionObject) Add(ctx restate.ObjectContext, req SubscriptionRequest) error {
	// </mark_2>

	// <mark_1>
	restate.Set(ctx, "subscription", "awaiting_payment")
	// </mark_1>
	paymentId := restate.Rand(ctx).UUID().String()
	success, err := restate.Run(ctx, func(ctx restate.RunContext) (bool, error) {
		return CreateRecurringPayment(req.CreditCard, paymentId)
	})
	if err != nil {
		return err
	}
	if !success {
		// <mark_1>
		restate.Set(ctx, "subscription", "payment_failed")
		// </mark_1>
		return nil
	}

	// <mark_1>
	restate.Set(ctx, "subscription", "creating_subscription")
	// </mark_1>
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, CreateSubscription(req.UserID, req.Subscription)
	}); err != nil {
		return err
	}
	// <mark_1>
	restate.Set(ctx, "subscription", "created")
	// </mark_1>

	return nil
}

// <mark_3>
func main() {
	handler, err := server.NewRestate().
		Bind(restate.Reflect(SubscriptionObject{})).
		Bidirectional(false).
		LambdaHandler()
	if err != nil {
		log.Fatal(err)
	}
	lambda.Start(handler)
}

// </mark_3>
// <end_here>

func CreateSubscription(id string, subscription string) error {
	return nil
}

func CreateRecurringPayment(card string, id string) (bool, error) {
	return true, nil
}
