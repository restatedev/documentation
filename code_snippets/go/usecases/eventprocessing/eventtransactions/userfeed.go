package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log"
	"log/slog"
	"os"
	"time"
)

type SocialMediaPost struct {
	Content  string `json:"content"`
	Metadata string `json:"metadata"`
}

// <start_here>
type UserFeed struct{}

// <mark_1>
func (UserFeed) ProcessPost(ctx restate.ObjectContext, post SocialMediaPost) error {
	// </mark_1>
	// <mark_5>
	var userId = restate.Key(ctx)
	// </mark_5>

	// <mark_3>
	postId, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
		return CreatePost(userId, post)
	})
	// </mark_3>
	if err != nil {
		return err
	}

	// <mark_4>
	for {
		// <mark_3>
		status, err := restate.Run(ctx, func(ctx restate.RunContext) (string, error) {
			return GetPostStatus(postId), nil
		})
		// </mark_3>
		if err != nil {
			return err
		}
		if status != PENDING {
			break
		}
		// <mark_2>
		if err = restate.Sleep(ctx, 5*time.Second); err != nil {
			// </mark_2>
			return err
		}
	}
	// </mark_4>

	// <mark_3>
	if _, err := restate.Run(ctx, func(ctx restate.RunContext) (restate.Void, error) {
		return restate.Void{}, UpdateUserFeed(userId, postId)
		// </mark_3>
	}); err != nil {
		return err
	}

	return nil
}

// <mark_6>
func main() {
	handler, err := server.NewRestate().
		Bind(restate.Reflect(UserFeed{})).
		Bidirectional(false).
		LambdaHandler()
	if err != nil {
		log.Fatal(err.Error())
	}
	lambda.Start(handler)
}

// </mark_6>
// <end_here>
