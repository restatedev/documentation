package main

import (
	"context"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log"
)

// <start_here>
type FileUploadWorkflow struct{}

func (FileUploadWorkflow) Run(ctx restate.WorkflowContext) (string, error) {
	url, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return createS3Bucket(), nil
	})
	if err != nil {
		return "", err
	}

	_, err = restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, uploadData(url)
	})
	if err != nil {
		return "", err
	}

	// <mark_1>
	err = restate.Promise[string](ctx, "url").Resolve(url)
	// </mark_1>
	if err != nil {
		return "", err
	}

	return url, nil
}

func (FileUploadWorkflow) GetUrlViaEmail(ctx restate.WorkflowSharedContext, email string) error {
	// <mark_1>
	url, err := restate.Promise[string](ctx, "url").Result()
	// </mark_1>
	if err != nil {
		return err
	}

	_, err = restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, sendEmail(email, url)
	})
	return err
}

// <end_here>

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(FileUploadWorkflow{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err.Error())
	}
}
