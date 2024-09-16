import { z } from "zod"
import { Block, HighlightedCodeBlock, parseProps } from "codehike/blocks"
import React from "react"
import { Code, CodeTabs, extractFlags } from "../code"
import styles from "./textandcode.module.css"


const Schema = Block.extend({
    code: z.optional(HighlightedCodeBlock),
    tabs: z.optional(z.array(HighlightedCodeBlock)),
})

export function TextAndCode(props: unknown) {
    const { code, tabs, title, children } =
        parseProps(props, Schema)

    return (
        <div className="row">
            <div className={styles.stepsContainer}>
                <h2>{title}</h2>
                <div>{children}</div>
            </div>
            <div className="grid-cols-6">
                        {code ? (
                            <Code codeblock={code} />
                        ) : (
                            <CodeTabs tabs={tabs} />
                        )}
            </div>
        </div>
    )
}