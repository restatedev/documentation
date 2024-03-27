import React from "react";
import { MiniTerminalTransitions } from "@code-hike/mini-terminal";

export default function TerminalAnimation({listOfSteps}) {
    const [progress, setProgress] = React.useState(0);
    return (
        <div style={{ width: 500, margin: "50px auto" }}>
            <MiniTerminalTransitions
                title="terminal"
                height={300}
                progress={progress}
                steps={listOfSteps}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
                <input
                    type="range"
                    max={listOfSteps.length - 1}
                    step={1}
                    style={{ width: "100%" }}
                    onChange={(e) => setProgress(+e.target.value)}
                    value={progress}
                />
                <div style={{ width: 60, paddingLeft: 20 }}>{progress}</div>
            </div>
        </div>
    );
}
