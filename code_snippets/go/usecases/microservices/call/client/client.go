package main

import (
	"flag"
	"fmt"
	"io"
	"log/slog"
	"net/http"
)

// <start_here>
const RESTATE_URL = "http://localhost:8080"

func ReserveProduct(productId string, reservationId string) error {
	// !focus(1:15)
	client := &http.Client{}
	// <mark_1>
	url := fmt.Sprintf("%s/ProductService/%s/Reserve", RESTATE_URL, productId)
	req, err := http.NewRequest("POST", url, nil)
	// </mark_1>
	if err != nil {
		return err
	}
	// <mark_2>
	req.Header.Set("idempotency-key", reservationId)
	// </mark_2>

	// <mark_1>
	resp, err := client.Do(req)
	// </mark_1>
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	slog.Info("Response: " + string(body))
	return nil
}

// <end_here>

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
