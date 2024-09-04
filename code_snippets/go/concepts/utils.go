package concepts

import (
	"context"
	"time"
)

type Status int

const (
	Status_NEW Status = iota
	Status_CREATED
	Status_SCHEDULED
	Status_IN_PREPARATION
	Status_SCHEDULING_DELIVERY
	Status_WAITING_FOR_DRIVER
	Status_IN_DELIVERY
	Status_DELIVERED
	Status_REJECTED
	Status_CANCELLED
	Status_UNKNOWN
)

type Order struct {
	Id            string
	TotalCost     int
	DeliveryDelay time.Duration
}

type PaymentClient struct{}

func (PaymentClient) Charge(ctx context.Context, id string, token string, amount int) (bool, error) {
	return true, nil
}

var paymentClnt PaymentClient

type RestaurantClient struct{}

func (RestaurantClient) Prepare(id string, cb string) error {
	return nil
}

var restaurant = RestaurantClient{}
