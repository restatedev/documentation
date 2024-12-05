import { z } from "zod"
import {
    Selection,
    Selectable,
    SelectionProvider,
} from "codehike/utils/selection"
import { Block, HighlightedCodeBlock, parseProps } from "codehike/blocks"
// @ts-ignore
import styles from "./scrollycoding.module.css"
import React from "react"
import { Code, CodeTabs } from "./code"
import {Terminal, TerminalView} from "./terminal";

const Schema = Block.extend({
    steps: z.array(
        Block.extend({
            code: z.optional(HighlightedCodeBlock),
            tabs: z.optional(z.array(HighlightedCodeBlock)),
            command: z.optional(HighlightedCodeBlock),
            output: z.optional(HighlightedCodeBlock),
            activeTabIndex: z.optional(z.number()),
            windows: z.optional(z.array(HighlightedCodeBlock)),
        })
    ),
})

export function Scrollycoding(props: unknown) {
    const { steps } = parseProps(props, Schema)

    return (
        <SelectionProvider className={styles.scrollycodingContainer}>
            <div className={styles.stepsContainer}>
                {steps.map((step, i) => (
                    <>
                        <Selectable
                            key={i}
                            index={i}
                            selectOn={["hover", "scroll", "click"]}
                            className={styles.step}
                        >
                            {(step.title.length > 0) ? <p className={styles.stepTitle}>{step.title}</p> : null}
                            <div>{step.children}</div>
                        </Selectable>
                        {/*Mobile:*/}
                        <Selectable
                            key={i}
                            index={i}
                            selectOn={["click"]}
                            className={styles.stepMobile}
                        >
                            {(step.title.length > 0) ? <p className={styles.stepTitle}>{step.title}</p> : null}
                            <div>{step.children}</div>
                        </Selectable>
                    </>

                ))}
            </div>
            <Selection
                from={steps.map((step) => (
                    <div className={styles.sticker}>
                        <div className={styles.stickyCode}>
                            {"command" in step && "output" in step ? (
                                TerminalView(step.command, step.output)
                            ) : "code" in step ? (
                                <Code
                                    codeblock={step.code}
                                    style={{ maxHeight: "50rem" }}
                                />
                            ) : "tabs" in step ? (
                                <CodeTabs tabs={step.tabs} />
                            ) : /* "windows" in step ?*/ (
                                step.windows.map((window) => (
                                    <Code codeblock={window} />
                                ))
                            )}
                        </div>
                    </div>
                ))}
            />
        </SelectionProvider>
    )
}