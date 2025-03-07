package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	Name  string
	Email string
}

func ReserveProduct(userId string) error {

	user := User{
		Name:  "John Doe",
		Email: "john@doe.com",
	}

	// <start_here>
	const RESTATE_URL = "http://localhost:8080"
	client := &http.Client{}

	// !mark
	url := fmt.Sprintf("%s/SignupWorkflow/%s/Run/Send", RESTATE_URL, userId)
	userData, _ := json.Marshal(user)
	// !mark
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(userData))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// ... do other things while the task is being processed ...

	// Later on, you can retrieve the result of the task (possibly in a different process)
	// !mark
	attachUrl := fmt.Sprintf("%s/restate/workflow/SignupWorkflow/%s/attach", RESTATE_URL, userId)
	// !mark
	resp, err = http.DefaultClient.Get(attachUrl)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// ... Process the result ...

	// <end_here>

	return nil
}
