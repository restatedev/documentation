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
import { Code, CodeTabs, extractFlags } from "./code"

const Schema = Block.extend({
    steps: z.array(
        Block.extend({
            code: z.optional(HighlightedCodeBlock),
            tabs: z.optional(z.array(HighlightedCodeBlock)),
        })
    ),
})

export function Scrollycoding(props: unknown) {
    const { steps } = parseProps(props, Schema)

    console.log(steps[0])
    return (
        <SelectionProvider className={styles.scrollycodingContainer}>
            <div className={styles.stepsContainer}>
                {steps.map((step, i) => (
                    <Selectable
                        key={i}
                        index={i}
                        selectOn={["click", "scroll"]}
                        className={styles.step}
                    >
                        <p className={styles.stepTitle}>{step.title}</p>
                        <div>{step.children}</div>
                    </Selectable>
                ))}
            </div>
            <Selection
                from={steps.map((step) => (
                    <div className={styles.sticker}>
                        <div className={styles.stickyCode}>
                            {"code" in step ? (
                                <Code
                                    codeblock={step.code}
                                    style={{ maxHeight: "50rem" }}
                                />
                            ) : (
                                <CodeTabs tabs={step.tabs} />
                            )}
                        </div>
                    </div>
                ))}
            />
        </SelectionProvider>
    )
}