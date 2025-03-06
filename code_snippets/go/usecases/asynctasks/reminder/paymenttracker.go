package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log/slog"
	"os"
	"time"
)

type StripeEvent struct {
}

// <start_here>
type PaymentTracker struct{} // one instance per invoice id

// OnPaymentSuccess Stripe sends us webhook events for invoice payment attempts
// <mark_1>
func (PaymentTracker) OnPaymentSuccess(ctx restate.ObjectContext, event StripeEvent) restate.Void {
	// </mark_1>
	// <mark_3>
	restate.Set[bool](ctx, "paid", true)
	// </mark_3>
	return restate.Void{}
}

// <mark_1>
func (PaymentTracker) OnPaymentFailure(ctx restate.ObjectContext, event StripeEvent) error {
	// </mark_1>
	// <mark_3>
	paid, err := restate.Get[bool](ctx, "paid")
	// </mark_3>
	if err != nil {
		return err
	}
	if paid {
		return nil
	}

	remindersCount, err := restate.Get[int8](ctx, "remindersCount")
	if err != nil {
		return err
	}
	if remindersCount < 3 {
		restate.Set(ctx, "reminders_count", remindersCount+1)
		if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			return restate.Void{}, SendReminderEmail(event)
		}); err != nil {
			return err
		}

		// Schedule next reminder via a delayed self call
		// <mark_2>
		restate.ObjectSend(ctx,
			"PaymentTracker",
			restate.Key(ctx), // this object's invoice id
			"onPaymentFailure").
			Send(event, restate.WithDelay(5*time.Second))
		// </mark_2>
	} else {
		// <mark_2>
		if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			return restate.Void{}, EscalateToHuman(event)
			// </mark_2>
		}); err != nil {
			return err
		}
	}
	return nil
}

// <end_here>

func main() {
	server := server.NewRestate().
		Bind(restate.Reflect(PaymentTracker{}))

	if err := server.Start(context.Background(), ":9080"); err != nil {
		slog.Error("application exited unexpectedly", "err", err.Error())
		os.Exit(1)
	}
}

func EscalateToHuman(event StripeEvent) error {
	return nil
}

func SendReminderEmail(event StripeEvent) error {
	return nil
}
