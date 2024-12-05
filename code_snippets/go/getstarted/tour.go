package getstarted

import (
	"time"

	"github.com/restatedev/examples/tutorials/tour-of-restate-go/auxiliary"
	restate "github.com/restatedev/sdk-go"
)

type MyService struct{}

func (MyService) Greet(ctx restate.Context, name string) error {
	ticketId := ""

	// <start_sleep>
	if err := restate.Sleep(ctx, 15*time.Minute); err != nil {
		return err
	}
	// <end_sleep>

	// <start_sleep_and_send>
	if err := restate.Sleep(ctx, 15*time.Minute); err != nil {
		return err
	}
	restate.ObjectSend(ctx, "TicketObject", ticketId, "unreserve").Send(restate.Void{})
	// <end_sleep_and_send>

	return nil
}

type CheckoutService struct{}

type CheckoutRequest struct {
	UserId  string
	Tickets []string
}

/*
// <start_uuid>
func (CheckoutService) Handle(ctx restate.Context, request CheckoutRequest) (bool, error) {
	// !mark(1:3)
	idempotencyKey := restate.Rand(ctx).UUID().String()
	ctx.Log().Info("Generated idempotency key", "idempotencyKey", idempotencyKey)
	return false, fmt.Errorf("Something happened!")
}

// <end_uuid>

*/

// <start_checkout>
func (CheckoutService) Handle(ctx restate.Context, request CheckoutRequest) (bool, error) {
	totalPrice := len(request.Tickets) * 40

	idempotencyKey := restate.Rand(ctx).UUID().String()
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, auxiliary.PaymentClient{}.Call(idempotencyKey, totalPrice)
	}); err != nil {
		return false, err
	}

	return true, nil
}

// <end_checkout>
