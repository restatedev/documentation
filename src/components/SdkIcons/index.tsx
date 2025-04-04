import React from "react";
import styles from "./styles.module.css";

type SdkLinks = {
    description?: string;
    java?: string;
    ts?: string;
    kotlin?: string;
    python?: string;
    go?: string;
    rust?: string;
};

export default function SdkIcons({ sdkLinks }: { sdkLinks: SdkLinks }): JSX.Element {
    const { description, java, ts, kotlin, python, go, rust } = sdkLinks;
    return (
        <div className={styles.langContainer}>
            {description ? (
                <p>{description}</p>
            ): null}
            {ts ? (
                <div id="overviewButtonDiv">
                    <a
                        className="overviewButton btn btn-primary btn-lg firstTimeButton"
                        href={ts}
                        role="button"
                    >
                        <img
                            className="buttonIcon mb-0.5"
                            src="/img/typescript.svg"
                            width="20"
                        />
                    </a>
                </div>
            ) : null}
            {java ? (
                <div id="overviewButtonDiv">
                    <a
                        className="overviewButton btn btn-primary btn-lg firstTimeButton"
                        href={java}
                        role="button"
                    >
                        <img className="buttonIcon mb-0.5" src="/img/java.svg" width="20" />
                    </a>
                </div>
            ) : null}
            {kotlin ? (
                <div id="overviewButtonDiv">
                    <a
                        className="overviewButton btn btn-primary btn-lg firstTimeButton"
                        href={kotlin}
                        role="button"
                    >
                        <img className="buttonIcon mb-0.5" src="/img/kotlin.svg" width="20" />
                    </a>
                </div>
            ) : null}
            {go ? (
                <div id="overviewButtonDiv">
                    <a
                        className="overviewButton btn btn-primary btn-lg firstTimeButton"
                        href={go}
                        role="button"
                    >
                        <img className="buttonIcon mb-0.5" src="/img/go.svg" width="40" />
                    </a>
                </div>
            ) : null}
            {python ? (
                <div id="overviewButtonDiv">
                    <a
                        className="overviewButton btn btn-primary btn-lg firstTimeButton"
                        href={python}
                        role="button"
                    >
                        <img className="buttonIcon mb-0.5" src="/img/python.svg" width="20" />
                    </a>
                </div>
            ) : null}
            {rust ? (
                <div id="overviewButtonDiv">
                    <a
                        className="overviewButton btn btn-primary btn-lg firstTimeButton"
                        href={rust}
                        role="button"
                    >
                        <img className="buttonIcon mb-0.5" src="/img/rust.svg" width="20" />
                    </a>
                </div>
            ) : null}
        </div>
    );
}