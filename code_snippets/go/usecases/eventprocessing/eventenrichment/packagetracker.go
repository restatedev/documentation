package main

import (
	"context"
	"errors"
	restate "github.com/restatedev/sdk-go"
	"github.com/restatedev/sdk-go/server"
	"log"
)

type LocationUpdate struct {
	Timestamp string `json:"timestamp"`
	Location  string `json:"location"`
}

type PackageInfo struct {
	FinalDestination string           `json:"finalDestination"`
	Locations        []LocationUpdate `json:"locations"`
}

// <start_here>
// <mark_2>
type PackageTracker struct{}

// </mark_2>

// <mark_2>
// <mark_3>
func (PackageTracker) RegisterPackage(ctx restate.ObjectContext, packageInfo PackageInfo) error {
	// </mark_2>
	// </mark_3>
	// <mark_1>
	restate.Set[PackageInfo](ctx, "package-info", packageInfo)
	// </mark_1>
	return nil
}

// <mark_3>
// <mark_2>
func (PackageTracker) UpdateLocation(ctx restate.ObjectContext, locationUpdate LocationUpdate) error {
	// </mark_2>
	// </mark_3>
	// <mark_1>
	packageInfo, err := restate.Get[*PackageInfo](ctx, "package-info")
	// </mark_1>
	if err != nil {
		return err
	}
	if packageInfo == nil {
		return restate.TerminalError(errors.New("package not found"))
	}

	if packageInfo.FinalDestination == "" {
		return restate.TerminalError(errors.New("package not found"))
	}

	packageInfo.Locations = append(packageInfo.Locations, locationUpdate)
	// <mark_1>
	restate.Set[PackageInfo](ctx, "package-info", *packageInfo)
	// </mark_1>
	return nil
}

// <mark_3>
// <mark_2>
func (PackageTracker) GetPackageInfo(ctx restate.ObjectSharedContext) (*PackageInfo, error) {
	// </mark_2>
	// </mark_3>
	// <mark_1>
	return restate.Get[*PackageInfo](ctx, "package-info")
}

func main() {
	if err := server.NewRestate().
		Bind(restate.Reflect(PackageTracker{})).
		Start(context.Background(), ":9080"); err != nil {
		log.Fatal(err)
	}
}

// <end_here>
