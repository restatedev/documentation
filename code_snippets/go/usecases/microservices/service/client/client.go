package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"github.com/restatedev/documentation/code_snippets/go/usecases/microservices/service"
	"io"
	"log/slog"
	"net/http"
)

const RESTATE_URL = "http://localhost:8080"

func Subscribe() error {
	subscriptionData := service.SubscriptionRequest{
		UserID:        "123",
		CreditCard:    "1111",
		Subscriptions: []string{"Netflix", "Disney"},
	}
	subscriptionJson, _ := json.Marshal(subscriptionData)
	subscriptionRequest := bytes.NewBuffer(subscriptionJson)

	requestId := "123"
	// <start_here>
	client := &http.Client{}
	// <mark_1>
	url := fmt.Sprintf("%s/SubscriptionService/Add", RESTATE_URL)
	req, err := http.NewRequest("POST", url, subscriptionRequest)
	// </mark_1>
	if err != nil {
		return err
	}
	// <mark_2>
	req.Header.Set("idempotency-key", requestId)
	// </mark_2>

	// <mark_1>
	resp, err := client.Do(req)
	// </mark_1>
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	// <end_here>

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	slog.Info("Response: " + string(body))
	return nil
}

func main() {
	productId := flag.String("productId", "", "Product ID")
	reservationId := flag.String("reservationId", "", "Reservation ID")
	flag.Parse()

	if *productId == "" || *reservationId == "" {
		slog.Error("Product ID and Reservation ID must be provided")
		return
	}

	ReserveProduct(*productId, *reservationId)
}
