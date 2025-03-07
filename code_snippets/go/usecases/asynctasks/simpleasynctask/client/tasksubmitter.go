package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
)

type TaskOpts struct {
	Id          string `json:"id"`
	Description string `json:"description"`
}

const RESTATE_URL = "http://localhost:8080"

func SubmitTask(task TaskOpts) error {
	// <start_here>
	client := &http.Client{}
	// <mark_1>
	url := fmt.Sprintf("%s/AsyncTaskWorker/RunTask/Send", RESTATE_URL)
	taskData, _ := json.Marshal(task)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(taskData))
	// </mark_1>
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	// <mark_2>
	req.Header.Set("idempotency-key", "dQw4w9WgXcQ")
	// </mark_2>

	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// ... do other things while the task is being processed ...

	// <mark_3>
	attachUrl := fmt.Sprintf(
		"%s/restate/invocation/AsyncTaskWorker/RunTask/%s/attach",
		RESTATE_URL,
		"dQw4w9WgXcQ")
	resp, err = http.DefaultClient.Get(attachUrl)
	// </mark_3>
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	// <end_here>

	return nil
}

func main() {
	task := TaskOpts{
		Id:          "task1",
		Description: "some heavy work",
	}
	err := SubmitTask(task)
	if err != nil {
		slog.Error("Task submission failed", "err", err.Error())
		return
	}
	slog.Info("Task submitted successfully")
}
