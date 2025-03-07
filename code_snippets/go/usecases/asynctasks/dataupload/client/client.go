package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net"
	"net/http"
	"time"

	"github.com/google/uuid"
)

const RESTATE_URL = "http://localhost:8080"

// <start_here>
func upload(userId string, email string) error {

	// <mark_1>
	client := &http.Client{Timeout: 30 * time.Second}
	url := fmt.Sprintf("%s/DataUploadService/%s/Run", RESTATE_URL, userId)
	fileUploadUrl, err := client.Get(url)
	// </mark_1>

	if err != nil {
		// Timeout hit; Request the workflow to send an email with the response instead
		// <mark_2>
		if err, ok := err.(net.Error); ok && err.Timeout() {
			emailHandlerUrl := fmt.Sprintf("%s/DataUploadService/%s/GetUrlViaEmail/send", RESTATE_URL, userId)
			emailData, _ := json.Marshal(email)
			resp, err := client.Post(emailHandlerUrl, "application/json", bytes.NewBuffer(emailData))
			if err != nil {
				return err
			}
			defer resp.Body.Close()
			return nil
		}
		// </mark_2>
		return err
	}
	defer fileUploadUrl.Body.Close()

	body, err := io.ReadAll(fileUploadUrl.Body)
	if err != nil {
		return err
	}

	// ... process result directly ...
	slog.Info("Fast upload: URL was " + string(body))
	return nil
}

// <end_here>

func main() {
	id := uuid.New().String()
	err := upload(id, fmt.Sprintf("%s@example.com", id))
	if err != nil {
		slog.Error("Upload failed", "err", err.Error())
		return
	}
}
