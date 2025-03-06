import {
    AnnotationHandler,
    HighlightedCode,
    Inline,
    Pre,
} from "codehike/code"
import { CopyButton } from "./copy-button"
import { fold } from "./annotations/fold"
import { link } from "./annotations/link"
import { lineNumbers } from "./annotations/line-numbers"
import { CodeIcon } from "./annotations/icons"
import { collapse } from "./annotations/collapse"
import { callout } from "./annotations/callout"
import { mark } from "./annotations/mark"
import { pill } from "./annotations/pill"
import { ruler } from "./annotations/ruler"
import { wordWrap } from "./annotations/word-wrap"
import { tokenTransitions } from "./annotations/token-transitions"
import { focus } from "./annotations/focus"
import { diff } from "./annotations/diff"
import { tooltip } from "./annotations/tooltip"
// @ts-ignore
import Tabs from '@theme/Tabs';
// @ts-ignore
import TabItem from '@theme/TabItem';
import React from "react"
import {Block, HighlightedCodeBlock, parseProps} from "codehike/blocks";
import {z} from "zod"
import styles from "./code-styling.module.css"
import clsx from "clsx";

export function InlineCode({ codeblock }: { codeblock: HighlightedCode }) {
  return (
      <Inline
          code={codeblock}
          style={codeblock.style}
          className="selection:bg-editor-selectionBackground"
      />
  )
}

export function Code({
                             codeblock,
                             ...rest
                           }: {
  codeblock: HighlightedCode
  className?: string
  style?: React.CSSProperties
  extraHandlers?: AnnotationHandler[]
}) {
  return <HighCode highlighted={codeblock} {...rest} />
}

export function HighCode({
                           highlighted,
                           isTab,
                           noBorder,
                           noCopyButton,
                           className,
                           style,
                           extraHandlers = [],
                         }: {
  highlighted: HighlightedCode
  isTab?: boolean
  noBorder?: boolean
  noCopyButton?: boolean
  className?: string
  style?: React.CSSProperties
  extraHandlers?: AnnotationHandler[]
}) {
  const { title, flags, githubLink } = extractFlags(highlighted)
  const h = { ...highlighted, meta: title }

  const handlers = [
    ...extraHandlers,
    mark,
    tooltip,
    pill,
    fold,
    link,
    focus,
    ruler,
    flags.includes("a") && tokenTransitions,
    flags.includes("n") && lineNumbers,
    diff,
    ...collapse,
    flags.includes("w") && wordWrap,
    callout,
  ].filter(Boolean) as AnnotationHandler[]

  const pre = (
      <Pre
          code={h}
          handlers={handlers}
      />
  )

  if (title && !isTab) {
    return (
        <div
            className={clsx(
                className,
            )}
            style={
              {
                ...style,
              } as any
            }
        >
            <div className="ch-codeblock">
                <div className="ch-code-wrapper ch-code">
                    <div className={styles.codeFileName}>
                        <CodeIcon title={title}/>
                        <span className={styles.codeFileNameTitle}>{title}</span>
                    </div>
                    {(!noCopyButton) ? <CopyButton text={h.code} githubUrl={githubLink} className="ch-code-button"/>: null}
                    {pre}
                </div>
            </div>
        </div>
    )
  } else {
      return (
          <div
              className={className}
              style={
              {
                ...style,
              } as any
            }
        >
            <div className={clsx("ch-codeblock", (isTab || noBorder) ? "no-border" : undefined)}>
                <div className="ch-code-wrapper ch-code">
                    {(!noCopyButton) ? <CopyButton text={h.code} githubUrl={githubLink} className="ch-code-button" />: null}
                  {pre}
                </div>
            </div>
        </div>
    )
  }
}

export function extractFlags(codeblock: HighlightedCode) {
    return extractFlagsFromMeta(codeblock.meta)
}

export function extractFlagsFromMeta(meta: string) {
    const metaContents = meta.split(" ")
    const githubLink = metaContents.filter((flag) => flag.startsWith("https://github.com"))[0] ?? undefined
    const tabValue = metaContents.filter((flag) => flag.startsWith("tabValue-"))[0]?.replace("tabValue-", "") ?? undefined
    const flags = metaContents.filter((flag) => flag.startsWith("-"))[0] ?? ""
    const title = (metaContents.filter((flag) => !flag.startsWith("https://github.com") && !flag.startsWith("-") && !flag.startsWith("tabValue-"))[0] ?? "").trim()
    return { title, flags: flags.slice(1).split(""), githubLink: githubLink, tabValue }
}


const Schema = Block.extend({ groupId: z.optional(z.string()), className: z.optional(z.string()), tabs: z.array(HighlightedCodeBlock) })
export function CodeWithTabs(props: unknown) {
    const { groupId, className, tabs } = parseProps(props, Schema)
    return <CodeTabs groupId={groupId} tabs={tabs} className={className}/>
}

export function CodeTabs(props: { groupId?: string, className: string, tabs: HighlightedCode[] }) {
    const { groupId, tabs } = props

    // Tabs with the same title are merged and shown as different stacked windows in a single tab
    const tabMap = new Map<string, HighlightedCode[]>()
    tabs.forEach((tab) => {
        const { title } = extractFlagsFromMeta(tab.meta)
        if (tabMap.has(title)) {
            tabMap.get(title)!.push(tab)
        } else {
            tabMap.set(title, [tab])
        }
    })

    return (
        <Tabs className={clsx(styles.codetablist, "ch-codetablist", props.className)} {...(groupId ? { groupId, queryString: true } : {})}>
            {Array.from(tabMap.entries()).map(([title, windows], i) => {
                return (
                    <TabItem className={clsx(styles.codetab)} label={title} value={title.toLowerCase().replace("typescript", "ts")} key={i}>
                        {windows.map((window, i) => {
                            return <><HighCode isTab={true} highlighted={window} key={i}/>
                                {i < windows.length - 1 && <div className={styles.greyLine}></div>}</>
                        })}
                    </TabItem>
                )
            })}
        </Tabs>
    )
}
