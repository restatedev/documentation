package main

import (
	restate "github.com/restatedev/sdk-go"
	"log/slog"
)

type FlightRequest struct {
	FlightId      string `json:"flight_id"`
	PassengerName string `json:"passenger_name"`
}

func ReserveFlight(customerId string, _req FlightRequest) (string, error) {
	slog.Info("Flight reserved for customer: " + customerId)
	return "my-id", nil
}

func ConfirmFlight(bookingId string) (restate.Void, error) {
	slog.Info("Flight reserved for customer: " + bookingId)
	return restate.Void{}, nil
}

func CancelFlight(bookingId string) (restate.Void, error) {
	slog.Info("Flight cancelled for customer:" + bookingId)
	return restate.Void{}, nil
}

func Charge(paymentInfo string, paymentId string) (restate.Void, error) {
	return restate.Void{}, nil
}

func Refund(paymentId string) (restate.Void, error) {
	return restate.Void{}, nil
}
