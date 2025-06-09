package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log"
)

type BookingRequest struct {
	CustomerId  string        `json:"customerId"`
	Flight      FlightRequest `json:"flight"`
	PaymentInfo string        `json:"payment"`
}

/*
Trip reservation workflow using sagas:
Restate infinitely retries failures, and recovers previous progress.
For some types of failures, we don't want to retry but want to undo the previous actions and finish.

Restate guarantees the execution of your code. This makes it very easy to implement sagas.
We execute actions, and keep track of a list of undo actions.
When a terminal error occurs (an error we do not want to retry), Restate ensures execution of all compensations.

+------ Initialize compensations list ------+
                     |
                     v
+--------------------------------------------+
| 1. Add Cancel Flight Compensation          |
| 2. Book Flight                             |
|    If TerminalError: Run Compensations     |
| 3. Add Cancel Car Compensation             |
| 4. Book Car                                |
|    If TerminalError: Run Compensations     |
| 5. Add Cancel Hotel Compensation           |
| 6. Book Hotel                              |
|    If TerminalError: Run Compensations     |
+--------------------------------------------+

Note: that the compensation logic is purely implemented in user code (no special Restate API)
*/

type BookingWorkflow struct{}

func (BookingWorkflow) Run(ctx restate.Context, req BookingRequest) (err error) {

	// Create a list of undo actions
	var compensations []func() (restate.Void, error)

	// Run compensations at the end if err != nil
	defer func() {
		if err != nil {
			for _, compensation := range compensations {
				if _, compErr := compensation(); compErr != nil {
					err = compErr
				}
			}
		}
	}()

	// <start_twostep>
	// !mark[/bookingId/] red
	bookingId, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return ReserveFlight(req.CustomerId, req.Flight)
	})
	if err != nil {
		return err
	}

	compensations = append(compensations, func() (restate.Void, error) {
		return restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			// !mark[/bookingId/] red
			return CancelFlight(bookingId)
		})
	})

	// ... do other work, like reserving a car, etc. ...

	// !mark[/bookingId/] red
	if _, err = restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		// !mark[/bookingId/] red
		return ConfirmFlight(bookingId)
	}); err != nil {
		return err
	}
	// <end_twostep>

	// <start_idempotency>
	// !mark[/paymentId/] red
	paymentID := restate.Rand(ctx).UUID().String()

	// Register the refund as a compensation, using the idempotency key
	compensations = append(compensations, func() (restate.Void, error) {
		return restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
			// !mark[/paymentId/] red
			return Refund(paymentID)
		})
	})

	// Do the payment using the idempotency key
	if _, err = restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		// !mark[/paymentId/] red
		return Charge(paymentID, req.PaymentInfo)
	}); err != nil {
		return err
	}
	// <end_idempotency>

	return nil
}

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(BookingWorkflow{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
}
