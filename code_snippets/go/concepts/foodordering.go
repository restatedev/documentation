package concepts

import restate "github.com/restatedev/sdk-go"

type OrderProcessor struct{}

// <start_here>
// <mark_1>
func (OrderProcessor) Process(ctx restate.ObjectContext, order Order) error {
	// </mark_1>
	// 1. Set status
	// <mark_4>
	restate.Set(ctx, "status", Status_CREATED)
	// </mark_4>

	// 2. Handle payment
	// <mark_5>
	token := restate.Rand(ctx).UUID().String()
	paid, err := restate.Run(ctx, func(ctx restate.RunContext) (bool, error) {
		return paymentClnt.Charge(ctx, order.Id, token, order.TotalCost)
	})
	if err != nil {
		return err
	}
	// </mark_5>

	if !paid {
		// <mark_4>
		restate.Set(ctx, "status", Status_REJECTED)
		// </mark_4>
		return nil
	}

	// 3. Wait until the requested preparation time
	// <mark_4>
	restate.Set(ctx, "status", Status_SCHEDULED)
	// </mark_4>
	if err := restate.Sleep(ctx, order.DeliveryDelay); err != nil {
		return err
	}

	// 4. Trigger preparation
	// <mark_3>
	preparationAwakeable := restate.Awakeable[restate.Void](ctx)
	// <mark_5>
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, restaurant.Prepare(order.Id, preparationAwakeable.Id())
	}); err != nil {
		return err
	}
	// </mark_5>
	// </mark_3>
	// <mark_4>
	restate.Set(ctx, "status", Status_IN_PREPARATION)
	// </mark_4>

	// <mark_3>
	if _, err := preparationAwakeable.Result(); err != nil {
		return err
	}
	// </mark_3>
	// <mark_4>
	restate.Set(ctx, "status", Status_SCHEDULING_DELIVERY)
	// </mark_4>

	// 5. Find a driver and start delivery
	// <mark_2>
	if _, err := restate.Object[restate.Void](ctx, "DeliveryManager", order.Id, "StartDelivery").
		Request(order); err != nil {
		return err
	}
	// </mark_2>
	// <mark_4>
	restate.Set(ctx, "status", Status_DELIVERED)
	// </mark_4>

	return nil
}

// <end_here>
