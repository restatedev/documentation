package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func MyClientHandler() error {
	// <start_submit>
	const RESTATE_URL = "http://localhost:8080"
	payload, err := json.Marshal(User{
		Name:  "John Doe",
		Email: "john@doe.com",
	})
	if err != nil {
		return err
	}

	url := fmt.Sprintf("%s/SignupWorkflow/someone/Run/send", RESTATE_URL)
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(payload))
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	// <end_submit>
	return nil
}

func MyClientHandler1() error {
	// <start_query>
	const RESTATE_URL = "http://localhost:8080"
	url := fmt.Sprintf("%s/SignupWorkflow/someone/GetStatus", RESTATE_URL)
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	slog.Info("Response: " + string(body))
	// <end_query>
	return nil
}

func MyClientHandler2() error {
	// <start_attach>
	const RESTATE_URL = "http://localhost:8080"
	attachUrl := fmt.Sprintf("%s/restate/workflow/SignupWorkflow/someone/attach", RESTATE_URL)
	result, err := http.Get(attachUrl)
	if err != nil {
		return err
	}
	defer result.Body.Close()
	// <end_attach>

	return nil
}

func main() {
	if err := MyClientHandler(); err != nil {
		fmt.Println(err)
	}
}
