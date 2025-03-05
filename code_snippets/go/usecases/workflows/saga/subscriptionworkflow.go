package saga

import (
	"github.com/aws/aws-lambda-go/lambda"
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
type SubscriptionWorkflow struct{}

func (SubscriptionWorkflow) Run(ctx restate.WorkflowContext, req SubscriptionRequest) error {
	// <mark_2> orange
	compensations := make([]func() error, 0, len(req.Subscriptions)+1)
	// </mark_2>
	handleError := func(err error) error {
		if restate.IsTerminalError(err) {
			// <mark_2> orange
			for _, compensation := range compensations {
				if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
					return restate.Void{}, compensation()
				}); err != nil {
					return err
				}
			}
			// </mark_2>
		}
		// <mark_1>
		restate.Set(ctx, "status", "rolled_back")
		// </mark_1>
		return err
	}

	paymentId := restate.Rand(ctx).UUID().String()
	// <mark_2> orange
	compensations = append(compensations, func() error {
		return RemoveRecurringPayment(req.CreditCard, paymentId)
	})
	// </mark_2>
	// <mark_2> green
	_, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return CreateRecurringPayment(req.CreditCard, paymentId)
		// </mark_2>
	})
	if err != nil {
		// <mark_2>
		return handleError(err)
		// </mark_2>
	}
	// <mark_1>
	restate.Set(ctx, "status", "payment_success")
	// </mark_1>

	for _, subscription := range req.Subscriptions {
		// <mark_2> orange
		compensations = append(compensations, func() error {
			return RemoveSubscription(req.UserID, subscription)
		})
		// </mark_2>
		// <mark_2> green
		if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			return CreateSubscription(req.UserID, subscription)
			// </mark_2>
		}); err != nil {
			// <mark_2>
			return handleError(err)
			// </mark_2>
		}
	}
	// <mark_1>
	restate.Set(ctx, "status", "subscribed")
	// </mark_1>
	return nil
}

func (SubscriptionWorkflow) GetStatus(ctx restate.WorkflowSharedContext, req SubscriptionRequest) (string, error) {
	// <mark_1>
	return restate.Get[string](ctx, "status")
	// </mark_1>
}

func main() {
	// <mark_3>
	handler, err := server.NewRestate().
		Bind(restate.Reflect(SubscriptionWorkflow{})).
		Bidirectional(false).
		LambdaHandler()
	if err != nil {
		log.Fatal(err.Error())
	}
	lambda.Start(handler)
	// </mark_3>
}

// <end_here>

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
