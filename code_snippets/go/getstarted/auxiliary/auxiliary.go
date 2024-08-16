package auxiliary

type PaymentClient struct{}

func (PaymentClient) Call(idempotencyKey string, totalPrice int) (bool, error) {
	return true, nil
}
