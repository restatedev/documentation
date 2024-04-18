import React from "react";
import { MiniTerminalTransitions } from "@code-hike/mini-terminal";
import styles from "./styles.module.css";

export default function TerminalAnimation({listOfSteps}) {
    const [progress, setProgress] = React.useState(0);
    return (
        <div className={styles.terminal}>
            <MiniTerminalTransitions
                title="terminal"
                height={300}
                progress={progress}
                steps={listOfSteps}
                className="terminal"
            />
            <div className={styles.progressBar}>
                <input
                    type="range"
                    max={listOfSteps.length - 1}
                    step={1}
                    style={{ width: "100%" }}
                    onChange={(e) => setProgress(+e.target.value)}
                    value={progress}
                />
            </div>

        </div>
    );
}
